import { useState } from "react";
import { Search, TrendingUp, Plus } from "lucide-react";
import MobileNav from "@/components/MobileNav";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Link } from "wouter";

export default function HomePage() {
  const [searchQuery, setSearchQuery] = useState("");

  const trendingEvents = [
    {
      id: "1",
      title: "UTD VOLLEYBALL GAME",
      description: "Oct 13, 2025 6v6 Coed Volleyball game",
      club: "UTD Sports Club",
      attendees: 24,
    },
    {
      id: "2",
      title: "Tech Startup Presentation",
      description: "Oct 12, 2025, Learn about how to start a startup",
      club: "Entrepreneur Club",
      attendees: 45,
    },
    {
      id: "3",
      title: "Coding Workshop",
      description: "Oct 15, 2025, Learn React and TypeScript",
      club: "Computer Science Club",
      attendees: 67,
    },
  ];

  const categories = [
    "Sports",
    "Technology",
    "Arts",
    "Music",
    "Academic",
    "Social",
  ];

  return (
    <div className="min-h-screen bg-white pb-20">
      <div className="sticky top-0 bg-white border-b border-gray-200 z-40">
        <div className="px-4 pt-12 pb-4">
          <h1 className="text-3xl font-semibold text-black mb-4">Discover</h1>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
            <Input
              type="text"
              placeholder="Search clubs or events"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 pr-4 py-3 rounded-full border border-gray-300 bg-white focus:border-gray-400 focus:ring-0"
            />
          </div>
        </div>
      </div>

      <div className="px-4 py-4">
        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
          {categories.map((category) => (
            <button
              key={category}
              className="px-4 py-2 rounded-full bg-gray-100 text-sm font-medium text-gray-700 whitespace-nowrap hover:bg-gray-200 transition-colors"
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      <div className="px-4 py-2">
        <div className="flex items-center gap-2 mb-4">
          <TrendingUp className="w-5 h-5 text-[#2c2c2c]" />
          <h2 className="text-xl font-semibold text-black">Trending Events</h2>
        </div>

        <div className="space-y-4">
          {trendingEvents.map((event) => (
            <Card key={event.id} className="border border-gray-200 shadow-sm">
              <CardContent className="p-4">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-lg bg-gray-200 flex items-center justify-center flex-shrink-0">
                    <TrendingUp className="w-5 h-5 text-gray-600" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-base text-black mb-1">
                      {event.title}
                    </h3>
                    <p className="text-sm text-gray-600 mb-2">
                      {event.description}
                    </p>
                    <div className="flex items-center gap-3 text-xs text-gray-500">
                      <span>{event.club}</span>
                      <span>•</span>
                      <span>{event.attendees} attending</span>
                    </div>
                  </div>
                </div>
                <div className="mt-3 flex gap-2">
                  <Button className="flex-1 bg-[#2c2c2c] hover:bg-[#1e1e1e] text-white rounded-lg">
                    Join Event
                  </Button>
                  <Button
                    variant="outline"
                    className="px-4 border-gray-300 rounded-lg"
                  >
                    Share
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-6">
          <Link href="/create-club">
            <Button className="w-full bg-[#2c2c2c] hover:bg-[#1e1e1e] text-white rounded-lg py-6 text-base font-medium flex items-center justify-center gap-2">
              <Plus className="w-5 h-5" />
              Create Your Own Club
            </Button>
          </Link>
        </div>
      </div>

      <MobileNav />
    </div>
  );
}
