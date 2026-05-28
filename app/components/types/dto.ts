export interface Metrics {
  messages_today: number;
  diff_yesterday: number;
  unique_contacts: number;
  avg_response: string; // "1.4s"
}

export interface ApiTopQuestion {
  label: string;
  count: number;
}

export interface Analytics {
  status_breakdown: {
    sent: number;
    failed: number;
  };
  top_questions: ApiTopQuestion[];
}

export interface ApiMessageLog {
  name: string;
  phone: string;
  message: string;    // Backend key
  ai_reply: string;   // Backend key
  time: string;
  status: "sent" | "failed";
}

export interface ApiConversationDetail {
  role: "user" | "assistant";
  content: string;
  time: string;
}