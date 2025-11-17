import { LogIn, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLocation } from "wouter";
import { useEffect, useState } from "react";

export default function AppHeader() {
  const [, setLocation] = useLocation();
  const [username, setUsername] = useState<string | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);

  const updateAuthState = () => {
    const storedUsername = localStorage.getItem("username");
    const storedIsAdmin = localStorage.getItem("isAdmin") === "true";
    setUsername(storedUsername);
    setIsAdmin(storedIsAdmin);
  };

  useEffect(() => {
    updateAuthState();

    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === "username" || e.key === "isAdmin" || e.key === null) {
        updateAuthState();
      }
    };

    window.addEventListener("storage", handleStorageChange);
    window.addEventListener("auth-change", updateAuthState as EventListener);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
      window.removeEventListener("auth-change", updateAuthState as EventListener);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("username");
    localStorage.removeItem("isAdmin");
    localStorage.removeItem("userId");
    localStorage.removeItem("sessionToken");
    setUsername(null);
    setIsAdmin(false);
    window.dispatchEvent(new Event("auth-change"));
    setLocation("/login");
  };

  const handleLogin = () => {
    setLocation("/login");
  };

  return (
    <div className="fixed top-0 left-0 right-0 bg-white border-b border-gray-200 z-50 safe-area-inset-top">
      <div className="max-w-md mx-auto px-4 h-12 flex items-center justify-between">
        <div className="flex items-center gap-2">
          {username && (
            <span className="text-sm text-gray-600">
              {username}
              {isAdmin && (
                <span className="ml-2 text-xs bg-[#2c2c2c] text-white px-2 py-0.5 rounded-full">
                  Admin
                </span>
              )}
            </span>
          )}
        </div>
        {username ? (
          <Button
            onClick={handleLogout}
            variant="ghost"
            size="sm"
            className="gap-2"
            data-testid="button-logout"
          >
            <LogOut className="w-4 h-4" />
            Logout
          </Button>
        ) : (
          <Button
            onClick={handleLogin}
            variant="ghost"
            size="sm"
            className="gap-2"
            data-testid="button-login"
          >
            <LogIn className="w-4 h-4" />
            Login
          </Button>
        )}
      </div>
    </div>
  );
}
