import { useState } from "react";
import { ArrowLeft } from "lucide-react";
import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function CreateClubPage() {
  const [, setLocation] = useLocation();
  const [clubName, setClubName] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");

  const categories = [
    "Sports",
    "Technology",
    "Arts",
    "Music",
    "Academic",
    "Social",
    "Business",
    "Gaming",
    "Health & Fitness",
    "Other",
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log({ clubName, description, category });
    setLocation("/");
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="sticky top-0 bg-white border-b border-gray-200 z-40">
        <div className="px-4 pt-12 pb-4 flex items-center gap-3">
          <Link href="/">
            <button className="p-2 -ml-2 hover:bg-gray-100 rounded-full transition-colors">
              <ArrowLeft className="w-6 h-6 text-black" />
            </button>
          </Link>
          <h1 className="text-xl font-semibold text-black">Create a Club</h1>
        </div>
      </div>

      <div className="px-4 py-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="clubName" className="text-sm font-medium text-black">
              Club Name
            </Label>
            <Input
              id="clubName"
              type="text"
              placeholder="Enter club name"
              value={clubName}
              onChange={(e) => setClubName(e.target.value)}
              className="rounded-lg border border-gray-300 bg-white focus:border-gray-400 focus:ring-0"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="category" className="text-sm font-medium text-black">
              Category
            </Label>
            <Select value={category} onValueChange={setCategory} required>
              <SelectTrigger className="rounded-lg border border-gray-300 bg-white focus:border-gray-400 focus:ring-0">
                <SelectValue placeholder="Select a category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((cat) => (
                  <SelectItem key={cat} value={cat.toLowerCase()}>
                    {cat}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description" className="text-sm font-medium text-black">
              Description
            </Label>
            <Textarea
              id="description"
              placeholder="Tell us about your club..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="rounded-lg border border-gray-300 bg-white focus:border-gray-400 focus:ring-0 min-h-[120px]"
              required
            />
          </div>

          <div className="pt-4">
            <Button
              type="submit"
              className="w-full bg-[#2c2c2c] hover:bg-[#1e1e1e] text-white rounded-lg py-6 text-base font-medium"
            >
              Create Club
            </Button>
          </div>
        </form>

        <div className="mt-6 p-4 bg-gray-50 rounded-lg">
          <h3 className="font-medium text-black mb-2">Club Guidelines</h3>
          <ul className="text-sm text-gray-600 space-y-1">
            <li>• Choose a clear and descriptive name</li>
            <li>• Keep your description informative and welcoming</li>
            <li>• Select the most appropriate category</li>
            <li>• Be respectful and follow community guidelines</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
