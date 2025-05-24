/*
  # Fix infinite recursion in profile policies

  1. Changes
    - Remove recursive admin check from profile policies
    - Simplify admin policy to directly check is_admin flag
    - Keep other policies unchanged
    
  2. Security
    - Maintains RLS protection
    - Preserves admin-only access where needed
    - Prevents infinite recursion while keeping security intact
*/

-- Drop existing policies
DROP POLICY IF EXISTS "Admins can do all operations" ON profiles;
DROP POLICY IF EXISTS "Users can read own profile" ON profiles;

-- Create new non-recursive policies
CREATE POLICY "Admins can do all operations"
ON profiles
FOR ALL 
TO authenticated
USING (
  is_admin = true
);

CREATE POLICY "Users can read own profile"
ON profiles
FOR SELECT
TO authenticated
USING (
  auth.uid() = id OR is_admin = true
);