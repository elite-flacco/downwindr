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
}

export default function FilterControls({
  windQualityFilter,
  onWindQualityFilterChange,
  searchQuery,
  onSearchChange
}: FilterControlsProps) {
  
  // Handle search input change
  const handleSearchInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onSearchChange(e.target.value);
  };
  
  return (
    <div className="mb-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
      {/* Wind Quality Filter */}
      <div className="flex items-center flex-shrink-0 flex-nowrap">
        <h3 className="text-xs font-medium text-slate-600 mr-2 whitespace-nowrap">
          <Filter className="w-3 h-3 inline mr-1 text-primary align-text-bottom" />
          Wind:
        </h3>
        <div className="flex flex-nowrap gap-1">
          <Button
            size="sm"
            variant="outline"
            className={`h-8 px-2 text-xs flex items-center gap-1 border ${
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
            className={`h-8 px-2 text-xs flex items-center gap-1 border ${
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
            className={`h-8 px-2 text-xs flex items-center gap-1 border ${
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
      
      {/* Search Input */}
      <div className="relative flex-grow">
        <div className="absolute inset-y-0 left-0 flex items-center pl-2 pointer-events-none">
          <Search className="h-3.5 w-3.5 text-slate-400" />
        </div>
        <Input
          className="pl-8 pr-2 py-1 h-8 text-sm border-slate-200 focus-visible:ring-primary/30"
          placeholder="Search spots or locations..."
          value={searchQuery}
          onChange={handleSearchInputChange}
        />
      </div>
    </div>
  );
}
