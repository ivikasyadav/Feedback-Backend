const express = require('express');
const {
    submitFeedback,
    getAllFeedback,
    getFeedbackStats
} = require('../controllers/feedbackController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/', submitFeedback);
router.get('/', protect, getAllFeedback);
router.get('/stats', protect, getFeedbackStats);

module.exports = router;
