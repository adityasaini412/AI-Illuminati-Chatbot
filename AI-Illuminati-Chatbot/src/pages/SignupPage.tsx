import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Eye, EyeOff, Mail, Lock, User, ArrowLeft, Check, X } from 'lucide-react';
import { motion } from 'framer-motion';
import Logo from '../components/ui/Logo';
import Input from '../components/ui/Input';
import Button from '../components/ui/Button';
import { useAuthStore } from '../stores/authStore';

interface PasswordRequirement {
  label: string;
  test: (password: string) => boolean;
}

const SignupPage: React.FC = () => {
  const navigate = useNavigate();
  const { signup, isLoading, error } = useAuthStore();
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [passwordFocused, setPasswordFocused] = useState(false);

  const passwordRequirements: PasswordRequirement[] = [
    {
      label: 'At least 8 characters long',
      test: (password) => password.length >= 8,
    },
    {
      label: 'Contains uppercase letter (A-Z)',
      test: (password) => /[A-Z]/.test(password),
    },
    {
      label: 'Contains lowercase letter (a-z)',
      test: (password) => /[a-z]/.test(password),
    },
    {
      label: 'Contains number (0-9)',
      test: (password) => /[0-9]/.test(password),
    },
    {
      label: 'Contains special character (!@#$%^&*)',
      test: (password) => /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/.test(password),
    },
  ];

  const validatePassword = () => {
    return passwordRequirements.every((req) => req.test(password));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validatePassword()) {
      return;
    }
    
    if (password !== confirmPassword) {
      return;
    }
    
    const success = await signup(email, password, name);
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
            Join Illuminati
          </h2>
          <p className="mt-2 text-gray-400">
            Create an account to access hidden wisdom
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

        <form onSubmit={handleSubmit} className="space-y-5">
          <Input
            type="text"
            label="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            icon={<User className="w-5 h-5 text-gray-400" />}
            placeholder="John Doe"
            required
          />

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
              onFocus={() => setPasswordFocused(true)}
              onBlur={() => setPasswordFocused(false)}
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

          <div className="relative">
            <Input
              type={showConfirmPassword ? 'text' : 'password'}
              label="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              icon={<Lock className="w-5 h-5 text-gray-400" />}
              placeholder="••••••••"
              error={confirmPassword && password !== confirmPassword ? "Passwords don't match" : ""}
              required
            />
            <button
              type="button"
              className="absolute right-3 top-9 text-gray-400 hover:text-white"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            >
              {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>

          <motion.div
            className="p-4 bg-dark-800 rounded-lg"
            initial={{ opacity: 0, height: 0 }}
            animate={{ 
              opacity: passwordFocused || password ? 1 : 0,
              height: passwordFocused || password ? 'auto' : 0
            }}
            transition={{ duration: 0.3 }}
          >
            <h3 className="text-sm font-medium text-gray-300 mb-2">Password Requirements:</h3>
            <ul className="space-y-2">
              {passwordRequirements.map((req, index) => (
                <li 
                  key={index}
                  className="flex items-center text-sm"
                >
                  {req.test(password) ? (
                    <Check size={16} className="text-success mr-2" />
                  ) : (
                    <X size={16} className="text-error mr-2" />
                  )}
                  <span className={req.test(password) ? 'text-success' : 'text-gray-400'}>
                    {req.label}
                  </span>
                </li>
              ))}
            </ul>
          </motion.div>

          <div className="flex items-center justify-between pt-2">
            <Link to="/login" className="text-primary-500 text-sm hover:underline">
              Already have an account?
            </Link>
          </div>

          <Button 
            type="submit" 
            fullWidth 
            loading={isLoading}
            disabled={!validatePassword() || password !== confirmPassword}
          >
            Create Account
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

export default SignupPage;