import { useState } from "react";
import { useRoute, Link } from "wouter";
import {
  ArrowLeft,
  Send,
  Users,
  Crown,
  Shield,
  Star,
  MoreVertical,
  Hash,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "@/lib/api";

const DEMO_USER_ID = "demo-user-id";

export default function ChatRoomPage() {
  const [, params] = useRoute("/chat/:id");
  const [message, setMessage] = useState("");
  const queryClient = useQueryClient();
  
  const clubId = params?.id || "";

  const { data: club } = useQuery({
    queryKey: ["club", clubId],
    queryFn: () => api.clubs.getById(clubId),
    enabled: !!clubId,
  });

  const { data: chatMessages = [] } = useQuery({
    queryKey: ["chat", clubId],
    queryFn: () => api.chat.getMessages(clubId),
    enabled: !!clubId,
    refetchInterval: 3000,
  });

  const { data: members = [] } = useQuery({
    queryKey: ["members", clubId],
    queryFn: () => api.clubs.getMembers(clubId),
    enabled: !!clubId,
  });

  const sendMutation = useMutation({
    mutationFn: () => api.chat.sendMessage(clubId, DEMO_USER_ID, message),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["chat", clubId] });
      setMessage("");
    },
  });

  const getUserRole = (userId: string) => {
    const member = members.find((m: any) => m.userId === userId);
    return member?.role || "member";
  };

  const messages = chatMessages;

  const getRoleColor = (role: string) => {
    switch (role) {
      case "owner":
        return "text-yellow-600";
      case "admin":
        return "text-red-600";
      case "moderator":
        return "text-blue-600";
      default:
        return "text-gray-600";
    }
  };

  const getRoleIcon = (role: string) => {
    switch (role) {
      case "owner":
        return <Crown className="w-3 h-3 text-yellow-600" />;
      case "admin":
        return <Shield className="w-3 h-3 text-red-600" />;
      case "moderator":
        return <Star className="w-3 h-3 text-blue-600" />;
      default:
        return null;
    }
  };

  const handleSend = () => {
    if (message.trim() && !sendMutation.isPending) {
      sendMutation.mutate();
    }
  };

  return (
    <div className="flex flex-col h-screen bg-white">
      <div className="sticky top-0 bg-white border-b border-gray-200 z-40">
        <div className="px-4 pt-12 pb-4">
          <div className="flex items-center gap-3">
            <Link href={`/club/${club?.id || clubId}`}>
              <button className="p-2 -ml-2 hover:bg-gray-100 rounded-full transition-colors">
                <ArrowLeft className="w-6 h-6 text-black" />
              </button>
            </Link>
            <div className="flex items-center gap-2 flex-1">
              <Hash className="w-5 h-5 text-gray-500" />
              <div>
                <h1 className="text-lg font-semibold text-black">general</h1>
                <p className="text-xs text-gray-500">{club?.name || "Loading..."}</p>
              </div>
            </div>
            <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
              <Users className="w-6 h-6 text-gray-600" />
            </button>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4">
        {messages.map((msg: any) => {
          const userRole = getUserRole(msg.userId);
          return (
            <div key={msg.id} className="flex gap-3 group hover:bg-gray-50 -mx-2 px-2 py-1 rounded-lg transition-colors">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-gray-300 to-gray-400 flex items-center justify-center flex-shrink-0 mt-1">
                <Users className="w-5 h-5 text-white" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <span className={`font-semibold text-sm ${getRoleColor(userRole)}`}>
                    {msg.user?.username || "Unknown"}
                  </span>
                  {getRoleIcon(userRole)}
                  <span className="text-xs text-gray-500">
                    {new Date(msg.createdAt).toLocaleTimeString()}
                  </span>
                </div>
                <p className="text-sm text-gray-800 break-words">{msg.content}</p>
              </div>
              <button className="opacity-0 group-hover:opacity-100 p-1 hover:bg-gray-200 rounded transition-opacity">
                <MoreVertical className="w-4 h-4 text-gray-500" />
              </button>
            </div>
          );
        })}
      </div>

      <div className="border-t border-gray-200 px-4 py-4 bg-white">
        <div className="flex gap-2 items-center">
          <Input
            type="text"
            placeholder="Message #general"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && handleSend()}
            className="flex-1 rounded-lg border border-gray-300 bg-white focus:border-gray-400 focus:ring-0"
          />
          <Button
            onClick={handleSend}
            disabled={!message.trim()}
            size="icon"
            className="bg-[#2c2c2c] hover:bg-[#1e1e1e] text-white rounded-lg h-10 w-10 flex-shrink-0"
          >
            <Send className="w-5 h-5" />
          </Button>
        </div>
      </div>
    </div>
  );
}
