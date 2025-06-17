
const jwt = require('jsonwebtoken');
const { jwtSecret, jwtExpiresIn } = require('../config/jwt');
require('dotenv').config();

const generateToken = (id) => {
    return jwt.sign({ id }, jwtSecret, {
        expiresIn: jwtExpiresIn, 
    });
};

const loginAdmin = (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ message: 'Please enter both username and password' });
    }
    if (username === process.env.ADMIN_USERNAME && password === process.env.ADMIN_PASSWORD) {
        res.status(200).json({
            message: 'Login successful',
            token: generateToken(username), 
        });
    } else {
        res.status(401).json({ message: 'Invalid credentials' });
    }
};
module.exports = {
    loginAdmin,
};
