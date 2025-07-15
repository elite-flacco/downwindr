import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ChevronDown, Search, Wind } from "lucide-react";
import { motion } from "framer-motion";
import MonthSelector from "@/components/MonthSelector";

interface FilterControlsProps {
  // Season/Month selection
  selectedMonth: number;
  onMonthChange: (month: number) => void;
  // Wind quality filter
  windQualityFilter: string[];
  onWindQualityFilterChange: (filter: string) => void;
  // Region filter
  selectedRegion: string;
  onRegionChange: (region: string) => void;
  // Search
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

export default function FilterControls({
  selectedMonth,
  onMonthChange,
  windQualityFilter,
  onWindQualityFilterChange,
  selectedRegion,
  onRegionChange,
  searchQuery,
  onSearchChange
}: FilterControlsProps) {
  
  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  const getCurrentSeason = (month: number) => {
    if (month >= 3 && month <= 5) return "Spring";
    if (month >= 6 && month <= 8) return "Summer";
    if (month >= 9 && month <= 11) return "Autumn";
    return "Winter";
  };

  const getSeasonMonths = (season: string) => {
    switch (season) {
      case "Spring": return [3, 4, 5];
      case "Summer": return [6, 7, 8];
      case "Autumn": return [9, 10, 11];
      case "Winter": return [12, 1, 2];
      default: return [selectedMonth];
    }
  };

  const handleSeasonClick = (season: string) => {
    const months = getSeasonMonths(season);
    onMonthChange(months[0]); // Set to first month of season
  };
  
  const regions = [
    { value: "all", label: "All Regions" },
    { value: "europe", label: "Europe" },
    { value: "asia", label: "Asia" },
    { value: "americas", label: "Americas" },
    { value: "africa", label: "Africa" },
    { value: "oceania", label: "Oceania" }
  ];

  return (
    <div className="flex flex-col lg:flex-row items-start lg:items-center gap-4 lg:gap-6">
      {/* First Row: Season and Wind filters */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6 w-full lg:w-auto">
        {/* Season Selector */}
        <div className="flex items-center gap-3">
          <MonthSelector
            selectedMonth={selectedMonth}
            onMonthChange={onMonthChange}
          />
        </div>

        {/* Wind Quality Filter */}
        <div className="flex items-center gap-3">
          <span className="text-sm font-medium text-slate-700">Wind:</span>
          <div className="flex items-center gap-1">
            {[
              { key: "Excellent", label: "Strong", emoji: "💨💨💨", icon: "⬤" },
              { key: "Good", label: "Medium", emoji: "💨💨", icon: "⬤" },
              { key: "Fair", label: "Light", emoji: "💨", icon: "⬤" }
            ].map(({ key, label, emoji, icon }) => {
              const isSelected = windQualityFilter.includes(key);
              return (
                <Button
                  key={key}
                  variant="ghost"
                  size="sm"
                  className={`h-9 px-3 text-sm rounded-full transition-all ${
                    isSelected
                      ? 'bg-primary/10 text-primary font-medium shadow-sm' 
                      : 'text-slate-600 hover:bg-slate-100 hover:text-slate-800'
                  }`}
                  onClick={() => onWindQualityFilterChange(key)}
                  title={`${label} wind conditions`}
                >
                  <span className={`${isSelected ? 'text-primary' : 'text-slate-400'}`}>{emoji}</span>
                </Button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Second Row: Region and Search */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6 w-full lg:w-auto">
        {/* Region Filter */}
        <div className="flex items-center gap-3">
          <Select
            value={selectedRegion}
            onValueChange={onRegionChange}
          >
            <SelectTrigger className="h-9 min-w-[120px] rounded-full bg-white border-slate-200 shadow-sm hover:shadow-md transition-shadow">
              <SelectValue placeholder="Select region" />
            </SelectTrigger>
            <SelectContent>
              {regions.map((region) => (
                <SelectItem key={region.value} value={region.value}>
                  {region.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
}
