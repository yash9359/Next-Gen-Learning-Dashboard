--1. Create the courses table
CREATE TABLE IF NOT EXISTS public.courses (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT NOT NULL,
    progress INTEGER NOT NULL CHECK (progress >= 0 AND progress <= 100),
    icon_name TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 2. Enable Row Level Security (RLS) (Optional, but recommended)
ALTER TABLE public.courses ENABLE ROW LEVEL SECURITY;

-- 3. Create a policy to allow anyone to read courses (since this is a public demo dashboard)
CREATE POLICY "Allow public read access to courses" 
ON public.courses 
FOR SELECT 
USING (true);

-- 4. Delete existing rows to prevent duplicates if seeding multiple times
TRUNCATE TABLE public.courses;

-- 5. Insert mock courses seed data
INSERT INTO public.courses (title, progress, icon_name) VALUES
('Advanced React & Architecture', 78, 'Blocks'),
('Interactive Web Animations with Framer Motion', 45, 'Sparkles'),
('Full-Stack Database Design with Supabase', 92, 'Database'),
('Creative UI/UX & Generative Aesthetics', 60, 'Palette'),
('Next.js Performance & Core Web Vitals', 20, 'Zap');
