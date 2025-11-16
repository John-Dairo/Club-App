import { useRoute, Link } from "wouter";
import {
  ArrowLeft,
  Users,
  Calendar,
  MessageCircle,
  Share2,
  Settings,
  Crown,
  Shield,
  Star,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function ClubDetailPage() {
  const [, params] = useRoute("/club/:id");

  const club = {
    id: params?.id || "1",
    name: "UTD Sports Club",
    description:
      "Join us for various sports activities including volleyball, basketball, and soccer. We organize weekly games and tournaments for all skill levels.",
    image: null,
    category: "Sports",
    members: 245,
    events: 12,
    role: "member",
  };

  const upcomingEvents = [
    {
      id: "1",
      title: "UTD VOLLEYBALL GAME",
      date: "Oct 13, 2025",
      time: "6:00 PM",
      attendees: 24,
    },
    {
      id: "2",
      title: "Basketball Tournament",
      date: "Oct 20, 2025",
      time: "3:00 PM",
      attendees: 32,
    },
  ];

  const members = [
    { id: "1", name: "Alice Johnson", role: "owner", avatar: null },
    { id: "2", name: "Bob Smith", role: "admin", avatar: null },
    { id: "3", name: "Carol Davis", role: "moderator", avatar: null },
    { id: "4", name: "David Wilson", role: "member", avatar: null },
    { id: "5", name: "Eve Martinez", role: "member", avatar: null },
  ];

  const getRoleIcon = (role: string) => {
    switch (role) {
      case "owner":
        return <Crown className="w-4 h-4 text-yellow-600" />;
      case "admin":
        return <Shield className="w-4 h-4 text-red-600" />;
      case "moderator":
        return <Star className="w-4 h-4 text-blue-600" />;
      default:
        return null;
    }
  };

  const getRoleBadge = (role: string) => {
    const colors = {
      owner: "bg-yellow-100 text-yellow-700",
      admin: "bg-red-100 text-red-700",
      moderator: "bg-blue-100 text-blue-700",
      member: "bg-gray-100 text-gray-700",
    };
    return (
      <span
        className={`px-2 py-1 rounded-full text-xs font-medium ${
          colors[role as keyof typeof colors]
        }`}
      >
        {role.charAt(0).toUpperCase() + role.slice(1)}
      </span>
    );
  };

  return (
    <div className="min-h-screen bg-white pb-6">
      <div className="sticky top-0 bg-white border-b border-gray-200 z-40">
        <div className="px-4 pt-12 pb-4 flex items-center gap-3">
          <Link href="/following">
            <button className="p-2 -ml-2 hover:bg-gray-100 rounded-full transition-colors">
              <ArrowLeft className="w-6 h-6 text-black" />
            </button>
          </Link>
          <h1 className="text-xl font-semibold text-black flex-1">
            Club Details
          </h1>
          <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
            <Share2 className="w-6 h-6 text-gray-600" />
          </button>
        </div>
      </div>

      <div className="px-4 py-6">
        <div className="flex items-start gap-4 mb-6">
          <div className="w-20 h-20 rounded-xl bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center flex-shrink-0">
            <Users className="w-10 h-10 text-gray-600" />
          </div>
          <div className="flex-1">
            <h2 className="text-2xl font-bold text-black mb-2">{club.name}</h2>
            <span className="inline-block px-3 py-1 bg-gray-100 text-sm font-medium text-gray-700 rounded-full">
              {club.category}
            </span>
          </div>
        </div>

        <p className="text-gray-700 mb-6">{club.description}</p>

        <div className="flex gap-3 mb-6">
          <Card className="flex-1 border border-gray-200">
            <CardContent className="p-3 text-center">
              <div className="text-xl font-bold text-[#2c2c2c]">
                {club.members}
              </div>
              <div className="text-xs text-gray-600 mt-1">Members</div>
            </CardContent>
          </Card>
          <Card className="flex-1 border border-gray-200">
            <CardContent className="p-3 text-center">
              <div className="text-xl font-bold text-[#2c2c2c]">
                {club.events}
              </div>
              <div className="text-xs text-gray-600 mt-1">Events</div>
            </CardContent>
          </Card>
        </div>

        <div className="flex gap-2 mb-6">
          <Link href={`/chat/${club.id}`} className="flex-1">
            <Button className="w-full bg-[#2c2c2c] hover:bg-[#1e1e1e] text-white rounded-lg py-6 flex items-center justify-center gap-2">
              <MessageCircle className="w-5 h-5" />
              Open Chat
            </Button>
          </Link>
          {(club.role === "admin" || club.role === "owner") && (
            <Button
              variant="outline"
              size="icon"
              className="border-gray-300 rounded-lg h-auto px-4"
            >
              <Settings className="w-5 h-5" />
            </Button>
          )}
        </div>

        <Tabs defaultValue="events" className="w-full">
          <TabsList className="w-full grid grid-cols-2 bg-gray-100 rounded-lg p-1">
            <TabsTrigger
              value="events"
              className="rounded-md data-[state=active]:bg-white data-[state=active]:text-black"
            >
              Events
            </TabsTrigger>
            <TabsTrigger
              value="members"
              className="rounded-md data-[state=active]:bg-white data-[state=active]:text-black"
            >
              Members
            </TabsTrigger>
          </TabsList>

          <TabsContent value="events" className="mt-4">
            <div className="space-y-3">
              {upcomingEvents.map((event) => (
                <Card key={event.id} className="border border-gray-200">
                  <CardContent className="p-4">
                    <div className="flex items-start gap-3">
                      <div className="w-12 h-12 rounded-lg bg-[#2c2c2c] flex items-center justify-center flex-shrink-0">
                        <Calendar className="w-6 h-6 text-white" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-base text-black mb-1">
                          {event.title}
                        </h3>
                        <p className="text-sm text-gray-600 mb-2">
                          {event.date} at {event.time}
                        </p>
                        <div className="flex items-center gap-2 text-xs text-gray-500">
                          <Users className="w-4 h-4" />
                          <span>{event.attendees} attending</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="members" className="mt-4">
            <div className="space-y-2">
              {members.map((member) => (
                <Card key={member.id} className="border border-gray-200">
                  <CardContent className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-gray-300 to-gray-400 flex items-center justify-center flex-shrink-0">
                        <Users className="w-5 h-5 text-white" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <h4 className="font-medium text-black">
                            {member.name}
                          </h4>
                          {getRoleIcon(member.role)}
                        </div>
                      </div>
                      {getRoleBadge(member.role)}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
