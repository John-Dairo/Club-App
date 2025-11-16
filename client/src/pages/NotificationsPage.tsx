import { Bell, Info, Users, Calendar } from "lucide-react";
import MobileNav from "@/components/MobileNav";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function NotificationsPage() {
  const notifications = [
    {
      id: "1",
      type: "event",
      icon: Calendar,
      title: "UTD VOLLEYBALL GAME",
      message: "Oct 13, 2025 6v6 Coed Volleyball game",
      time: "2 hours ago",
      isRead: false,
    },
    {
      id: "2",
      type: "member",
      icon: Users,
      title: "New member joined Tech Club",
      message: "Sarah Johnson joined your club",
      time: "5 hours ago",
      isRead: false,
    },
    {
      id: "3",
      type: "event",
      icon: Info,
      title: "Tech Startup Presentation",
      message: "Oct 12, 2025, Learn about how to start a startup",
      time: "1 day ago",
      isRead: true,
    },
    {
      id: "4",
      type: "event",
      icon: Calendar,
      title: "Event reminder",
      message: "Coding Workshop starts tomorrow at 2 PM",
      time: "1 day ago",
      isRead: true,
    },
  ];

  return (
    <div className="min-h-screen bg-white pb-20">
      <div className="sticky top-0 bg-white border-b border-gray-200 z-40">
        <div className="px-4 pt-12 pb-4">
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-semibold text-black">Notifications</h1>
            <Button variant="ghost" size="sm" className="text-sm text-gray-600">
              Mark all read
            </Button>
          </div>
        </div>
      </div>

      <div className="px-4 py-4">
        <div className="space-y-3">
          {notifications.map((notification) => {
            const Icon = notification.icon;
            return (
              <Card
                key={notification.id}
                className={`border ${
                  notification.isRead ? "border-gray-200" : "border-gray-400"
                } shadow-sm ${!notification.isRead ? "bg-gray-50" : "bg-white"}`}
              >
                <CardContent className="p-4">
                  <div className="flex items-start gap-3">
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${
                        notification.isRead ? "bg-gray-200" : "bg-[#2c2c2c]"
                      }`}
                    >
                      <Icon
                        className={`w-5 h-5 ${
                          notification.isRead ? "text-gray-600" : "text-white"
                        }`}
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-base text-black mb-1">
                        {notification.title}
                      </h3>
                      <p className="text-sm text-gray-600 mb-2">
                        {notification.message}
                      </p>
                      <span className="text-xs text-gray-500">
                        {notification.time}
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {notifications.length === 0 && (
          <div className="text-center py-16">
            <Bell className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              No notifications yet
            </h3>
            <p className="text-sm text-gray-500">
              We'll notify you when something happens
            </p>
          </div>
        )}
      </div>

      <MobileNav />
    </div>
  );
}
