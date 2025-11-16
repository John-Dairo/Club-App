import { Home, Bell, Heart, User } from "lucide-react";
import { useLocation, Link } from "wouter";

export default function MobileNav() {
  const [location] = useLocation();

  const navItems = [
    { icon: Home, label: "Home", path: "/" },
    { icon: Bell, label: "Notifications", path: "/notifications" },
    { icon: Heart, label: "Following", path: "/following" },
    { icon: User, label: "Profile", path: "/profile" },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 safe-area-inset-bottom z-50">
      <div className="max-w-md mx-auto px-4">
        <div className="flex justify-around items-center h-16">
          {navItems.map(({ icon: Icon, label, path }) => {
            const isActive = location === path;
            return (
              <Link key={path} href={path}>
                <div
                  className={`flex flex-col items-center justify-center gap-1 px-4 py-2 transition-colors cursor-pointer ${
                    isActive ? "text-[#2c2c2c]" : "text-gray-400"
                  }`}
                >
                  <Icon className="w-6 h-6" strokeWidth={isActive ? 2.5 : 2} />
                  <span className="text-xs font-medium">{label}</span>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
