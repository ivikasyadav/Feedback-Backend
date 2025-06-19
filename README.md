
# 🛠️ Feedback Collection Tool – Backend (Node.js + MongoDB)

This is the backend API for the Feedback Collection Tool.  
It handles storing feedback, authentication, and real-time event broadcasting via Socket.IO.

---

## 🚀 Features

- RESTful API for:
  - Submitting feedback
  - Admin login with JWT
  - Viewing and filtering feedback
  - Getting feedback stats
- MongoDB database
- Protected admin routes
- Real-time updates using Socket.IO

---

## 🖥️ Tech Stack

- Node.js
- Express
- MongoDB (Mongoose)
- JWT for authentication
- Socket.IO for real-time updates
- CORS and dotenv for config

---

## 🔧 Setup Instructions

### 📁 Step 1: Navigate to backend folder

bash
cd server
npm install

PORT=5000
MONGO_URI=mongodb://localhost:27017/feedback-db
JWT_SECRET=supersecretjwtkey
ADMIN_USERNAME=admin
ADMIN_PASSWORD=adminpassword


npm start
