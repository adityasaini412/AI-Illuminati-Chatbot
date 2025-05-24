/*
  # Add profile creation policy

  1. Security Changes
    - Add RLS policy to allow authenticated users to create their own profile
    - Policy ensures users can only create a profile with their own auth.uid()
*/

CREATE POLICY "Users can create own profile"
  ON profiles
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = id);