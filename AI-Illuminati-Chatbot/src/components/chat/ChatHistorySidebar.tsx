import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, X, MessageSquare, Loader } from 'lucide-react';
import Button from '../ui/Button';

interface ChatHistorySidebarProps {
  isOpen: boolean;
  onClose: () => void;
  onNewChat: () => void;
  onSelectChat: (chatId: string) => void;
  currentChatId: string | null;
  chats: Array<{
    id: string;
    title: string;
    lastMessage: string;
    timestamp: number;
  }>;
  isLoading: boolean;
}

const ChatHistorySidebar: React.FC<ChatHistorySidebarProps> = ({
  isOpen,
  onClose,
  onNewChat,
  onSelectChat,
  currentChatId,
  chats,
  isLoading,
}) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-40 lg:hidden"
            onClick={onClose}
          />

          {/* Sidebar */}
          <motion.aside
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'tween', duration: 0.3 }}
            className="fixed right-0 top-0 bottom-0 w-80 bg-dark-800 border-l border-dark-700 z-50 flex flex-col"
          >
            <div className="flex items-center justify-between p-4 border-b border-dark-700">
              <h2 className="text-lg font-semibold">Chat History</h2>
              <button
                onClick={onClose}
                className="p-1 hover:bg-dark-700 rounded-lg transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            <div className="p-4">
              <Button
                onClick={onNewChat}
                fullWidth
                icon={<Plus size={18} />}
              >
                New Chat
              </Button>
            </div>

            <div className="flex-1 overflow-y-auto">
              {isLoading ? (
                <div className="flex items-center justify-center h-32">
                  <Loader size={24} className="animate-spin text-primary-500" />
                </div>
              ) : chats.length === 0 ? (
                <div className="text-center p-4 text-gray-400">
                  No chat history yet
                </div>
              ) : (
                <div className="space-y-2 p-4">
                  {chats.map((chat) => (
                    <button
                      key={chat.id}
                      onClick={() => onSelectChat(chat.id)}
                      className={`w-full text-left p-3 rounded-lg transition-colors ${
                        currentChatId === chat.id
                          ? 'bg-primary-500/20 border border-primary-500/30'
                          : 'hover:bg-dark-700'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <MessageSquare size={18} className="text-primary-500" />
                        <div className="flex-1 min-w-0">
                          <h3 className="font-medium truncate">{chat.title}</h3>
                          <p className="text-sm text-gray-400 truncate">
                            {chat.lastMessage}
                          </p>
                        </div>
                      </div>
                      <div className="text-xs text-gray-500 mt-1">
                        {new Date(chat.timestamp).toLocaleDateString()}
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
};

export default ChatHistorySidebar;