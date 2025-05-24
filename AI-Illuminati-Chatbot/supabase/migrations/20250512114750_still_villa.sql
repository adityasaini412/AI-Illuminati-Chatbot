/*
  # Update profiles table RLS policies

  1. Changes
    - Drop existing INSERT policy
    - Add new INSERT policy that allows profile creation during signup
    - Maintain existing SELECT and UPDATE policies

  2. Security
    - Allow profile creation during signup by checking auth.uid() matches the id
    - Maintain row-level security for reading and updating profiles
*/

-- Drop the existing INSERT policy
DROP POLICY IF EXISTS "Users can create own profile" ON profiles;

-- Create new INSERT policy that works during signup
CREATE POLICY "Enable profile creation during signup"
ON profiles
FOR INSERT
TO authenticated, anon
WITH CHECK (
  -- Allow if the user is creating their own profile
  auth.uid() = id OR
  -- Or if it's during signup (auth.uid() is null)
  (auth.uid() IS NULL AND EXISTS (
    SELECT 1 FROM auth.users WHERE auth.users.id = profiles.id
  ))
);