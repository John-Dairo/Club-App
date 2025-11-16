import { User, Settings, LogOut, Users, Calendar, Award } from "lucide-react";
import MobileNav from "@/components/MobileNav";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function ProfilePage() {
  const userProfile = {
    username: "john_doe",
    displayName: "John Doe",
    bio: "Passionate about technology and sports. Always looking for new clubs to join!",
    avatar: null,
    stats: {
      clubsJoined: 4,
      eventsAttended: 12,
      role: "Member",
    },
  };

  const achievements = [
    { id: "1", name: "Early Adopter", description: "Joined 5 clubs" },
    { id: "2", name: "Event Regular", description: "Attended 10 events" },
    { id: "3", name: "Community Builder", description: "Created a club" },
  ];

  return (
    <div className="min-h-screen bg-white pb-20">
      <div className="bg-gradient-to-b from-gray-100 to-white">
        <div className="px-4 pt-12 pb-6">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-3xl font-semibold text-black">Profile</h1>
            <Button variant="ghost" size="icon" className="text-gray-600">
              <Settings className="w-6 h-6" />
            </Button>
          </div>

          <div className="flex flex-col items-center">
            <div className="w-24 h-24 rounded-full bg-gradient-to-br from-gray-300 to-gray-400 flex items-center justify-center mb-4">
              <User className="w-12 h-12 text-white" />
            </div>
            <h2 className="text-2xl font-semibold text-black">
              {userProfile.displayName}
            </h2>
            <p className="text-sm text-gray-600 mb-4">@{userProfile.username}</p>
            <p className="text-sm text-gray-700 text-center max-w-xs mb-6">
              {userProfile.bio}
            </p>

            <div className="flex gap-4 w-full max-w-sm">
              <Card className="flex-1 border border-gray-200">
                <CardContent className="p-4 text-center">
                  <div className="text-2xl font-bold text-[#2c2c2c]">
                    {userProfile.stats.clubsJoined}
                  </div>
                  <div className="text-xs text-gray-600 mt-1">Clubs</div>
                </CardContent>
              </Card>
              <Card className="flex-1 border border-gray-200">
                <CardContent className="p-4 text-center">
                  <div className="text-2xl font-bold text-[#2c2c2c]">
                    {userProfile.stats.eventsAttended}
                  </div>
                  <div className="text-xs text-gray-600 mt-1">Events</div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>

      <div className="px-4 py-6">
        <h3 className="text-lg font-semibold text-black mb-4 flex items-center gap-2">
          <Award className="w-5 h-5" />
          Achievements
        </h3>
        <div className="space-y-3">
          {achievements.map((achievement) => (
            <Card key={achievement.id} className="border border-gray-200">
              <CardContent className="p-4 flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-yellow-100 flex items-center justify-center flex-shrink-0">
                  <Award className="w-6 h-6 text-yellow-600" />
                </div>
                <div>
                  <h4 className="font-semibold text-black">
                    {achievement.name}
                  </h4>
                  <p className="text-sm text-gray-600">
                    {achievement.description}
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-8 space-y-3">
          <Button
            variant="outline"
            className="w-full justify-start border-gray-300 rounded-lg py-6"
          >
            <Settings className="w-5 h-5 mr-3" />
            Settings
          </Button>
          <Button
            variant="outline"
            className="w-full justify-start border-gray-300 text-red-600 hover:text-red-700 hover:bg-red-50 rounded-lg py-6"
          >
            <LogOut className="w-5 h-5 mr-3" />
            Log Out
          </Button>
        </div>
      </div>

      <MobileNav />
    </div>
  );
}
