/*
  # Fix profiles table RLS policies

  1. Changes
    - Drop existing policies and create new ones with proper permissions
    - Add policies for:
      - Profile creation during signup
      - Profile reading and updating for authenticated users
      - Admin access to all profiles
  
  2. Security
    - Enable RLS (already enabled)
    - Add comprehensive policies for all operations
    - Ensure proper access control based on user role
*/

-- Drop existing policies
DROP POLICY IF EXISTS "Enable profile creation during signup" ON profiles;
DROP POLICY IF EXISTS "Users can read own profile" ON profiles;
DROP POLICY IF EXISTS "Users can update own profile" ON profiles;

-- Create new policies
CREATE POLICY "Enable profile creation during signup"
ON profiles FOR INSERT
TO authenticated, anon
WITH CHECK (
  auth.uid() = id
);

CREATE POLICY "Users can read own profile"
ON profiles FOR SELECT
TO authenticated
USING (
  auth.uid() = id OR 
  (
    SELECT is_admin FROM profiles WHERE id = auth.uid()
  ) = true
);

CREATE POLICY "Users can update own profile"
ON profiles FOR UPDATE
TO authenticated
USING (auth.uid() = id)
WITH CHECK (auth.uid() = id);

CREATE POLICY "Admins can do all operations"
ON profiles FOR ALL
TO authenticated
USING (
  (
    SELECT is_admin FROM profiles WHERE id = auth.uid()
  ) = true
);