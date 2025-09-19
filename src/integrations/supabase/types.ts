export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "13.0.5"
  }
  public: {
    Tables: {
      ai_outlines: {
        Row: {
          content_gap_id: string
          created_at: string | null
          estimated_word_count: number | null
          generated_at: string | null
          id: string
          meta_description: string | null
          outline: Json
          target_keywords: string[] | null
          title: string
        }
        Insert: {
          content_gap_id: string
          created_at?: string | null
          estimated_word_count?: number | null
          generated_at?: string | null
          id?: string
          meta_description?: string | null
          outline: Json
          target_keywords?: string[] | null
          title: string
        }
        Update: {
          content_gap_id?: string
          created_at?: string | null
          estimated_word_count?: number | null
          generated_at?: string | null
          id?: string
          meta_description?: string | null
          outline?: Json
          target_keywords?: string[] | null
          title?: string
        }
        Relationships: [
          {
            foreignKeyName: "ai_outlines_content_gap_id_fkey"
            columns: ["content_gap_id"]
            isOneToOne: false
            referencedRelation: "content_gaps"
            referencedColumns: ["id"]
          },
        ]
      }
      articles: {
        Row: {
          competitor_id: string | null
          content_hash: string | null
          crawled_at: string | null
          created_at: string | null
          extracted_keywords: string[] | null
          headings: Json | null
          id: string
          meta_description: string | null
          project_id: string | null
          publish_date: string | null
          title: string | null
          url: string
          word_count: number | null
        }
        Insert: {
          competitor_id?: string | null
          content_hash?: string | null
          crawled_at?: string | null
          created_at?: string | null
          extracted_keywords?: string[] | null
          headings?: Json | null
          id?: string
          meta_description?: string | null
          project_id?: string | null
          publish_date?: string | null
          title?: string | null
          url: string
          word_count?: number | null
        }
        Update: {
          competitor_id?: string | null
          content_hash?: string | null
          crawled_at?: string | null
          created_at?: string | null
          extracted_keywords?: string[] | null
          headings?: Json | null
          id?: string
          meta_description?: string | null
          project_id?: string | null
          publish_date?: string | null
          title?: string | null
          url?: string
          word_count?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "articles_competitor_id_fkey"
            columns: ["competitor_id"]
            isOneToOne: false
            referencedRelation: "competitors"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "articles_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "projects"
            referencedColumns: ["id"]
          },
        ]
      }
      competitors: {
        Row: {
          created_at: string | null
          id: string
          last_crawled_at: string | null
          name: string
          project_id: string
          status: string | null
          updated_at: string | null
          url: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          last_crawled_at?: string | null
          name: string
          project_id: string
          status?: string | null
          updated_at?: string | null
          url: string
        }
        Update: {
          created_at?: string | null
          id?: string
          last_crawled_at?: string | null
          name?: string
          project_id?: string
          status?: string | null
          updated_at?: string | null
          url?: string
        }
        Relationships: [
          {
            foreignKeyName: "competitors_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "projects"
            referencedColumns: ["id"]
          },
        ]
      }
      content_gaps: {
        Row: {
          competitor_coverage: Json | null
          content_depth_gap: number | null
          created_at: string | null
          id: string
          keyword_difficulty: number | null
          keyword_id: string
          opportunity_score: number | null
          project_id: string
          search_volume: number | null
          serp_gap: number | null
          status: string | null
          topic: string
          updated_at: string | null
          user_current_rank: number | null
        }
        Insert: {
          competitor_coverage?: Json | null
          content_depth_gap?: number | null
          created_at?: string | null
          id?: string
          keyword_difficulty?: number | null
          keyword_id: string
          opportunity_score?: number | null
          project_id: string
          search_volume?: number | null
          serp_gap?: number | null
          status?: string | null
          topic: string
          updated_at?: string | null
          user_current_rank?: number | null
        }
        Update: {
          competitor_coverage?: Json | null
          content_depth_gap?: number | null
          created_at?: string | null
          id?: string
          keyword_difficulty?: number | null
          keyword_id?: string
          opportunity_score?: number | null
          project_id?: string
          search_volume?: number | null
          serp_gap?: number | null
          status?: string | null
          topic?: string
          updated_at?: string | null
          user_current_rank?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "content_gaps_keyword_id_fkey"
            columns: ["keyword_id"]
            isOneToOne: false
            referencedRelation: "keywords"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "content_gaps_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "projects"
            referencedColumns: ["id"]
          },
        ]
      }
      crawl_sessions: {
        Row: {
          articles_found: number | null
          completed_at: string | null
          created_at: string | null
          error_message: string | null
          gaps_identified: number | null
          id: string
          keywords_extracted: number | null
          project_id: string
          started_at: string | null
          status: string | null
          type: string
        }
        Insert: {
          articles_found?: number | null
          completed_at?: string | null
          created_at?: string | null
          error_message?: string | null
          gaps_identified?: number | null
          id?: string
          keywords_extracted?: number | null
          project_id: string
          started_at?: string | null
          status?: string | null
          type: string
        }
        Update: {
          articles_found?: number | null
          completed_at?: string | null
          created_at?: string | null
          error_message?: string | null
          gaps_identified?: number | null
          id?: string
          keywords_extracted?: number | null
          project_id?: string
          started_at?: string | null
          status?: string | null
          type?: string
        }
        Relationships: [
          {
            foreignKeyName: "crawl_sessions_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "projects"
            referencedColumns: ["id"]
          },
        ]
      }
      keywords: {
        Row: {
          cpc: number | null
          created_at: string | null
          id: string
          keyword: string
          keyword_difficulty: number | null
          last_updated: string | null
          search_intent: string | null
          search_volume: number | null
        }
        Insert: {
          cpc?: number | null
          created_at?: string | null
          id?: string
          keyword: string
          keyword_difficulty?: number | null
          last_updated?: string | null
          search_intent?: string | null
          search_volume?: number | null
        }
        Update: {
          cpc?: number | null
          created_at?: string | null
          id?: string
          keyword?: string
          keyword_difficulty?: number | null
          last_updated?: string | null
          search_intent?: string | null
          search_volume?: number | null
        }
        Relationships: []
      }
      profiles: {
        Row: {
          company: string | null
          created_at: string | null
          email: string | null
          full_name: string | null
          id: string
          plan: string | null
          updated_at: string | null
          user_id: string
        }
        Insert: {
          company?: string | null
          created_at?: string | null
          email?: string | null
          full_name?: string | null
          id?: string
          plan?: string | null
          updated_at?: string | null
          user_id: string
        }
        Update: {
          company?: string | null
          created_at?: string | null
          email?: string | null
          full_name?: string | null
          id?: string
          plan?: string | null
          updated_at?: string | null
          user_id?: string
        }
        Relationships: []
      }
      projects: {
        Row: {
          created_at: string | null
          description: string | null
          id: string
          last_crawled_at: string | null
          name: string
          status: string | null
          updated_at: string | null
          url: string
          user_id: string
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          id?: string
          last_crawled_at?: string | null
          name: string
          status?: string | null
          updated_at?: string | null
          url: string
          user_id: string
        }
        Update: {
          created_at?: string | null
          description?: string | null
          id?: string
          last_crawled_at?: string | null
          name?: string
          status?: string | null
          updated_at?: string | null
          url?: string
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
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
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
