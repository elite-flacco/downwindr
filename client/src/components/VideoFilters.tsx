import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { videoCategories, videoLevels } from "@/data/learnVideos";
import { Search, Filter } from "lucide-react";

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
  searchQuery
}: VideoFiltersProps) {
  return (
    <div className="mb-8 space-y-4">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
        <Input
          placeholder="Search videos..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          className="pl-10 bg-white border-gray-200"
        />
      </div>
      
      <div>
        <h3 className="text-sm font-medium mb-2 flex items-center">
          <Filter className="h-4 w-4 mr-1 text-theme-primary" />
          Categories
        </h3>
        <div className="flex flex-wrap gap-2">
          <Badge
            key="all"
            variant={selectedCategory === "" ? "default" : "outline"}
            className={`cursor-pointer ${
              selectedCategory === "" 
                ? "bg-theme-primary hover:bg-theme-primary/80" 
                : "hover:bg-theme-primary/10"
            }`}
            onClick={() => onCategoryChange("")}
          >
            All
          </Badge>
          
          {videoCategories.map((category) => (
            <Badge
              key={category}
              variant={selectedCategory === category ? "default" : "outline"}
              className={`cursor-pointer capitalize ${
                selectedCategory === category 
                  ? "bg-theme-primary hover:bg-theme-primary/80" 
                  : "hover:bg-theme-primary/10"
              }`}
              onClick={() => onCategoryChange(category)}
            >
              {category}
            </Badge>
          ))}
        </div>
      </div>
      
      <div>
        <h3 className="text-sm font-medium mb-2">Experience Level</h3>
        <div className="flex flex-wrap gap-2">
          <Badge
            key="all"
            variant={selectedLevel === "" ? "default" : "outline"}
            className={`cursor-pointer ${
              selectedLevel === "" 
                ? "bg-theme-primary hover:bg-theme-primary/80" 
                : "hover:bg-theme-primary/10"
            }`}
            onClick={() => onLevelChange("")}
          >
            All
          </Badge>
          
          {videoLevels.map((level) => (
            <Badge
              key={level}
              variant={selectedLevel === level ? "default" : "outline"}
              className={`cursor-pointer capitalize ${
                selectedLevel === level 
                  ? "bg-theme-primary hover:bg-theme-primary/80" 
                  : "hover:bg-theme-primary/10"
              }`}
              onClick={() => onLevelChange(level)}
            >
              {level}
            </Badge>
          ))}
        </div>
      </div>
    </div>
  );
}