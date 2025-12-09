/*
  # Initial TrainFlow Schema Setup

  ## Overview
  This migration sets up the complete database schema for the TrainFlow application,
  including user profiles, workout preferences, videos, calendar workouts, and chat history.

  ## New Tables Created

  ### 1. `profiles`
  Extended user profile information linked to Supabase auth.users
  - `id` (uuid, primary key, references auth.users)
  - `name` (text) - User's display name
  - `avatar_url` (text, nullable) - Profile picture URL
  - `created_at` (timestamptz) - Account creation timestamp
  - `updated_at` (timestamptz) - Last profile update timestamp

  ### 2. `user_preferences`
  User workout preferences and goals
  - `id` (uuid, primary key)
  - `user_id` (uuid, references profiles) - Owner of preferences
  - `goal` (text) - Primary fitness goal (e.g., 'muscle-gain', 'weight-loss', 'general-fitness')
  - `preferred_duration` (integer) - Preferred workout length in minutes
  - `preferred_intensity` (text) - Preferred intensity level ('low', 'medium', 'high')
  - `available_equipment` (text[]) - Array of available equipment IDs
  - `preferred_days` (text[]) - Array of preferred workout days
  - `created_at` (timestamptz) - Preference creation timestamp
  - `updated_at` (timestamptz) - Last preference update timestamp

  ### 3. `workout_videos`
  Catalog of available workout videos from YouTube
  - `id` (uuid, primary key)
  - `youtube_id` (text, unique) - YouTube video ID
  - `title` (text) - Video title
  - `channel_name` (text) - YouTube channel name
  - `channel_thumbnail` (text) - Channel avatar URL
  - `thumbnail_url` (text) - Video thumbnail URL
  - `duration` (integer) - Video duration in seconds
  - `intensity` (text) - Workout intensity level
  - `muscle_groups` (text[]) - Target muscle groups
  - `equipment_needed` (text[]) - Required equipment
  - `exercises` (jsonb) - Detailed exercise breakdown with timestamps
  - `created_at` (timestamptz) - Record creation timestamp

  ### 4. `scheduled_workouts`
  User's workout calendar/schedule
  - `id` (uuid, primary key)
  - `user_id` (uuid, references profiles) - Owner of workout schedule
  - `video_id` (uuid, references workout_videos) - Scheduled video
  - `scheduled_date` (date) - Date workout is scheduled for
  - `is_completed` (boolean) - Completion status
  - `completed_at` (timestamptz, nullable) - Completion timestamp
  - `created_at` (timestamptz) - Schedule creation timestamp

  ### 5. `chat_messages`
  AI assistant chat history
  - `id` (uuid, primary key)
  - `user_id` (uuid, references profiles) - Message owner
  - `role` (text) - Message role ('user' or 'assistant')
  - `content` (text) - Message content
  - `created_at` (timestamptz) - Message timestamp

  ## Security (Row Level Security)

  All tables have RLS enabled with policies that:
  - Allow users to read only their own data
  - Allow users to insert their own data
  - Allow users to update their own data
  - Allow users to delete their own data
  - workout_videos table allows authenticated users to read all videos (public catalog)

  ## Important Notes
  - All timestamps use `timestamptz` for timezone awareness
  - UUIDs are generated using `gen_random_uuid()`
  - Foreign key constraints ensure data integrity
  - Indexes are created on frequently queried columns for performance
*/

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Profiles table (extends auth.users)
CREATE TABLE IF NOT EXISTS profiles (
  id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  name text NOT NULL,
  avatar_url text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can read own profile"
  ON profiles FOR SELECT
  TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "Users can insert own profile"
  ON profiles FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = id);

CREATE POLICY "Users can update own profile"
  ON profiles FOR UPDATE
  TO authenticated
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);

-- User preferences table
CREATE TABLE IF NOT EXISTS user_preferences (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  goal text NOT NULL DEFAULT 'general-fitness',
  preferred_duration integer NOT NULL DEFAULT 30,
  preferred_intensity text NOT NULL DEFAULT 'medium',
  available_equipment text[] DEFAULT '{}',
  preferred_days text[] DEFAULT '{}',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  UNIQUE(user_id)
);

ALTER TABLE user_preferences ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can read own preferences"
  ON user_preferences FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own preferences"
  ON user_preferences FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own preferences"
  ON user_preferences FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete own preferences"
  ON user_preferences FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);

-- Workout videos table (public catalog)
CREATE TABLE IF NOT EXISTS workout_videos (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  youtube_id text UNIQUE NOT NULL,
  title text NOT NULL,
  channel_name text NOT NULL,
  channel_thumbnail text NOT NULL,
  thumbnail_url text NOT NULL,
  duration integer NOT NULL,
  intensity text NOT NULL,
  muscle_groups text[] DEFAULT '{}',
  equipment_needed text[] DEFAULT '{}',
  exercises jsonb DEFAULT '[]',
  created_at timestamptz DEFAULT now()
);

ALTER TABLE workout_videos ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can read workout videos"
  ON workout_videos FOR SELECT
  TO authenticated
  USING (true);

-- Create index for better query performance
CREATE INDEX IF NOT EXISTS idx_workout_videos_intensity ON workout_videos(intensity);
CREATE INDEX IF NOT EXISTS idx_workout_videos_duration ON workout_videos(duration);

-- Scheduled workouts table
CREATE TABLE IF NOT EXISTS scheduled_workouts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  video_id uuid NOT NULL REFERENCES workout_videos(id) ON DELETE CASCADE,
  scheduled_date date NOT NULL,
  is_completed boolean DEFAULT false,
  completed_at timestamptz,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE scheduled_workouts ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can read own scheduled workouts"
  ON scheduled_workouts FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own scheduled workouts"
  ON scheduled_workouts FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own scheduled workouts"
  ON scheduled_workouts FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete own scheduled workouts"
  ON scheduled_workouts FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);

-- Create index for better query performance
CREATE INDEX IF NOT EXISTS idx_scheduled_workouts_user_date ON scheduled_workouts(user_id, scheduled_date);

-- Chat messages table
CREATE TABLE IF NOT EXISTS chat_messages (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  role text NOT NULL CHECK (role IN ('user', 'assistant')),
  content text NOT NULL,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE chat_messages ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can read own chat messages"
  ON chat_messages FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own chat messages"
  ON chat_messages FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete own chat messages"
  ON chat_messages FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);

-- Create index for better query performance
CREATE INDEX IF NOT EXISTS idx_chat_messages_user_created ON chat_messages(user_id, created_at DESC);

-- Function to automatically update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger for profiles table
DROP TRIGGER IF EXISTS update_profiles_updated_at ON profiles;
CREATE TRIGGER update_profiles_updated_at
  BEFORE UPDATE ON profiles
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Trigger for user_preferences table
DROP TRIGGER IF EXISTS update_user_preferences_updated_at ON user_preferences;
CREATE TRIGGER update_user_preferences_updated_at
  BEFORE UPDATE ON user_preferences
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();