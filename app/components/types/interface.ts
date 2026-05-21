export interface Stats {
  messages_today: number;
  ai_replies: number;
  unique_contacts: number;
  avg_response_ms: number;
  reply_rate: number;
}

export interface TopQuestion {
  topic: string;
  count: number;
}

export interface StatusBreakdown {
  replied: number;
  failed: number;
  pending: number;
}

export interface MessageLog {
  id: number;
  phone: string;
  name: string;
  incoming: string;
  reply: string;
  status: "replied" | "failed" | "pending";
  created_at: string;
}