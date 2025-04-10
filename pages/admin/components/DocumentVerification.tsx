import React, { useState, useEffect } from 'react';
import { FileCheck, AlertTriangle, Check, X, Eye, Download } from 'lucide-react';
import { supabase } from '../../../lib/supabase';

interface Document {
  id: string;
  user_id: string;
  document_type: string;
  status: string;
  created_at: string;
  admin_notes?: string;
  user: {
    name: string;
    email: string;
  };
}

export default function DocumentVerification() {
  const [documents, setDocuments] = useState<Document[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState('pending');

  useEffect(() => {
    fetchDocuments();
  }, []);

  const fetchDocuments = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('user_documents')
        .select(`
          *,
          user:user_id (
            name,
            email
          )
        `)
        .order('created_at', { ascending: false });

      if (error) throw error;

      setDocuments(data || []);
    } catch (error) {
      console.error('Error fetching documents:', error);
      setError('Failed to load documents');
    } finally {
      setLoading(false);
    }
  };

  const handleApprove = async (documentId: string) => {
    try {
      const { error } = await supabase
        .from('user_documents')
        .update({
          status: 'approved',
          admin_notes: 'Document approved'
        })
        .eq('id', documentId);

      if (error) throw error;

      fetchDocuments();
    } catch (error) {
      console.error('Error approving document:', error);
    }
  };

  const handleReject = async (documentId: string, reason: string) => {
    try {
      const { error } = await supabase
        .from('user_documents')
        .update({
          status: 'rejected',
          admin_notes: reason
        })
        .eq('id', documentId);

      if (error) throw error;

      fetchDocuments();
    } catch (error) {
      console.error('Error rejecting document:', error);
    }
  };

  const getStatusColor = (status: string): string => {
    switch (status.toLowerCase()) {
      case 'approved':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'rejected':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const filteredDocuments = documents.filter(doc => {
    if (activeTab === 'all') return true;
    return doc.status.toLowerCase() === activeTab;
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
        <h2 className="text-2xl font-bold">Document Verification</h2>
        <p className="text-gray-600">Review and verify user documents</p>
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
              All Documents
            </button>
            <button
              onClick={() => setActiveTab('pending')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'pending'
                  ? 'border-black text-black'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Pending Review
            </button>
            <button
              onClick={() => setActiveTab('approved')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'approved'
                  ? 'border-black text-black'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Approved
            </button>
            <button
              onClick={() => setActiveTab('rejected')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'rejected'
                  ? 'border-black text-black'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Rejected
            </button>
          </nav>
        </div>
      </div>

      {/* Documents List */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Document
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  User
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Submitted
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
              {filteredDocuments.map((doc) => (
                <tr key={doc.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10 bg-gray-100 rounded-lg flex items-center justify-center">
                        <FileCheck size={20} className="text-gray-500" />
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">
                          {doc.document_type}
                        </div>
                        <div className="text-sm text-gray-500">
                          ID: {doc.id.slice(0, 8)}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">
                      {doc.user.name}
                    </div>
                    <div className="text-sm text-gray-500">
                      {doc.user.email}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {new Date(doc.created_at).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(doc.status)}`}>
                      {doc.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex justify-end gap-2">
                      <button
                        onClick={() => {/* View document */}}
                        className="text-gray-600 hover:text-gray-900"
                      >
                        <Eye size={18} />
                      </button>
                      <button
                        onClick={() => {/* Download document */}}
                        className="text-gray-600 hover:text-gray-900"
                      >
                        <Download size={18} />
                      </button>
                      {doc.status === 'pending' && (
                        <>
                          <button
                            onClick={() => handleApprove(doc.id)}
                            className="text-green-600 hover:text-green-900"
                          >
                            <Check size={18} />
                          </button>
                          <button
                            onClick={() => handleReject(doc.id, 'Document does not meet requirements')}
                            className="text-red-600 hover:text-red-900"
                          >
                            <X size={18} />
                          </button>
                        </>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredDocuments.length === 0 && (
          <div className="text-center py-12">
            <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <FileCheck size={24} className="text-gray-400" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900">No documents found</h3>
            <p className="text-gray-500 mt-2">
              {activeTab === 'pending'
                ? 'No documents are pending review.'
                : activeTab === 'approved'
                ? 'No documents have been approved yet.'
                : activeTab === 'rejected'
                ? 'No documents have been rejected.'
                : 'No documents found in the system.'}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}