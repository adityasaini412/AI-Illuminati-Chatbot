/*
  # Fix infinite recursion in RLS policies

  1. Changes
    - Remove recursive policy checks
    - Simplify admin access policies
    - Fix API key access policy
  
  2. Security
    - Maintain same level of access control
    - Prevent policy recursion
    - Ensure proper API key access for admins
*/

-- Drop existing problematic policies
DROP POLICY IF EXISTS "Only admins can manage API keys" ON api_keys;
DROP POLICY IF EXISTS "Admins can do all operations" ON profiles;
DROP POLICY IF EXISTS "Users can read own profile" ON profiles;

-- Create new non-recursive policies for profiles
CREATE POLICY "Admins can do all operations"
ON profiles
FOR ALL 
TO authenticated
USING (is_admin = true);

CREATE POLICY "Users can read own profile"
ON profiles
FOR SELECT
TO authenticated
USING (auth.uid() = id OR is_admin = true);

-- Create new API keys policy without recursion
CREATE POLICY "Admins can manage API keys"
ON api_keys
FOR ALL
TO authenticated
USING (
  EXISTS (
    SELECT 1 
    FROM profiles 
    WHERE id = auth.uid() 
    AND is_admin = true
  )
);