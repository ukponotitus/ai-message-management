export interface Metrics {
  messages_today: number;
  diff_yesterday: number;
  unique_contacts: number;
  avg_response: string; // e.g., "1.4s"
}

export interface ApiTopQuestion {
  label: string; // Backend sends "label"
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
  message: string;    // Django backend uses "message"
  ai_reply: string;   // Django backend uses "ai_reply"
  time: string;
  status: "sent" | "failed";
}

export interface ApiConversationDetail {
  role: "user" | "assistant";
  content: string;
  time: string;
}