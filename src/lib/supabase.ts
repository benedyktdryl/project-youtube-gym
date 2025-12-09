import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export type Database = {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string;
          name: string;
          avatar_url: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id: string;
          name: string;
          avatar_url?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          avatar_url?: string | null;
          created_at?: string;
          updated_at?: string;
        };
      };
      user_preferences: {
        Row: {
          id: string;
          user_id: string;
          goal: string;
          preferred_duration: number;
          preferred_intensity: string;
          available_equipment: string[];
          preferred_days: string[];
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          goal?: string;
          preferred_duration?: number;
          preferred_intensity?: string;
          available_equipment?: string[];
          preferred_days?: string[];
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          goal?: string;
          preferred_duration?: number;
          preferred_intensity?: string;
          available_equipment?: string[];
          preferred_days?: string[];
          created_at?: string;
          updated_at?: string;
        };
      };
      workout_videos: {
        Row: {
          id: string;
          youtube_id: string;
          title: string;
          channel_name: string;
          channel_thumbnail: string;
          thumbnail_url: string;
          duration: number;
          intensity: string;
          muscle_groups: string[];
          equipment_needed: string[];
          exercises: any;
          created_at: string;
        };
        Insert: {
          id?: string;
          youtube_id: string;
          title: string;
          channel_name: string;
          channel_thumbnail: string;
          thumbnail_url: string;
          duration: number;
          intensity: string;
          muscle_groups?: string[];
          equipment_needed?: string[];
          exercises?: any;
          created_at?: string;
        };
        Update: {
          id?: string;
          youtube_id?: string;
          title?: string;
          channel_name?: string;
          channel_thumbnail?: string;
          thumbnail_url?: string;
          duration?: number;
          intensity?: string;
          muscle_groups?: string[];
          equipment_needed?: string[];
          exercises?: any;
          created_at?: string;
        };
      };
      scheduled_workouts: {
        Row: {
          id: string;
          user_id: string;
          video_id: string;
          scheduled_date: string;
          is_completed: boolean;
          completed_at: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          video_id: string;
          scheduled_date: string;
          is_completed?: boolean;
          completed_at?: string | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          video_id?: string;
          scheduled_date?: string;
          is_completed?: boolean;
          completed_at?: string | null;
          created_at?: string;
        };
      };
      chat_messages: {
        Row: {
          id: string;
          user_id: string;
          role: string;
          content: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          role: string;
          content: string;
          created_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          role?: string;
          content?: string;
          created_at?: string;
        };
      };
    };
  };
};
