/*
  # Add chat_id to chat_history table

  This migration adds a chat_id column to the chat_history table to support
  grouping messages into separate conversations.

  1. Changes
    - Add chat_id column to chat_history table
    - Update existing rows with a default chat_id
    - Make chat_id NOT NULL after update
*/

-- Add chat_id column
ALTER TABLE chat_history 
ADD COLUMN chat_id uuid;

-- Update existing rows with a default chat_id
WITH chat_groups AS (
  SELECT DISTINCT user_id, gen_random_uuid() as new_chat_id
  FROM chat_history
)
UPDATE chat_history
SET chat_id = chat_groups.new_chat_id
FROM chat_groups
WHERE chat_history.user_id = chat_groups.user_id;

-- Make chat_id NOT NULL
ALTER TABLE chat_history 
ALTER COLUMN chat_id SET NOT NULL;

-- Add index for better query performance
CREATE INDEX idx_chat_history_chat_id ON chat_history(chat_id);