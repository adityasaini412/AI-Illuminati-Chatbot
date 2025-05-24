/*
  # Fix profiles table RLS policies

  1. Changes
    - Drop existing INSERT policy that wasn't working correctly
    - Add new INSERT policy with proper conditions for signup
    - Ensure proper RLS policies for profile management

  2. Security
    - Enable RLS on profiles table (already enabled)
    - Add policy for profile creation during signup
    - Maintain existing policies for other operations
*/

-- Drop the existing problematic INSERT policy
DROP POLICY IF EXISTS "Enable profile creation during signup" ON profiles;

-- Create new INSERT policy that properly handles signup
CREATE POLICY "Enable profile creation during signup"
ON profiles
FOR INSERT
TO public
WITH CHECK (
  -- During signup, auth.uid() will match the id being inserted
  auth.uid() = id
);

-- Verify other essential policies exist (these are already present but included for completeness)
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE tablename = 'profiles' 
    AND policyname = 'Users can read own profile'
  ) THEN
    CREATE POLICY "Users can read own profile"
    ON profiles
    FOR SELECT
    TO authenticated
    USING ((auth.uid() = id) OR (EXISTS ( 
      SELECT 1 FROM profiles profiles_1
      WHERE ((profiles_1.id = auth.uid()) AND (profiles_1.is_admin = true))
    )));
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE tablename = 'profiles' 
    AND policyname = 'Users can update own profile'
  ) THEN
    CREATE POLICY "Users can update own profile"
    ON profiles
    FOR UPDATE
    TO authenticated
    USING (auth.uid() = id)
    WITH CHECK (auth.uid() = id);
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE tablename = 'profiles' 
    AND policyname = 'Admins can do all operations'
  ) THEN
    CREATE POLICY "Admins can do all operations"
    ON profiles
    FOR ALL
    TO authenticated
    USING (EXISTS (
      SELECT 1 FROM profiles profiles_1
      WHERE ((profiles_1.id = auth.uid()) AND (profiles_1.is_admin = true))
    ));
  END IF;
END $$;