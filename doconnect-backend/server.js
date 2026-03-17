const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const http = require('http');
const { Server } = require('socket.io');
const connectDB = require('./config/db');
const errorMiddleware = require('./middleware/errorMiddleware');

// Load env variables
dotenv.config();

// Connect to MongoDB
connectDB();

const app = express();
const server = http.createServer(app);

// Socket.io — one-on-one chat between users
const io = new Server(server, {
  cors: { origin: 'http://localhost:3000' }
});

io.on('connection', (socket) => {
  console.log('User connected:', socket.id);

  // Each user joins a room with their own userId
  socket.on('joinRoom', (userId) => {
    socket.join(userId);
    console.log(`User ${userId} joined their room`);
  });

  // Send message to a specific user (one-on-one)
  socket.on('sendMessage', (data) => {
    // data = { senderId, receiverId, messageText }
    io.to(data.receiverId).emit('receiveMessage', data);
  });

  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.id);
  });
});

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth',      require('./routes/authRoutes'));
app.use('/api/users',     require('./routes/userRoutes'));
app.use('/api/questions', require('./routes/questionRoutes'));
app.use('/api/answers',   require('./routes/answerRoutes'));
app.use('/api/likes',     require('./routes/likeRoutes'));
app.use('/api/comments',  require('./routes/commentRoutes'));
app.use('/api/messages',  require('./routes/messageRoutes'));
app.use('/api/admin',     require('./routes/adminRoutes'));

// Health check
app.get('/', (req, res) => {
  res.json({ message: 'DoConnect API is running' });
});

// Global error handler (must be last)
app.use(errorMiddleware);

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

module.exports = { app, server };