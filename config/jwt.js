
require('dotenv').config();

const jwtSecret = process.env.JWT_SECRET || '123456';
const jwtExpiresIn = '1h'; 
module.exports = {
    jwtSecret,
    jwtExpiresIn
};
