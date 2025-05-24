import React from 'react';
import { Link } from 'react-router-dom';
import Logo from '../ui/Logo';

const Footer: React.FC = () => {
  return (
    <footer className="bg-dark-900 border-t border-dark-800 py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-6 md:mb-0">
            <Logo size="sm" />
            <p className="mt-2 text-gray-500 text-sm">
              © {new Date().getFullYear()} AI: Illuminati. All rights reserved.
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 gap-x-12 gap-y-4">
            <Link to="/" className="text-gray-400 hover:text-primary-500 transition-colors">
              Home
            </Link>
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
            <Link to="#" className="text-gray-400 hover:text-primary-500 transition-colors">
              Contact Us
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;