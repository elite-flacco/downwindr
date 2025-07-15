import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Wind, Search, Filter } from "lucide-react";
import { motion } from "framer-motion";

interface FilterControlsProps {
  windQualityFilter: string[];
  onWindQualityFilterChange: (filter: string) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  selectedRegion: string;
  onRegionChange: (region: string) => void;
}

export default function FilterControls({
  windQualityFilter,
  onWindQualityFilterChange,
  searchQuery,
  onSearchChange,
  selectedRegion,
  onRegionChange
}: FilterControlsProps) {
  
  // Handle search input change
  const handleSearchInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onSearchChange(e.target.value);
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
    <div className="mb-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
      {/* Wind Quality Filter */}
      <div className="flex items-center flex-shrink-0 flex-nowrap">
        <p className="filter-label mr-3 mr-2 whitespace-nowrap">
          <Filter className="w-3.5 h-3.5 inline mr-1 text-primary align-text-bottom" />
          Wind:
        </p>
        <div className="flex flex-nowrap gap-1">
          <Button
            size="sm"
            variant="outline"
            className={`h-8 px-2 filter-button flex items-center gap-1 border ${
              windQualityFilter.includes("Excellent") 
                ? "bg-primary/10 text-primary border-primary/30" 
                : "bg-white text-slate-600 border-slate-200 hover:bg-primary/5 hover:text-primary hover:border-primary/20"
            }`}
            onClick={() => onWindQualityFilterChange("Excellent")}
          >
            <Wind className="w-3 h-3" /> 🚀
          </Button>
          
          <Button
            size="sm"
            variant="outline"
            className={`h-8 px-2 filter-button flex items-center gap-1 border ${
              windQualityFilter.includes("Good") 
                ? "bg-primary/10 text-primary border-primary/30" 
                : "bg-white text-slate-600 border-slate-200 hover:bg-primary/5 hover:text-primary hover:border-primary/20"
            }`}
            onClick={() => onWindQualityFilterChange("Good")}
          >
            <Wind className="w-3 h-3" /> 😎
          </Button>
          
          <Button
            size="sm"
            variant="outline"
            className={`h-8 px-2 filter-button flex items-center gap-1 border ${
              windQualityFilter.includes("Fair") 
                ? "bg-primary/10 text-primary border-primary/30" 
                : "bg-white text-slate-600 border-slate-200 hover:bg-primary/5 hover:text-primary hover:border-primary/20"
            }`}
            onClick={() => onWindQualityFilterChange("Fair")}
          >
            <Wind className="w-3 h-3" /> 😊
          </Button>
        </div>
      </div>

      {/* Region Filter */}
      <div className="flex items-center flex-shrink-0">
        <select
          value={selectedRegion}
          onChange={(e) => onRegionChange(e.target.value)}
          className="h-8 rounded-md border border-slate-200 bg-white px-2 filter-input focus:outline-none focus:ring-1 focus:ring-primary"
        >
          {regions.map((region) => (
            <option key={region.value} value={region.value}>
              {region.label}
            </option>
          ))}
        </select>
      </div>
      
      {/* Search Input */}
      <div className="relative w-80">
        <div className="absolute inset-y-0 left-0 flex items-center pl-2 pointer-events-none">
          <Search className="h-3.5 w-3.5 text-slate-400" />
        </div>
        <Input
          className="pl-8 pr-2 py-1 h-8 filter-input bg-white border-slate-200 focus-visible:ring-primary/30"
          placeholder="Search spots or locations..."
          value={searchQuery}
          onChange={handleSearchInputChange}
        />
      </div>
    </div>
  );
}
