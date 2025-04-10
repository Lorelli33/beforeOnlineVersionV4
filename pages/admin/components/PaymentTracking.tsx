import React, { useState, useEffect } from 'react';
import { CreditCard, Coins, ArrowUpRight, ArrowDownRight, Filter } from 'lucide-react';
import { supabase } from '../../../lib/supabase';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface Payment {
  id: string;
  user_id: string;
  amount: number;
  currency: string;
  payment_method: 'card' | 'crypto' | 'bank_transfer';
  status: 'pending' | 'completed' | 'failed';
  transaction_hash?: string;
  created_at: string;
  user?: {
    name: string;
    email: string;
  };
  booking?: {
    id: string;
    title: string;
  };
}

export default function PaymentTracking() {
  const [payments, setPayments] = useState<Payment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState('all');
  const [dateRange, setDateRange] = useState('7d');

  useEffect(() => {
    fetchPayments();
  }, [dateRange]);

  const fetchPayments = async () => {
    try {
      setLoading(true);
      
      let query = supabase
        .from('payments')
        .select(`
          *,
          user:user_id (
            name,
            email
          ),
          booking:booking_id (
            id,
            title
          )
        `)
        .order('created_at', { ascending: false });

      // Apply date filter
      const now = new Date();
      let startDate = new Date();
      switch (dateRange) {
        case '7d':
          startDate.setDate(now.getDate() - 7);
          break;
        case '30d':
          startDate.setDate(now.getDate() - 30);
          break;
        case '90d':
          startDate.setDate(now.getDate() - 90);
          break;
      }
      
      query = query.gte('created_at', startDate.toISOString());
      
      const { data, error } = await query;

      if (error) throw error;

      setPayments(data || []);
    } catch (error) {
      console.error('Error fetching payments:', error);
      setError('Failed to load payments');
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status: string): string => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'failed':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getPaymentMethodIcon = (method: string) => {
    switch (method) {
      case 'card':
        return <CreditCard size={20} className="text-blue-500" />;
      case 'crypto':
        return <Coins size={20} className="text-purple-500" />;
      case 'bank_transfer':
        return <ArrowUpRight size={20} className="text-green-500" />;
      default:
        return <CreditCard size={20} className="text-gray-500" />;
    }
  };

  const formatAmount = (amount: number, currency: string): string => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency
    }).format(amount);
  };

  const formatDate = (dateString: string): string => {
    return new Date(dateString).toLocaleString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  // Calculate statistics
  const stats = {
    total: payments.reduce((sum, p) => sum + p.amount, 0),
    completed: payments.filter(p => p.status === 'completed').reduce((sum, p) => sum + p.amount, 0),
    pending: payments.filter(p => p.status === 'pending').reduce((sum, p) => sum + p.amount, 0),
    crypto: payments.filter(p => p.payment_method === 'crypto').reduce((sum, p) => sum + p.amount, 0)
  };

  // Prepare chart data
  const chartData = payments.reduce((acc: any[], payment) => {
    const date = new Date(payment.created_at).toLocaleDateString();
    const existing = acc.find(item => item.date === date);
    if (existing) {
      existing.amount += payment.amount;
    } else {
      acc.push({ date, amount: payment.amount });
    }
    return acc;
  }, []);

  const filteredPayments = payments.filter(payment => {
    if (activeTab === 'all') return true;
    if (activeTab === 'crypto') return payment.payment_method === 'crypto';
    return payment.status === activeTab;
  });

  return (
    <div>
      <div className="mb-6">
        <h2 className="text-2xl font-bold">Payment Tracking</h2>
        <p className="text-gray-600">Monitor all payment transactions</p>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white p-6 rounded-xl border border-gray-200">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <CreditCard size={24} className="text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Total Revenue</p>
              <p className="text-2xl font-bold">€{stats.total.toLocaleString()}</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl border border-gray-200">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <ArrowUpRight size={24} className="text-green-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Completed Payments</p>
              <p className="text-2xl font-bold">€{stats.completed.toLocaleString()}</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl border border-gray-200">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
              <ArrowDownRight size={24} className="text-yellow-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Pending Payments</p>
              <p className="text-2xl font-bold">€{stats.pending.toLocaleString()}</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl border border-gray-200">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
              <Coins size={24} className="text-purple-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Crypto Payments</p>
              <p className="text-2xl font-bold">€{stats.crypto.toLocaleString()}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Revenue Chart */}
      <div className="bg-white p-6 rounded-xl border border-gray-200 mb-8">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-bold">Revenue Overview</h3>
          <select
            value={dateRange}
            onChange={(e) => setDateRange(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
          >
            <option value="7d">Last 7 days</option>
            <option value="30d">Last 30 days</option>
            <option value="90d">Last 90 days</option>
          </select>
        </div>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="amount" fill="#000000" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Filters */}
      <div className="mb-6">
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex space-x-8">
            <button
              onClick={() => setActiveTab('all')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'all'
                  ? 'border-black text-black'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              All Payments
            </button>
            <button
              onClick={() => setActiveTab('completed')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'completed'
                  ? 'border-black text-black'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Completed
            </button>
            <button
              onClick={() => setActiveTab('pending')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'pending'
                  ? 'border-black text-black'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Pending
            </button>
            <button
              onClick={() => setActiveTab('crypto')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'crypto'
                  ? 'border-black text-black'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Crypto
            </button>
          </nav>
        </div>
      </div>

      {/* Payments Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Payment Details
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Customer
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Amount
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredPayments.map((payment) => (
                <tr key={payment.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10 bg-gray-100 rounded-lg flex items-center justify-center">
                        {getPaymentMethodIcon(payment.payment_method)}
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">
                          {payment.booking?.title || 'Direct Payment'}
                        </div>
                        <div className="text-sm text-gray-500">
                          {payment.payment_method === 'crypto' && payment.transaction_hash && (
                            <a
                              href={`https://etherscan.io/tx/${payment.transaction_hash}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-blue-600 hover:text-blue-800"
                            >
                              View Transaction
                            </a>
                          )}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">
                      {payment.user?.name}
                    </div>
                    <div className="text-sm text-gray-500">
                      {payment.user?.email}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {formatAmount(payment.amount, payment.currency)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(payment.status)}`}>
                      {payment.status.toUpperCase()}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {formatDate(payment.created_at)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}