-- Migration: Add displayName, bio, and skillLevel columns to users table
ALTER TABLE users ADD COLUMN displayName TEXT;
ALTER TABLE users ADD COLUMN bio TEXT;
ALTER TABLE users ADD COLUMN skillLevel TEXT DEFAULT 'beginner';
