import axios from "axios";
import {
  Metrics,
  Analytics,
  ApiMessageLog,
  ApiConversationDetail,
} from "../components/types/dto";

const BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "https://your-vercel-domain.com";

const api = axios.create({
  baseURL: BASE_URL,
  headers: { "Content-Type": "application/json" },
});

export const dashboardService = {
  getMetrics: async (): Promise<Metrics> => {
    const { data } = await api.get("/dashboard/metrics/");
    return data;
  },
  getAnalytics: async (): Promise<Analytics> => {
    const { data } = await api.get("/dashboard/analytics/");
    return data;
  },
  getLogs: async (): Promise<ApiMessageLog[]> => {
    const { data } = await api.get("/dashboard/logs/");
    return data;
  },
  getConversation: async (phone: string): Promise<ApiConversationDetail[]> => {
    const { data } = await api.get(`/dashboard/conversation/${phone}/`);
    return data;
  },
};