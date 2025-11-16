import { Heart, Users, Calendar, MessageCircle } from "lucide-react";
import MobileNav from "@/components/MobileNav";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";

export default function FollowingPage() {
  const followedClubs = [
    {
      id: "1",
      name: "UTD Sports Club",
      image: null,
      members: 245,
      events: 12,
      category: "Sports",
    },
    {
      id: "2",
      name: "Entrepreneur Club",
      image: null,
      members: 189,
      events: 8,
      category: "Business",
    },
    {
      id: "3",
      name: "Computer Science Club",
      image: null,
      members: 567,
      events: 24,
      category: "Technology",
    },
    {
      id: "4",
      name: "Photography Society",
      image: null,
      members: 123,
      events: 6,
      category: "Arts",
    },
  ];

  return (
    <div className="min-h-screen bg-white pb-20">
      <div className="sticky top-0 bg-white border-b border-gray-200 z-40">
        <div className="px-4 pt-12 pb-4">
          <h1 className="text-3xl font-semibold text-black">Following</h1>
          <p className="text-sm text-gray-600 mt-1">
            {followedClubs.length} clubs you're part of
          </p>
        </div>
      </div>

      <div className="px-4 py-4">
        <div className="space-y-4">
          {followedClubs.map((club) => (
            <Card key={club.id} className="border border-gray-200 shadow-sm">
              <CardContent className="p-4">
                <div className="flex items-start gap-3">
                  <div className="w-16 h-16 rounded-lg bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center flex-shrink-0">
                    <Users className="w-8 h-8 text-gray-600" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-lg text-black mb-1">
                      {club.name}
                    </h3>
                    <span className="inline-block px-2 py-1 bg-gray-100 text-xs font-medium text-gray-700 rounded-full mb-2">
                      {club.category}
                    </span>
                    <div className="flex items-center gap-4 text-xs text-gray-600">
                      <div className="flex items-center gap-1">
                        <Users className="w-4 h-4" />
                        <span>{club.members} members</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        <span>{club.events} events</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="mt-3 flex gap-2">
                  <Link href={`/club/${club.id}`} className="flex-1">
                    <Button className="w-full bg-[#2c2c2c] hover:bg-[#1e1e1e] text-white rounded-lg">
                      View Club
                    </Button>
                  </Link>
                  <Link href={`/chat/${club.id}`}>
                    <Button
                      variant="outline"
                      size="icon"
                      className="border-gray-300 rounded-lg"
                    >
                      <MessageCircle className="w-5 h-5" />
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {followedClubs.length === 0 && (
          <div className="text-center py-16">
            <Heart className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              Not following any clubs yet
            </h3>
            <p className="text-sm text-gray-500 mb-6">
              Discover clubs and start following them
            </p>
            <Link href="/">
              <Button className="bg-[#2c2c2c] hover:bg-[#1e1e1e] text-white rounded-lg">
                Explore Clubs
              </Button>
            </Link>
          </div>
        )}
      </div>

      <MobileNav />
    </div>
  );
}
