// AmberLit: Database types
// These mirror the Supabase schema. Regenerate with `supabase gen types typescript` when schema changes.

export type UserRole = 'parent' | 'aide' | 'admin';
export type YearLevel = 'F' | '1' | '2';
export type SessionMode = 'parent' | 'aide';
export type SessionStatus = 'active' | 'completed' | 'abandoned';
export type ResponseResult = 'correct' | 'incorrect' | 'prompted' | 'skipped';
export type InsightType = 'observation' | 'suggestion' | 'alert' | 'praise' | 'milestone';
export type AustralianState = 'VIC' | 'NSW' | 'QLD' | 'SA' | 'WA' | 'TAS' | 'NT' | 'ACT';

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string;
          display_name: string;
          role: UserRole;
          school_id: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id: string;
          display_name: string;
          role: UserRole;
          school_id?: string | null;
        };
        Update: {
          display_name?: string;
          role?: UserRole;
          school_id?: string | null;
          updated_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'profiles_school_id_fkey';
            columns: ['school_id'];
            isOneToOne: false;
            referencedRelation: 'schools';
            referencedColumns: ['id'];
          },
        ];
      };
      schools: {
        Row: {
          id: string;
          name: string;
          state: AustralianState;
          created_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          state: AustralianState;
        };
        Update: {
          name?: string;
          state?: AustralianState;
        };
        Relationships: [];
      };
      students: {
        Row: {
          id: string;
          parent_id: string | null;
          school_id: string | null;
          first_name: string;
          last_initial: string | null;
          year_level: YearLevel;
          avatar_seed: string | null;
          date_of_birth: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          parent_id?: string | null;
          school_id?: string | null;
          first_name: string;
          last_initial?: string | null;
          year_level: YearLevel;
          avatar_seed?: string | null;
          date_of_birth?: string | null;
        };
        Update: {
          first_name?: string;
          last_initial?: string | null;
          year_level?: YearLevel;
          avatar_seed?: string | null;
          date_of_birth?: string | null;
          updated_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'students_parent_id_fkey';
            columns: ['parent_id'];
            isOneToOne: false;
            referencedRelation: 'profiles';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'students_school_id_fkey';
            columns: ['school_id'];
            isOneToOne: false;
            referencedRelation: 'schools';
            referencedColumns: ['id'];
          },
        ];
      };
      groups: {
        Row: {
          id: string;
          aide_id: string;
          school_id: string;
          name: string;
          year_level: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          aide_id: string;
          school_id: string;
          name: string;
          year_level: string;
        };
        Update: {
          name?: string;
          year_level?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'groups_aide_id_fkey';
            columns: ['aide_id'];
            isOneToOne: false;
            referencedRelation: 'profiles';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'groups_school_id_fkey';
            columns: ['school_id'];
            isOneToOne: false;
            referencedRelation: 'schools';
            referencedColumns: ['id'];
          },
        ];
      };
      group_students: {
        Row: {
          group_id: string;
          student_id: string;
        };
        Insert: {
          group_id: string;
          student_id: string;
        };
        Update: {
          group_id?: string;
          student_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'group_students_group_id_fkey';
            columns: ['group_id'];
            isOneToOne: false;
            referencedRelation: 'groups';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'group_students_student_id_fkey';
            columns: ['student_id'];
            isOneToOne: false;
            referencedRelation: 'students';
            referencedColumns: ['id'];
          },
        ];
      };
      student_progress: {
        Row: {
          id: string;
          student_id: string;
          curriculum_node_id: string;
          domain: string;
          strand: string;
          mastery_level: number;
          attempts: number;
          correct: number;
          last_practiced: string | null;
          next_review: string | null;
          unlocked: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          student_id: string;
          curriculum_node_id: string;
          domain: string;
          strand: string;
          mastery_level?: number;
          attempts?: number;
          correct?: number;
          last_practiced?: string | null;
          next_review?: string | null;
          unlocked?: boolean;
        };
        Update: {
          mastery_level?: number;
          attempts?: number;
          correct?: number;
          last_practiced?: string | null;
          next_review?: string | null;
          unlocked?: boolean;
          updated_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'student_progress_student_id_fkey';
            columns: ['student_id'];
            isOneToOne: false;
            referencedRelation: 'students';
            referencedColumns: ['id'];
          },
        ];
      };
      sessions: {
        Row: {
          id: string;
          student_id: string;
          conductor_id: string;
          mode: SessionMode;
          group_id: string | null;
          started_at: string;
          ended_at: string | null;
          duration_seconds: number | null;
          lesson_id: string;
          status: SessionStatus;
        };
        Insert: {
          id?: string;
          student_id: string;
          conductor_id: string;
          mode: SessionMode;
          group_id?: string | null;
          lesson_id: string;
          status?: SessionStatus;
        };
        Update: {
          ended_at?: string;
          duration_seconds?: number;
          status?: SessionStatus;
        };
        Relationships: [
          {
            foreignKeyName: 'sessions_student_id_fkey';
            columns: ['student_id'];
            isOneToOne: false;
            referencedRelation: 'students';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'sessions_conductor_id_fkey';
            columns: ['conductor_id'];
            isOneToOne: false;
            referencedRelation: 'profiles';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'sessions_group_id_fkey';
            columns: ['group_id'];
            isOneToOne: false;
            referencedRelation: 'groups';
            referencedColumns: ['id'];
          },
        ];
      };
      responses: {
        Row: {
          id: string;
          session_id: string;
          student_id: string;
          activity_type: string;
          curriculum_node_id: string;
          stimulus: string;
          expected_response: string | null;
          actual_response: string | null;
          result: ResponseResult;
          response_time_ms: number | null;
          ai_feedback: string | null;
          aide_note: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          session_id: string;
          student_id: string;
          activity_type: string;
          curriculum_node_id: string;
          stimulus: string;
          expected_response?: string | null;
          actual_response?: string | null;
          result: ResponseResult;
          response_time_ms?: number | null;
          ai_feedback?: string | null;
          aide_note?: string | null;
        };
        Update: {
          ai_feedback?: string;
          aide_note?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'responses_session_id_fkey';
            columns: ['session_id'];
            isOneToOne: false;
            referencedRelation: 'sessions';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'responses_student_id_fkey';
            columns: ['student_id'];
            isOneToOne: false;
            referencedRelation: 'students';
            referencedColumns: ['id'];
          },
        ];
      };
      ai_insights: {
        Row: {
          id: string;
          student_id: string;
          session_id: string | null;
          insight_type: InsightType;
          title: string;
          body: string;
          domain: string | null;
          priority: number;
          dismissed: boolean;
          created_at: string;
        };
        Insert: {
          id?: string;
          student_id: string;
          session_id?: string | null;
          insight_type: InsightType;
          title: string;
          body: string;
          domain?: string | null;
          priority?: number;
        };
        Update: {
          dismissed?: boolean;
        };
        Relationships: [
          {
            foreignKeyName: 'ai_insights_student_id_fkey';
            columns: ['student_id'];
            isOneToOne: false;
            referencedRelation: 'students';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'ai_insights_session_id_fkey';
            columns: ['session_id'];
            isOneToOne: false;
            referencedRelation: 'sessions';
            referencedColumns: ['id'];
          },
        ];
      };
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
    Enums: Record<string, never>;
    CompositeTypes: Record<string, never>;
  };
}
