import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import path from 'path';
import { fileURLToPath } from 'url';
import { handleAIRequest } from './aiHandler.js';
import Message from './models/Message.js';

// Get the directory name of the current module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load .env from parent directory (root chatmonk folder)
dotenv.config({ path: path.join(__dirname, '../.env') });

// Debug: Check if environment variables are loaded
console.log('Environment loaded:', {
  PORT: process.env.PORT,
  API_KEY_EXISTS: !!process.env.OPENAI_API_KEY,
  CLIENT_URL: process.env.CLIENT_URL
});

const app = express();
const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: process.env.CLIENT_URL || "http://localhost:5173",
    methods: ["GET", "POST"]
  }
});

app.use(cors());
app.use(express.json());

// MongoDB connection (optional)
if (process.env.MONGODB_URI) {
  mongoose.connect(process.env.MONGODB_URI)
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log('MongoDB connection error:', err));
}

// Socket.IO connection handling
io.on('connection', (socket) => {
  console.log('User connected:', socket.id);

  socket.on('join_room', (roomId) => {
    socket.join(roomId);
    console.log(`User ${socket.id} joined room ${roomId}`);
  });

  socket.on('send_message', async (data) => {
    const { username, message, roomId } = data;
    const timestamp = new Date();

    // Emit message to all users in the room
    io.to(roomId).emit('receive_message', {
      id: Date.now(),
      username,
      message,
      timestamp,
      isAI: false
    });

    // Save message to MongoDB if connected
    if (mongoose.connection.readyState === 1) {
      try {
        await Message.create({
          username,
          message,
          roomId,
          timestamp
        });
      } catch (err) {
        console.error('Error saving message:', err);
      }
    }

    // Check if @monk is mentioned
    if (message.toLowerCase().includes('@monk')) {
      const aiResponse = await handleAIRequest(message);
      
      // Emit AI response
      io.to(roomId).emit('receive_message', {
        id: Date.now() + 1,
        username: 'ChatMonk 🤖',
        message: aiResponse,
        timestamp: new Date(),
        isAI: true
      });

      // Save AI response to MongoDB
      if (mongoose.connection.readyState === 1) {
        try {
          await Message.create({
            username: 'ChatMonk',
            message: aiResponse,
            roomId,
            timestamp: new Date(),
            isAI: true
          });
        } catch (err) {
          console.error('Error saving AI response:', err);
        }
      }
    }
  });

  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.id);
  });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});