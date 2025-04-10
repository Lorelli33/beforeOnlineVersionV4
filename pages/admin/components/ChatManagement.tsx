import React, { useState, useEffect, useRef } from 'react';
import { Send, Search, Users, MessageSquare, Clock } from 'lucide-react';
import { supabase } from '../../../lib/supabase';

interface ChatMessage {
  id: string;
  user_id: string;
  content: string;
  sender_type: 'user' | 'admin' | 'system';
  created_at: string;
  read: boolean;
  user?: {
    name: string;
    email: string;
  };
}

interface ChatUser {
  id: string;
  name: string;
  email: string;
  last_message?: string;
  last_message_time?: string;
  unread_count: number;
}

export default function ChatManagement() {
  const [users, setUsers] = useState<ChatUser[]>([]);
  const [selectedUser, setSelectedUser] = useState<ChatUser | null>(null);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetchChatUsers();
    subscribeToNewMessages();
  }, []);

  useEffect(() => {
    if (selectedUser) {
      fetchMessages(selectedUser.id);
      markMessagesAsRead(selectedUser.id);
    }
  }, [selectedUser]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const subscribeToNewMessages = () => {
    const subscription = supabase
      .channel('chat_messages')
      .on('postgres_changes', {
        event: 'INSERT',
        schema: 'public',
        table: 'chat_messages'
      }, payload => {
        const newMessage = payload.new as ChatMessage;
        if (selectedUser?.id === newMessage.user_id) {
          setMessages(prev => [...prev, newMessage]);
        }
        fetchChatUsers(); // Refresh user list to update unread counts
      })
      .subscribe();

    return () => {
      subscription.unsubscribe();
    };
  };

  const fetchChatUsers = async () => {
    try {
      setLoading(true);
      
      // Get all users who have sent messages
      const { data: chatUsers, error: chatError } = await supabase
        .from('chat_messages')
        .select(`
          user_id,
          content,
          created_at,
          read,
          user:users!chat_messages_user_id_fkey (
            id,
            name,
            email
          )
        `)
        .order('created_at', { ascending: false });

      if (chatError) throw chatError;

      // Process users and get latest message + unread count
      const userMap = new Map<string, ChatUser>();
      
      chatUsers?.forEach(msg => {
        if (!msg.user) return;
        
        if (!userMap.has(msg.user_id)) {
          userMap.set(msg.user_id, {
            id: msg.user_id,
            name: msg.user.name || 'Unknown',
            email: msg.user.email,
            last_message: msg.content,
            last_message_time: msg.created_at,
            unread_count: msg.read ? 0 : 1
          });
        } else if (!msg.read) {
          const user = userMap.get(msg.user_id)!;
          user.unread_count++;
        }
      });

      setUsers(Array.from(userMap.values()));
    } catch (error) {
      console.error('Error fetching chat users:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchMessages = async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from('chat_messages')
        .select(`
          *,
          user:user_id (
            name,
            email
          )
        `)
        .eq('user_id', userId)
        .order('created_at', { ascending: true });

      if (error) throw error;

      setMessages(data || []);
    } catch (error) {
      console.error('Error fetching messages:', error);
    }
  };

  const markMessagesAsRead = async (userId: string) => {
    try {
      const { error } = await supabase
        .from('chat_messages')
        .update({ read: true })
        .eq('user_id', userId)
        .eq('read', false);

      if (error) throw error;
      
      fetchChatUsers(); // Refresh unread counts
    } catch (error) {
      console.error('Error marking messages as read:', error);
    }
  };

  const handleSendMessage = async () => {
    if (!newMessage.trim() || !selectedUser) return;

    try {
      const { error } = await supabase
        .from('chat_messages')
        .insert([{
          user_id: selectedUser.id,
          content: newMessage,
          sender_type: 'admin',
          read: false
        }]);

      if (error) throw error;

      setNewMessage('');
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const formatTime = (dateString: string) => {
    return new Date(dateString).toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const filteredUsers = users.filter(user => {
    const searchLower = searchTerm.toLowerCase();
    return (
      user.name.toLowerCase().includes(searchLower) ||
      user.email.toLowerCase().includes(searchLower)
    );
  });

  return (
    <div className="h-[calc(100vh-200px)] flex rounded-xl overflow-hidden border border-gray-200">
      {/* Users List */}
      <div className="w-80 bg-white border-r border-gray-200 flex flex-col">
        <div className="p-4 border-b border-gray-200">
          <div className="relative">
            <input
              type="text"
              placeholder="Search users..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
            />
            <Search size={18} className="absolute left-3 top-2.5 text-gray-400" />
          </div>
        </div>

        <div className="flex-1 overflow-y-auto">
          {loading ? (
            <div className="flex justify-center items-center h-full">
              <div className="w-8 h-8 border-4 border-gray-200 border-t-black rounded-full animate-spin"></div>
            </div>
          ) : filteredUsers.length > 0 ? (
            <div className="divide-y divide-gray-100">
              {filteredUsers.map((user) => (
                <button
                  key={user.id}
                  onClick={() => setSelectedUser(user)}
                  className={`w-full p-4 text-left hover:bg-gray-50 transition-colors ${
                    selectedUser?.id === user.id ? 'bg-gray-50' : ''
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <Users size={20} className="text-gray-500" />
                    </div>
                    <div className="min-w-0">
                      <div className="flex items-center justify-between gap-2">
                        <p className="font-medium truncate">{user.name}</p>
                        {user.unread_count > 0 && (
                          <span className="bg-blue-500 text-white text-xs px-2 py-1 rounded-full">
                            {user.unread_count}
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-gray-500 truncate">{user.email}</p>
                      {user.last_message && (
                        <p className="text-sm text-gray-500 truncate mt-1">
                          {user.last_message}
                        </p>
                      )}
                    </div>
                  </div>
                </button>
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center h-full text-gray-500">
              <MessageSquare size={40} className="mb-2" />
              <p>No conversations found</p>
            </div>
          )}
        </div>
      </div>

      {/* Chat Area */}
      <div className="flex-1 bg-gray-50 flex flex-col">
        {selectedUser ? (
          <>
            {/* Chat Header */}
            <div className="p-4 bg-white border-b border-gray-200">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                  <Users size={20} className="text-gray-500" />
                </div>
                <div>
                  <h3 className="font-medium">{selectedUser.name}</h3>
                  <p className="text-sm text-gray-500">{selectedUser.email}</p>
                </div>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.sender_type === 'admin' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[70%] rounded-2xl px-4 py-2 ${
                      message.sender_type === 'admin'
                        ? 'bg-black text-white'
                        : message.sender_type === 'system'
                        ? 'bg-gray-100 text-gray-900'
                        : 'bg-blue-500 text-white'
                    }`}
                  >
                    <p className="text-sm">{message.content}</p>
                    <p className="text-xs opacity-70 mt-1">
                      {formatTime(message.created_at)}
                    </p>
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <div className="p-4 bg-white border-t border-gray-200">
              <div className="flex gap-2">
                <textarea
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  onKeyPress={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                      e.preventDefault();
                      handleSendMessage();
                    }
                  }}
                  placeholder="Type your message..."
                  className="flex-1 resize-none px-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-black focus:border-transparent text-sm min-h-[80px]"
                />
                <button
                  onClick={handleSendMessage}
                  disabled={!newMessage.trim()}
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
        ) : (
          <div className="flex flex-col items-center justify-center h-full text-gray-500">
            <MessageSquare size={48} className="mb-4" />
            <p className="text-lg font-medium">Select a conversation</p>
            <p className="text-sm">Choose a user from the list to view their messages</p>
          </div>
        )}
      </div>
    </div>
  );
}