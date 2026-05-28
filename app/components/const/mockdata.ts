import { Lead, Broadcast, Flow, Integration } from "../types/interface";

export const MOCK_LEADS: Lead[] = [
  { id: 1, name: "Kemi Adeleke",    phone: "+234 810 111 2222", topic: "Wholesale inquiry",    tag: "hot",  created_at: "Today"     },
  { id: 2, name: "Femi Owolabi",    phone: "+234 811 222 3333", topic: "Pricing question",     tag: "warm", created_at: "Today"     },
  { id: 3, name: "Blessing Okonkwo",phone: "+234 812 333 4444", topic: "Bulk order (50 units)",tag: "hot",  created_at: "Today"     },
  { id: 4, name: "Usman Danladi",   phone: "+234 813 444 5555", topic: "General inquiry",      tag: "cold", created_at: "Yesterday" },
  { id: 5, name: "Chioma Ihejirika",phone: "+234 814 555 6666", topic: "Delivery question",    tag: "warm", created_at: "Yesterday" },
  { id: 6, name: "Ade Bankole",     phone: "+234 815 666 7777", topic: "Custom order request", tag: "hot",  created_at: "Yesterday" },
  { id: 7, name: "Tunde Fashola",   phone: "+234 816 777 8888", topic: "Partnership inquiry",  tag: "warm", created_at: "May 22"    },
  { id: 8, name: "Ngozi Amaechi",   phone: "+234 817 888 9999", topic: "Return request",       tag: "cold", created_at: "May 22"    },
  { id: 9, name: "Seun Kuti",       phone: "+234 818 999 0000", topic: "Restock notification", tag: "warm", created_at: "May 21"    },
];

export const MOCK_BROADCASTS: Broadcast[] = [
  { id: 1, message: "Welcome to AutomateNG! Reply START to begin.",            audience: "All contacts",  audience_count: 1204, sent_at: "May 22, 10:00 AM", status: "delivered" },
  { id: 2, message: "Your order is on its way! Track here: bit.ly/track123",   audience: "Recent orders", audience_count: 340,  sent_at: "May 21, 2:30 PM",  status: "delivered" },
  { id: 3, message: "Flash sale — 30% off today only. Reply BUY to order now.",audience: "Hot leads",     audience_count: 87,   sent_at: "May 20, 9:00 AM",  status: "partial"   },
  { id: 4, message: "We miss you! Reply HELP if you need assistance.",          audience: "Inactive users",audience_count: 312,  sent_at: "May 18, 11:00 AM", status: "failed"    },
];

export const MOCK_FLOWS: Flow[] = [
  { id: 1, name: "New customer onboarding",  description: "Greets new contacts and captures lead info", icon: "user-plus",     active: true,  triggers: 847 },
  { id: 2, name: "Order tracking",           description: "Lets customers check order status by ID",    icon: "package",       active: true,  triggers: 612 },
  { id: 3, name: "Support triage",           description: "Routes support requests to the right team",  icon: "headset",       active: true,  triggers: 389 },
  { id: 4, name: "Flash sale promo",         description: "Sends promo offers to opted-in users",       icon: "tag",           active: false, triggers: 204 },
  { id: 5, name: "Post-purchase feedback",   description: "Requests review 3 days after delivery",      icon: "star",          active: true,  triggers: 178 },
  { id: 6, name: "Abandoned cart recovery",  description: "Follows up on incomplete purchases",         icon: "shopping-cart", active: false, triggers: 93  },
];

export const MOCK_INTEGRATIONS: Integration[] = [
  { id: "whatsapp", name: "WhatsApp Business", description: "Send and receive messages via WhatsApp API",  icon: "brand-whatsapp", connected: true,  color: "#25D366" },
  { id: "openai",   name: "OpenAI GPT-4o",     description: "AI-powered auto-replies and lead scoring",   icon: "brain",          connected: true,  color: "#8b1aff" },
  { id: "paystack", name: "Paystack",           description: "Accept payments directly in chat",           icon: "credit-card",    connected: true,  color: "#0BA4DB" },
  { id: "sheets",   name: "Google Sheets",      description: "Sync leads and conversations to Sheets",     icon: "table",          connected: false, color: "#34A853" },
  { id: "mailchimp",name: "Mailchimp",          description: "Add leads to email marketing lists",         icon: "mail",           connected: false, color: "#FFE01B" },
  { id: "shopify",  name: "Shopify",            description: "Sync orders and product catalog",            icon: "shopping-bag",   connected: false, color: "#95BF47" },
];

export const ANALYTICS_WEEKLY = {
  days: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
  messages: [210, 345, 280, 410, 390, 155, 180],
  response_times: [2.1, 1.9, 2.3, 1.7, 1.8, 2.0, 1.6],
};

export const TOP_QUESTIONS_MOCK = [
  { topic: "Pricing",  count: 42 },
  { topic: "Delivery", count: 35 },
  { topic: "Returns",  count: 25 },
  { topic: "Payment",  count: 20 },
  { topic: "Hours",    count: 12 },
];