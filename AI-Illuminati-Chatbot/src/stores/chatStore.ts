import { create } from 'zustand';
import { generateResponse, GeminiError } from '../lib/gemini';
import { supabase } from '../lib/supabase';
import { useAuthStore } from './authStore';

export interface Message {
  id: string;
  content: string;
  sender: 'user' | 'ai';
  timestamp: number;
  chat_id?: string;
}

interface ChatState {
  messages: Message[];
  currentChatId: string | null;
  isLoading: boolean;
  error: string | null;
  sendMessage: (content: string) => Promise<void>;
  loadChatHistory: (chatId?: string) => Promise<void>;
  createNewChat: () => Promise<string>;
  clearChat: () => Promise<void>;
  clearError: () => void;
  setCurrentChatId: (chatId: string | null) => void;
  loadChats: () => Promise<Array<{
    id: string;
    title: string;
    lastMessage: string;
    timestamp: number;
  }>>;
}

export const useChatStore = create<ChatState>((set, get) => ({
  messages: [],
  currentChatId: null,
  isLoading: false,
  error: null,

  loadChats: async () => {
    const { user } = useAuthStore.getState();
    if (!user) return [];

    try {
      const { data, error } = await supabase
        .from('chat_history')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (error) throw error;

      // Group messages by chat_id and create chat summaries
      const chatMap = new Map();
      data.forEach(msg => {
        if (!chatMap.has(msg.chat_id)) {
          chatMap.set(msg.chat_id, {
            id: msg.chat_id,
            title: msg.content.slice(0, 50) + (msg.content.length > 50 ? '...' : ''),
            lastMessage: msg.content,
            timestamp: new Date(msg.created_at).getTime(),
          });
        }
      });

      return Array.from(chatMap.values());
    } catch (error) {
      console.error('Failed to load chats:', error);
      return [];
    }
  },

  loadChatHistory: async (chatId?: string) => {
    const { user } = useAuthStore.getState();
    if (!user) return;

    const targetChatId = chatId || get().currentChatId;
    if (!targetChatId) {
      set({ messages: [] });
      return;
    }

    try {
      const { data, error } = await supabase
        .from('chat_history')
        .select('*')
        .eq('user_id', user.id)
        .eq('chat_id', targetChatId)
        .order('created_at', { ascending: true });

      if (error) throw error;

      const messages: Message[] = data.map(msg => ({
        id: msg.id,
        content: msg.content,
        sender: msg.sender,
        timestamp: new Date(msg.created_at).getTime(),
        chat_id: msg.chat_id,
      }));

      set({ messages, currentChatId: targetChatId });
    } catch (error) {
      console.error('Failed to load chat history:', error);
      set({ error: 'Failed to load chat history' });
    }
  },

  createNewChat: async () => {
    const { user } = useAuthStore.getState();
    if (!user) throw new Error('User not authenticated');

    const chatId = crypto.randomUUID();
    set({ currentChatId: chatId, messages: [] });
    return chatId;
  },

  sendMessage: async (content: string) => {
    const { user } = useAuthStore.getState();
    if (!user) {
      set({ error: 'Please login to chat' });
      return;
    }

    if (!content.trim()) return;

    // Create a new chat if none exists
    let chatId = get().currentChatId;
    if (!chatId) {
      chatId = await get().createNewChat();
    }

    const userMessage: Message = {
      id: crypto.randomUUID(),
      content,
      sender: 'user',
      timestamp: Date.now(),
      chat_id: chatId,
    };

    set(state => ({
      messages: [...state.messages, userMessage],
      isLoading: true,
      error: null,
    }));

    try {
      // Save user message to database
      const { error: insertError } = await supabase
        .from('chat_history')
        .insert([{
          id: userMessage.id,
          user_id: user.id,
          chat_id: chatId,
          content: userMessage.content,
          sender: userMessage.sender,
        }]);

      if (insertError) throw insertError;

      // Generate AI response
      const aiResponse = await generateResponse(content);

      const aiMessage: Message = {
        id: crypto.randomUUID(),
        content: aiResponse,
        sender: 'ai',
        timestamp: Date.now(),
        chat_id: chatId,
      };

      // Save AI response to database
      const { error: aiInsertError } = await supabase
        .from('chat_history')
        .insert([{
          id: aiMessage.id,
          user_id: user.id,
          chat_id: chatId,
          content: aiMessage.content,
          sender: aiMessage.sender,
        }]);

      if (aiInsertError) throw aiInsertError;

      set(state => ({
        messages: [...state.messages, aiMessage],
        isLoading: false,
      }));
    } catch (error) {
      const errorMessage = error instanceof GeminiError 
        ? error.message 
        : 'Failed to get response';
        
      set(state => ({
        error: errorMessage,
        isLoading: false,
      }));
    }
  },

  clearChat: async () => {
    const { user } = useAuthStore.getState();
    const { currentChatId } = get();
    if (!user || !currentChatId) return;

    try {
      const { error } = await supabase
        .from('chat_history')
        .delete()
        .eq('user_id', user.id)
        .eq('chat_id', currentChatId);

      if (error) throw error;

      set({ messages: [], currentChatId: null });
    } catch (error) {
      console.error('Failed to clear chat history:', error);
      set({ error: 'Failed to clear chat history' });
    }
  },

  setCurrentChatId: (chatId: string | null) => {
    set({ currentChatId: chatId });
  },

  clearError: () => {
    set({ error: null });
  },
}));