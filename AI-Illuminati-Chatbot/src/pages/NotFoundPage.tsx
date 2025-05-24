import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Search, ArrowLeft, Eye } from 'lucide-react';
import Button from '../components/ui/Button';

const NotFoundPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-dark-900 flex flex-col">
      <main className="flex-1 flex items-center justify-center p-4 illuminati-pattern">
        <motion.div 
          className="max-w-lg w-full glass-effect p-12 rounded-xl text-center"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4 }}
        >
          <div className="relative w-24 h-24 mx-auto mb-6">
            <div className="absolute inset-0 bg-primary-500/30 rounded-full blur-xl"></div>
            <div className="relative w-full h-full rounded-full flex items-center justify-center">
              <Eye className="w-12 h-12 text-primary-500" />
              <Search className="absolute w-8 h-8 text-error right-0 bottom-0" />
            </div>
          </div>
          
          <h1 className="text-6xl font-bold mb-4">404</h1>
          <h2 className="text-2xl font-bold mb-3">Page Not Found</h2>
          <p className="text-gray-400 mb-8">
            The wisdom you seek is hidden elsewhere. This path leads to nothing.
          </p>
          
          <Button
            onClick={() => navigate('/')}
            icon={<ArrowLeft size={16} />}
            fullWidth
          >
            Return to Enlightenment
          </Button>
        </motion.div>
      </main>
    </div>
  );
};

export default NotFoundPage;