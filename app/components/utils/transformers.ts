
import { Metrics, Analytics, ApiMessageLog } from "../types/dto";
import { DashboardStats, MessageLog, TopQuestion } from "../types/interface";


export function transformMetrics(m?: Metrics, a?: Analytics): DashboardStats {
  const sent = a?.status_breakdown?.sent ?? 0;
  const failed = a?.status_breakdown?.failed ?? 0;
  const total = sent + failed;

  // Parse "1.4s" or "500ms"
  const avgStr = m?.avg_response ?? "0ms";
  const num = parseFloat(avgStr);
  const ms = avgStr.includes("s") && !avgStr.includes("ms") ? num * 1000 : num;

  return {
    messages_today: m?.messages_today ?? 0,
    ai_replies: sent,
    unique_contacts: m?.unique_contacts ?? 0,
    avg_response_ms: ms,
    reply_rate: total > 0 ? Math.round((sent / total) * 100) : 100,
  };
}

export function transformLogs(logs: ApiMessageLog[] = []): MessageLog[] {
  return logs.map((l, i) => ({
    id: i,
    phone: l.phone,
    name: l.name || "Unknown",
    incoming: l.message,
    reply: l.ai_reply,
    status: l.status === "sent" ? "replied" : "failed",
    created_at: l.time,
  }));
}

export function transformTopQuestions(a?: Analytics): TopQuestion[] {
  return a?.top_questions.map(q => ({ topic: q.label, count: q.count })) ?? [];
}