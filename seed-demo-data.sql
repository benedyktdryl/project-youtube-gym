-- Seed Demo Data Script
-- This script populates demo data for a user account
-- Run this AFTER creating a demo user account with email: demo@trainflow.com

-- Instructions:
-- 1. Sign up with email: demo@trainflow.com, password: Demo123!, name: Demo User
-- 2. Get your user ID from the profiles table
-- 3. Replace 'YOUR_USER_ID_HERE' below with your actual user ID
-- 4. Run this script

DO $$
DECLARE
  demo_user_id uuid;
  video1_id uuid;
  video2_id uuid;
  video3_id uuid;
  video4_id uuid;
BEGIN
  -- Get the demo user ID (replace with actual ID after signup)
  SELECT id INTO demo_user_id FROM profiles WHERE name = 'Demo User' LIMIT 1;

  IF demo_user_id IS NULL THEN
    RAISE EXCEPTION 'Demo user not found. Please sign up first with email: demo@trainflow.com';
  END IF;

  -- Update demo user preferences
  UPDATE user_preferences SET
    goal = 'muscle-gain',
    preferred_duration = 30,
    preferred_intensity = 'medium',
    available_equipment = ARRAY['mat', 'dumbbells', 'resistance-bands'],
    preferred_days = ARRAY['Monday', 'Wednesday', 'Friday', 'Saturday'],
    updated_at = now()
  WHERE user_id = demo_user_id;

  -- Get video IDs
  SELECT id INTO video1_id FROM workout_videos WHERE youtube_id = 'ml6cT4AZdqI' LIMIT 1;
  SELECT id INTO video2_id FROM workout_videos WHERE youtube_id = 'gC_L9qAHVJ8' LIMIT 1;
  SELECT id INTO video3_id FROM workout_videos WHERE youtube_id = 'X0r-OOKb-qw' LIMIT 1;
  SELECT id INTO video4_id FROM workout_videos WHERE youtube_id = 'DHpLgj_IK0s' LIMIT 1;

  -- Delete existing scheduled workouts for demo user
  DELETE FROM scheduled_workouts WHERE user_id = demo_user_id;

  -- Add scheduled workouts for this week
  -- Monday (2 days ago) - Completed
  IF video1_id IS NOT NULL THEN
    INSERT INTO scheduled_workouts (user_id, video_id, scheduled_date, is_completed, completed_at, created_at)
    VALUES (
      demo_user_id,
      video1_id,
      (CURRENT_DATE - INTERVAL '2 days')::date,
      true,
      (CURRENT_DATE - INTERVAL '2 days' + INTERVAL '10 hours')::timestamptz,
      now()
    );
  END IF;

  -- Wednesday (today) - Not completed
  IF video2_id IS NOT NULL THEN
    INSERT INTO scheduled_workouts (user_id, video_id, scheduled_date, is_completed, completed_at, created_at)
    VALUES (
      demo_user_id,
      video2_id,
      CURRENT_DATE,
      false,
      NULL,
      now()
    );
  END IF;

  -- Friday (2 days from now) - Not completed
  IF video3_id IS NOT NULL THEN
    INSERT INTO scheduled_workouts (user_id, video_id, scheduled_date, is_completed, completed_at, created_at)
    VALUES (
      demo_user_id,
      video3_id,
      (CURRENT_DATE + INTERVAL '2 days')::date,
      false,
      NULL,
      now()
    );
  END IF;

  -- Saturday (3 days from now) - Not completed
  IF video4_id IS NOT NULL THEN
    INSERT INTO scheduled_workouts (user_id, video_id, scheduled_date, is_completed, completed_at, created_at)
    VALUES (
      demo_user_id,
      video4_id,
      (CURRENT_DATE + INTERVAL '3 days')::date,
      false,
      NULL,
      now()
    );
  END IF;

  -- Add some chat messages
  DELETE FROM chat_messages WHERE user_id = demo_user_id;

  INSERT INTO chat_messages (user_id, role, content, created_at)
  VALUES
    (
      demo_user_id,
      'user',
      'Hi! I want to build muscle and lose some weight. I have dumbbells and a yoga mat at home.',
      now() - INTERVAL '5 days'
    ),
    (
      demo_user_id,
      'assistant',
      'Great! Building muscle while losing weight is definitely achievable. With dumbbells and a yoga mat, you have everything you need to get started. I recommend a combination of strength training and HIIT workouts. Would you like me to create a weekly workout plan for you?',
      now() - INTERVAL '5 days' + INTERVAL '30 seconds'
    ),
    (
      demo_user_id,
      'user',
      'Yes please! I can workout 4 days a week, about 30 minutes per session.',
      now() - INTERVAL '5 days' + INTERVAL '2 minutes'
    ),
    (
      demo_user_id,
      'assistant',
      'Perfect! Based on your goals and available equipment, I have created a 4-day workout plan for you:\n\nMonday: Full Body HIIT (30 min)\nWednesday: Upper Body Strength (30 min)\nFriday: Lower Body Strength (30 min)\nSaturday: Core & Flexibility (20-30 min)\n\nI have added these workouts to your calendar. You can find them in the Videos section and adjust as needed!',
      now() - INTERVAL '5 days' + INTERVAL '3 minutes'
    );

  RAISE NOTICE 'Demo data seeded successfully for user: %', demo_user_id;
END $$;
