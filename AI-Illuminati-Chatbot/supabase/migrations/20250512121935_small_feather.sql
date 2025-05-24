/*
  # Create chat history table

  1. New Tables
    - `chat_history`
      - `id` (uuid, primary key)
      - `user_id` (uuid, references profiles)
      - `content` (text)
      - `sender` (text)
      - `created_at` (timestamp)

  2. Security
    - Enable RLS
    - Add policies for user access to their own chat history
*/

CREATE TABLE IF NOT EXISTS chat_history (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES profiles(id) ON DELETE CASCADE,
  content text NOT NULL,
  sender text NOT NULL CHECK (sender IN ('user', 'ai')),
  created_at timestamptz DEFAULT now()
);

ALTER TABLE chat_history ENABLE ROW LEVEL SECURITY;

-- Allow users to read their own chat history
CREATE POLICY "Users can read own chat history"
ON chat_history
FOR SELECT
TO authenticated
USING (user_id = auth.uid());

-- Allow users to insert into their own chat history
CREATE POLICY "Users can insert own chat history"
ON chat_history
FOR INSERT
TO authenticated
WITH CHECK (user_id = auth.uid());