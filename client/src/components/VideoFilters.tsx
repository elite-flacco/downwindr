
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
    <Card className="w-full rounded-lg border border-slate-200 shadow-sm mb-6">
      <CardContent className="p-4">
        <div className="flex flex-col gap-4">
          {/* Search Bar */}
          <div className="relative w-auto max-w-xs">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <Search className="h-4 w-4 text-theme-text-light" />
            </div>
            <Input
              placeholder="Search videos..."
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              className="pl-9 pr-4 py-2 h-8 text-sm bg-white border-slate-200 rounded-full shadow-sm hover:shadow-md transition-shadow focus-visible:ring-primary/30 w-full"
            />
          </div>

          <div className="flex flex-wrap items-center gap-4">
            {/* Categories */}
            <div className="flex items-center gap-2">
              <p className="text-xs font-medium text-theme-text-light flex items-center whitespace-nowrap">
                <Tag className="h-3 w-3 mr-1 text-theme-primary" />
                Categories
              </p>
              <div className="flex flex-wrap items-center gap-1.5">
                <Badge
                  key="all"
                  variant={selectedCategory === "" ? "default" : "outline"}
                  className={`cursor-pointer text-xs px-2 py-0 h-6 ${selectedCategory === ""
                    ? "bg-theme-primary hover:bg-theme-primary/90"
                    : "bg-theme-surface hover:bg-theme-surface/90 text-theme-text-light border-theme-surface"
                    }`}
                  onClick={() => onCategoryChange("")}
                >
                  All
                </Badge>

                {videoCategories.map((category) => (
                  <Badge
                    key={category}
                    variant={selectedCategory === category ? "default" : "outline"}
                    className={`cursor-pointer capitalize text-xs px-2 py-0 h-6 ${selectedCategory === category
                      ? "bg-theme-primary hover:bg-theme-primary/90"
                      : "bg-theme-surface hover:bg-theme-surface/90 text-theme-text-light border-theme-surface"
                      }`}
                    onClick={() => onCategoryChange(category)}
                  >
                    {category}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Experience Level */}
            <div className="flex items-center gap-2">
              <p className="text-xs font-medium text-theme-text-light flex items-center whitespace-nowrap">
                <Tag className="h-3 w-3 mr-1 text-theme-primary" />
                Level
              </p>
              <div className="flex flex-wrap items-center gap-1.5">
                <Badge
                  key="all-levels"
                  variant={selectedLevel === "" ? "default" : "outline"}
                  className={`cursor-pointer text-xs px-2 py-0 h-6 ${selectedLevel === ""
                    ? "bg-theme-primary hover:bg-theme-primary/90"
                    : "bg-theme-surface hover:bg-theme-surface/90 text-theme-text-light border-theme-surface"
                    }`}
                  onClick={() => onLevelChange("")}
                >
                  All
                </Badge>

                {videoLevels.map((level) => (
                  <Badge
                    key={level}
                    variant={selectedLevel === level ? "default" : "outline"}
                    className={`cursor-pointer capitalize text-xs px-2 py-0 h-6 ${selectedLevel === level
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
        </div>
      </CardContent>
    </Card>
  );
}
