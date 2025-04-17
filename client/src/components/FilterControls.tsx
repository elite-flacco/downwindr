import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
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
    <Card className="mb-6 border border-slate-100 shadow-sm">
      <CardContent className="p-4">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="flex items-center">
            <h3 className="text-sm font-medium text-slate-600 flex items-center mr-4">
              <Filter className="w-4 h-4 mr-1 text-primary" />
              Wind quality:
            </h3>
            <div className="flex flex-wrap gap-2">
              <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                <Button
                  size="sm"
                  variant="outline"
                  className={`flex items-center gap-1 border ${
                    windQualityFilter.includes("Excellent") 
                      ? "bg-primary/10 text-primary border-primary/30" 
                      : "bg-white text-slate-600 border-slate-200 hover:bg-primary/5 hover:text-primary hover:border-primary/20"
                  }`}
                  onClick={() => onWindQualityFilterChange("Excellent")}
                >
                  <Wind className="w-3.5 h-3.5" /> Excellent
                </Button>
              </motion.div>
              
              <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                <Button
                  size="sm"
                  variant="outline"
                  className={`flex items-center gap-1 border ${
                    windQualityFilter.includes("Good") 
                      ? "bg-primary/10 text-primary border-primary/30" 
                      : "bg-white text-slate-600 border-slate-200 hover:bg-primary/5 hover:text-primary hover:border-primary/20"
                  }`}
                  onClick={() => onWindQualityFilterChange("Good")}
                >
                  <Wind className="w-3.5 h-3.5" /> Good
                </Button>
              </motion.div>
              
              <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                <Button
                  size="sm"
                  variant="outline"
                  className={`flex items-center gap-1 border ${
                    windQualityFilter.includes("Fair") 
                      ? "bg-primary/10 text-primary border-primary/30" 
                      : "bg-white text-slate-600 border-slate-200 hover:bg-primary/5 hover:text-primary hover:border-primary/20"
                  }`}
                  onClick={() => onWindQualityFilterChange("Fair")}
                >
                  <Wind className="w-3.5 h-3.5" /> Fair
                </Button>
              </motion.div>
            </div>
          </div>
          
          <div className="relative flex-shrink-0">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <Search className="h-4 w-4 text-slate-400" />
            </div>
            <Input
              className="pl-10 pr-4 py-2 w-full md:w-64 border-slate-200 focus-visible:ring-primary/30"
              placeholder="Search spots..."
              value={searchQuery}
              onChange={handleSearchInputChange}
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
