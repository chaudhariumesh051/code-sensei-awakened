export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      achievements: {
        Row: {
          category: string | null
          created_at: string | null
          description: string
          icon: string | null
          id: string
          is_active: boolean | null
          points_reward: number | null
          rarity: string | null
          requirements: Json
          title: string
          type: string
          xp_reward: number | null
        }
        Insert: {
          category?: string | null
          created_at?: string | null
          description: string
          icon?: string | null
          id?: string
          is_active?: boolean | null
          points_reward?: number | null
          rarity?: string | null
          requirements?: Json
          title: string
          type: string
          xp_reward?: number | null
        }
        Update: {
          category?: string | null
          created_at?: string | null
          description?: string
          icon?: string | null
          id?: string
          is_active?: boolean | null
          points_reward?: number | null
          rarity?: string | null
          requirements?: Json
          title?: string
          type?: string
          xp_reward?: number | null
        }
        Relationships: []
      }
      billing_history: {
        Row: {
          amount_usd: number
          created_at: string | null
          currency: string | null
          id: string
          metadata: Json | null
          period_end: string | null
          period_start: string | null
          plan_name: string | null
          platform: string | null
          product_id: string
          revenuecat_transaction_id: string | null
          status: string
          store: string | null
          subscription_id: string | null
          transaction_date: string
          transaction_id: string
          transaction_type: string
          user_id: string
        }
        Insert: {
          amount_usd: number
          created_at?: string | null
          currency?: string | null
          id?: string
          metadata?: Json | null
          period_end?: string | null
          period_start?: string | null
          plan_name?: string | null
          platform?: string | null
          product_id: string
          revenuecat_transaction_id?: string | null
          status: string
          store?: string | null
          subscription_id?: string | null
          transaction_date: string
          transaction_id: string
          transaction_type: string
          user_id: string
        }
        Update: {
          amount_usd?: number
          created_at?: string | null
          currency?: string | null
          id?: string
          metadata?: Json | null
          period_end?: string | null
          period_start?: string | null
          plan_name?: string | null
          platform?: string | null
          product_id?: string
          revenuecat_transaction_id?: string | null
          status?: string
          store?: string | null
          subscription_id?: string | null
          transaction_date?: string
          transaction_id?: string
          transaction_type?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "billing_history_subscription_id_fkey"
            columns: ["subscription_id"]
            isOneToOne: false
            referencedRelation: "user_subscriptions"
            referencedColumns: ["id"]
          },
        ]
      }
      challenges: {
        Row: {
          allowed_languages: string[] | null
          category: string
          created_at: string | null
          created_by: string | null
          description: string
          difficulty: string
          hidden_test_cases: Json | null
          hints: Json | null
          id: string
          is_active: boolean | null
          is_featured: boolean | null
          learning_resources: Json | null
          memory_limit_mb: number | null
          points: number | null
          prerequisites: string[] | null
          problem_statement: string
          related_concepts: string[] | null
          solution_code: string | null
          solution_explanation: string | null
          tags: string[] | null
          test_cases: Json
          time_limit_minutes: number | null
          title: string
          updated_at: string | null
          xp_reward: number | null
        }
        Insert: {
          allowed_languages?: string[] | null
          category: string
          created_at?: string | null
          created_by?: string | null
          description: string
          difficulty: string
          hidden_test_cases?: Json | null
          hints?: Json | null
          id?: string
          is_active?: boolean | null
          is_featured?: boolean | null
          learning_resources?: Json | null
          memory_limit_mb?: number | null
          points?: number | null
          prerequisites?: string[] | null
          problem_statement: string
          related_concepts?: string[] | null
          solution_code?: string | null
          solution_explanation?: string | null
          tags?: string[] | null
          test_cases?: Json
          time_limit_minutes?: number | null
          title: string
          updated_at?: string | null
          xp_reward?: number | null
        }
        Update: {
          allowed_languages?: string[] | null
          category?: string
          created_at?: string | null
          created_by?: string | null
          description?: string
          difficulty?: string
          hidden_test_cases?: Json | null
          hints?: Json | null
          id?: string
          is_active?: boolean | null
          is_featured?: boolean | null
          learning_resources?: Json | null
          memory_limit_mb?: number | null
          points?: number | null
          prerequisites?: string[] | null
          problem_statement?: string
          related_concepts?: string[] | null
          solution_code?: string | null
          solution_explanation?: string | null
          tags?: string[] | null
          test_cases?: Json
          time_limit_minutes?: number | null
          title?: string
          updated_at?: string | null
          xp_reward?: number | null
        }
        Relationships: []
      }
      code_analyses: {
        Row: {
          ai_model: string | null
          ai_model_version: string | null
          analysis_metadata: Json | null
          best_practices: Json | null
          bugs: Json | null
          created_at: string | null
          explanation: string | null
          id: string
          maintainability_score: number | null
          optimizations: Json | null
          performance_score: number | null
          processing_time_ms: number | null
          readability_score: number | null
          score: number | null
          security_issues: Json | null
          space_complexity: string | null
          submission_id: string
          summary: string | null
          time_complexity: string | null
          user_id: string
        }
        Insert: {
          ai_model?: string | null
          ai_model_version?: string | null
          analysis_metadata?: Json | null
          best_practices?: Json | null
          bugs?: Json | null
          created_at?: string | null
          explanation?: string | null
          id?: string
          maintainability_score?: number | null
          optimizations?: Json | null
          performance_score?: number | null
          processing_time_ms?: number | null
          readability_score?: number | null
          score?: number | null
          security_issues?: Json | null
          space_complexity?: string | null
          submission_id: string
          summary?: string | null
          time_complexity?: string | null
          user_id: string
        }
        Update: {
          ai_model?: string | null
          ai_model_version?: string | null
          analysis_metadata?: Json | null
          best_practices?: Json | null
          bugs?: Json | null
          created_at?: string | null
          explanation?: string | null
          id?: string
          maintainability_score?: number | null
          optimizations?: Json | null
          performance_score?: number | null
          processing_time_ms?: number | null
          readability_score?: number | null
          score?: number | null
          security_issues?: Json | null
          space_complexity?: string | null
          submission_id?: string
          summary?: string | null
          time_complexity?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "code_analyses_submission_id_fkey"
            columns: ["submission_id"]
            isOneToOne: false
            referencedRelation: "code_submissions"
            referencedColumns: ["id"]
          },
        ]
      }
      code_execution_results: {
        Row: {
          code_content: string
          compiler_version: string | null
          cpu_usage_percent: number | null
          created_at: string | null
          error_message: string | null
          execution_environment: string | null
          execution_time_ms: number | null
          exit_code: number | null
          id: string
          language: string
          memory_used_mb: number | null
          output: string | null
          runtime_version: string | null
          solution_id: string | null
          status: string
          submission_id: string | null
          test_results: Json | null
          tests_failed: number | null
          tests_passed: number | null
          user_id: string
        }
        Insert: {
          code_content: string
          compiler_version?: string | null
          cpu_usage_percent?: number | null
          created_at?: string | null
          error_message?: string | null
          execution_environment?: string | null
          execution_time_ms?: number | null
          exit_code?: number | null
          id?: string
          language: string
          memory_used_mb?: number | null
          output?: string | null
          runtime_version?: string | null
          solution_id?: string | null
          status: string
          submission_id?: string | null
          test_results?: Json | null
          tests_failed?: number | null
          tests_passed?: number | null
          user_id: string
        }
        Update: {
          code_content?: string
          compiler_version?: string | null
          cpu_usage_percent?: number | null
          created_at?: string | null
          error_message?: string | null
          execution_environment?: string | null
          execution_time_ms?: number | null
          exit_code?: number | null
          id?: string
          language?: string
          memory_used_mb?: number | null
          output?: string | null
          runtime_version?: string | null
          solution_id?: string | null
          status?: string
          submission_id?: string | null
          test_results?: Json | null
          tests_failed?: number | null
          tests_passed?: number | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "code_execution_results_solution_id_fkey"
            columns: ["solution_id"]
            isOneToOne: false
            referencedRelation: "problem_solutions"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "code_execution_results_submission_id_fkey"
            columns: ["submission_id"]
            isOneToOne: false
            referencedRelation: "code_submissions"
            referencedColumns: ["id"]
          },
        ]
      }
      code_submissions: {
        Row: {
          analysis_completed_at: string | null
          analysis_started_at: string | null
          analysis_status: string | null
          category: string | null
          character_count: number | null
          code_content: string
          created_at: string | null
          description: string | null
          difficulty_level: string | null
          file_name: string | null
          file_size: number | null
          id: string
          is_favorite: boolean | null
          is_public: boolean | null
          language: string
          line_count: number | null
          problem_statement: string | null
          submission_type: string | null
          tags: string[] | null
          title: string | null
          updated_at: string | null
          user_id: string
        }
        Insert: {
          analysis_completed_at?: string | null
          analysis_started_at?: string | null
          analysis_status?: string | null
          category?: string | null
          character_count?: number | null
          code_content: string
          created_at?: string | null
          description?: string | null
          difficulty_level?: string | null
          file_name?: string | null
          file_size?: number | null
          id?: string
          is_favorite?: boolean | null
          is_public?: boolean | null
          language: string
          line_count?: number | null
          problem_statement?: string | null
          submission_type?: string | null
          tags?: string[] | null
          title?: string | null
          updated_at?: string | null
          user_id: string
        }
        Update: {
          analysis_completed_at?: string | null
          analysis_started_at?: string | null
          analysis_status?: string | null
          category?: string | null
          character_count?: number | null
          code_content?: string
          created_at?: string | null
          description?: string | null
          difficulty_level?: string | null
          file_name?: string | null
          file_size?: number | null
          id?: string
          is_favorite?: boolean | null
          is_public?: boolean | null
          language?: string
          line_count?: number | null
          problem_statement?: string | null
          submission_type?: string | null
          tags?: string[] | null
          title?: string | null
          updated_at?: string | null
          user_id?: string
        }
        Relationships: []
      }
      flowchart_exports: {
        Row: {
          background_color: string | null
          created_at: string | null
          dpi: number | null
          error_message: string | null
          export_format: string
          export_status: string | null
          file_name: string
          file_size_bytes: number | null
          flowchart_id: string
          height: number | null
          id: string
          media_file_id: string | null
          public_url: string | null
          storage_path: string
          updated_at: string | null
          user_id: string
          width: number | null
        }
        Insert: {
          background_color?: string | null
          created_at?: string | null
          dpi?: number | null
          error_message?: string | null
          export_format: string
          export_status?: string | null
          file_name: string
          file_size_bytes?: number | null
          flowchart_id: string
          height?: number | null
          id?: string
          media_file_id?: string | null
          public_url?: string | null
          storage_path: string
          updated_at?: string | null
          user_id: string
          width?: number | null
        }
        Update: {
          background_color?: string | null
          created_at?: string | null
          dpi?: number | null
          error_message?: string | null
          export_format?: string
          export_status?: string | null
          file_name?: string
          file_size_bytes?: number | null
          flowchart_id?: string
          height?: number | null
          id?: string
          media_file_id?: string | null
          public_url?: string | null
          storage_path?: string
          updated_at?: string | null
          user_id?: string
          width?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "flowchart_exports_flowchart_id_fkey"
            columns: ["flowchart_id"]
            isOneToOne: false
            referencedRelation: "flowcharts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "flowchart_exports_media_file_id_fkey"
            columns: ["media_file_id"]
            isOneToOne: false
            referencedRelation: "media_files"
            referencedColumns: ["id"]
          },
        ]
      }
      flowcharts: {
        Row: {
          analysis_id: string | null
          complexity_level: string | null
          created_at: string | null
          description: string | null
          edge_count: number | null
          export_formats: string[] | null
          flowchart_code: string
          flowchart_type: string | null
          id: string
          is_exported: boolean | null
          node_count: number | null
          rendered_png_url: string | null
          rendered_svg: string | null
          solution_id: string | null
          submission_id: string | null
          title: string | null
          updated_at: string | null
          user_id: string
        }
        Insert: {
          analysis_id?: string | null
          complexity_level?: string | null
          created_at?: string | null
          description?: string | null
          edge_count?: number | null
          export_formats?: string[] | null
          flowchart_code: string
          flowchart_type?: string | null
          id?: string
          is_exported?: boolean | null
          node_count?: number | null
          rendered_png_url?: string | null
          rendered_svg?: string | null
          solution_id?: string | null
          submission_id?: string | null
          title?: string | null
          updated_at?: string | null
          user_id: string
        }
        Update: {
          analysis_id?: string | null
          complexity_level?: string | null
          created_at?: string | null
          description?: string | null
          edge_count?: number | null
          export_formats?: string[] | null
          flowchart_code?: string
          flowchart_type?: string | null
          id?: string
          is_exported?: boolean | null
          node_count?: number | null
          rendered_png_url?: string | null
          rendered_svg?: string | null
          solution_id?: string | null
          submission_id?: string | null
          title?: string | null
          updated_at?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "flowcharts_analysis_id_fkey"
            columns: ["analysis_id"]
            isOneToOne: false
            referencedRelation: "code_analyses"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "flowcharts_solution_id_fkey"
            columns: ["solution_id"]
            isOneToOne: false
            referencedRelation: "problem_solutions"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "flowcharts_submission_id_fkey"
            columns: ["submission_id"]
            isOneToOne: false
            referencedRelation: "code_submissions"
            referencedColumns: ["id"]
          },
        ]
      }
      learning_paths: {
        Row: {
          category: string
          created_at: string | null
          created_by: string | null
          description: string
          difficulty_level: string | null
          estimated_duration_hours: number | null
          id: string
          is_active: boolean | null
          is_featured: boolean | null
          learning_objectives: string[] | null
          modules: Json
          prerequisites: string[] | null
          title: string
          updated_at: string | null
        }
        Insert: {
          category: string
          created_at?: string | null
          created_by?: string | null
          description: string
          difficulty_level?: string | null
          estimated_duration_hours?: number | null
          id?: string
          is_active?: boolean | null
          is_featured?: boolean | null
          learning_objectives?: string[] | null
          modules?: Json
          prerequisites?: string[] | null
          title: string
          updated_at?: string | null
        }
        Update: {
          category?: string
          created_at?: string | null
          created_by?: string | null
          description?: string
          difficulty_level?: string | null
          estimated_duration_hours?: number | null
          id?: string
          is_active?: boolean | null
          is_featured?: boolean | null
          learning_objectives?: string[] | null
          modules?: Json
          prerequisites?: string[] | null
          title?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      media_files: {
        Row: {
          analysis_id: string | null
          bucket_name: string
          created_at: string | null
          download_count: number | null
          duration_seconds: number | null
          file_name: string
          file_size_bytes: number | null
          file_type: string
          height: number | null
          id: string
          last_accessed_at: string | null
          metadata: Json | null
          mime_type: string
          original_name: string | null
          processing_error: string | null
          processing_status: string | null
          public_url: string | null
          solution_id: string | null
          storage_path: string
          submission_id: string | null
          tags: string[] | null
          updated_at: string | null
          user_id: string
          width: number | null
        }
        Insert: {
          analysis_id?: string | null
          bucket_name: string
          created_at?: string | null
          download_count?: number | null
          duration_seconds?: number | null
          file_name: string
          file_size_bytes?: number | null
          file_type: string
          height?: number | null
          id?: string
          last_accessed_at?: string | null
          metadata?: Json | null
          mime_type: string
          original_name?: string | null
          processing_error?: string | null
          processing_status?: string | null
          public_url?: string | null
          solution_id?: string | null
          storage_path: string
          submission_id?: string | null
          tags?: string[] | null
          updated_at?: string | null
          user_id: string
          width?: number | null
        }
        Update: {
          analysis_id?: string | null
          bucket_name?: string
          created_at?: string | null
          download_count?: number | null
          duration_seconds?: number | null
          file_name?: string
          file_size_bytes?: number | null
          file_type?: string
          height?: number | null
          id?: string
          last_accessed_at?: string | null
          metadata?: Json | null
          mime_type?: string
          original_name?: string | null
          processing_error?: string | null
          processing_status?: string | null
          public_url?: string | null
          solution_id?: string | null
          storage_path?: string
          submission_id?: string | null
          tags?: string[] | null
          updated_at?: string | null
          user_id?: string
          width?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "media_files_analysis_id_fkey"
            columns: ["analysis_id"]
            isOneToOne: false
            referencedRelation: "code_analyses"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "media_files_solution_id_fkey"
            columns: ["solution_id"]
            isOneToOne: false
            referencedRelation: "problem_solutions"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "media_files_submission_id_fkey"
            columns: ["submission_id"]
            isOneToOne: false
            referencedRelation: "code_submissions"
            referencedColumns: ["id"]
          },
        ]
      }
      problem_solutions: {
        Row: {
          ai_model: string | null
          alternative_solutions: Json | null
          approach_description: string | null
          created_at: string | null
          difficulty_level: string | null
          explanation: string | null
          id: string
          language: string
          learning_resources: Json | null
          optimizations: Json | null
          problem_category: string | null
          problem_statement: string
          problem_title: string
          processing_time_ms: number | null
          related_concepts: string[] | null
          solution_code: string
          space_complexity: string | null
          submission_id: string | null
          test_cases: Json | null
          time_complexity: string | null
          updated_at: string | null
          user_id: string
          video_id: string | null
          video_script: string | null
          video_status: string | null
          video_url: string | null
        }
        Insert: {
          ai_model?: string | null
          alternative_solutions?: Json | null
          approach_description?: string | null
          created_at?: string | null
          difficulty_level?: string | null
          explanation?: string | null
          id?: string
          language: string
          learning_resources?: Json | null
          optimizations?: Json | null
          problem_category?: string | null
          problem_statement: string
          problem_title: string
          processing_time_ms?: number | null
          related_concepts?: string[] | null
          solution_code: string
          space_complexity?: string | null
          submission_id?: string | null
          test_cases?: Json | null
          time_complexity?: string | null
          updated_at?: string | null
          user_id: string
          video_id?: string | null
          video_script?: string | null
          video_status?: string | null
          video_url?: string | null
        }
        Update: {
          ai_model?: string | null
          alternative_solutions?: Json | null
          approach_description?: string | null
          created_at?: string | null
          difficulty_level?: string | null
          explanation?: string | null
          id?: string
          language?: string
          learning_resources?: Json | null
          optimizations?: Json | null
          problem_category?: string | null
          problem_statement?: string
          problem_title?: string
          processing_time_ms?: number | null
          related_concepts?: string[] | null
          solution_code?: string
          space_complexity?: string | null
          submission_id?: string | null
          test_cases?: Json | null
          time_complexity?: string | null
          updated_at?: string | null
          user_id?: string
          video_id?: string | null
          video_script?: string | null
          video_status?: string | null
          video_url?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "problem_solutions_submission_id_fkey"
            columns: ["submission_id"]
            isOneToOne: false
            referencedRelation: "code_submissions"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          avatar_url: string | null
          created_at: string | null
          email: string
          full_name: string | null
          id: string
          role: string | null
          updated_at: string | null
        }
        Insert: {
          avatar_url?: string | null
          created_at?: string | null
          email: string
          full_name?: string | null
          id: string
          role?: string | null
          updated_at?: string | null
        }
        Update: {
          avatar_url?: string | null
          created_at?: string | null
          email?: string
          full_name?: string | null
          id?: string
          role?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      revenuecat_webhooks: {
        Row: {
          event_data: Json
          event_id: string | null
          event_type: string
          id: string
          processed: boolean | null
          processed_at: string | null
          processing_error: string | null
          product_id: string | null
          received_at: string | null
          revenuecat_subscription_id: string | null
          revenuecat_user_id: string | null
          user_id: string | null
        }
        Insert: {
          event_data: Json
          event_id?: string | null
          event_type: string
          id?: string
          processed?: boolean | null
          processed_at?: string | null
          processing_error?: string | null
          product_id?: string | null
          received_at?: string | null
          revenuecat_subscription_id?: string | null
          revenuecat_user_id?: string | null
          user_id?: string | null
        }
        Update: {
          event_data?: Json
          event_id?: string | null
          event_type?: string
          id?: string
          processed?: boolean | null
          processed_at?: string | null
          processing_error?: string | null
          product_id?: string | null
          received_at?: string | null
          revenuecat_subscription_id?: string | null
          revenuecat_user_id?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      subscription_plans: {
        Row: {
          apple_product_id: string | null
          billing_cycle: string
          created_at: string | null
          currency: string | null
          description: string | null
          features: Json
          google_product_id: string | null
          id: string
          is_active: boolean | null
          is_featured: boolean | null
          limits: Json
          name: string
          plan_id: string
          price_usd: number
          revenuecat_product_id: string | null
          sort_order: number | null
          stripe_price_id: string | null
          updated_at: string | null
        }
        Insert: {
          apple_product_id?: string | null
          billing_cycle: string
          created_at?: string | null
          currency?: string | null
          description?: string | null
          features?: Json
          google_product_id?: string | null
          id?: string
          is_active?: boolean | null
          is_featured?: boolean | null
          limits?: Json
          name: string
          plan_id: string
          price_usd: number
          revenuecat_product_id?: string | null
          sort_order?: number | null
          stripe_price_id?: string | null
          updated_at?: string | null
        }
        Update: {
          apple_product_id?: string | null
          billing_cycle?: string
          created_at?: string | null
          currency?: string | null
          description?: string | null
          features?: Json
          google_product_id?: string | null
          id?: string
          is_active?: boolean | null
          is_featured?: boolean | null
          limits?: Json
          name?: string
          plan_id?: string
          price_usd?: number
          revenuecat_product_id?: string | null
          sort_order?: number | null
          stripe_price_id?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      user_achievements: {
        Row: {
          achievement_id: string
          earned_at: string | null
          id: string
          progress_data: Json | null
          user_id: string
        }
        Insert: {
          achievement_id: string
          earned_at?: string | null
          id?: string
          progress_data?: Json | null
          user_id: string
        }
        Update: {
          achievement_id?: string
          earned_at?: string | null
          id?: string
          progress_data?: Json | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_achievements_achievement_id_fkey"
            columns: ["achievement_id"]
            isOneToOne: false
            referencedRelation: "achievements"
            referencedColumns: ["id"]
          },
        ]
      }
      user_challenge_attempts: {
        Row: {
          attempt_number: number | null
          challenge_id: string
          code_submission: string
          completed_at: string | null
          created_at: string | null
          error_message: string | null
          execution_time_ms: number | null
          id: string
          language: string
          memory_used_mb: number | null
          score: number | null
          started_at: string | null
          status: string
          submission_metadata: Json | null
          test_results: Json | null
          tests_failed: number | null
          tests_passed: number | null
          time_taken_minutes: number | null
          user_id: string
        }
        Insert: {
          attempt_number?: number | null
          challenge_id: string
          code_submission: string
          completed_at?: string | null
          created_at?: string | null
          error_message?: string | null
          execution_time_ms?: number | null
          id?: string
          language: string
          memory_used_mb?: number | null
          score?: number | null
          started_at?: string | null
          status: string
          submission_metadata?: Json | null
          test_results?: Json | null
          tests_failed?: number | null
          tests_passed?: number | null
          time_taken_minutes?: number | null
          user_id: string
        }
        Update: {
          attempt_number?: number | null
          challenge_id?: string
          code_submission?: string
          completed_at?: string | null
          created_at?: string | null
          error_message?: string | null
          execution_time_ms?: number | null
          id?: string
          language?: string
          memory_used_mb?: number | null
          score?: number | null
          started_at?: string | null
          status?: string
          submission_metadata?: Json | null
          test_results?: Json | null
          tests_failed?: number | null
          tests_passed?: number | null
          time_taken_minutes?: number | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_challenge_attempts_challenge_id_fkey"
            columns: ["challenge_id"]
            isOneToOne: false
            referencedRelation: "challenges"
            referencedColumns: ["id"]
          },
        ]
      }
      user_preferences: {
        Row: {
          achievement_alerts: boolean | null
          analysis_depth: string | null
          auto_save_code: boolean | null
          challenge_reminders: boolean | null
          created_at: string | null
          default_language: string | null
          email_notifications: boolean | null
          id: string
          marketing_updates: boolean | null
          preferred_ai_presenter: string | null
          profile_visibility: string | null
          push_notifications: boolean | null
          show_achievements: boolean | null
          show_progress: boolean | null
          speaking_style: string | null
          updated_at: string | null
          user_id: string
          video_quality: string | null
          video_resolution: string | null
          weekly_reports: boolean | null
        }
        Insert: {
          achievement_alerts?: boolean | null
          analysis_depth?: string | null
          auto_save_code?: boolean | null
          challenge_reminders?: boolean | null
          created_at?: string | null
          default_language?: string | null
          email_notifications?: boolean | null
          id?: string
          marketing_updates?: boolean | null
          preferred_ai_presenter?: string | null
          profile_visibility?: string | null
          push_notifications?: boolean | null
          show_achievements?: boolean | null
          show_progress?: boolean | null
          speaking_style?: string | null
          updated_at?: string | null
          user_id: string
          video_quality?: string | null
          video_resolution?: string | null
          weekly_reports?: boolean | null
        }
        Update: {
          achievement_alerts?: boolean | null
          analysis_depth?: string | null
          auto_save_code?: boolean | null
          challenge_reminders?: boolean | null
          created_at?: string | null
          default_language?: string | null
          email_notifications?: boolean | null
          id?: string
          marketing_updates?: boolean | null
          preferred_ai_presenter?: string | null
          profile_visibility?: string | null
          push_notifications?: boolean | null
          show_achievements?: boolean | null
          show_progress?: boolean | null
          speaking_style?: string | null
          updated_at?: string | null
          user_id?: string
          video_quality?: string | null
          video_resolution?: string | null
          weekly_reports?: boolean | null
        }
        Relationships: []
      }
      user_profiles: {
        Row: {
          avatar_url: string | null
          bio: string | null
          created_at: string | null
          daily_code_analysis_count: number | null
          daily_problem_solving_count: number | null
          daily_video_generation_count: number | null
          email: string
          email_notifications: boolean | null
          full_name: string | null
          id: string
          last_active_at: string | null
          location: string | null
          marketing_emails: boolean | null
          onboarding_completed: boolean | null
          preferred_language: string | null
          revenuecat_user_id: string | null
          role: string | null
          subscription_expires_at: string | null
          subscription_plan: string | null
          subscription_status: string | null
          theme: string | null
          timezone: string | null
          total_analyses: number | null
          total_problems_solved: number | null
          total_videos_generated: number | null
          updated_at: string | null
          username: string | null
          website: string | null
        }
        Insert: {
          avatar_url?: string | null
          bio?: string | null
          created_at?: string | null
          daily_code_analysis_count?: number | null
          daily_problem_solving_count?: number | null
          daily_video_generation_count?: number | null
          email: string
          email_notifications?: boolean | null
          full_name?: string | null
          id: string
          last_active_at?: string | null
          location?: string | null
          marketing_emails?: boolean | null
          onboarding_completed?: boolean | null
          preferred_language?: string | null
          revenuecat_user_id?: string | null
          role?: string | null
          subscription_expires_at?: string | null
          subscription_plan?: string | null
          subscription_status?: string | null
          theme?: string | null
          timezone?: string | null
          total_analyses?: number | null
          total_problems_solved?: number | null
          total_videos_generated?: number | null
          updated_at?: string | null
          username?: string | null
          website?: string | null
        }
        Update: {
          avatar_url?: string | null
          bio?: string | null
          created_at?: string | null
          daily_code_analysis_count?: number | null
          daily_problem_solving_count?: number | null
          daily_video_generation_count?: number | null
          email?: string
          email_notifications?: boolean | null
          full_name?: string | null
          id?: string
          last_active_at?: string | null
          location?: string | null
          marketing_emails?: boolean | null
          onboarding_completed?: boolean | null
          preferred_language?: string | null
          revenuecat_user_id?: string | null
          role?: string | null
          subscription_expires_at?: string | null
          subscription_plan?: string | null
          subscription_status?: string | null
          theme?: string | null
          timezone?: string | null
          total_analyses?: number | null
          total_problems_solved?: number | null
          total_videos_generated?: number | null
          updated_at?: string | null
          username?: string | null
          website?: string | null
        }
        Relationships: []
      }
      user_progress: {
        Row: {
          active_learning_paths: string[] | null
          challenges_attempted: number | null
          challenges_completed: number | null
          completed_learning_paths: string[] | null
          created_at: string | null
          current_level: number | null
          current_streak: number | null
          id: string
          last_challenge_date: string | null
          longest_streak: number | null
          recent_achievements: string[] | null
          skill_levels: Json | null
          total_achievements: number | null
          total_study_time_minutes: number | null
          total_xp: number | null
          updated_at: string | null
          user_id: string
          weekly_study_time_minutes: number | null
          xp_to_next_level: number | null
        }
        Insert: {
          active_learning_paths?: string[] | null
          challenges_attempted?: number | null
          challenges_completed?: number | null
          completed_learning_paths?: string[] | null
          created_at?: string | null
          current_level?: number | null
          current_streak?: number | null
          id?: string
          last_challenge_date?: string | null
          longest_streak?: number | null
          recent_achievements?: string[] | null
          skill_levels?: Json | null
          total_achievements?: number | null
          total_study_time_minutes?: number | null
          total_xp?: number | null
          updated_at?: string | null
          user_id: string
          weekly_study_time_minutes?: number | null
          xp_to_next_level?: number | null
        }
        Update: {
          active_learning_paths?: string[] | null
          challenges_attempted?: number | null
          challenges_completed?: number | null
          completed_learning_paths?: string[] | null
          created_at?: string | null
          current_level?: number | null
          current_streak?: number | null
          id?: string
          last_challenge_date?: string | null
          longest_streak?: number | null
          recent_achievements?: string[] | null
          skill_levels?: Json | null
          total_achievements?: number | null
          total_study_time_minutes?: number | null
          total_xp?: number | null
          updated_at?: string | null
          user_id?: string
          weekly_study_time_minutes?: number | null
          xp_to_next_level?: number | null
        }
        Relationships: []
      }
      user_security_logs: {
        Row: {
          city: string | null
          country: string | null
          created_at: string | null
          device_fingerprint: string | null
          email: string | null
          event_description: string | null
          event_type: string
          id: string
          ip_address: unknown | null
          metadata: Json | null
          user_agent: string | null
          user_id: string | null
        }
        Insert: {
          city?: string | null
          country?: string | null
          created_at?: string | null
          device_fingerprint?: string | null
          email?: string | null
          event_description?: string | null
          event_type: string
          id?: string
          ip_address?: unknown | null
          metadata?: Json | null
          user_agent?: string | null
          user_id?: string | null
        }
        Update: {
          city?: string | null
          country?: string | null
          created_at?: string | null
          device_fingerprint?: string | null
          email?: string | null
          event_description?: string | null
          event_type?: string
          id?: string
          ip_address?: unknown | null
          metadata?: Json | null
          user_agent?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      user_sessions: {
        Row: {
          browser: string | null
          city: string | null
          country: string | null
          created_at: string | null
          device_id: string | null
          device_name: string | null
          device_type: string | null
          expires_at: string
          id: string
          ip_address: unknown | null
          is_active: boolean | null
          last_accessed_at: string | null
          latitude: number | null
          longitude: number | null
          os: string | null
          refresh_token: string | null
          session_token: string
          user_agent: string | null
          user_id: string
        }
        Insert: {
          browser?: string | null
          city?: string | null
          country?: string | null
          created_at?: string | null
          device_id?: string | null
          device_name?: string | null
          device_type?: string | null
          expires_at: string
          id?: string
          ip_address?: unknown | null
          is_active?: boolean | null
          last_accessed_at?: string | null
          latitude?: number | null
          longitude?: number | null
          os?: string | null
          refresh_token?: string | null
          session_token: string
          user_agent?: string | null
          user_id: string
        }
        Update: {
          browser?: string | null
          city?: string | null
          country?: string | null
          created_at?: string | null
          device_id?: string | null
          device_name?: string | null
          device_type?: string | null
          expires_at?: string
          id?: string
          ip_address?: unknown | null
          is_active?: boolean | null
          last_accessed_at?: string | null
          latitude?: number | null
          longitude?: number | null
          os?: string | null
          refresh_token?: string | null
          session_token?: string
          user_agent?: string | null
          user_id?: string
        }
        Relationships: []
      }
      user_subscriptions: {
        Row: {
          auto_renew: boolean | null
          cancelled_at: string | null
          created_at: string | null
          currency: string | null
          current_period_end: string | null
          current_period_start: string | null
          expires_at: string | null
          id: string
          is_sandbox: boolean | null
          plan_id: string
          platform: string | null
          price_usd: number | null
          revenuecat_data: Json | null
          revenuecat_subscription_id: string | null
          revenuecat_user_id: string
          started_at: string
          status: string
          store: string | null
          trial_ends_at: string | null
          updated_at: string | null
          user_id: string
        }
        Insert: {
          auto_renew?: boolean | null
          cancelled_at?: string | null
          created_at?: string | null
          currency?: string | null
          current_period_end?: string | null
          current_period_start?: string | null
          expires_at?: string | null
          id?: string
          is_sandbox?: boolean | null
          plan_id: string
          platform?: string | null
          price_usd?: number | null
          revenuecat_data?: Json | null
          revenuecat_subscription_id?: string | null
          revenuecat_user_id: string
          started_at: string
          status: string
          store?: string | null
          trial_ends_at?: string | null
          updated_at?: string | null
          user_id: string
        }
        Update: {
          auto_renew?: boolean | null
          cancelled_at?: string | null
          created_at?: string | null
          currency?: string | null
          current_period_end?: string | null
          current_period_start?: string | null
          expires_at?: string | null
          id?: string
          is_sandbox?: boolean | null
          plan_id?: string
          platform?: string | null
          price_usd?: number | null
          revenuecat_data?: Json | null
          revenuecat_subscription_id?: string | null
          revenuecat_user_id?: string
          started_at?: string
          status?: string
          store?: string | null
          trial_ends_at?: string | null
          updated_at?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_subscriptions_plan_id_fkey"
            columns: ["plan_id"]
            isOneToOne: false
            referencedRelation: "subscription_plans"
            referencedColumns: ["plan_id"]
          },
        ]
      }
      video_generations: {
        Row: {
          background_url: string | null
          completed_at: string | null
          created_at: string | null
          duration_seconds: number | null
          error_message: string | null
          file_size_bytes: number | null
          id: string
          language: string
          media_file_id: string | null
          persona_id: string | null
          problem_title: string
          processing_time_seconds: number | null
          progress_percentage: number | null
          replica_id: string | null
          script_content: string
          script_options: Json | null
          solution_id: string | null
          started_at: string | null
          status: string | null
          submission_id: string | null
          tavus_video_id: string | null
          thumbnail_url: string | null
          updated_at: string | null
          user_id: string
          video_settings: Json | null
          video_url: string | null
          voice_settings: Json | null
        }
        Insert: {
          background_url?: string | null
          completed_at?: string | null
          created_at?: string | null
          duration_seconds?: number | null
          error_message?: string | null
          file_size_bytes?: number | null
          id?: string
          language: string
          media_file_id?: string | null
          persona_id?: string | null
          problem_title: string
          processing_time_seconds?: number | null
          progress_percentage?: number | null
          replica_id?: string | null
          script_content: string
          script_options?: Json | null
          solution_id?: string | null
          started_at?: string | null
          status?: string | null
          submission_id?: string | null
          tavus_video_id?: string | null
          thumbnail_url?: string | null
          updated_at?: string | null
          user_id: string
          video_settings?: Json | null
          video_url?: string | null
          voice_settings?: Json | null
        }
        Update: {
          background_url?: string | null
          completed_at?: string | null
          created_at?: string | null
          duration_seconds?: number | null
          error_message?: string | null
          file_size_bytes?: number | null
          id?: string
          language?: string
          media_file_id?: string | null
          persona_id?: string | null
          problem_title?: string
          processing_time_seconds?: number | null
          progress_percentage?: number | null
          replica_id?: string | null
          script_content?: string
          script_options?: Json | null
          solution_id?: string | null
          started_at?: string | null
          status?: string | null
          submission_id?: string | null
          tavus_video_id?: string | null
          thumbnail_url?: string | null
          updated_at?: string | null
          user_id?: string
          video_settings?: Json | null
          video_url?: string | null
          voice_settings?: Json | null
        }
        Relationships: [
          {
            foreignKeyName: "video_generations_media_file_id_fkey"
            columns: ["media_file_id"]
            isOneToOne: false
            referencedRelation: "media_files"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "video_generations_solution_id_fkey"
            columns: ["solution_id"]
            isOneToOne: false
            referencedRelation: "problem_solutions"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "video_generations_submission_id_fkey"
            columns: ["submission_id"]
            isOneToOne: false
            referencedRelation: "code_submissions"
            referencedColumns: ["id"]
          },
        ]
      }
      voice_narrations: {
        Row: {
          audio_format: string | null
          audio_url: string | null
          completed_at: string | null
          created_at: string | null
          duration_seconds: number | null
          elevenlabs_voice_id: string | null
          error_message: string | null
          file_size_bytes: number | null
          id: string
          language: string | null
          media_file_id: string | null
          processing_time_seconds: number | null
          script_text: string
          started_at: string | null
          status: string | null
          storage_path: string | null
          updated_at: string | null
          user_id: string
          video_generation_id: string | null
          voice_id: string | null
          voice_name: string | null
          voice_settings: Json | null
        }
        Insert: {
          audio_format?: string | null
          audio_url?: string | null
          completed_at?: string | null
          created_at?: string | null
          duration_seconds?: number | null
          elevenlabs_voice_id?: string | null
          error_message?: string | null
          file_size_bytes?: number | null
          id?: string
          language?: string | null
          media_file_id?: string | null
          processing_time_seconds?: number | null
          script_text: string
          started_at?: string | null
          status?: string | null
          storage_path?: string | null
          updated_at?: string | null
          user_id: string
          video_generation_id?: string | null
          voice_id?: string | null
          voice_name?: string | null
          voice_settings?: Json | null
        }
        Update: {
          audio_format?: string | null
          audio_url?: string | null
          completed_at?: string | null
          created_at?: string | null
          duration_seconds?: number | null
          elevenlabs_voice_id?: string | null
          error_message?: string | null
          file_size_bytes?: number | null
          id?: string
          language?: string | null
          media_file_id?: string | null
          processing_time_seconds?: number | null
          script_text?: string
          started_at?: string | null
          status?: string | null
          storage_path?: string | null
          updated_at?: string | null
          user_id?: string
          video_generation_id?: string | null
          voice_id?: string | null
          voice_name?: string | null
          voice_settings?: Json | null
        }
        Relationships: [
          {
            foreignKeyName: "voice_narrations_media_file_id_fkey"
            columns: ["media_file_id"]
            isOneToOne: false
            referencedRelation: "media_files"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "voice_narrations_video_generation_id_fkey"
            columns: ["video_generation_id"]
            isOneToOne: false
            referencedRelation: "video_generations"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      check_achievement_requirements: {
        Args: { p_user_id: string; p_requirements: Json }
        Returns: boolean
      }
      check_and_award_achievements: {
        Args: { p_user_id: string }
        Returns: undefined
      }
      check_rate_limit: {
        Args: { user_id_param: string; feature_type: string; max_count: number }
        Returns: boolean
      }
      check_subscription_status: {
        Args: { p_user_id: string }
        Returns: Json
      }
      create_code_submission: {
        Args: {
          p_title: string
          p_description: string
          p_code_content: string
          p_language: string
          p_submission_type?: string
          p_problem_statement?: string
        }
        Returns: string
      }
      create_flowchart_export: {
        Args: {
          p_flowchart_id: string
          p_export_format: string
          p_width?: number
          p_height?: number
          p_background_color?: string
        }
        Returns: string
      }
      create_video_generation_request: {
        Args: {
          p_problem_title: string
          p_script_content: string
          p_language: string
          p_replica_id?: string
          p_persona_id?: string
          p_background_url?: string
          p_voice_settings?: Json
          p_video_settings?: Json
          p_script_options?: Json
        }
        Returns: string
      }
      handle_billing_issue: {
        Args: { p_user_id: string; p_event_data: Json }
        Returns: undefined
      }
      handle_subscription_activation: {
        Args: {
          p_user_id: string
          p_revenuecat_user_id: string
          p_event_data: Json
        }
        Returns: undefined
      }
      handle_subscription_cancellation: {
        Args: { p_user_id: string; p_event_data: Json }
        Returns: undefined
      }
      handle_subscription_expiration: {
        Args: { p_user_id: string; p_event_data: Json }
        Returns: undefined
      }
      increment_usage_count: {
        Args: { user_id_param: string; feature_type: string }
        Returns: undefined
      }
      process_revenuecat_webhook: {
        Args: { p_event_type: string; p_event_id: string; p_event_data: Json }
        Returns: undefined
      }
      reset_daily_usage: {
        Args: Record<PropertyKey, never>
        Returns: undefined
      }
      save_analysis_result: {
        Args: {
          p_submission_id: string
          p_summary: string
          p_explanation: string
          p_score: number
          p_time_complexity: string
          p_space_complexity: string
          p_bugs: Json
          p_optimizations: Json
          p_processing_time_ms?: number
        }
        Returns: string
      }
      save_execution_result: {
        Args: {
          p_submission_id: string
          p_language: string
          p_code_content: string
          p_status: string
          p_output: string
          p_error_message?: string
          p_execution_time_ms?: number
          p_memory_used_mb?: number
        }
        Returns: string
      }
      save_problem_solution: {
        Args: {
          p_problem_title: string
          p_problem_statement: string
          p_language: string
          p_solution_code: string
          p_explanation: string
          p_time_complexity: string
          p_space_complexity: string
          p_test_cases?: Json
          p_optimizations?: Json
        }
        Returns: string
      }
      submit_challenge_attempt: {
        Args: {
          p_challenge_id: string
          p_language: string
          p_code_submission: string
        }
        Returns: string
      }
      track_file_download: {
        Args: { p_media_file_id: string }
        Returns: undefined
      }
      update_challenge_result: {
        Args: {
          p_attempt_id: string
          p_status: string
          p_score: number
          p_tests_passed: number
          p_tests_failed: number
          p_execution_time_ms?: number
          p_test_results?: Json
        }
        Returns: undefined
      }
      update_video_generation_status: {
        Args: {
          p_generation_id: string
          p_status: string
          p_progress_percentage?: number
          p_tavus_video_id?: string
          p_video_url?: string
          p_thumbnail_url?: string
          p_duration_seconds?: number
          p_error_message?: string
        }
        Returns: undefined
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
