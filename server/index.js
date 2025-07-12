require('dotenv').config();
const express = require('express');
const { createServer } = require('http');
const { Server } = require('socket.io');
const cors = require('cors');
const mongoose = require('mongoose');
const aiHandler = require('./aiHandler');
const Message = require('./models/Message');

const app = express();
app.use(cors());
app.use(express.json());

const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST']
  }
});

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.error(err));

// Socket.IO logic
io.on('connection', socket => {
  console.log('User connected:', socket.id);

  // Load last 50 messages on join
  Message.find().sort({ timestamp: -1 }).limit(50).exec((err, msgs) => {
    if (!err) socket.emit('receive_message', msgs.reverse());
  });

  // Handle incoming messages
  socket.on('send_message', async ({ username, message }) => {
    const msgDoc = await Message.create({ username, message });
    io.emit('receive_message', msgDoc);

    // AI trigger
    if (message.includes('@monk')) {
      const reply = await aiHandler(message);
      const botDoc = await Message.create({ username: 'Monk (AI)', message: reply });
      io.emit('ai_reply', botDoc);
    }
  });

  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.id);
  });
});

// Start server
const PORT = process.env.PORT || 5000;
httpServer.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
