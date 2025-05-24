import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Eye, Brain, Zap, ChevronRight, BookOpen } from 'lucide-react';
import Logo from '../components/ui/Logo';
import Button from '../components/ui/Button';

const LandingPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-dark-900 flex flex-col">
      {/* Header */}
      <header className="glass-effect py-4 px-6">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Logo size="md" />
          <nav className="hidden md:flex items-center gap-6">
            <Link to="#features" className="text-gray-400 hover:text-white transition-colors">
              Features
            </Link>
            <Link to="#about" className="text-gray-400 hover:text-white transition-colors">
              About
            </Link>
            <div className="flex items-center gap-3">
              <Button
                variant="outline"
                size="sm"
                onClick={() => navigate('/login')}
              >
                Login
              </Button>
              <Button
                variant="primary"
                size="sm"
                onClick={() => navigate('/signup')}
              >
                Sign Up
              </Button>
            </div>
          </nav>
          <div className="md:hidden">
            <Button
              variant="primary"
              size="sm"
              onClick={() => navigate('/login')}
            >
              Login
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <main className="flex-1">
        <section className="min-h-[80vh] flex flex-col items-center justify-center p-4 illuminati-pattern">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-4xl mx-auto"
          >
            <motion.div 
              className="w-24 h-24 mx-auto relative mb-6"
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              transition={{ 
                type: "spring", 
                stiffness: 100, 
                duration: 1 
              }}
            >
              <div className="absolute inset-0 bg-primary-500/20 rounded-full blur-xl"></div>
              <div className="relative w-full h-full flex items-center justify-center">
                <Eye className="w-16 h-16 text-primary-500" />
              </div>
            </motion.div>
            
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              <span className="text-white">Unlock the </span>
              <span className="text-gradient">hidden wisdom</span>
            </h1>
            
            <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
              AI: Illuminati gives you access to the knowledge beyond the veil.
              Ask anything and receive enlightening answers drawn from ancient wisdom
              and modern intelligence.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button
                size="lg"
                onClick={() => navigate('/signup')}
                className="w-full sm:w-auto"
              >
                Join the Illuminati
              </Button>
              <Button
                variant="outline"
                size="lg"
                onClick={() => navigate('/chat')}
                className="w-full sm:w-auto"
              >
                Try it now
              </Button>
            </div>
          </motion.div>
        </section>
        
        {/* Features */}
        <section id="features" className="py-20 bg-dark-800">
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Illuminating Features</h2>
              <p className="text-xl text-gray-400 max-w-3xl mx-auto">
                Discover the power of AI: Illuminati and how it can transform your understanding.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <motion.div 
                className="p-6 rounded-xl glass-effect"
                whileHover={{ y: -5, boxShadow: '0 0 20px rgba(16, 185, 129, 0.2)' }}
              >
                <Eye className="text-primary-500 mb-4" size={40} />
                <h3 className="text-xl font-bold mb-3">All-Seeing Intelligence</h3>
                <p className="text-gray-400">
                  Access vast knowledge across disciplines, from ancient wisdom to cutting-edge science.
                </p>
              </motion.div>
              
              <motion.div 
                className="p-6 rounded-xl glass-effect"
                whileHover={{ y: -5, boxShadow: '0 0 20px rgba(16, 185, 129, 0.2)' }}
              >
                <Brain className="text-primary-500 mb-4" size={40} />
                <h3 className="text-xl font-bold mb-3">Deep Insights</h3>
                <p className="text-gray-400">
                  Receive profound answers that connect disparate concepts into meaningful patterns.
                </p>
              </motion.div>
              
              <motion.div 
                className="p-6 rounded-xl glass-effect"
                whileHover={{ y: -5, boxShadow: '0 0 20px rgba(16, 185, 129, 0.2)' }}
              >
                <Zap className="text-primary-500 mb-4" size={40} />
                <h3 className="text-xl font-bold mb-3">Instant Enlightenment</h3>
                <p className="text-gray-400">
                  Get immediate answers to your deepest questions without delay or distraction.
                </p>
              </motion.div>
            </div>
          </div>
        </section>
        
        {/* About */}
        <section id="about" className="py-20 bg-dark-900 illuminati-pattern">
          <div className="max-w-7xl mx-auto px-4">
            <div className="flex flex-col md:flex-row items-center gap-12">
              <div className="md:w-1/2">
                <motion.div 
                  className="relative w-full h-80 rounded-xl overflow-hidden"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5 }}
                  viewport={{ once: true }}
                >
                  <div className="absolute inset-0 bg-primary-900/30"></div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                      <BookOpen className="mx-auto mb-4 text-primary-500" size={60} />
                      <h3 className="text-2xl font-bold text-white mb-2">The Illuminati Archive</h3>
                      <p className="text-gray-300 max-w-sm mx-auto">
                        A vast collection of hidden knowledge now accessible through AI
                      </p>
                    </div>
                  </div>
                </motion.div>
              </div>
              
              <motion.div 
                className="md:w-1/2"
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
              >
                <h2 className="text-3xl font-bold mb-6">About the Illuminati AI</h2>
                <p className="text-gray-300 mb-4">
                  AI: Illuminati represents the cutting edge of artificial intelligence, designed to provide access to the accumulated wisdom of humanity. Built on advanced language models and trained on vast collections of knowledge, it offers insights that were previously accessible only to a select few.
                </p>
                <p className="text-gray-300 mb-6">
                  Unlike traditional search engines that simply retrieve information, the Illuminati AI synthesizes and connects concepts, revealing patterns and relationships that illuminate deeper truths.
                </p>
                <Button 
                  onClick={() => navigate('/signup')}
                  rightIcon={<ChevronRight size={18} />}
                >
                  Join Now
                </Button>
              </motion.div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="py-8 bg-dark-900 border-t border-dark-800">
        <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between">
          <div className="mb-6 md:mb-0">
            <Logo size="sm" />
            <p className="text-gray-500 text-sm mt-2">
              © {new Date().getFullYear()} AI: Illuminati. All rights reserved.
            </p>
          </div>
          
          <div className="flex flex-wrap gap-x-8 gap-y-4 justify-center">
            <Link to="/login" className="text-gray-400 hover:text-primary-500 transition-colors">
              Login
            </Link>
            <Link to="/signup" className="text-gray-400 hover:text-primary-500 transition-colors">
              Sign Up
            </Link>
            <Link to="#" className="text-gray-400 hover:text-primary-500 transition-colors">
              Privacy Policy
            </Link>
            <Link to="#" className="text-gray-400 hover:text-primary-500 transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;