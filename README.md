# Chat-Monk
Chat-Monk AI Assistant
ChatMonk 🤖 - Real-Time AI Coding Assistant
<div align="center">
  <img src="https://img.shields.io/badge/React-18.2.0-61DAFB?style=for-the-badge&logo=react&logoColor=white" alt="React" />
  <img src="https://img.shields.io/badge/Node.js-16+-339933?style=for-the-badge&logo=node.js&logoColor=white" alt="Node.js" />
  <img src="https://img.shields.io/badge/Socket.io-4.6.1-010101?style=for-the-badge&logo=socket.io&logoColor=white" alt="Socket.io" />
  <img src="https://img.shields.io/badge/Tailwind-3.3.0-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" alt="Tailwind" />
  <img src="https://img.shields.io/badge/Groq-AI-FF6B6B?style=for-the-badge" alt="Groq" />
</div>
<br>
🚀 Overview
ChatMonk is a modern real-time chat application with an integrated AI coding assistant. Built with React, Node.js, and Socket.io, it offers a seamless chat experience with instant AI-powered coding help by mentioning @monk.
✨ Features

Real-time Messaging - Instant message delivery using Socket.io
AI Coding Assistant - Get coding help by mentioning @monk (powered by Groq)
Beautiful UI - Modern, animated interface with glass morphism effects
Dark Theme - Eye-friendly dark mode with purple/blue accents
Code Highlighting - Beautiful code formatting in AI responses
Responsive Design - Works perfectly on all devices
Typing Indicators - See when AI is thinking
Emoji Support - Express yourself with emojis

🛠️ Tech Stack
Frontend

React (Vite) - Lightning-fast development
Tailwind CSS - Utility-first styling
Socket.io Client - Real-time communication
React Markdown - Markdown rendering for AI responses

Backend

Node.js & Express - Server framework
Socket.io - WebSocket connections
Groq SDK - Free AI integration

📋 Prerequisites

Node.js 16+ and npm
Groq API Key (Free) from console.groq.com

🚀 Installation

Clone the repository
bashgit clone https://github.com/t0nyb17/chatmonk.git
cd chatmonk

Set up environment variables
Create a .env file in the root directory:
env# Server Configuration
PORT=3000
CLIENT_URL=http://localhost:5173

# Groq AI Configuration
GROQ_API_KEY=gsk_your_groq_key_here

Install backend dependencies
bashcd server
npm install

Install frontend dependencies
bashcd ../client
npm install


🏃‍♂️ Running the Application

Start the backend server
bashcd server
npm run dev

Start the frontend (in a new terminal)
bashcd client
npm run dev

Open your browser
Navigate to http://localhost:5173

📱 Usage

Enter your username and join the chat
Send messages to chat with others in real-time
Mention @monk followed by your coding question for AI assistance
Example: @monk how do I reverse an array in JavaScript?

##Screenshots
<img width="1918" height="889" alt="Screenshot 2025-07-13 003945" src="https://github.com/user-attachments/assets/9dedfec1-63e6-4126-850a-21c40b219f3a" />
<img width="1919" height="876" alt="Screenshot 2025-07-13 004020" src="https://github.com/user-attachments/assets/211abbd9-8e85-4151-860c-8c5be8de2112" />
<img width="1897" height="873" alt="Screenshot 2025-07-13 004142" src="https://github.com/user-attachments/assets/2a48a960-c2aa-4fa9-a897-67a4234cb40b" />
<img width="1916" height="894" alt="Screenshot 2025-07-13 004205" src="https://github.com/user-attachments/assets/e402f1b6-d4fa-4d99-85f9-5e5f1eaf91ae" />
<img width="1909" height="875" alt="Screenshot 2025-07-13 003931" src="https://github.com/user-attachments/assets/76ecec22-4e6a-4c25-9452-5953994999e0" />




🎨 UI Features
Beautiful Login Screen

Animated gradient background with floating orbs
Glass morphism effects
Smooth fade-in animations
Grid pattern overlay

Premium Chat Interface

Slide-in message animations
Bouncing typing indicators
Gradient message bubbles
Hover effects on all interactive elements
Clean, modern design

🚢 Deployment
Frontend (Vercel)

Push your code to GitHub
Import your repository in Vercel
Set root directory to client
Deploy!

Backend (Render)

Push your code to GitHub
Create a new web service on Render
Set root directory to server
Add environment variables (GROQ_API_KEY)
Deploy!

🔧 Getting Your Groq API Key

Visit console.groq.com
Sign up for a free account
Navigate to API Keys section
Create a new API key
Copy and add to your .env file

📂 Project Structure
chatmonk/
├── client/                 # React frontend
│   ├── src/
│   │   ├── components/    # React components
│   │   │   └── ChatRoom.jsx
│   │   ├── App.jsx        # Main app with login
│   │   ├── socket.js      # Socket.io configuration
│   │   └── index.css      # Tailwind + animations
│   └── package.json
├── server/                 # Node.js backend
│   ├── index.js           # Express + Socket.io server
│   ├── aiHandler.js       # Groq AI integration
│   └── package.json
├── .env                   # Environment variables
└── README.md             # You are here!
🤝 Contributing
Contributions are welcome! Please feel free to submit a Pull Request.

Fork the project
Create your feature branch (git checkout -b feature/AmazingFeature)
Commit your changes (git commit -m 'Add some AmazingFeature')
Push to the branch (git push origin feature/AmazingFeature)
Open a Pull Request

🔮 Future Enhancements

 User authentication
 Multiple chat rooms
 Message persistence with MongoDB
 File sharing
 Voice messages
 Direct messages
 Custom themes

👨‍💻 Author
Tanmay Bangar (t0ny)

GitHub: @t0nyb17
Project Link: https://github.com/t0nyb17/chatmonk

🙏 Acknowledgments

Groq for providing free AI API
Socket.io for real-time features
React & Vite for amazing developer experience
Tailwind CSS for beautiful styling
