/*
  # Fix profile creation policies

  1. Changes
    - Drop existing policies that might conflict
    - Create new policies with proper permissions for signup flow
    - Ensure proper admin access
    - Fix profile creation during signup

  2. Security
    - Maintain RLS security while allowing necessary operations
    - Ensure proper access control for different user types
*/

-- Drop existing policies to avoid conflicts
DROP POLICY IF EXISTS "Enable profile creation during signup" ON profiles;
DROP POLICY IF EXISTS "Users can read own profile" ON profiles;
DROP POLICY IF EXISTS "Users can update own profile" ON profiles;
DROP POLICY IF EXISTS "Admins can do all operations" ON profiles;

-- Create new profile creation policy that works during signup
CREATE POLICY "Enable profile creation during signup"
ON profiles FOR INSERT
TO anon, authenticated
WITH CHECK (true);

-- Allow users to read their own profile (or admins to read any)
CREATE POLICY "Users can read own profile"
ON profiles FOR SELECT
TO authenticated
USING (
  auth.uid() = id OR 
  EXISTS (
    SELECT 1 FROM profiles 
    WHERE id = auth.uid() AND is_admin = true
  )
);

-- Allow users to update their own profile
CREATE POLICY "Users can update own profile"
ON profiles FOR UPDATE
TO authenticated
USING (auth.uid() = id)
WITH CHECK (auth.uid() = id);

-- Allow admins full access
CREATE POLICY "Admins can do all operations"
ON profiles FOR ALL
TO authenticated
USING (
  EXISTS (
    SELECT 1 FROM profiles 
    WHERE id = auth.uid() AND is_admin = true
  )
);