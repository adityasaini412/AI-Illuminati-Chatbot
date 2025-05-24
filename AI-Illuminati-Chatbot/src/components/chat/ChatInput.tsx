import React, { useState, useRef, useEffect } from 'react';
import { Send, AlertCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import Button from '../ui/Button';

interface ChatInputProps {
  onSendMessage: (content: string) => void;
  isLoading: boolean;
  disabled?: boolean;
}

const ChatInput: React.FC<ChatInputProps> = ({ 
  onSendMessage, 
  isLoading, 
  disabled = false 
}) => {
  const [input, setInput] = useState('');
  const inputRef = useRef<HTMLTextAreaElement>(null);

  // Auto-resize textarea
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.style.height = 'auto';
      inputRef.current.style.height = `${inputRef.current.scrollHeight}px`;
    }
  }, [input]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim() && !isLoading && !disabled) {
      onSendMessage(input);
      setInput('');
      // Reset textarea height
      if (inputRef.current) {
        inputRef.current.style.height = 'auto';
      }
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  return (
    <motion.form 
      onSubmit={handleSubmit} 
      className="border-t border-dark-800 p-4 glass-effect"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      {disabled && (
        <div className="mb-3 p-2 bg-error/20 border border-error/40 rounded-md flex items-center gap-2 text-error text-sm">
          <AlertCircle size={16} />
          <span>API connection error. Chat functionality is disabled.</span>
        </div>
      )}

      <div className="flex items-end gap-2">
        <div className="flex-1 relative">
          <textarea
            ref={inputRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={disabled ? "API connection error" : "Ask the Illuminati anything..."}
            className={`w-full p-3 pr-12 min-h-[44px] max-h-[200px] rounded-lg resize-none ${
              disabled 
                ? "border-error/40 bg-error/10 text-error placeholder-error/70" 
                : "bg-dark-800 border border-dark-700 text-white focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            }`}
            disabled={isLoading || disabled}
            rows={1}
          />
          <div className="absolute right-2 bottom-2 text-xs text-gray-500">
            {input.length > 0 && `${input.length} chars`}
          </div>
        </div>

        <Button
          type="submit"
          variant={(!input.trim() || isLoading || disabled) ? "ghost" : "primary"}
          disabled={!input.trim() || isLoading || disabled}
          size="sm"
          icon={<Send size={18} />}
        >
          Send
        </Button>
      </div>
    </motion.form>
  );
};

export default ChatInput;