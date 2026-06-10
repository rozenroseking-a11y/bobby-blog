export type Profile = {
  id: string;
  nickname: string | null;
  avatar_url: string | null;
  created_at: string;
  updated_at: string;
};

export type GuestbookMessage = {
  id: number;
  name: string;
  message: string | null;
  approved: boolean | null;
  user_id: string | null;
  created_at: string | null;
  updated_at: string | null;
};

export type PublicGuestbookMessage = {
  id: number;
  user_id: string | null;
  message: string | null;
  created_at: string | null;
  nickname: string | null;
  avatar_url: string | null;
};

export type Database = {
  public: {
    Tables: {
      profiles: {
        Row: Profile;
        Insert: {
          id: string;
          nickname?: string | null;
          avatar_url?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          nickname?: string | null;
          avatar_url?: string | null;
          updated_at?: string;
        };
        Relationships: [];
      };
      guestbook_messages: {
        Row: GuestbookMessage;
        Insert: {
          id?: number;
          name: string;
          user_id?: string;
          message?: string | null;
          approved?: boolean | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          name?: string;
          message?: string | null;
          approved?: boolean | null;
          updated_at?: string;
        };
        Relationships: [];
      };
    };
    Views: {
      public_guestbook_messages: {
        Row: PublicGuestbookMessage;
        Insert: never;
        Update: never;
        Relationships: [];
      };
    };
    Functions: Record<string, never>;
    Enums: Record<string, never>;
    CompositeTypes: Record<string, never>;
  };
};
