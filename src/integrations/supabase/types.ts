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
      code_analyses: {
        Row: {
          bugs: Json | null
          created_at: string | null
          explanation: string | null
          id: string
          optimizations: Json | null
          score: number | null
          space_complexity: string | null
          submission_id: string | null
          summary: string | null
          time_complexity: string | null
          title: string
          user_id: string
        }
        Insert: {
          bugs?: Json | null
          created_at?: string | null
          explanation?: string | null
          id?: string
          optimizations?: Json | null
          score?: number | null
          space_complexity?: string | null
          submission_id?: string | null
          summary?: string | null
          time_complexity?: string | null
          title: string
          user_id: string
        }
        Update: {
          bugs?: Json | null
          created_at?: string | null
          explanation?: string | null
          id?: string
          optimizations?: Json | null
          score?: number | null
          space_complexity?: string | null
          submission_id?: string | null
          summary?: string | null
          time_complexity?: string | null
          title?: string
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
      code_submissions: {
        Row: {
          code_content: string
          created_at: string | null
          description: string | null
          id: string
          language: string
          title: string
          updated_at: string | null
          user_id: string
        }
        Insert: {
          code_content: string
          created_at?: string | null
          description?: string | null
          id?: string
          language: string
          title: string
          updated_at?: string | null
          user_id: string
        }
        Update: {
          code_content?: string
          created_at?: string | null
          description?: string | null
          id?: string
          language?: string
          title?: string
          updated_at?: string | null
          user_id?: string
        }
        Relationships: []
      }
      problem_solutions: {
        Row: {
          created_at: string | null
          explanation: string | null
          id: string
          language: string
          problem_statement: string
          problem_title: string
          solution_code: string
          space_complexity: string | null
          time_complexity: string | null
          user_id: string
        }
        Insert: {
          created_at?: string | null
          explanation?: string | null
          id?: string
          language: string
          problem_statement: string
          problem_title: string
          solution_code: string
          space_complexity?: string | null
          time_complexity?: string | null
          user_id: string
        }
        Update: {
          created_at?: string | null
          explanation?: string | null
          id?: string
          language?: string
          problem_statement?: string
          problem_title?: string
          solution_code?: string
          space_complexity?: string | null
          time_complexity?: string | null
          user_id?: string
        }
        Relationships: []
      }
      user_profiles: {
        Row: {
          avatar_url: string | null
          bio: string | null
          created_at: string | null
          email: string
          full_name: string | null
          id: string
          is_admin: boolean | null
          location: string | null
          total_analyses: number | null
          total_problems_solved: number | null
          updated_at: string | null
        }
        Insert: {
          avatar_url?: string | null
          bio?: string | null
          created_at?: string | null
          email: string
          full_name?: string | null
          id: string
          is_admin?: boolean | null
          location?: string | null
          total_analyses?: number | null
          total_problems_solved?: number | null
          updated_at?: string | null
        }
        Update: {
          avatar_url?: string | null
          bio?: string | null
          created_at?: string | null
          email?: string
          full_name?: string | null
          id?: string
          is_admin?: boolean | null
          location?: string | null
          total_analyses?: number | null
          total_problems_solved?: number | null
          updated_at?: string | null
        }
        Relationships: []
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
