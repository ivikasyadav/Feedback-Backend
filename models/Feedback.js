const mongoose = require('mongoose');

const FeedbackSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true, 
        default: 'Anonymous' 
    },
    email: {
        type: String,
        trim: true,
        lowercase: true, 
        match: [/.+@.+\..+/, 'Please fill a valid email address'], 
        default: null 
    },
    feedback: {
        type: String,
        required: [true, 'Feedback content is required'],
        minlength: [10, 'Feedback must be at least 10 characters long'],
        trim: true
    },
    rating: {
        type: Number,
        required: [true, 'Rating is required'], 
        min: [1, 'Rating must be at least 1'], 
        max: [5, 'Rating cannot be more than 5'] 
    },
    createdAt: {
        type: Date,
        default: Date.now 
    }
}, {
    timestamps: true 
});

FeedbackSchema.index({ feedback: 'text' });
module.exports = mongoose.model('Feedback', FeedbackSchema);
