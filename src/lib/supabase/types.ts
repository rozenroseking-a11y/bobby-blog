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

export type AdminGuestbookMessage = {
  id: number;
  user_id: string | null;
  email: string | null;
  name: string;
  message: string | null;
  approved: boolean | null;
  review_status: "pending" | "approved" | "hidden" | null;
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
    Functions: {
      admin_guestbook_messages: {
        Args: Record<string, never>;
        Returns: AdminGuestbookMessage[];
      };
      admin_set_guestbook_approved: {
        Args: {
          message_id: number;
          next_approved: boolean;
        };
        Returns: undefined;
      };
      admin_delete_guestbook_message: {
        Args: {
          message_id: number;
        };
        Returns: undefined;
      };
    };
    Enums: Record<string, never>;
    CompositeTypes: Record<string, never>;
  };
};
