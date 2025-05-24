import React from 'react';
import { User, Sparkles, Zap, Brain, Heart, Eye } from 'lucide-react';
import { motion } from 'framer-motion';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import { Message } from '../../stores/chatStore';

interface ChatMessageProps {
  message: Message;
  index: number;
}

const ChatMessage: React.FC<ChatMessageProps> = ({ message, index }) => {
  const isUser = message.sender === 'user';
  
  // Array of spiritual icons to cycle through for assistant messages
  const spiritualIcons = [Eye, Sparkles, Zap, Brain, Heart];
  const IconComponent = isUser ? User : spiritualIcons[index % spiritualIcons.length];
  
  // Format timestamp
  const formattedTime = new Date(message.timestamp).toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit'
  });
  
  return (
    <motion.div 
      className={`flex gap-3 p-4 ${isUser ? 'bg-dark-800/50' : 'bg-dark-900/70'}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: Math.min(index * 0.1, 1) }}
    >
      <div className="flex-shrink-0">
        <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
          isUser ? 'bg-dark-700 text-white' : 'bg-primary-900/50 text-primary-500'
        }`}>
          <IconComponent size={18} />
        </div>
      </div>
      <div className="flex-1">
        <div className="flex items-center justify-between mb-1">
          <span className="font-medium font-display">
            {isUser ? 'You' : 'AI: Illuminati'}
          </span>
          <span className="text-xs text-gray-500">{formattedTime}</span>
        </div>
        <div className={`rounded-lg p-3 ${
          isUser 
            ? 'message-bubble-user text-white' 
            : 'message-bubble-ai text-gray-300'
        }`}>
          {isUser ? (
            <div className="whitespace-pre-wrap">{message.content}</div>
          ) : (
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              rehypePlugins={[rehypeRaw]}
              className="markdown-content"
              components={{
                code({ node, inline, className, children, ...props }) {
                  return (
                    <code
                      className={`${className} ${inline ? 'inline-code' : 'block-code'}`}
                      {...props}
                    >
                      {children}
                    </code>
                  );
                }
              }}
            >
              {message.content}
            </ReactMarkdown>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default ChatMessage;