const app = require('./app');
const connectDB = require('./config/db');
const http = require('http'); 
const { Server } = require('socket.io'); 
require('dotenv').config(); 

const PORT = process.env.PORT || 5000;

connectDB();
const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: process.env.REACT_APP_FRONTEND_URL || "http://localhost:3000", 
        methods: ["GET", "POST"]
    }
});

app.set('socketio', io);

server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    console.log(`Access backend at http://localhost:${PORT}`);
    console.log(`Socket.IO listening for connections`);
});
