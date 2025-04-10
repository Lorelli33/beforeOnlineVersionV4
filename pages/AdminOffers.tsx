import React, { useState, useEffect } from 'react';
import { Search, Plus, Edit, Trash, X, ArrowLeft } from 'lucide-react';
import Logo from '../components/Logo';
import { supabase } from '../lib/supabase';

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

export default function AdminOffers() {
  const [offers, setOffers] = useState<FixedOffer[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingOffer, setEditingOffer] = useState<FixedOffer | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState('fixed');
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
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      
      setOffers(data || []);
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
      
      // Refresh offers list
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
    const searchLower = searchTerm.toLowerCase();
    return (
      offer.title.toLowerCase().includes(searchLower) ||
      offer.origin.toLowerCase().includes(searchLower) ||
      offer.destination.toLowerCase().includes(searchLower) ||
      offer.aircraft_type.toLowerCase().includes(searchLower)
    );
  });

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString();
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <a href="/" className="flex-shrink-0">
                <Logo />
              </a>
              <h1 className="ml-4 text-xl font-bold text-gray-900">Admin Dashboard</h1>
            </div>
            <a 
              href="/fixed-offers" 
              className="flex items-center gap-2 text-gray-600 hover:text-gray-900"
            >
              <ArrowLeft size={16} />
              <span>Back to Offers</span>
            </a>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {showForm ? (
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold">{editingOffer ? 'Edit Offer' : 'Create New Offer'}</h2>
              <button
                onClick={() => {
                  setShowForm(false);
                  resetForm();
                }}
                className="p-2 hover:bg-gray-100 rounded-full"
              >
                <X size={20} className="text-gray-500" />
              </button>
            </div>
            
            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
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
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-black focus:border-black"
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
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-black focus:border-black"
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
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-black focus:border-black"
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
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-black focus:border-black"
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
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-black focus:border-black"
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
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-black focus:border-black"
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
                      className="px-3 py-2 border border-gray-300 rounded-l-md focus:ring-black focus:border-black"
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
                      className="w-full px-3 py-2 border border-gray-300 rounded-r-md focus:ring-black focus:border-black"
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
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-black focus:border-black"
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
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-black focus:border-black"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Image URL
                  </label>
                  <input
                    type="url"
                    name="image_url"
                    value={formData.image_url}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-black focus:border-black"
                  />
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
              
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Description
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  required
                  rows={6}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-black focus:border-black"
                ></textarea>
              </div>
              
              <div className="flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => {
                    setShowForm(false);
                    resetForm();
                  }}
                  className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-black text-white rounded-md hover:bg-gray-800"
                >
                  {editingOffer ? 'Update Offer' : 'Create Offer'}
                </button>
              </div>
            </form>
          </div>
        ) : (
          <>
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">Manage Offers</h2>
                <p className="text-gray-600">Create, edit, and delete fixed offers and empty legs</p>
              </div>
              
              <div className="flex flex-col md:flex-row gap-3">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search offers..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-black focus:border-black"
                  />
                  <Search size={18} className="absolute left-3 top-2.5 text-gray-400" />
                </div>
                
                <button
                  onClick={() => {
                    resetForm();
                    setShowForm(true);
                  }}
                  className="flex items-center gap-2 px-4 py-2 bg-black text-white rounded-md hover:bg-gray-800"
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
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Title
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Route
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Date
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Price
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
          </>
        )}
      </main>
    </div>
  );
}