/*
  # Update Company Logo URL

  1. Changes
    - Updates the company_settings table with a direct URL to the new logo
*/

-- Update company settings with the new logo
UPDATE company_settings
SET logo_url = 'https://raw.githubusercontent.com/stackblitz/private-jet-icons/main/x-logo-black.webp',
    updated_at = now();