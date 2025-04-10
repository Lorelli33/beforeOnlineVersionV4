import React, { useState, useRef, useEffect } from 'react';
import { Send, Plane, HeaterIcon as Helicopter, ArrowLeft } from 'lucide-react';
import Logo from '../../components/Logo';
import Footer from '../../components/Footer';
import LanguageSelector from '../../components/LanguageSelector';
import ThemeToggle from '../../components/ThemeToggle';
import UserMenu from '../../components/UserMenu';
import WalletMenu from '../../components/WalletMenu';
import { useAuth } from '../../context/AuthContext';
import LoginModal from '../../components/LoginModal';
import RegisterModal from '../../components/RegisterModal';

interface Message {
  id: string;
  type: 'user' | 'ai';
  content: string;
  timestamp: Date;
  offers?: Offer[];
}

interface Offer {
  id: string;
  type: 'jet' | 'helicopter' | 'yacht';
  title: string;
  description: string;
  price: number;
  currency: string;
  imageUrl: string;
  link: string;
}

export default function AITravelAgent() {
  const { isAuthenticated } = useAuth();
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showRegisterModal, setShowRegisterModal] = useState(false);
  const [isDarkTheme, setIsDarkTheme] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      type: 'ai',
      content: "Hello! I'm your AI Travel Designer. Tell me about your dream journey, and I'll help you create the perfect travel experience. You can ask about destinations, activities, or specific travel requirements.",
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isAuthenticated) {
      setShowLoginModal(true);
    }
  }, [isAuthenticated]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = async () => {
    if (!inputValue.trim()) return;

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: inputValue,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    // Simulate AI response delay
    await new Promise(resolve => setTimeout(resolve, 2000));

    // Example AI response with matching offers
    const aiResponse: Message = {
      id: (Date.now() + 1).toString(),
      type: 'ai',
      content: "I've found some exciting options based on your interests. Here are some recommendations that match your preferences:",
      timestamp: new Date(),
      offers: [
        {
          id: '1',
          type: 'jet',
          title: 'Private Jet to Bangkok',
          description: 'Luxury private jet charter to Bangkok with VIP terminal access',
          price: 45000,
          currency: '€',
          imageUrl: 'https://images.unsplash.com/photo-1540962351504-03099e0a754b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2574&q=80',
          link: '/fixed-offers'
        },
        {
          id: '2',
          type: 'helicopter',
          title: 'Bangkok City Tour',
          description: "Scenic helicopter tour over Bangkok's landmarks",
          price: 2500,
          currency: '€',
          imageUrl: 'https://images.unsplash.com/photo-1608236465209-5e8b7ef9c4d7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2574&q=80',
          link: '/services/helicopter-charter'
        }
      ]
    };

    setMessages(prev => [...prev, aiResponse]);
    setIsTyping(false);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-b from-gray-50 to-white border-b border-gray-100">
        <div className="max-w-8xl mx-auto">
          <div className="flex items-center justify-between py-4 px-6">
            <div className="flex items-center gap-4">
              <a href="/" className="flex items-center gap-2 text-gray-600 hover:text-gray-900">
                <ArrowLeft size={20} />
                <span>Back</span>
              </a>
              <Logo />
            </div>
            <div className="flex items-center gap-4">
              <WalletMenu onShowDashboard={() => {}} />
              <UserMenu onLogout={() => {}} />
              <ThemeToggle isDark={isDarkTheme} onToggle={() => setIsDarkTheme(!isDarkTheme)} />
              <LanguageSelector />
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 pt-[88px]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Chat Container */}
          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
            {/* Chat Header */}
            <div className="p-6 border-b border-gray-100">
              <h1 className="text-2xl font-bold">AI Travel Designer</h1>
              <p className="text-gray-600">
                Chat with our AI to design your perfect travel experience
              </p>
            </div>

            {/* Messages */}
            <div className="h-[600px] overflow-y-auto p-6">
              <div className="space-y-6">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-[80%] ${
                        message.type === 'user'
                          ? 'bg-black text-white'
                          : 'bg-gray-100 text-gray-900'
                      } rounded-2xl px-6 py-4`}
                    >
                      <div className="text-sm whitespace-pre-wrap">{message.content}</div>
                      
                      {/* Offers */}
                      {message.offers && (
                        <div className="mt-4 space-y-4">
                          {message.offers.map((offer) => (
                            <div key={offer.id} className="bg-white rounded-xl overflow-hidden shadow-md">
                              <div className="relative h-48">
                                <img
                                  src={offer.imageUrl}
                                  alt={offer.title}
                                  className="w-full h-full object-cover"
                                />
                                <div className="absolute top-4 right-4 bg-black/80 backdrop-blur-sm text-white text-xs px-3 py-1 rounded-full flex items-center gap-2">
                                  {offer.type === 'jet' && <Plane size={14} />}
                                  {offer.type === 'helicopter' && <Helicopter size={14} />}
                                  <span>{offer.type === 'jet' ? 'Private Jet' : 'Helicopter'}</span>
                                </div>
                              </div>
                              <div className="p-4">
                                <h3 className="font-bold mb-2">{offer.title}</h3>
                                <p className="text-sm text-gray-600 mb-4">{offer.description}</p>
                                <div className="flex items-center justify-between">
                                  <div className="text-lg font-bold">
                                    {offer.currency}{offer.price.toLocaleString()}
                                  </div>
                                  <a
                                    href={offer.link}
                                    className="bg-black text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-800 transition-colors"
                                  >
                                    View Details
                                  </a>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                      
                      <div className="mt-2 text-xs opacity-60">
                        {message.timestamp.toLocaleTimeString()}
                      </div>
                    </div>
                  </div>
                ))}
                {isTyping && (
                  <div className="flex justify-start">
                    <div className="bg-gray-100 rounded-2xl px-6 py-4">
                      <div className="flex gap-1">
                        <span className="w-2 h-2 bg-gray-500 rounded-full animate-bounce"></span>
                        <span className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></span>
                        <span className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></span>
                      </div>
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>
            </div>

            {/* Input */}
            <div className="p-6 border-t border-gray-100">
              <div className="flex gap-4">
                <textarea
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Tell me about your travel plans..."
                  className="flex-1 min-h-[80px] px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-black focus:border-transparent resize-none"
                />
                <button
                  onClick={handleSend}
                  disabled={!inputValue.trim() || isTyping}
                  className="bg-black text-white px-6 rounded-xl hover:bg-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                >
                  <Send size={20} />
                </button>
              </div>
              <p className="mt-2 text-xs text-gray-500">
                Press Enter to send, Shift + Enter for new line
              </p>
            </div>
          </div>
        </div>
      </main>

      <Footer />

      {showLoginModal && (
        <LoginModal
          onClose={() => setShowLoginModal(false)}
          onRegister={() => {
            setShowLoginModal(false);
            setShowRegisterModal(true);
          }}
        />
      )}

      {showRegisterModal && (
        <RegisterModal
          onClose={() => setShowRegisterModal(false)}
          onLogin={() => {
            setShowRegisterModal(false);
            setShowLoginModal(true);
          }}
        />
      )}
    </div>
  );
}