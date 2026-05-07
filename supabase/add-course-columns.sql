-- Add completed_courses and started_courses columns to profiles table
-- Run this in Supabase SQL editor

ALTER TABLE public.profiles
ADD COLUMN IF NOT EXISTS completed_courses TEXT[] DEFAULT '{}',
ADD COLUMN IF NOT EXISTS started_courses TEXT[] DEFAULT '{}';