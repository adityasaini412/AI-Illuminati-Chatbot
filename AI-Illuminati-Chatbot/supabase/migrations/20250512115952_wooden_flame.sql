/*
  # Fix profile creation and RLS policies

  1. Changes
    - Drop existing policies to start fresh
    - Create new INSERT policy that allows profile creation during signup
    - Ensure proper policies for authenticated users
    - Add admin policies

  2. Security
    - Enable RLS on profiles table
    - Add policies for profile creation and management
    - Add admin access policies
*/

-- Drop all existing policies to start fresh
DROP POLICY IF EXISTS "Enable profile creation during signup" ON profiles;
DROP POLICY IF EXISTS "Users can read own profile" ON profiles;
DROP POLICY IF EXISTS "Users can update own profile" ON profiles;
DROP POLICY IF EXISTS "Admins can do all operations" ON profiles;

-- Create new INSERT policy for profile creation
CREATE POLICY "Enable profile creation during signup"
ON profiles
FOR INSERT
TO public
WITH CHECK (true);

-- Allow users to read their own profile
CREATE POLICY "Users can read own profile"
ON profiles
FOR SELECT
TO authenticated
USING (
  auth.uid() = id OR 
  EXISTS (
    SELECT 1 FROM profiles WHERE id = auth.uid() AND is_admin = true
  )
);

-- Allow users to update their own profile
CREATE POLICY "Users can update own profile"
ON profiles
FOR UPDATE
TO authenticated
USING (auth.uid() = id)
WITH CHECK (auth.uid() = id);

-- Allow admins full access
CREATE POLICY "Admins can do all operations"
ON profiles
FOR ALL
TO authenticated
USING (
  EXISTS (
    SELECT 1 FROM profiles WHERE id = auth.uid() AND is_admin = true
  )
);