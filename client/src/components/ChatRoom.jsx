import { useState, useEffect, useRef } from 'react';
import ReactMarkdown from 'react-markdown';
import { socket, joinRoom, sendMessage } from '../socket';

function ChatRoom({ username }) {
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [showEmoji, setShowEmoji] = useState(false);
  const messagesEndRef = useRef(null);
  const roomId = 'general';

  const emojis = ['👍', '❤️', '😄', '🎉', '🔥', '👏', '💡', '🚀'];

  useEffect(() => {
    joinRoom(roomId);

    socket.on('receive_message', (message) => {
      setMessages(prev => [...prev, { ...message, isNew: true }]);
      setIsTyping(false);
      
      // Remove isNew flag after animation
      setTimeout(() => {
        setMessages(prev => prev.map(msg => 
          msg.id === message.id ? { ...msg, isNew: false } : msg
        ));
      }, 500);
    });

    return () => {
      socket.off('receive_message');
    };
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (inputMessage.trim()) {
      sendMessage(username, inputMessage, roomId);
      setInputMessage('');
      
      if (inputMessage.toLowerCase().includes('@monk')) {
        setIsTyping(true);
      }
    }
  };

  const addEmoji = (emoji) => {
    setInputMessage(prev => prev + emoji);
    setShowEmoji(false);
  };

  const formatTime = (timestamp) => {
    return new Date(timestamp).toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="min-h-screen bg-black flex flex-col">
      {/* Premium Header */}
      <div className="bg-black/50 backdrop-blur-xl border-b border-white/10">
        <div className="max-w-6xl mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 bg-gradient-to-br from-purple-600 to-blue-600 rounded-xl flex items-center justify-center shadow-lg shadow-purple-500/25">
                <span className="text-xl">🤖</span>
              </div>
              <h1 className="text-2xl font-semibold text-white">
                Chat<span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400">Monk</span>
              </h1>
            </div>
            <div className="flex items-center space-x-3">
              <div className="flex items-center space-x-2 bg-white/5 px-4 py-2 rounded-full">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                <span className="text-gray-300 text-sm">{username}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Messages Container */}
      <div className="flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-800 scrollbar-track-transparent">
        <div className="max-w-4xl mx-auto px-6 py-8">
          {/* Welcome message */}
          {messages.length === 0 && (
            <div className="text-center py-20 animate-fade-in">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-purple-600/20 to-blue-600/20 rounded-3xl mb-4">
                <span className="text-4xl">👋</span>
              </div>
              <h2 className="text-2xl font-semibold text-white mb-2">Welcome to ChatMonk!</h2>
              <p className="text-gray-400">Start a conversation or mention @monk for AI assistance</p>
            </div>
          )}

          {/* Messages */}
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`mb-6 ${msg.username === username ? 'flex justify-end' : 'flex justify-start'} ${
                msg.isNew ? 'animate-slide-in' : ''
              }`}
            >
              <div className={`max-w-[70%] ${msg.username === username ? 'order-2' : 'order-1'}`}>
                {/* Avatar and name */}
                <div className={`flex items-center space-x-2 mb-2 ${msg.username === username ? 'justify-end' : ''}`}>
                  {msg.username !== username && (
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                      msg.isAI 
                        ? 'bg-gradient-to-br from-purple-600 to-blue-600 text-white' 
                        : 'bg-gray-800 text-gray-300'
                    }`}>
                      {msg.isAI ? '🤖' : msg.username[0].toUpperCase()}
                    </div>
                  )}
                  <span className="text-xs text-gray-500">{msg.username}</span>
                  <span className="text-xs text-gray-600">{formatTime(msg.timestamp)}</span>
                </div>

                {/* Message bubble */}
                <div
                  className={`relative group ${
                    msg.isAI
                      ? 'bg-gradient-to-br from-purple-900/30 to-blue-900/30 border border-purple-700/50 text-white'
                      : msg.username === username
                      ? 'bg-gradient-to-br from-blue-600 to-blue-700 text-white shadow-lg shadow-blue-500/20'
                      : 'bg-gray-900 border border-gray-800 text-gray-100'
                  } rounded-2xl px-5 py-3 transition-all duration-300 hover:shadow-xl`}
                >
                  {msg.isAI ? (
                    <ReactMarkdown
                      className="prose prose-invert prose-sm max-w-none"
                      components={{
                        code({ node, inline, className, children, ...props }) {
                          return inline ? (
                            <code className="bg-black/50 px-2 py-1 rounded text-purple-300 text-sm" {...props}>
                              {children}
                            </code>
                          ) : (
                            <pre className="bg-black/50 border border-gray-800 p-4 rounded-xl overflow-x-auto my-3">
                              <code className="text-gray-300 text-sm" {...props}>
                                {children}
                              </code>
                            </pre>
                          );
                        },
                        p: ({ children }) => <p className="mb-3 last:mb-0">{children}</p>,
                        ul: ({ children }) => <ul className="list-disc list-inside mb-3 space-y-1">{children}</ul>,
                        ol: ({ children }) => <ol className="list-decimal list-inside mb-3 space-y-1">{children}</ol>,
                      }}
                    >
                      {msg.message}
                    </ReactMarkdown>
                  ) : (
                    <p className="break-words">{msg.message}</p>
                  )}
                </div>
              </div>
            </div>
          ))}
          
          {/* Typing indicator */}
          {isTyping && (
            <div className="mb-6 animate-fade-in">
              <div className="inline-flex items-center space-x-2 bg-gradient-to-br from-purple-900/30 to-blue-900/30 border border-purple-700/50 rounded-2xl px-5 py-3">
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                  <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                  <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                </div>
                <span className="text-sm text-gray-400">ChatMonk is thinking...</span>
              </div>
            </div>
          )}
          
          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Premium Input Area */}
      <div className="bg-black/50 backdrop-blur-xl border-t border-white/10">
        <form onSubmit={handleSendMessage} className="max-w-4xl mx-auto px-6 py-4">
          <div className="relative flex items-center space-x-3">
            {/* Emoji picker */}
            <div className="relative">
              <button
                type="button"
                onClick={() => setShowEmoji(!showEmoji)}
                className="p-3 rounded-xl bg-gray-900 hover:bg-gray-800 transition-colors text-gray-400 hover:text-gray-300"
              >
                😊
              </button>
              {showEmoji && (
                <div className="absolute bottom-full left-0 mb-2 bg-gray-900 border border-gray-800 rounded-xl p-2 flex space-x-1 animate-fade-in">
                  {emojis.map(emoji => (
                    <button
                      key={emoji}
                      type="button"
                      onClick={() => addEmoji(emoji)}
                      className="hover:bg-gray-800 p-2 rounded transition-colors"
                    >
                      {emoji}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Input field */}
            <input
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              placeholder="Type a message... (mention @monk for AI help)"
              className="flex-1 px-5 py-3 bg-gray-900 text-white rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all duration-300 placeholder-gray-500"
            />

            {/* Send button */}
            <button
              type="submit"
              disabled={!inputMessage.trim()}
              className={`p-3 rounded-xl transition-all duration-300 transform hover:scale-105 active:scale-95 ${
                inputMessage.trim()
                  ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-lg shadow-purple-500/25'
                  : 'bg-gray-900 text-gray-600 cursor-not-allowed'
              }`}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
              </svg>
            </button>
          </div>
          
          {/* Helper text */}
          <p className="text-xs text-gray-600 mt-2 text-center">
            Press Enter to send and Mention @monk for AI assistance
            **Enter you text and mention @monk before sending to get AI assistance**
          </p>
        </form>
      </div>
    </div>
  );
}

export default ChatRoom;