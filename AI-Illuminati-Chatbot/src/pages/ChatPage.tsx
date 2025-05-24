import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Eye, Trash2, Menu } from 'lucide-react';
import Header from '../components/layout/Header';
import ChatMessage from '../components/chat/ChatMessage';
import ChatInput from '../components/chat/ChatInput';
import ChatHistorySidebar from '../components/chat/ChatHistorySidebar';
import Button from '../components/ui/Button';
import { useChatStore } from '../stores/chatStore';
import { useAuthStore } from '../stores/authStore';

const ChatPage: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAuthStore();
  const { 
    messages, 
    isLoading, 
    error, 
    currentChatId,
    sendMessage, 
    loadChatHistory,
    createNewChat,
    clearChat,
    loadChats,
  } = useChatStore();

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [chats, setChats] = useState<Array<{
    id: string;
    title: string;
    lastMessage: string;
    timestamp: number;
  }>>([]);
  const [isLoadingChats, setIsLoadingChats] = useState(false);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }
    loadChatHistory();
    refreshChats();
  }, [user, navigate]);

  useEffect(() => {
    // Scroll to bottom when messages change
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const refreshChats = async () => {
    setIsLoadingChats(true);
    const chatList = await loadChats();
    setChats(chatList);
    setIsLoadingChats(false);
  };

  const handleNewChat = async () => {
    await createNewChat();
    setIsSidebarOpen(false);
    refreshChats();
  };

  const handleSelectChat = async (chatId: string) => {
    await loadChatHistory(chatId);
    setIsSidebarOpen(false);
  };

  const handleClearChat = async () => {
    if (window.confirm('Are you sure you want to clear this chat? This cannot be undone.')) {
      await clearChat();
      refreshChats();
    }
  };

  const handleSendMessage = async (content: string) => {
    await sendMessage(content);
    refreshChats();
  };

  return (
    <div className="flex flex-col h-screen bg-dark-900">
      <Header />
      
      <main className="flex-1 flex flex-col mt-16 overflow-hidden">
        <div className="flex-1 overflow-y-auto illuminati-pattern p-4 space-y-4">
          <div className="flex justify-between items-center mb-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsSidebarOpen(true)}
              icon={<Menu size={16} />}
            >
              Chat History
            </Button>
            {messages.length > 0 && (
              <Button
                variant="ghost"
                size="sm"
                onClick={handleClearChat}
                icon={<Trash2 size={16} />}
              >
                Clear Chat
              </Button>
            )}
          </div>

          {error && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-4 bg-error/20 border border-error/40 rounded-lg text-error"
            >
              {error}
            </motion.div>
          )}

          {messages.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center p-8">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="w-24 h-24 rounded-full bg-primary-900/30 flex items-center justify-center mb-6"
              >
                <Eye className="w-12 h-12 text-primary-500" />
              </motion.div>
              <h2 className="text-2xl font-bold text-white mb-3">Welcome to AI: Illuminati</h2>
              <p className="text-gray-400 max-w-md mb-8">
                Ask any question to tap into the hidden knowledge and wisdom
              </p>
            </div>
          ) : (
            messages.map((message, index) => (
              <ChatMessage key={message.id} message={message} index={index} />
            ))
          )}
          
          {isLoading && (
            <motion.div 
              className="flex gap-3 p-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <div className="flex-shrink-0">
                <div className="w-8 h-8 rounded-full bg-primary-900/50 flex items-center justify-center">
                  <Eye size={18} className="text-primary-500" />
                </div>
              </div>
              <div className="flex-1">
                <div className="font-medium mb-1 font-display">AI: Illuminati</div>
                <div className="text-gray-400">
                  <div className="flex space-x-2">
                    <div className="h-2 w-2 rounded-full bg-primary-500 animate-pulse"></div>
                    <div className="h-2 w-2 rounded-full bg-primary-500 animate-pulse delay-150"></div>
                    <div className="h-2 w-2 rounded-full bg-primary-500 animate-pulse delay-300"></div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
          <div ref={messagesEndRef} />
        </div>
        
        <ChatInput 
          onSendMessage={handleSendMessage}
          isLoading={isLoading}
        />
      </main>

      <ChatHistorySidebar
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
        onNewChat={handleNewChat}
        onSelectChat={handleSelectChat}
        currentChatId={currentChatId}
        chats={chats}
        isLoading={isLoadingChats}
      />
    </div>
  );
};

export default ChatPage;