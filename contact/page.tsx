'use client';

import React, { useState } from 'react';
import { Send, Phone, Mail, MapPin, Check, ArrowRight, Clock } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { supabase } from '@/lib/supabase';
import Logo from '@/components/Logo';
import Footer from '@/components/Footer';
import ThemeToggle from '@/components/ThemeToggle';
import WalletMenu from '@/components/WalletMenu';
import NavigationMenu from '@/components/NavigationMenu';

export default function Contact() {
  const { user } = useAuth();
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    subject: '',
    priority: 'normal',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // Create support ticket
      const { error } = await supabase
        .from('support_tickets')
        .insert([{
          user_id: user?.id,
          subject: formData.subject,
          message: formData.message,
          priority: formData.priority,
          status: 'open'
        }]);

      if (error) throw error;
      
      setIsSubmitted(true);
      setFormData(prev => ({
        ...prev,
        subject: '',
        message: '',
        priority: 'normal'
      }));
    } catch (error) {
      console.error('Error creating support ticket:', error);
    } finally {
      setIsSubmitting(false);
    }
    
    // Reset success message after 5 seconds
    setTimeout(() => {
      setIsSubmitted(false);
    }, 5000);
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-b from-gray-50 to-white border-b border-gray-100">
        <div className="max-w-8xl mx-auto">
          <div className="flex items-center justify-between py-4 px-6">
            <div className="flex items-center gap-8">
              <Logo />
              <NavigationMenu />
            </div>
            <div className="flex items-center gap-4">
              <WalletMenu onShowDashboard={() => {}} />
              <ThemeToggle />
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 pt-[88px]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          {/* Hero Section */}
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Contact Support</h1>
            {user ? (
              <p className="text-xl text-gray-600">
                Hello {user.name}, how can we assist you today?
              </p>
            ) : (
              <p className="text-xl text-gray-600">
                Get in touch with our support team for assistance
              </p>
            )}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Contact Methods */}
            <div className="lg:col-span-1 space-y-6">
              <div className="bg-gray-50 p-6 rounded-xl">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 bg-black rounded-full flex items-center justify-center">
                    <Phone size={24} className="text-white" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg">Call Us</h3>
                    <p className="text-gray-600">24/7 Support Line</p>
                  </div>
                </div>
                <a href="tel:+41447978853" className="text-black font-medium hover:underline">
                  +41 44 797 88 53
                </a>
              </div>

              <div className="bg-gray-50 p-6 rounded-xl">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 bg-black rounded-full flex items-center justify-center">
                    <Mail size={24} className="text-white" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg">Email Us</h3>
                    <p className="text-gray-600">Response within 2 hours</p>
                  </div>
                </div>
                <a href="mailto:support@privatecharterx.com" className="text-black font-medium hover:underline">
                  support@privatecharterx.com
                </a>
              </div>

              <div className="bg-gray-50 p-6 rounded-xl">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 bg-black rounded-full flex items-center justify-center">
                    <MapPin size={24} className="text-white" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg">Visit Us</h3>
                    <p className="text-gray-600">Our Global Offices</p>
                  </div>
                </div>
                <div className="space-y-2">
                  <p className="text-gray-600">
                    <strong>Zurich:</strong><br />
                    Bahnhofstrasse 10<br />
                    8001 Zurich, Switzerland
                  </p>
                  <p className="text-gray-600">
                    <strong>London:</strong><br />
                    71-75 Shelton Street<br />
                    London, WC2H 9JQ, UK
                  </p>
                  <p className="text-gray-600">
                    <strong>Miami:</strong><br />
                    1000 Brickell Ave, Suite 715<br />
                    Miami, FL 33131, USA
                  </p>
                </div>
              </div>
            </div>

            {/* Support Ticket Form */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6">
                <h2 className="text-2xl font-bold mb-6">Create Support Ticket</h2>
                
                {isSubmitted ? (
                  <div className="bg-green-50 text-green-700 p-6 rounded-xl">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                        <Check size={24} className="text-green-600" />
                      </div>
                      <div>
                        <h3 className="font-bold text-lg">Ticket Created Successfully!</h3>
                        <p>Our support team will respond to your inquiry shortly.</p>
                      </div>
                    </div>
                    <p className="text-sm">
                      You can view the status of your ticket in your account dashboard.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Full Name
                        </label>
                        <input
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          required
                          disabled={!!user}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent disabled:bg-gray-50 disabled:text-gray-500"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Email Address
                        </label>
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          required
                          disabled={!!user}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent disabled:bg-gray-50 disabled:text-gray-500"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Subject
                        </label>
                        <select
                          name="subject"
                          value={formData.subject}
                          onChange={handleChange}
                          required
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
                        >
                          <option value="">Select a subject</option>
                          <option value="booking">Booking Inquiry</option>
                          <option value="payment">Payment Issue</option>
                          <option value="technical">Technical Support</option>
                          <option value="complaint">File a Complaint</option>
                          <option value="feedback">General Feedback</option>
                          <option value="other">Other</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Priority
                        </label>
                        <select
                          name="priority"
                          value={formData.priority}
                          onChange={handleChange}
                          required
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
                        >
                          <option value="low">Low</option>
                          <option value="normal">Normal</option>
                          <option value="high">High</option>
                          <option value="urgent">Urgent</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Message
                      </label>
                      <textarea
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        required
                        rows={6}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent resize-none"
                        placeholder="Please describe your issue or question in detail..."
                      ></textarea>
                    </div>

                    <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Clock size={16} />
                        <span>Average response time: 2 hours</span>
                      </div>
                      <div className="mt-2 text-sm text-gray-500">
                        For urgent matters, please call our 24/7 support line at <a href="tel:+41447978853" className="text-black font-medium hover:underline">+41 44 797 88 53</a>
                      </div>
                    </div>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="px-6 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors flex items-center gap-2 ml-auto"
                    >
                      {isSubmitting ? (
                        <>
                          <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                          <span>Creating Ticket...</span>
                        </>
                      ) : (
                        <>
                          <Send size={18} />
                          <span>Create Ticket</span>
                        </>
                      )}
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}