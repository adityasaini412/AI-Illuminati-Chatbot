import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Menu, Settings, LogOut, MessageSquare } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Logo from '../ui/Logo';
import Button from '../ui/Button';
import { useAuthStore } from '../../stores/authStore';
import { useChatStore } from '../../stores/chatStore';

const Header: React.FC = () => {
  const { isAuthenticated, logout } = useAuthStore();
  const { createNewChat } = useChatStore();
  const navigate = useNavigate();
  const location = useLocation();
  const [menuOpen, setMenuOpen] = React.useState(false);

  const handleLogout = () => {
    logout();
    navigate('/');
    setMenuOpen(false);
  };

  const handleNewChat = async () => {
    if (location.pathname !== '/chat') {
      navigate('/chat');
    }
    await createNewChat();
    setMenuOpen(false);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-dark-900/80 backdrop-blur-md border-b border-dark-800">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link to="/" className="focus:outline-none">
          <Logo size="md" />
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-6">
          {isAuthenticated ? (
            <>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleNewChat}
                icon={<MessageSquare size={18} />}
              >
                New Chat
              </Button>
              <Link 
                to="/settings"
                className="text-white/80 hover:text-white transition-colors"
              >
                <Settings size={20} />
              </Link>
              <Button
                variant="outline"
                size="sm"
                onClick={handleLogout}
                icon={<LogOut size={16} />}
              >
                Logout
              </Button>
            </>
          ) : (
            <>
              <Link 
                to="/login" 
                className="text-white/80 hover:text-white transition-colors"
              >
                Login
              </Link>
              <Button
                variant="primary"
                size="sm"
                onClick={() => navigate('/signup')}
              >
                Sign Up
              </Button>
            </>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button 
          className="md:hidden text-white/80 hover:text-white p-2"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Menu"
        >
          <Menu size={24} />
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-dark-800 border-b border-dark-700 overflow-hidden"
          >
            <div className="container mx-auto px-4 py-3 flex flex-col space-y-4">
              {isAuthenticated ? (
                <>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleNewChat}
                    icon={<MessageSquare size={18} />}
                    className="justify-start"
                  >
                    New Chat
                  </Button>
                  <Link 
                    to="/settings"
                    className="text-white/80 hover:text-white transition-colors py-2 flex items-center gap-2"
                    onClick={() => setMenuOpen(false)}
                  >
                    <Settings size={18} />
                    Settings
                  </Link>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleLogout}
                    icon={<LogOut size={16} />}
                    className="mt-2"
                  >
                    Logout
                  </Button>
                </>
              ) : (
                <>
                  <Link 
                    to="/login" 
                    className="text-white/80 hover:text-white transition-colors py-2"
                    onClick={() => setMenuOpen(false)}
                  >
                    Login
                  </Link>
                  <Button
                    variant="primary"
                    size="sm"
                    onClick={() => {
                      navigate('/signup');
                      setMenuOpen(false);
                    }}
                    className="mt-2"
                  >
                    Sign Up
                  </Button>
                </>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;