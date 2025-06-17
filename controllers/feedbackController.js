const Feedback = require('../models/Feedback');

const submitFeedback = async (req, res) => {
    const { name, email, feedback, rating } = req.body;

    if (!feedback || !rating) {
        return res.status(400).json({ message: 'Feedback and Rating are required fields.' });
    }

    if (rating < 1 || rating > 5) {
        return res.status(400).json({ message: 'Rating must be between 1 and 5.' });
    }

    try {
        const newFeedback = new Feedback({
            name,
            email,
            feedback,
            rating,
        });

        const savedFeedback = await newFeedback.save();

        const io = req.app.get('socketio');
        io.emit('newFeedback', savedFeedback);
        console.log('Emitted newFeedback event:', savedFeedback._id);

        res.status(201).json({ message: 'Feedback submitted successfully!', feedback: savedFeedback });
    } catch (error) {
        console.error('Error submitting feedback:', error);
        if (error.name === 'ValidationError') {
            const messages = Object.values(error.errors).map(err => err.message);
            return res.status(400).json({ message: messages.join(', ') });
        }
        res.status(500).json({ message: 'Server error, could not submit feedback.' });
    }
};

const getAllFeedback = async (req, res) => {
    const { sortBy, filterByRating, searchTerm } = req.query;
    let query = {};
    let sortOptions = { createdAt: -1 };

    if (filterByRating) {
        const rating = parseInt(filterByRating, 10);
        if (!isNaN(rating) && rating >= 1 && rating <= 5) {
            query.rating = rating;
        } else {
            return res.status(400).json({ message: 'Invalid filterByRating parameter. Must be a number between 1 and 5.' });
        }
    }

   
    if (searchTerm) {
       
        query.feedback = { $regex: searchTerm, $options: 'i' };
    }

   
    if (sortBy === 'rating') {
        sortOptions = { rating: -1, createdAt: -1 };
    } else if (sortBy === 'newest') {
        sortOptions = { createdAt: -1 }; 
    } else if (sortBy === 'oldest') {
        sortOptions = { createdAt: 1 }; 
    }


    try {
        const feedback = await Feedback.find(query).sort(sortOptions);
        res.status(200).json(feedback);
    } catch (error) {
        console.error('Error fetching feedback:', error);
        res.status(500).json({ message: 'Server error, could not retrieve feedback.' });
    }
};


const getFeedbackStats = async (req, res) => {
    try {
        const stats = await Feedback.aggregate([
            {
                $group: {
                    _id: null, 
                    averageRating: { $avg: '$rating' },
                    totalFeedbacks: { $sum: 1 },
                    ratingCounts: {
                        $push: { 
                            rating: '$rating'
                        }
                    }
                }
            },
            {
                $project: {
                    _id: 0, 
                    averageRating: { $round: ['$averageRating', 2] }, 
                    totalFeedbacks: 1,
                    rating1Count: { $size: { $filter: { input: '$ratingCounts', as: 'item', cond: { $eq: ['$$item.rating', 1] } } } },
                    rating2Count: { $size: { $filter: { input: '$ratingCounts', as: 'item', cond: { $eq: ['$$item.rating', 2] } } } },
                    rating3Count: { $size: { $filter: { input: '$ratingCounts', as: 'item', cond: { $eq: ['$$item.rating', 3] } } } },
                    rating4Count: { $size: { $filter: { input: '$ratingCounts', as: 'item', cond: { $eq: ['$$item.rating', 4] } } } },
                    rating5Count: { $size: { $filter: { input: '$ratingCounts', as: 'item', cond: { $eq: ['$$item.rating', 5] } } } },
                }
            }
        ]);

        const defaultStats = {
            averageRating: 0,
            totalFeedbacks: 0,
            rating1Count: 0,
            rating2Count: 0,
            rating3Count: 0,
            rating4Count: 0,
            rating5Count: 0,
        };

        res.status(200).json(stats.length > 0 ? stats[0] : defaultStats);
    } catch (error) {
        console.error('Error fetching feedback stats:', error);
        res.status(500).json({ message: 'Server error, could not retrieve feedback statistics.' });
    }
};

module.exports = {
    submitFeedback,
    getAllFeedback,
    getFeedbackStats,
};
