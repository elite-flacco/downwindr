
import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { videoCategories, videoLevels } from "@/data/learnVideos";
import { Search, Filter, Tag } from "lucide-react";

interface VideoFiltersProps {
  onCategoryChange: (category: string) => void;
  onLevelChange: (level: string) => void;
  onSearchChange: (search: string) => void;
  selectedCategory: string;
  selectedLevel: string;
  searchQuery: string;
}

export default function VideoFilters({
  onCategoryChange,
  onLevelChange,
  onSearchChange,
  selectedCategory,
  selectedLevel,
  searchQuery,
}: VideoFiltersProps) {
  return (
    <Card className="w-full rounded-xl border border-slate-200 shadow-sm mb-8">
      <CardContent className="p-5 space-y-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-4 w-4" />
          <Input
            placeholder="Search videos..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="pl-10 bg-white border-slate-200 text-sm"
          />
        </div>

        <div className="space-y-3">
          <div>
            <p className="text-xs font-medium text-slate-500 mb-2 flex items-center">
              <Tag className="h-3 w-3 mr-1 text-theme-primary" />
              Categories
            </p>
            <div className="flex flex-wrap gap-1.5">
              <Badge
                key="all"
                variant={selectedCategory === "" ? "default" : "outline"}
                className={`cursor-pointer text-xs px-2 py-0 h-6 ${
                  selectedCategory === ""
                    ? "bg-theme-primary hover:bg-theme-primary/90"
                    : "bg-slate-50 hover:bg-slate-100 text-slate-600 border-slate-100"
                }`}
                onClick={() => onCategoryChange("")}
              >
                All
              </Badge>

              {videoCategories.map((category) => (
                <Badge
                  key={category}
                  variant={selectedCategory === category ? "default" : "outline"}
                  className={`cursor-pointer capitalize text-xs px-2 py-0 h-6 ${
                    selectedCategory === category
                      ? "bg-theme-primary hover:bg-theme-primary/90"
                      : "bg-slate-50 hover:bg-slate-100 text-slate-600 border-slate-100"
                  }`}
                  onClick={() => onCategoryChange(category)}
                >
                  {category}
                </Badge>
              ))}
            </div>
          </div>

          <div>
            <p className="text-xs font-medium text-slate-500 mb-2 flex items-center">
              <Tag className="h-3 w-3 mr-1 text-theme-primary" />
              Experience Level
            </p>
            <div className="flex flex-wrap gap-1.5">
              <Badge
                key="all-levels"
                variant={selectedLevel === "" ? "default" : "outline"}
                className={`cursor-pointer text-xs px-2 py-0 h-6 ${
                  selectedLevel === ""
                    ? "bg-theme-primary hover:bg-theme-primary/90"
                    : "bg-slate-50 hover:bg-slate-100 text-slate-600 border-slate-100"
                }`}
                onClick={() => onLevelChange("")}
              >
                All levels
              </Badge>

              {videoLevels.map((level) => (
                <Badge
                  key={level}
                  variant={selectedLevel === level ? "default" : "outline"}
                  className={`cursor-pointer capitalize text-xs px-2 py-0 h-6 ${
                    selectedLevel === level
                      ? level === 'beginner' 
                          ? 'bg-green-600 hover:bg-green-700 border-green-600' 
                          : level === 'intermediate' 
                          ? 'bg-amber-500 hover:bg-amber-600 border-amber-500' 
                          : 'bg-rose-500 hover:bg-rose-600 border-rose-500'
                      : level === 'beginner'
                          ? 'bg-green-50 text-green-700 border-green-100 hover:bg-green-100'
                          : level === 'intermediate'
                          ? 'bg-amber-50 text-amber-700 border-amber-100 hover:bg-amber-100'
                          : 'bg-rose-50 text-rose-700 border-rose-100 hover:bg-rose-100'
                  }`}
                  onClick={() => onLevelChange(level)}
                >
                  {level}
                </Badge>
              ))}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
