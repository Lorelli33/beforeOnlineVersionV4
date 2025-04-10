export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      users: {
        Row: {
          id: string
          email: string
          name: string | null
          created_at: string
          updated_at: string
          last_login: string | null
          is_admin: boolean
          email_verified: boolean
        }
        Insert: {
          id?: string
          email: string
          name?: string | null
          created_at?: string
          updated_at?: string
          last_login?: string | null
          is_admin?: boolean
          email_verified?: boolean
        }
        Update: {
          id?: string
          email?: string
          name?: string | null
          created_at?: string
          updated_at?: string
          last_login?: string | null
          is_admin?: boolean
          email_verified?: boolean
        }
      }
      user_profiles: {
        Row: {
          id: string
          user_id: string
          bio: string | null
          phone: string | null
          address: string | null
          city: string | null
          country: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          bio?: string | null
          phone?: string | null
          address?: string | null
          city?: string | null
          country?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          bio?: string | null
          phone?: string | null
          address?: string | null
          city?: string | null
          country?: string | null
          created_at?: string
          updated_at?: string
        }
      }
    }
  }
}