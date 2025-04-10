import React, { useState, useEffect, useRef } from 'react';
import { Plus, Edit, Trash, Search, X, ArrowRight, Calendar, MapPin, Users, Clock, Tag, Upload } from 'lucide-react';
import { supabase } from '../../../lib/supabase';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface FixedOffer {
  id: string;
  title: string;
  description: string;
  origin: string;
  destination: string;
  price: number;
  currency: string;
  departure_date: string;
  return_date?: string;
  image_url: string;
  aircraft_type: string;
  passengers: number;
  duration: string;
  is_featured: boolean;
  is_empty_leg: boolean;
  created_at: string;
  status?: string;
  bookings_count?: number;
}

interface FormData {
  title: string;
  description: string;
  origin: string;
  destination: string;
  price: number;
  currency: string;
  departure_date: string;
  return_date: string;
  image_url: string;
  aircraft_type: string;
  passengers: number;
  duration: string;
  is_featured: boolean;
  is_empty_leg: boolean;
}

export default function FixedOffersManagement() {
  const [offers, setOffers] = useState<FixedOffer[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingOffer, setEditingOffer] = useState<FixedOffer | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState('fixed');
  const [uploadingImage, setUploadingImage] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);
  const [formData, setFormData] = useState<FormData>({
    title: '',
    description: '',
    origin: '',
    destination: '',
    price: 0,
    currency: '€',
    departure_date: '',
    return_date: '',
    image_url: '',
    aircraft_type: '',
    passengers: 1,
    duration: '',
    is_featured: false,
    is_empty_leg: false
  });

  useEffect(() => {
    fetchOffers();
  }, []);

  const fetchOffers = async () => {
    try {
      setLoading(true);
      
      const { data, error } = await supabase
        .from('fixed_offers')
        .select(`
          *,
          bookings:bookings (
            count
          )
        `)
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      
      const offersWithStats = data?.map(offer => ({
        ...offer,
        bookings_count: offer.bookings?.[0]?.count || 0
      })) || [];

      setOffers(offersWithStats);
    } catch (error) {
      console.error('Error fetching offers:', error);
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setFormData({
      title: '',
      description: '',
      origin: '',
      destination: '',
      price: 0,
      currency: '€',
      departure_date: '',
      return_date: '',
      image_url: '',
      aircraft_type: '',
      passengers: 1,
      duration: '',
      is_featured: false,
      is_empty_leg: false
    });
    setEditingOffer(null);
  };

  const handleEditOffer = (offer: FixedOffer) => {
    setEditingOffer(offer);
    setFormData({
      title: offer.title,
      description: offer.description,
      origin: offer.origin,
      destination: offer.destination,
      price: offer.price,
      currency: offer.currency,
      departure_date: offer.departure_date,
      return_date: offer.return_date || '',
      image_url: offer.image_url || '',
      aircraft_type: offer.aircraft_type,
      passengers: offer.passengers,
      duration: offer.duration,
      is_featured: offer.is_featured,
      is_empty_leg: offer.is_empty_leg
    });
    setShowForm(true);
  };

  const handleDeleteOffer = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this offer?')) return;
    
    try {
      const { error } = await supabase
        .from('fixed_offers')
        .delete()
        .eq('id', id);
      
      if (error) throw error;
      
      fetchOffers();
    } catch (error) {
      console.error('Error deleting offer:', error);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target as HTMLInputElement;
    
    if (type === 'checkbox') {
      const { checked } = e.target as HTMLInputElement;
      setFormData(prev => ({
        ...prev,
        [name]: checked
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: type === 'number' ? parseFloat(value) : value
      }));
    }
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setUploadingImage(true);

      const fileExt = file.name.split('.').pop();
      const fileName = `${Date.now()}.${fileExt}`;
      const filePath = `offer-images/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('public')
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      const { data: { publicUrl } } = supabase.storage
        .from('public')
        .getPublicUrl(filePath);

      setFormData(prev => ({
        ...prev,
        image_url: publicUrl
      }));
    } catch (error) {
      console.error('Error uploading image:', error);
    } finally {
      setUploadingImage(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      if (editingOffer) {
        // Update existing offer
        const { error } = await supabase
          .from('fixed_offers')
          .update({
            title: formData.title,
            description: formData.description,
            origin: formData.origin,
            destination: formData.destination,
            price: formData.price,
            currency: formData.currency,
            departure_date: formData.departure_date,
            return_date: formData.return_date || null,
            image_url: formData.image_url,
            aircraft_type: formData.aircraft_type,
            passengers: formData.passengers,
            duration: formData.duration,
            is_featured: formData.is_featured,
            is_empty_leg: formData.is_empty_leg
          })
          .eq('id', editingOffer.id);
        
        if (error) throw error;
      } else {
        // Create new offer
        const { error } = await supabase
          .from('fixed_offers')
          .insert([{
            title: formData.title,
            description: formData.description,
            origin: formData.origin,
            destination: formData.destination,
            price: formData.price,
            currency: formData.currency,
            departure_date: formData.departure_date,
            return_date: formData.return_date || null,
            image_url: formData.image_url,
            aircraft_type: formData.aircraft_type,
            passengers: formData.passengers,
            duration: formData.duration,
            is_featured: formData.is_featured,
            is_empty_leg: formData.is_empty_leg
          }]);
        
        if (error) throw error;
      }
      
      // Refresh offers list
      fetchOffers();
      setShowForm(false);
      resetForm();
    } catch (error) {
      console.error('Error saving offer:', error);
    }
  };

  const filteredOffers = offers.filter(offer => {
    if (activeTab === 'fixed' && offer.is_empty_leg) return false;
    if (activeTab === 'empty' && !offer.is_empty_leg) return false;
    
    if (searchTerm) {
      const searchLower = searchTerm.toLowerCase();
      return (
        offer.title.toLowerCase().includes(searchLower) ||
        offer.origin.toLowerCase().includes(searchLower) ||
        offer.destination.toLowerCase().includes(searchLower) ||
        offer.aircraft_type.toLowerCase().includes(searchLower)
      );
    }
    
    return true;
  });

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString();
  };

  const chartData = offers.map(offer => ({
    name: offer.title.substring(0, 20) + (offer.title.length > 20 ? '...' : ''),
    bookings: offer.bookings_count || 0,
    price: offer.price
  }));

  return (
    <div>
      <div className="mb-6">
        <h2 className="text-2xl font-bold">Fixed Offers & Empty Legs</h2>
        <p className="text-gray-600">Manage and track all offers</p>
      </div>

      {/* Stats */}
      <div className="mb-8 bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-bold mb-4">Offer Performance</h3>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis yAxisId="left" orientation="left" stroke="#8884d8" />
              <YAxis yAxisId="right" orientation="right" stroke="#82ca9d" />
              <Tooltip />
              <Bar yAxisId="left" dataKey="bookings" fill="#8884d8" name="Bookings" />
              <Bar yAxisId="right" dataKey="price" fill="#82ca9d" name="Price" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
        <div className="flex flex-col md:flex-row gap-3">
          <div className="relative">
            <input
              type="text"
              placeholder="Search offers..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
            />
            <Search size={18} className="absolute left-3 top-2.5 text-gray-400" />
          </div>
          
          <button
            onClick={() => {
              resetForm();
              setShowForm(true);
            }}
            className="flex items-center gap-2 px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800"
          >
            <Plus size={18} />
            <span>Add New Offer</span>
          </button>
        </div>
      </div>
      
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="flex border-b border-gray-200">
          <button
            onClick={() => setActiveTab('fixed')}
            className={`flex-1 py-3 px-4 text-center font-medium ${
              activeTab === 'fixed' ? 'text-black border-b-2 border-black' : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            Fixed Offers
          </button>
          <button
            onClick={() => setActiveTab('empty')}
            className={`flex-1 py-3 px-4 text-center font-medium ${
              activeTab === 'empty' ? 'text-black border-b-2 border-black' : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            Empty Legs
          </button>
        </div>
        
        {loading ? (
          <div className="flex justify-center items-center py-20">
            <div className="w-12 h-12 border-4 border-gray-200 border-t-black rounded-full animate-spin"></div>
          </div>
        ) : filteredOffers.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Route</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredOffers.map((offer) => (
                  <tr key={offer.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="h-10 w-10 flex-shrink-0">
                          <img className="h-10 w-10 rounded-md object-cover" src={offer.image_url} alt="" />
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">{offer.title}</div>
                          <div className="text-sm text-gray-500">{offer.aircraft_type}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{offer.origin}</div>
                      <div className="text-sm text-gray-500">{offer.destination}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{formatDate(offer.departure_date)}</div>
                      {offer.return_date && (
                        <div className="text-sm text-gray-500">{formatDate(offer.return_date)}</div>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {offer.currency}{offer.price.toLocaleString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        {offer.is_featured && (
                          <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800 mr-2">
                            Featured
                          </span>
                        )}
                        {offer.is_empty_leg && (
                          <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-orange-100 text-orange-800">
                            Empty Leg
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex justify-end gap-2">
                        <button
                          onClick={() => handleEditOffer(offer)}
                          className="text-gray-600 hover:text-gray-900"
                        >
                          <Edit size={18} />
                        </button>
                        <button
                          onClick={() => handleDeleteOffer(offer.id)}
                          className="text-red-600 hover:text-red-900"
                        >
                          <Trash size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="text-center py-16">
            <p className="text-gray-500">No offers found. Create your first offer by clicking "Add New Offer".</p>
          </div>
        )}
      </div>

      {showForm && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div 
            ref={modalRef}
            className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] flex flex-col"
          >
            <div className="p-6 border-b border-gray-100">
              <div className="flex justify-between items-center">
                <h3 className="text-xl font-bold">{editingOffer ? 'Edit Offer' : 'Create New Offer'}</h3>
                <button
                  onClick={() => {
                    setShowForm(false);
                    resetForm();
                  }}
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                >
                  <X size={20} className="text-gray-500" />
                </button>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto p-6">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Title
                    </label>
                    <input
                      type="text"
                      name="title"
                      value={formData.title}
                      onChange={handleInputChange}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Aircraft Type
                    </label>
                    <input
                      type="text"
                      name="aircraft_type"
                      value={formData.aircraft_type}
                      onChange={handleInputChange}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Origin
                    </label>
                    <input
                      type="text"
                      name="origin"
                      value={formData.origin}
                      onChange={handleInputChange}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Destination
                    </label>
                    <input
                      type="text"
                      name="destination"
                      value={formData.destination}
                      onChange={handleInputChange}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Departure Date
                    </label>
                    <input
                      type="date"
                      name="departure_date"
                      value={formData.departure_date}
                      onChange={handleInputChange}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Return Date (Optional)
                    </label>
                    <input
                      type="date"
                      name="return_date"
                      value={formData.return_date}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Price
                    </label>
                    <div className="flex">
                      <select
                        name="currency"
                        value={formData.currency}
                        onChange={handleInputChange}
                        className="px-3 py-2 border border-gray-300 rounded-l-md focus:ring-2 focus:ring-black focus:border-transparent"
                      >
                        <option value="€">€</option>
                        <option value="$">$</option>
                        <option value="£">£</option>
                        <option value="CHF">CHF</option>
                      </select>
                      <input
                        type="number"
                        name="price"
                        value={formData.price}
                        onChange={handleInputChange}
                        required
                        min="0"
                        className="w-full px-3 py-2 border border-gray-300 rounded-r-md focus:ring-2 focus:ring-black focus:border-transparent"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Duration (e.g., "2h 30m")
                    </label>
                    <input
                      type="text"
                      name="duration"
                      value={formData.duration}
                      onChange={handleInputChange}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Passengers
                    </label>
                    <input
                      type="number"
                      name="passengers"
                      value={formData.passengers}
                      onChange={handleInputChange}
                      required
                      min="1"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
                    />
                  </div>

                  <div className="col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Offer Image
                    </label>
                    <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-lg">
                      <div className="space-y-1 text-center">
                        {formData.image_url ? (
                          <div className="relative">
                            <img
                              src={formData.image_url}
                              alt="Preview"
                              className="mx-auto h-32 w-auto rounded-lg"
                            />
                            <button
                              type="button"
                              onClick={() => setFormData(prev => ({ ...prev, image_url: '' }))}
                              className="absolute -top-2 -right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600"
                            >
                              <X size={14} />
                            </button>
                          </div>
                        ) : (
                          <>
                            <Upload
                              className="mx-auto h-12 w-12 text-gray-400"
                              strokeWidth={1}
                            />
                            <div className="flex text-sm text-gray-600">
                              <label
                                htmlFor="file-upload"
                                className="relative cursor-pointer bg-white rounded-md font-medium text-blue-600 hover:text-blue-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-blue-500"
                              >
                                <span>Upload a file</span>
                                <input
                                  id="file-upload"
                                  ref={fileInputRef}
                                  name="file-upload"
                                  type="file"
                                  className="sr-only"
                                  accept="image/*"
                                  onChange={handleImageUpload}
                                  disabled={uploadingImage}
                                />
                              </label>
                              <p className="pl-1">or drag and drop</p>
                            </div>
                            <p className="text-xs text-gray-500">
                              PNG, JPG, GIF up to 10MB
                            </p>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-6">
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        id="is_featured"
                        name="is_featured"
                        checked={formData.is_featured}
                        onChange={handleInputChange}
                        className="h-4 w-4 text-black focus:ring-black border-gray-300 rounded"
                      />
                      <label htmlFor="is_featured" className="ml-2 block text-sm text-gray-700">
                        Featured Offer
                      </label>
                    </div>
                    
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        id="is_empty_leg"
                        name="is_empty_leg"
                        checked={formData.is_empty_leg}
                        onChange={handleInputChange}
                        className="h-4 w-4 text-black focus:ring-black border-gray-300 rounded"
                      />
                      <label htmlFor="is_empty_leg" className="ml-2 block text-sm text-gray-700">
                        Empty Leg
                      </label>
                    </div>
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Description
                  </label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    required
                    rows={6}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
                  ></textarea>
                </div>
              </form>
            </div>

            <div className="p-6 border-t border-gray-100">
              <div className="flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => {
                    setShowForm(false);
                    resetForm();
                  }}
                  className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800"
                >
                  {editingOffer ? 'Update Offer' : 'Create Offer'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}