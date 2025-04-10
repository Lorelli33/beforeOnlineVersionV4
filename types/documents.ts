export interface DocumentRequest {
  id: string;
  user_id: string;
  booking_id: string;
  status: 'pending' | 'approved' | 'rejected';
  created_at: string;
  updated_at: string;
  expires_at: string;
  document_type: 'passport' | 'id' | 'visa';
  notes?: string;
}

export interface UserDocument {
  id: string;
  user_id: string;
  document_request_id: string;
  document_type: 'passport' | 'id' | 'visa';
  status: 'pending' | 'approved' | 'rejected';
  admin_notes?: string;
  created_at: string;
  updated_at: string;
  approved_at?: string;
  approved_by?: string;
}

export interface DocumentUploadResponse {
  path: string;
  document_id: string;
  error?: string;
}