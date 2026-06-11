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

export type Comment = {
  id: number;
  post_slug: string;
  user_id: string | null;
  message: string;
  approved: boolean | null;
  review_status: "pending" | "approved" | "hidden" | null;
  created_at: string | null;
  updated_at: string | null;
};

export type ArticleComment = {
  id: number;
  post_slug: string;
  user_id: string | null;
  message: string;
  approved: boolean | null;
  review_status: "pending" | "approved" | "hidden" | null;
  created_at: string | null;
  nickname: string | null;
  avatar_url: string | null;
  total_count: number;
};

export type ArticleMetrics = {
  view_count: number;
  like_count: number;
  liked_by_me: boolean;
};

export type FeedbackStatus = "pending" | "replied" | "resolved";
export type FeedbackType = "suggestion" | "bug" | "praise" | "other";

export type FeedbackMessage = {
  id: number;
  user_id: string | null;
  type: FeedbackType;
  title: string;
  message: string;
  status: FeedbackStatus;
  admin_reply: string | null;
  replied_at: string | null;
  created_at: string | null;
  updated_at: string | null;
};

export type AdminFeedbackMessage = FeedbackMessage & {
  email: string | null;
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
      comments: {
        Row: Comment;
        Insert: {
          id?: number;
          post_slug: string;
          user_id?: string;
          message: string;
          approved?: boolean | null;
          review_status?: "pending" | "approved" | "hidden" | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          message?: string;
          approved?: boolean | null;
          review_status?: "pending" | "approved" | "hidden" | null;
          updated_at?: string;
        };
        Relationships: [];
      };
      article_views: {
        Row: {
          id: number;
          post_slug: string;
          user_id: string | null;
          visitor_id: string | null;
          created_at: string | null;
        };
        Insert: {
          id?: number;
          post_slug: string;
          user_id?: string | null;
          visitor_id?: string | null;
          created_at?: string;
        };
        Update: never;
        Relationships: [];
      };
      article_likes: {
        Row: {
          id: number;
          post_slug: string;
          user_id: string;
          created_at: string | null;
        };
        Insert: {
          id?: number;
          post_slug: string;
          user_id?: string;
          created_at?: string;
        };
        Update: never;
        Relationships: [];
      };
      feedback_messages: {
        Row: FeedbackMessage;
        Insert: {
          id?: number;
          user_id?: string;
          type: FeedbackType;
          title: string;
          message: string;
          status?: FeedbackStatus;
          admin_reply?: string | null;
          replied_at?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          type?: FeedbackType;
          title?: string;
          message?: string;
          status?: FeedbackStatus;
          admin_reply?: string | null;
          replied_at?: string | null;
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
      article_comments: {
        Args: {
          target_post_slug: string;
          page_number: number;
          page_size: number;
        };
        Returns: ArticleComment[];
      };
      set_article_comment_approved: {
        Args: {
          comment_id: number;
          next_approved: boolean;
        };
        Returns: undefined;
      };
      delete_article_comment: {
        Args: {
          comment_id: number;
        };
        Returns: undefined;
      };
      admin_feedback_messages: {
        Args: Record<string, never>;
        Returns: AdminFeedbackMessage[];
      };
      admin_reply_feedback: {
        Args: {
          feedback_id: number;
          reply_text: string;
        };
        Returns: undefined;
      };
      admin_set_feedback_status: {
        Args: {
          feedback_id: number;
          next_status: FeedbackStatus;
        };
        Returns: undefined;
      };
      admin_delete_feedback: {
        Args: {
          feedback_id: number;
        };
        Returns: undefined;
      };
      increment_article_view: {
        Args: {
          target_post_slug: string;
          visitor_id: string;
        };
        Returns: number;
      };
      article_metrics: {
        Args: {
          target_post_slug: string;
        };
        Returns: ArticleMetrics[];
      };
      toggle_article_like: {
        Args: {
          target_post_slug: string;
        };
        Returns: ArticleMetrics[];
      };
    };
    Enums: Record<string, never>;
    CompositeTypes: Record<string, never>;
  };
};
