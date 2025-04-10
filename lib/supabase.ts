import { createClient } from '@supabase/supabase-js';
import { Database } from '@/types/supabase';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://fcgibbtjmmjpwtxnrrnq.supabase.co';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZjZ2liYnRqbW1qcHd0eG5ycm5xIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDA0MTU0MjIsImV4cCI6MjA1NTk5MTQyMn0.XapsbbYCRSRH8IZ4g23vZ-UzsJCASmgsYuR5lM6rIA8';

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    storage: typeof window !== 'undefined' ? window.localStorage : undefined
  }
});

// Export the typed version of supabase client
export type SupabaseClient = typeof supabase;