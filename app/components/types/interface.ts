export interface DashboardStats { 
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

export interface Lead {
  id: number;
  name: string;
  phone: string;
  topic: string;
  tag: "hot" | "warm" | "cold";
  created_at: string;
}

export interface Broadcast {
  id: number;
  message: string;
  audience: string;
  audience_count: number;
  sent_at: string;
  status: "delivered" | "partial" | "failed";
}

export interface Flow {
  id: number;
  name: string;
  description: string;
  icon: string;
  active: boolean;
  triggers: number;
}

export interface Integration {
  id: string;
  name: string;
  description: string;
  icon: string;
  connected: boolean;
  color: string;
}

export interface ConversationMessage {
  role: "user" | "assistant";
  content: string;
  time: string;
}


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
  id:  number;
  phone: string;
  name: string;
  incoming: string;
  reply: string;
  status: "replied" | "failed" | "pending";
  created_at: string;
}