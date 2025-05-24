import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Eye, EyeOff, Mail, Lock, ArrowLeft } from 'lucide-react';
import { motion } from 'framer-motion';
import Logo from '../components/ui/Logo';
import Input from '../components/ui/Input';
import Button from '../components/ui/Button';
import { useAuthStore } from '../stores/authStore';

const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const { login, isLoading, error } = useAuthStore();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const success = await login(email, password);
    if (success) {
      navigate('/chat');
    }
  };

  return (
    <div className="min-h-screen bg-dark-900 illuminati-pattern flex items-center justify-center p-4">
      <motion.div
        className="w-full max-w-md glass-effect p-8 rounded-xl shadow-xl"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex flex-col items-center mb-8">
          <Logo size="lg" />
          <h2 className="mt-6 text-3xl font-bold text-white">
            Welcome Back
          </h2>
          <p className="mt-2 text-gray-400">
            Access the hidden knowledge and wisdom
          </p>
        </div>

        {error && (
          <motion.div 
            className="mb-6 p-3 bg-error/20 border border-error/40 rounded-lg flex items-center gap-2 text-white"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
          >
            {error}
          </motion.div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <Input
            type="email"
            label="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            icon={<Mail className="w-5 h-5 text-gray-400" />}
            placeholder="your@email.com"
            required
          />

          <div className="relative">
            <Input
              type={showPassword ? 'text' : 'password'}
              label="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              icon={<Lock className="w-5 h-5 text-gray-400" />}
              placeholder="••••••••"
              required
            />
            <button
              type="button"
              className="absolute right-3 top-9 text-gray-400 hover:text-white"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>

          <div className="flex items-center justify-between">
            <Link to="/signup" className="text-primary-500 text-sm hover:underline">
              Don't have an account?
            </Link>
            <Link to="#" className="text-primary-500 text-sm hover:underline">
              Forgot password?
            </Link>
          </div>

          <Button type="submit" fullWidth loading={isLoading}>
            Sign In
          </Button>

          <div className="text-center mt-6">
            <Link to="/" className="inline-flex items-center text-gray-400 hover:text-white text-sm">
              <ArrowLeft size={16} className="mr-1" />
              Back to Home
            </Link>
          </div>
        </form>
      </motion.div>
    </div>
  );
};

export default LoginPage;