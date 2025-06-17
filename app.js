const express = require('express');
const cors = require('cors');
const feedbackRoutes = require('./routes/feedbackRoutes');
const authRoutes = require('./routes/authRoutes');

const app = express();

app.use(express.json());

app.use(cors({
    origin: '*', 
    methods: ['GET', 'POST', 'PUT', 'DELETE'], 
    allowedHeaders: ['Content-Type', 'Authorization'] 
}));

app.get('/', (req, res) => {
    res.send('Feedback System Backend API is running!');
});

app.use('/api/feedback', feedbackRoutes);
app.use('/api/auth', authRoutes);

module.exports = app;
