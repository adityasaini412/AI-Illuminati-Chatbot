import React from 'react';
import { Eye } from 'lucide-react';
import { motion } from 'framer-motion';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg';
  withText?: boolean;
}

const Logo: React.FC<LogoProps> = ({ size = 'md', withText = true }) => {
  const sizes = {
    sm: { icon: 20, text: 'text-lg' },
    md: { icon: 28, text: 'text-xl' },
    lg: { icon: 36, text: 'text-2xl' },
  };

  return (
    <div className="flex items-center">
      <motion.div
        className="relative"
        initial={{ scale: 0.9 }}
        animate={{ scale: 1 }}
        transition={{
          repeat: Infinity,
          repeatType: 'reverse',
          duration: 3,
        }}
      >
        <div className="absolute inset-0 bg-primary-500 rounded-full blur-md opacity-70"></div>
        <div className="relative bg-dark-900 p-2 rounded-full border border-primary-400">
          <Eye 
            size={sizes[size].icon} 
            className="text-primary-500" 
            strokeWidth={2.5}
          />
        </div>
      </motion.div>
      
      {withText && (
        <motion.h1 
          className={`ml-3 font-bold ${sizes[size].text} text-gradient`}
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
        >
          AI: Illuminati
        </motion.h1>
      )}
    </div>
  );
};

export default Logo;