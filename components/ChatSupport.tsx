import React, { useState, useRef, useEffect } from 'react';
import { Send, X, MessageSquare, ChevronDown, ChevronUp, Clock } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { useAuth } from '../context/AuthContext';
import { usePathname } from 'next/navigation';

interface Message {
  id: string;
  content: string;
  sender_type: 'user' | 'admin' | 'system';
  created_at: string;
  admin_name?: string;
  user?: {
    name: string;
  };
}

// Support team members
const SUPPORT_TEAM = [
  { id: 1, name: 'Sarah Johnson', role: 'Customer Support Lead' },
  { id: 2, name: 'Michael Chen', role: 'Flight Specialist' },
  { id: 3, name: 'Emma Rodriguez', role: 'VIP Concierge' },
  { id: 4, name: 'David Kim', role: 'Technical Support' },
  { id: 5, name: 'Lisa Thompson', role: 'Booking Specialist' }
];

export default function ChatSupport() {
  const { user } = useAuth();
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentAgent, setCurrentAgent] = useState<typeof SUPPORT_TEAM[0] | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);

  // Only show chat widget on support page
  if (pathname !== '/contact') {
    return null;
  }

  useEffect(() => {
    if (isOpen) {
      fetchMessages();
      subscribeToMessages();
      // Assign a random support agent when chat opens
      setCurrentAgent(SUPPORT_TEAM[Math.floor(Math.random() * SUPPORT_TEAM.length)]);
    }
  }, [isOpen]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const fetchMessages = async () => {
    try {
      setIsLoading(true);
      const { data, error } = await supabase
        .from('chat_messages')
        .select(`
          *,
          user:user_id (
            name
          )
        `)
        .eq('user_id', user?.id)
        .order('created_at', { ascending: true });

      if (error) throw error;

      setMessages(data || []);

      // If no messages exist, send welcome message
      if (!data?.length) {
        const welcomeMessage = {
          user_id: user?.id,
          content: `Hi ${user?.name || 'there'}! 👋 I'm ${currentAgent?.name}, your dedicated support specialist. How can I assist you today?`,
          sender_type: 'admin',
          admin_name: currentAgent?.name
        };

        const { error: welcomeError } = await supabase
          .from('chat_messages')
          .insert([welcomeMessage]);

        if (welcomeError) throw welcomeError;
      }
    } catch (error) {
      console.error('Error fetching messages:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const subscribeToMessages = () => {
    const subscription = supabase
      .channel('chat_messages')
      .on('postgres_changes', {
        event: 'INSERT',
        schema: 'public',
        table: 'chat_messages',
        filter: `user_id=eq.${user?.id}`
      }, payload => {
        setMessages(prev => [...prev, payload.new as Message]);
      })
      .subscribe();

    return () => {
      subscription.unsubscribe();
    };
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSend = async () => {
    if (!message.trim() || !user) return;

    try {
      const { error } = await supabase
        .from('chat_messages')
        .insert([{
          user_id: user.id,
          content: message,
          sender_type: 'user'
        }]);

      if (error) throw error;

      setMessage('');

      // Simulate typing indicator
      setTimeout(async () => {
        await supabase
          .from('chat_messages')
          .insert([{
            user_id: user.id,
            content: "I'll help you with that. Please allow me 1-3 minutes to review your request and provide the best assistance possible.",
            sender_type: 'admin',
            admin_name: currentAgent?.name
          }]);
      }, 1000);
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const formatMessageTime = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {!isOpen ? (
        <button
          onClick={() => setIsOpen(true)}
          className="bg-black text-white p-4 rounded-full shadow-lg hover:bg-gray-800 transition-colors"
        >
          <MessageSquare size={24} />
        </button>
      ) : (
        <div 
          ref={chatContainerRef}
          className={`bg-white rounded-2xl shadow-2xl border border-gray-100 w-[380px] transition-all duration-300 ${
            isMinimized ? 'h-[60px]' : 'h-[600px]'
          }`}
        >
          {/* Header */}
          <div className="p-4 border-b border-gray-100 flex justify-between items-center">
            <div>
              <h3 className="font-bold">Chat Support</h3>
              {!isMinimized && currentAgent && (
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <p className="text-sm text-gray-500">{currentAgent.name}</p>
                </div>
              )}
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setIsMinimized(!isMinimized)}
                className="p-1 hover:bg-gray-100 rounded-lg transition-colors"
              >
                {isMinimized ? (
                  <ChevronUp size={20} className="text-gray-500" />
                ) : (
                  <ChevronDown size={20} className="text-gray-500" />
                )}
              </button>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X size={20} className="text-gray-500" />
              </button>
            </div>
          </div>

          {!isMinimized && (
            <>
              {/* Response Time Indicator */}
              <div className="px-4 py-2 bg-gray-50 border-b border-gray-100 flex items-center gap-2">
                <Clock size={14} className="text-gray-500" />
                <span className="text-sm text-gray-600">
                  Average response time: 1-3 minutes
                </span>
              </div>

              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-4 h-[420px] space-y-4">
                {isLoading ? (
                  <div className="flex justify-center items-center h-full">
                    <div className="w-8 h-8 border-4 border-gray-200 border-t-black rounded-full animate-spin"></div>
                  </div>
                ) : messages.length > 0 ? (
                  messages.map((msg) => (
                    <div
                      key={msg.id}
                      className={`flex ${msg.sender_type === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div
                        className={`max-w-[80%] rounded-2xl px-4 py-2 ${
                          msg.sender_type === 'user'
                            ? 'bg-black text-white'
                            : msg.sender_type === 'admin'
                            ? 'bg-blue-500 text-white'
                            : 'bg-gray-100 text-gray-900'
                        }`}
                      >
                        {msg.sender_type !== 'user' && msg.admin_name && (
                          <p className="text-xs font-medium mb-1 opacity-90">
                            {msg.admin_name}
                          </p>
                        )}
                        <p className="text-sm">{msg.content}</p>
                        <p className="text-xs opacity-70 mt-1">
                          {formatMessageTime(msg.created_at)}
                        </p>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center text-gray-500 mt-8">
                    <MessageSquare size={40} className="mx-auto mb-2 text-gray-400" />
                    <p>Start a conversation with our support team</p>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>

              {/* Input */}
              <div className="p-4 border-t border-gray-100">
                <div className="flex gap-2">
                  <textarea
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Type your message..."
                    className="flex-1 resize-none px-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-black focus:border-transparent text-sm min-h-[80px]"
                  />
                  <button
                    onClick={handleSend}
                    disabled={!message.trim()}
                    className="bg-black text-white p-4 rounded-xl hover:bg-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <Send size={20} />
                  </button>
                </div>
                <p className="mt-2 text-xs text-gray-500">
                  Press Enter to send, Shift + Enter for new line
                </p>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
}