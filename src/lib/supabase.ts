
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://wafgnuyvbxqqafabvkdz.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndhZmdudXl2YnhxcWFmYWJ2a2R6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDg3OTY5MDksImV4cCI6MjA2NDM3MjkwOX0.YMXSt-a9mlgMkHt9YZa9byob9uuwxekF8tlFGXMmxRY'

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true
  }
})

// Database types
export interface Profile {
  id: string
  email: string
  full_name: string
  avatar_url?: string
  bio?: string
  location?: string
  is_admin: boolean
  total_analyses: number
  total_problems_solved: number
  created_at: string
  updated_at: string
}

export interface CodeAnalysis {
  id: string
  user_id: string
  submission_id?: string
  title: string
  summary?: string
  explanation?: string
  score?: number
  time_complexity?: string
  space_complexity?: string
  bugs: any[]
  optimizations: any[]
  created_at: string
}

export interface ProblemSolution {
  id: string
  user_id: string
  problem_title: string
  problem_statement: string
  language: string
  solution_code: string
  explanation?: string
  time_complexity?: string
  space_complexity?: string
  created_at: string
}

export interface CodeSubmission {
  id: string
  user_id: string
  title: string
  description?: string
  code_content: string
  language: string
  created_at: string
  updated_at: string
}

export interface AuthUser {
  id: string
  email: string
  profile?: Profile
}
