
-- Drop existing tables if they exist to start fresh
DROP TABLE IF EXISTS public.user_achievements CASCADE;
DROP TABLE IF EXISTS public.user_challenge_attempts CASCADE;
DROP TABLE IF EXISTS public.achievements CASCADE;
DROP TABLE IF EXISTS public.challenges CASCADE;
DROP TABLE IF EXISTS public.learning_paths CASCADE;
DROP TABLE IF EXISTS public.video_generations CASCADE;
DROP TABLE IF EXISTS public.voice_narrations CASCADE;
DROP TABLE IF EXISTS public.flowchart_exports CASCADE;
DROP TABLE IF EXISTS public.flowcharts CASCADE;
DROP TABLE IF EXISTS public.media_files CASCADE;
DROP TABLE IF EXISTS public.user_subscriptions CASCADE;
DROP TABLE IF EXISTS public.subscription_plans CASCADE;
DROP TABLE IF EXISTS public.billing_history CASCADE;
DROP TABLE IF EXISTS public.revenuecat_webhooks CASCADE;
DROP TABLE IF EXISTS public.user_sessions CASCADE;
DROP TABLE IF EXISTS public.user_security_logs CASCADE;
DROP TABLE IF EXISTS public.code_execution_results CASCADE;
DROP TABLE IF EXISTS public.user_preferences CASCADE;
DROP TABLE IF EXISTS public.user_progress CASCADE;
DROP TABLE IF EXISTS public.code_analyses CASCADE;
DROP TABLE IF EXISTS public.problem_solutions CASCADE;
DROP TABLE IF EXISTS public.code_submissions CASCADE;
DROP TABLE IF EXISTS public.user_profiles CASCADE;
DROP TABLE IF EXISTS public.profiles CASCADE;

-- Create user_profiles table with admin column
CREATE TABLE public.user_profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT NOT NULL,
  full_name TEXT,
  avatar_url TEXT,
  bio TEXT,
  location TEXT,
  is_admin BOOLEAN DEFAULT FALSE,
  total_analyses INTEGER DEFAULT 0,
  total_problems_solved INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Create code_submissions table
CREATE TABLE public.code_submissions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  title TEXT NOT NULL,
  description TEXT,
  code_content TEXT NOT NULL,
  language TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Create code_analyses table
CREATE TABLE public.code_analyses (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  submission_id UUID REFERENCES public.code_submissions(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  summary TEXT,
  explanation TEXT,
  score INTEGER,
  time_complexity TEXT,
  space_complexity TEXT,
  bugs JSONB DEFAULT '[]',
  optimizations JSONB DEFAULT '[]',
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Create problem_solutions table
CREATE TABLE public.problem_solutions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  problem_title TEXT NOT NULL,
  problem_statement TEXT NOT NULL,
  language TEXT NOT NULL,
  solution_code TEXT NOT NULL,
  explanation TEXT,
  time_complexity TEXT,
  space_complexity TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.user_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.code_submissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.code_analyses ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.problem_solutions ENABLE ROW LEVEL SECURITY;

-- RLS Policies for user_profiles
CREATE POLICY "Users can view their own profile" ON public.user_profiles
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update their own profile" ON public.user_profiles
  FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Admins can view all profiles" ON public.user_profiles
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM public.user_profiles 
      WHERE id = auth.uid() AND is_admin = TRUE
    )
  );

CREATE POLICY "Admins can delete users" ON public.user_profiles
  FOR DELETE USING (
    EXISTS (
      SELECT 1 FROM public.user_profiles 
      WHERE id = auth.uid() AND is_admin = TRUE
    )
  );

-- RLS Policies for code_submissions
CREATE POLICY "Users can view their own submissions" ON public.code_submissions
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own submissions" ON public.code_submissions
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own submissions" ON public.code_submissions
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own submissions" ON public.code_submissions
  FOR DELETE USING (auth.uid() = user_id);

-- RLS Policies for code_analyses
CREATE POLICY "Users can view their own analyses" ON public.code_analyses
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own analyses" ON public.code_analyses
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- RLS Policies for problem_solutions
CREATE POLICY "Users can view their own solutions" ON public.problem_solutions
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own solutions" ON public.problem_solutions
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Function to handle new user registration
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.user_profiles (id, email, full_name)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'full_name', '')
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger for new user creation
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Function to update user stats
CREATE OR REPLACE FUNCTION public.update_user_stats()
RETURNS TRIGGER AS $$
BEGIN
  IF TG_TABLE_NAME = 'code_analyses' THEN
    UPDATE public.user_profiles
    SET total_analyses = total_analyses + 1,
        updated_at = now()
    WHERE id = NEW.user_id;
  ELSIF TG_TABLE_NAME = 'problem_solutions' THEN
    UPDATE public.user_profiles
    SET total_problems_solved = total_problems_solved + 1,
        updated_at = now()
    WHERE id = NEW.user_id;
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Triggers to update user stats
CREATE TRIGGER update_analysis_stats
  AFTER INSERT ON public.code_analyses
  FOR EACH ROW EXECUTE FUNCTION public.update_user_stats();

CREATE TRIGGER update_solution_stats
  AFTER INSERT ON public.problem_solutions
  FOR EACH ROW EXECUTE FUNCTION public.update_user_stats();
