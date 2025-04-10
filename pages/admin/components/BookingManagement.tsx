import React, { useState, useEffect } from 'react';
import { Plane, Calendar, MapPin, Users, Tag, Check, X, ArrowRight, Edit, Send } from 'lucide-react';
import { supabase } from '../../../lib/supabase';

interface Booking {
  id: string;
  user_id: string;
  status: string;
  origin: string;
  destination: string;
  departure_date: string;
  return_date?: string;
  passengers: number;
  aircraft_type: string;
  price: number;
  currency: string;
  created_at: string;
  admin_notes?: string;
  final_price?: number;
  payment_status?: string;
  user?: {
    name: string;
    email: string;
  };
}

export default function BookingManagement() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState('all');
  const [editingBooking, setEditingBooking] = useState<Booking | null>(null);
  const [finalPrice, setFinalPrice] = useState<string>('');
  const [adminNotes, setAdminNotes] = useState<string>('');

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('bookings')
        .select(`
          *,
          user:user_id (
            name,
            email
          )
        `)
        .order('created_at', { ascending: false });

      if (error) throw error;

      setBookings(data || []);
    } catch (error) {
      console.error('Error fetching bookings:', error);
      setError('Failed to load bookings');
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (bookingId: string, newStatus: string) => {
    try {
      const { error } = await supabase
        .from('bookings')
        .update({ status: newStatus })
        .eq('id', bookingId);

      if (error) throw error;

      // Create booking update
      const { error: updateError } = await supabase
        .from('booking_updates')
        .insert([{
          booking_id: bookingId,
          status: newStatus,
          message: `Booking status updated to ${newStatus}`,
          created_by: (await supabase.auth.getUser()).data.user?.id
        }]);

      if (updateError) throw updateError;

      // Refresh bookings
      fetchBookings();
    } catch (error) {
      console.error('Error updating booking status:', error);
    }
  };

  const handleSaveChanges = async () => {
    if (!editingBooking) return;

    try {
      const { error } = await supabase
        .from('bookings')
        .update({
          final_price: parseFloat(finalPrice),
          admin_notes: adminNotes,
          status: 'price_proposed'
        })
        .eq('id', editingBooking.id);

      if (error) throw error;

      // Send notification to user
      const { error: notificationError } = await supabase
        .from('notifications')
        .insert([{
          user_id: editingBooking.user_id,
          type: 'booking_update',
          title: 'Booking Price Updated',
          message: `Your booking request has been reviewed. Final price: ${finalPrice} ${editingBooking.currency}`,
          read: false
        }]);

      if (notificationError) throw notificationError;

      setEditingBooking(null);
      setFinalPrice('');
      setAdminNotes('');
      fetchBookings();
    } catch (error) {
      console.error('Error updating booking:', error);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const getStatusColor = (status: string): string => {
    switch (status.toLowerCase()) {
      case 'confirmed':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      case 'price_proposed':
        return 'bg-blue-100 text-blue-800';
      case 'payment_pending':
        return 'bg-purple-100 text-purple-800';
      case 'completed':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const filteredBookings = bookings.filter(booking => {
    if (activeTab === 'all') return true;
    return booking.status.toLowerCase() === activeTab;
  });

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="w-8 h-8 border-4 border-gray-200 border-t-black rounded-full animate-spin"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 text-red-700 p-4 rounded-lg">
        {error}
      </div>
    );
  }

  return (
    <div>
      <div className="mb-6">
        <h2 className="text-2xl font-bold">Booking Management</h2>
        <p className="text-gray-600">Manage and track all booking requests</p>
      </div>

      {/* Tabs */}
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
              All Requests
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
              onClick={() => setActiveTab('price_proposed')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'price_proposed'
                  ? 'border-black text-black'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Price Proposed
            </button>
            <button
              onClick={() => setActiveTab('payment_pending')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'payment_pending'
                  ? 'border-black text-black'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Payment Pending
            </button>
            <button
              onClick={() => setActiveTab('confirmed')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'confirmed'
                  ? 'border-black text-black'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Confirmed
            </button>
          </nav>
        </div>
      </div>

      {/* Booking List */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Client
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Route
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Details
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredBookings.map((booking) => (
                <tr key={booking.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10 bg-gray-100 rounded-lg flex items-center justify-center">
                        <Users size={20} className="text-gray-500" />
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">
                          {booking.user?.name || 'Unknown'}
                        </div>
                        <div className="text-sm text-gray-500">
                          {booking.user?.email}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center text-sm text-gray-900">
                      <MapPin size={16} className="text-gray-400 mr-1" />
                      <span>{booking.origin}</span>
                      <ArrowRight size={14} className="mx-2 text-gray-400" />
                      <span>{booking.destination}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center text-sm text-gray-900">
                      <Calendar size={16} className="text-gray-400 mr-1" />
                      <span>{formatDate(booking.departure_date)}</span>
                    </div>
                    {booking.return_date && (
                      <div className="flex items-center text-sm text-gray-500 mt-1">
                        <Calendar size={16} className="text-gray-400 mr-1" />
                        <span>{formatDate(booking.return_date)}</span>
                      </div>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm">
                      <div className="font-medium text-gray-900">
                        {booking.aircraft_type}
                      </div>
                      <div className="text-gray-500">
                        {booking.passengers} passengers
                      </div>
                      {booking.final_price && (
                        <div className="font-medium text-green-600">
                          {booking.currency}{booking.final_price.toLocaleString()}
                        </div>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(booking.status)}`}>
                      {booking.status.replace('_', ' ').toUpperCase()}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex justify-end gap-2">
                      {booking.status === 'pending' && (
                        <button
                          onClick={() => setEditingBooking(booking)}
                          className="text-blue-600 hover:text-blue-900"
                        >
                          <Edit size={18} />
                        </button>
                      )}
                      {booking.status === 'price_proposed' && (
                        <button
                          onClick={() => handleStatusChange(booking.id, 'payment_pending')}
                          className="text-green-600 hover:text-green-900"
                        >
                          <Send size={18} />
                        </button>
                      )}
                      {booking.status === 'payment_pending' && (
                        <button
                          onClick={() => handleStatusChange(booking.id, 'confirmed')}
                          className="text-green-600 hover:text-green-900"
                        >
                          <Check size={18} />
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Edit Booking Modal */}
      {editingBooking && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full p-6">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold">Review Booking Request</h3>
              <button
                onClick={() => setEditingBooking(null)}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <X size={20} className="text-gray-500" />
              </button>
            </div>

            <div className="space-y-6">
              {/* Client Info */}
              <div>
                <h4 className="font-medium text-gray-700 mb-2">Client Information</h4>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <div className="text-sm text-gray-500">Name</div>
                      <div className="font-medium">{editingBooking.user?.name}</div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-500">Email</div>
                      <div className="font-medium">{editingBooking.user?.email}</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Flight Details */}
              <div>
                <h4 className="font-medium text-gray-700 mb-2">Flight Details</h4>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <div className="text-sm text-gray-500">Route</div>
                      <div className="font-medium">
                        {editingBooking.origin} → {editingBooking.destination}
                      </div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-500">Aircraft</div>
                      <div className="font-medium">{editingBooking.aircraft_type}</div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-500">Departure</div>
                      <div className="font-medium">{formatDate(editingBooking.departure_date)}</div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-500">Passengers</div>
                      <div className="font-medium">{editingBooking.passengers}</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Price and Notes */}
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Final Price ({editingBooking.currency})
                  </label>
                  <input
                    type="number"
                    value={finalPrice}
                    onChange={(e) => setFinalPrice(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
                    placeholder="Enter final price"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Admin Notes
                  </label>
                  <textarea
                    value={adminNotes}
                    onChange={(e) => setAdminNotes(e.target.value)}
                    rows={4}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent resize-none"
                    placeholder="Add notes about the booking"
                  ></textarea>
                </div>
              </div>

              <div className="flex justify-end gap-3">
                <button
                  onClick={() => setEditingBooking(null)}
                  className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSaveChanges}
                  className="px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800"
                >
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}