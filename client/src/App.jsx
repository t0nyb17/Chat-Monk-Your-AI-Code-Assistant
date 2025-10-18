import { useState, useEffect } from 'react';
import ChatRoom from './components/ChatRoom';
import { socket } from './socket';

function App() {
  const [username, setUsername] = useState('');
  const [isConnected, setIsConnected] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    socket.on('connect', () => {
      console.log('Connected to server');
    });

    socket.on('disconnect', () => {
      console.log('Disconnected from server');
    });

    return () => {
      socket.off('connect');
      socket.off('disconnect');
    };
  }, []);

  const handleJoin = (e) => {
    e.preventDefault();
    if (username.trim()) {
      setIsLoading(true);
      setTimeout(() => {
        setIsConnected(true);
      }, 800);
    }
  };

  if (!isConnected) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center overflow-hidden relative">
        {/* Animated gradient background */}
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-black to-blue-900/20">
          {/* Grid pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="h-full w-full bg-grid-pattern"></div>
          </div>
        </div>

        {/* Floating orbs */}
        <div className="absolute top-20 left-20 w-72 h-72 bg-purple-600/30 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-blue-600/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '4s' }}></div>
        
        <div className="relative z-10">
          {/* Logo and title with animation */}
          <div className="text-center mb-12 animate-fade-in-down">
            <div className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-br from-purple-600 to-blue-600 rounded-3xl mb-6 shadow-2xl shadow-purple-500/25 animate-float">
              <span className="text-4xl">🤖</span>
            </div>
            <h1 className="text-6xl font-bold text-white mb-4 tracking-tight">
              Chat<span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400">Monk</span>
            </h1>
            <p className="text-gray-400 text-lg">
              Your AI-powered coding companion made by t0ny
            </p>
          </div>

          {/* Login form */}
          <form onSubmit={handleJoin} className="animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
            <div className="bg-white/5 backdrop-blur-xl p-8 rounded-3xl shadow-2xl border border-white/10 w-96 transform transition-all duration-300 hover:bg-white/[0.07]">
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Choose your username
                  </label>
                  <input
                    type="text"
                    placeholder="Enter username..."
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="w-full px-5 py-4 bg-white/5 backdrop-blur border border-white/10 text-white rounded-2xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 placeholder-gray-500"
                    required
                    autoFocus
                  />
                </div>
                
                <button
                  type="submit"
                  disabled={isLoading}
                  className={`w-full py-4 rounded-2xl font-medium transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] ${
                    isLoading 
                      ? 'bg-gradient-to-r from-purple-600/50 to-blue-600/50 cursor-wait' 
                      : 'bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 shadow-lg shadow-purple-500/25'
                  } text-white`}
                >
                  {isLoading ? (
                    <span className="flex items-center justify-center">
                      <svg className="animate-spin h-5 w-5 mr-3" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                      </svg>
                      Joining...
                    </span>
                  ) : (
                    'Join Chat'
                  )}
                </button>
              </div>

              <div className="mt-6 text-center">
                <p className="text-gray-500 text-sm">
                  Mention <code className="bg-white/10 px-2 py-1 rounded text-purple-400">@monk</code> to get AI assistance
                </p>
              </div>
            </div>
          </form>

          {/* Features showcase */}
          <div className="mt-12 grid grid-cols-3 gap-4 max-w-md mx-auto animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
            <div className="text-center">
              <div className="text-2xl mb-2">💬</div>
              <p className="text-xs text-gray-500">Real-time Chat</p>
            </div>
            <div className="text-center">
              <div className="text-2xl mb-2">🤖</div>
              <p className="text-xs text-gray-500">AI Assistant</p>
            </div>
            <div className="text-center">
              <div className="text-2xl mb-2">💡</div>
              <p className="text-xs text-gray-500">Code Help</p>
            </div>
          </div>
        </div>

        {/* Bottom decoration */}
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-purple-500 to-transparent"></div>
      </div>
    );
  }

  return <ChatRoom username={username} />;
}

export default App;