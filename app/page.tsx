"use client";

import { useState } from "react";
import { Box } from "@mantine/core";
import { useQueryClient as useQC } from "@tanstack/react-query";
import AnalyticsPage  from "./AnalyticsPage/page";
import { Sidebar } from "./components/layout/sidebar";
import { Topbar } from "./components/layout/Topbar";
import { useDashboard } from "./hooks/useDashboard";

import SettingsPage from "./ SettingsPage/page";
import BroadcastsPage from "./BroadcastsPage/page";
import ConversationsPage from "./ConversationsPage/page";
import FlowsPage from "./FlowsPage/page";
import IntegrationsPage from "./IntegrationsPage/page";
import LeadsPage from "./LeadsPage/page";
import LoginPage from "./LoginPage/page";
import OverviewPage from "./OverviewPage/page";

type Page =
  | "overview" | "conversations" | "leads" | "broadcasts"
  | "flows" | "integrations" | "analytics" | "settings";

function DashboardShell() {
  const [activePage, setActivePage] = useState<Page>("overview");
  const queryClient = useQC();
  const { isRefetching } = useDashboard();

  const handleRefresh = () => {
    queryClient.invalidateQueries({ queryKey: ["dashboard"] });
  };

  const pages: Record<Page, React.ReactNode> = {
    overview:      <OverviewPage      />,
    conversations: <ConversationsPage />,
    leads:         <LeadsPage         />,
    broadcasts:    <BroadcastsPage    />,
    flows:         <FlowsPage         />,
    integrations:  <IntegrationsPage  />,
    analytics:     <AnalyticsPage     />,
    settings:      <SettingsPage      />,
  };

  return (
    <Box style={{ display: "flex", height: "100vh", overflow: "hidden", background: "#f4f6f4" }}>
      <Sidebar
        activePage={activePage}
        onNavigate={(p) => setActivePage(p as Page)}
      />
      <Box style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" }}>
        <Topbar
          activePage={activePage}
          lastUpdated={new Date()}
          loading={isRefetching}
          onRefresh={handleRefresh}
          onNewBroadcast={() => setActivePage("broadcasts")}
        />
        <Box style={{ flex: 1, overflowY: "auto", padding: 24 }}>
          {pages[activePage]}
        </Box>
        <Box
          style={{
            borderTop: "0.5px solid #d4e8d4",
            padding: "12px 24px",
            background: "#fff",
            display: "flex",
            justifyContent: "space-between",
            flexShrink: 0,
          }}
        >
          <span style={{ fontSize: 11, color: "#9ab09a" }}>AutomateNG Admin · Internal use only</span>
          <span style={{ fontSize: 11, color: "#9ab09a" }}>Auto-refreshes every 15-30s</span>
        </Box>
      </Box>
    </Box>
  );
}

export default function AdminDashboard() {
  const [loggedIn, setLoggedIn] = useState(false);

  if (!loggedIn) {
    return <LoginPage onLogin={() => setLoggedIn(true)} />;
  }

  return <DashboardShell />;
}