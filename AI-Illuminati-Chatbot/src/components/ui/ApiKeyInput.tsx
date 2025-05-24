import React, { useState } from 'react';
import { Eye, EyeOff, Key } from 'lucide-react';
import { motion } from 'framer-motion';
import Button from './Button';
import Input from './Input';
import { supabase } from '../../lib/supabase';

interface ApiKeyInputProps {
  onKeyUpdated: () => void;
}

const ApiKeyInput: React.FC<ApiKeyInputProps> = ({ onKeyUpdated }) => {
  const [apiKey, setApiKey] = useState('');
  const [description, setDescription] = useState('');
  const [showKey, setShowKey] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    setSuccess(null);

    try {
      // Deactivate current active key
      await supabase
        .from('api_keys')
        .update({ is_active: false })
        .eq('is_active', true);

      // Insert new key
      const { error } = await supabase
        .from('api_keys')
        .insert([
          {
            key: apiKey,
            description,
            is_active: true
          }
        ]);

      if (error) throw error;

      setSuccess('API key updated successfully');
      setApiKey('');
      setDescription('');
      onKeyUpdated();
    } catch (err) {
      console.error('Error updating API key:', err);
      setError('Failed to update API key');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          className="p-3 bg-error/20 border border-error/40 rounded-lg text-error text-sm"
        >
          {error}
        </motion.div>
      )}

      {success && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          className="p-3 bg-success/20 border border-success/40 rounded-lg text-success text-sm"
        >
          {success}
        </motion.div>
      )}

      <div className="relative">
        <Input
          type={showKey ? 'text' : 'password'}
          value={apiKey}
          onChange={(e) => setApiKey(e.target.value)}
          label="Gemini API Key"
          placeholder="Enter your API key"
          icon={<Key className="w-5 h-5 text-gray-400" />}
          required
        />
        <button
          type="button"
          className="absolute right-3 top-9 text-gray-400 hover:text-white"
          onClick={() => setShowKey(!showKey)}
        >
          {showKey ? <EyeOff size={20} /> : <Eye size={20} />}
        </button>
      </div>

      <Input
        type="text"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        label="Description"
        placeholder="Enter a description for this API key"
      />

      <Button
        type="submit"
        loading={isLoading}
        fullWidth
      >
        Update API Key
      </Button>
    </form>
  );
};

export default ApiKeyInput;