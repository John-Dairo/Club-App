import { useState, useEffect } from "react";
import { Search, TrendingUp, Plus, Sparkles, Trash2 } from "lucide-react";
import Layout from "@/components/Layout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Link } from "wouter";
import { useQuery, useMutation } from "@tanstack/react-query";
import { api } from "@/lib/api";
import { useToast } from "@/hooks/use-toast";
import { queryClient } from "@/lib/queryClient";

export default function HomePage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<any>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [userId, setUserId] = useState<string | null>(null);
  const [deleteEventId, setDeleteEventId] = useState<string | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    const storedIsAdmin = localStorage.getItem("isAdmin") === "true";
    const storedUserId = localStorage.getItem("userId");
    setIsAdmin(storedIsAdmin);
    setUserId(storedUserId);
  }, []);

  const { data: events = [] } = useQuery({
    queryKey: ["events"],
    queryFn: () => api.events.getAll(),
  });

  const { data: clubs = [] } = useQuery({
    queryKey: ["clubs"],
    queryFn: () => api.clubs.getAll(),
  });

  const searchMutation = useMutation({
    mutationFn: (query: string) => api.search.aiSearch(query),
    onSuccess: (data) => {
      setSearchResults(data);
      if (data.explanation) {
        toast({
          title: data.isAiResult ? "AI Search Results" : "Keyword Search Results",
          description: data.explanation,
          variant: data.isAiResult ? "default" : "default",
        });
      }
    },
    onError: (error: any) => {
      toast({
        title: "Search Error",
        description: error.message || "Failed to perform search. Please try again.",
        variant: "destructive",
      });
    },
  });

  const deleteEventMutation = useMutation({
    mutationFn: (eventId: string) => {
      return api.events.delete(eventId);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["events"] });
      toast({
        title: "Event deleted",
        description: "The event has been successfully deleted.",
      });
      setDeleteEventId(null);
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error.message || "Failed to delete event",
        variant: "destructive",
      });
      setDeleteEventId(null);
    },
  });

  const handleSearch = () => {
    if (searchQuery.trim()) {
      searchMutation.mutate(searchQuery);
    } else {
      setSearchResults(null);
    }
  };

  const handleClearSearch = () => {
    setSearchQuery("");
    setSearchResults(null);
  };

  const displayEvents = searchResults ? searchResults.events : events.slice(0, 5);
  const trendingEvents = displayEvents;

  const categories = [
    "Sports",
    "Technology",
    "Arts",
    "Music",
    "Academic",
    "Social",
  ];

  return (
    <Layout>
      <div className="min-h-screen bg-white pb-20">
        <div className="sticky top-12 bg-white border-b border-gray-200 z-40">
        <div className="px-4 pt-12 pb-4">
          <h1 className="text-3xl font-semibold text-black mb-4">Discover</h1>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
            <Input
              type="text"
              placeholder="Search with AI - try 'sports clubs' or 'tech events'..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && handleSearch()}
              className="pl-10 pr-24 py-3 rounded-full border border-gray-300 bg-white focus:border-gray-400 focus:ring-0"
            />
            <Button
              onClick={handleSearch}
              disabled={searchMutation.isPending || !searchQuery.trim()}
              className="absolute right-1 top-1/2 -translate-y-1/2 bg-[#2c2c2c] hover:bg-[#1e1e1e] text-white h-9 px-3 rounded-full disabled:opacity-50"
            >
              <Sparkles className="w-4 h-4 mr-1" />
              {searchMutation.isPending ? "..." : "AI"}
            </Button>
          </div>
          {searchResults && (
            <div className={`mt-3 ${searchResults.isAiResult ? 'bg-blue-50 border-blue-200' : 'bg-gray-50 border-gray-200'} border rounded-lg p-3 flex items-center justify-between`}>
              <div className="flex items-center gap-2">
                <Sparkles className={`w-4 h-4 ${searchResults.isAiResult ? 'text-blue-600' : 'text-gray-600'}`} />
                <span className={`text-sm ${searchResults.isAiResult ? 'text-blue-900' : 'text-gray-900'}`}>
                  {searchResults.isAiResult ? 'AI found' : 'Found'} {searchResults.clubs?.length || 0} clubs and {searchResults.events?.length || 0} events
                </span>
              </div>
              <Button
                onClick={handleClearSearch}
                variant="ghost"
                size="sm"
                className={`${searchResults.isAiResult ? 'text-blue-700 hover:text-blue-900 hover:bg-blue-100' : 'text-gray-700 hover:text-gray-900 hover:bg-gray-100'} h-auto py-1`}
              >
                Clear
              </Button>
            </div>
          )}
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
          {trendingEvents.length > 0 ? trendingEvents.map((event: any) => (
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
                      <span>{new Date(event.eventDate).toLocaleDateString()}</span>
                      <span>•</span>
                      <span>{event.attendeeCount} attending</span>
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
                  {isAdmin && (
                    <Button
                      variant="destructive"
                      size="icon"
                      onClick={() => setDeleteEventId(event.id)}
                      className="rounded-lg"
                      data-testid={`button-delete-event-${event.id}`}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          )) : (
            <div className="text-center py-8 text-gray-500">
              <p>No events available yet. Create a club to get started!</p>
            </div>
          )}
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
      </div>

      <AlertDialog open={deleteEventId !== null} onOpenChange={(open) => !open && setDeleteEventId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Event</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete this event? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => deleteEventId && deleteEventMutation.mutate(deleteEventId)}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </Layout>
  );
}
