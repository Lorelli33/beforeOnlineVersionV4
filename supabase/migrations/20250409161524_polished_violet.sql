-- Create the booking_user_info table
CREATE TABLE IF NOT EXISTS booking_user_info (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  offer_id text NOT NULL,
  offer_type text NOT NULL,
  name text NOT NULL,
  email text NOT NULL,
  phone text NOT NULL,
  birthdate date,
  additional_services jsonb DEFAULT '{}'::jsonb,
  special_requests text,
  created_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE booking_user_info ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Allow authenticated users to insert booking_user_info"
  ON booking_user_info
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Allow users to view their own booking_user_info"
  ON booking_user_info
  FOR SELECT
  TO authenticated
  USING (email = auth.email());

CREATE POLICY "Allow admins to view all booking_user_info"
  ON booking_user_info
  FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM users
      WHERE users.id = auth.uid() AND users.is_admin = true
    )
  );