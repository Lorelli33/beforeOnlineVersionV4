export interface User {
  id: string;
  email: string;
  name: string | null;
  created_at: string;
  updated_at: string;
  last_login?: string | null;
  is_admin: boolean;
  email_verified: boolean;
  walletAddress?: string;
}

export interface UserProfile {
  id: string;
  user_id: string;
  bio?: string | null;
  phone?: string | null;
  address?: string | null;
  city?: string | null;
  country?: string | null;
  created_at: string;
  updated_at: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterCredentials {
  email: string;
  password: string;
  name: string;
  phone?: string;
  walletAddress?: string;
}