import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";

import HomePage from "@/pages/HomePage";
import LoginPage from "@/pages/LoginPage";
import NotificationsPage from "@/pages/NotificationsPage";
import FollowingPage from "@/pages/FollowingPage";
import ProfilePage from "@/pages/ProfilePage";
import ClubDetailPage from "@/pages/ClubDetailPage";
import ChatRoomPage from "@/pages/ChatRoomPage";
import CreateClubPage from "@/pages/CreateClubPage";
import { ReportedEvents } from "@/pages/ReportedEvents";

function Router() {
  return (
    <Switch>
      <Route path="/login" component={LoginPage} />
      <Route path="/" component={HomePage} />
      <Route path="/notifications" component={NotificationsPage} />
      <Route path="/following" component={FollowingPage} />
      <Route path="/profile" component={ProfilePage} />
      <Route path="/club/:id" component={ClubDetailPage} />
      <Route path="/chat/:id" component={ChatRoomPage} />
      <Route path="/create-club" component={CreateClubPage} />
      <Route path="/admin/reported-events" component={ReportedEvents} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
