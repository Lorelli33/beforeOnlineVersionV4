import { supabase } from '../lib/supabase';
import { DocumentRequest, UserDocument, DocumentUploadResponse } from '../types/documents';
import { logger } from '../utils/logger';
import { sendNotification } from './notifications';

export const uploadDocument = async (
  file: File,
  documentRequestId: string,
  userId: string
): Promise<DocumentUploadResponse> => {
  try {
    // Get document request details
    const { data: request, error: requestError } = await supabase
      .from('document_requests')
      .select('*')
      .eq('id', documentRequestId)
      .single();

    if (requestError) throw requestError;

    // Generate secure file path
    const fileExt = file.name.split('.').pop();
    const fileName = `${userId}/${documentRequestId}/${Date.now()}.${fileExt}`;
    const filePath = `documents/${fileName}`;

    // Upload file to secure storage
    const { error: uploadError } = await supabase.storage
      .from('secure_documents')
      .upload(filePath, file);

    if (uploadError) throw uploadError;

    // Create document record
    const { data: document, error: documentError } = await supabase
      .from('user_documents')
      .insert([
        {
          user_id: userId,
          document_request_id: documentRequestId,
          document_type: request.document_type,
          status: 'pending'
        }
      ])
      .select()
      .single();

    if (documentError) throw documentError;

    // Notify admins of new document upload
    await sendNotification({
      userId: userId,
      type: 'documents_required',
      title: 'Document Uploaded',
      message: 'Your document has been uploaded and is pending review.',
      smsText: 'Your document has been uploaded and is pending review.'
    });

    return {
      path: filePath,
      document_id: document.id
    };
  } catch (error) {
    logger.error('Error uploading document:', error);
    return {
      path: '',
      document_id: '',
      error: 'Failed to upload document'
    };
  }
};

export const approveDocument = async (
  documentId: string,
  adminId: string,
  notes?: string
): Promise<{ success: boolean; error?: string }> => {
  try {
    // Update document status
    const { data: document, error: updateError } = await supabase
      .from('user_documents')
      .update({
        status: 'approved',
        admin_notes: notes,
        approved_at: new Date().toISOString(),
        approved_by: adminId
      })
      .eq('id', documentId)
      .select()
      .single();

    if (updateError) throw updateError;

    // Notify user of approval
    await sendNotification({
      userId: document.user_id,
      type: 'documents_required',
      title: 'Document Approved',
      message: 'Your document has been reviewed and approved.',
      smsText: 'Your document has been approved.'
    });

    return { success: true };
  } catch (error) {
    logger.error('Error approving document:', error);
    return { success: false, error: 'Failed to approve document' };
  }
};

export const rejectDocument = async (
  documentId: string,
  adminId: string,
  notes: string
): Promise<{ success: boolean; error?: string }> => {
  try {
    // Update document status
    const { data: document, error: updateError } = await supabase
      .from('user_documents')
      .update({
        status: 'rejected',
        admin_notes: notes
      })
      .eq('id', documentId)
      .select()
      .single();

    if (updateError) throw updateError;

    // Notify user of rejection
    await sendNotification({
      userId: document.user_id,
      type: 'documents_required',
      title: 'Document Rejected',
      message: 'Your document has been rejected. Please check the notes and resubmit.',
      smsText: 'Your document was not approved. Please check your email for details.'
    });

    return { success: true };
  } catch (error) {
    logger.error('Error rejecting document:', error);
    return { success: false, error: 'Failed to reject document' };
  }
};

export const getDocumentRequests = async (
  userId: string
): Promise<{ requests: DocumentRequest[]; error?: string }> => {
  try {
    const { data, error } = await supabase
      .from('document_requests')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false });

    if (error) throw error;

    return { requests: data || [] };
  } catch (error) {
    logger.error('Error fetching document requests:', error);
    return { requests: [], error: 'Failed to fetch document requests' };
  }
};

export const getUserDocuments = async (
  userId: string
): Promise<{ documents: UserDocument[]; error?: string }> => {
  try {
    const { data, error } = await supabase
      .from('user_documents')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false });

    if (error) throw error;

    return { documents: data || [] };
  } catch (error) {
    logger.error('Error fetching user documents:', error);
    return { documents: [], error: 'Failed to fetch user documents' };
  }
};

export const deleteDocument = async (
  documentId: string,
  userId: string
): Promise<{ success: boolean; error?: string }> => {
  try {
    // Get document details
    const { data: document, error: fetchError } = await supabase
      .from('user_documents')
      .select('*')
      .eq('id', documentId)
      .eq('user_id', userId)
      .single();

    if (fetchError) throw fetchError;

    // Delete from storage
    const { error: storageError } = await supabase.storage
      .from('secure_documents')
      .remove([`documents/${userId}/${document.document_request_id}/${documentId}`]);

    if (storageError) throw storageError;

    // Delete document record
    const { error: deleteError } = await supabase
      .from('user_documents')
      .delete()
      .eq('id', documentId)
      .eq('user_id', userId);

    if (deleteError) throw deleteError;

    return { success: true };
  } catch (error) {
    logger.error('Error deleting document:', error);
    return { success: false, error: 'Failed to delete document' };
  }
};