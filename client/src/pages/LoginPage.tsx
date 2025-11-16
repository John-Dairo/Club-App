import { useState } from "react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { api } from "@/lib/api";
import { useToast } from "@/hooks/use-toast";
import { Users } from "lucide-react";

export default function LoginPage() {
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const [isLogin, setIsLogin] = useState(true);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      if (isLogin) {
        await api.auth.login(username, password);
        toast({
          title: "Welcome back!",
          description: "You've successfully logged in.",
        });
      } else {
        await api.auth.register(username, password);
        toast({
          title: "Account created!",
          description: "You've successfully registered.",
        });
      }
      
      localStorage.setItem("username", username);
      setLocation("/");
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || `Failed to ${isLogin ? "login" : "register"}`,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const useDemoAccount = () => {
    setUsername("demo");
    setPassword("password");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center p-4">
      <Card className="w-full max-w-md border-gray-200 shadow-lg">
        <CardHeader className="text-center pb-2">
          <div className="w-16 h-16 bg-gradient-to-br from-[#2c2c2c] to-[#1e1e1e] rounded-full flex items-center justify-center mx-auto mb-4">
            <Users className="w-8 h-8 text-white" />
          </div>
          <CardTitle className="text-2xl font-bold text-black">
            {isLogin ? "Welcome Back" : "Join ClubConnect"}
          </CardTitle>
          <p className="text-sm text-gray-600 mt-2">
            {isLogin
              ? "Sign in to discover and join clubs"
              : "Create an account to get started"}
          </p>
        </CardHeader>
        <CardContent className="pt-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="username" className="text-sm font-medium text-black">
                Username
              </Label>
              <Input
                id="username"
                type="text"
                placeholder="Enter your username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                className="border-gray-300 focus:border-gray-400 focus:ring-0"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password" className="text-sm font-medium text-black">
                Password
              </Label>
              <Input
                id="password"
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="border-gray-300 focus:border-gray-400 focus:ring-0"
              />
            </div>
            <Button
              type="submit"
              disabled={isLoading}
              className="w-full bg-[#2c2c2c] hover:bg-[#1e1e1e] text-white py-6 rounded-lg font-medium disabled:opacity-50"
            >
              {isLoading ? "Please wait..." : isLogin ? "Sign In" : "Create Account"}
            </Button>
          </form>

          <div className="mt-4 text-center">
            <button
              type="button"
              onClick={() => setIsLogin(!isLogin)}
              className="text-sm text-gray-600 hover:text-black transition-colors"
            >
              {isLogin ? "Don't have an account? " : "Already have an account? "}
              <span className="font-semibold underline">
                {isLogin ? "Sign Up" : "Sign In"}
              </span>
            </button>
          </div>

          <div className="mt-6 pt-6 border-t border-gray-200">
            <p className="text-xs text-gray-500 text-center mb-3">
              For demo purposes, you can use:
            </p>
            <Button
              type="button"
              onClick={useDemoAccount}
              variant="outline"
              className="w-full border-gray-300 text-gray-700 hover:bg-gray-50"
            >
              Use Demo Account
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
