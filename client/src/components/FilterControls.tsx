import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Wind, Search } from "lucide-react";
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
    <Card className="mb-6">
      <CardContent className="p-4">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="flex items-center">
            <h3 className="text-lg font-semibold font-heading mr-4">Filter By:</h3>
            <div className="flex flex-wrap gap-2">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button
                  size="sm"
                  variant={windQualityFilter.includes("Excellent") ? "default" : "outline"}
                  className={`flex items-center gap-1 ${
                    windQualityFilter.includes("Excellent") 
                      ? "bg-wind-good text-white" 
                      : "bg-neutral-light text-neutral-dark border border-gray-300"
                  }`}
                  onClick={() => onWindQualityFilterChange("Excellent")}
                >
                  <Wind className="w-4 h-4" /> Excellent
                </Button>
              </motion.div>
              
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button
                  size="sm"
                  variant={windQualityFilter.includes("Good") ? "default" : "outline"}
                  className={`flex items-center gap-1 ${
                    windQualityFilter.includes("Good") 
                      ? "bg-wind-good text-white" 
                      : "bg-neutral-light text-neutral-dark border border-gray-300"
                  }`}
                  onClick={() => onWindQualityFilterChange("Good")}
                >
                  <Wind className="w-4 h-4" /> Good
                </Button>
              </motion.div>
              
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button
                  size="sm"
                  variant={windQualityFilter.includes("Fair") ? "default" : "outline"}
                  className={`flex items-center gap-1 ${
                    windQualityFilter.includes("Fair") 
                      ? "bg-wind-moderate text-white" 
                      : "bg-neutral-light text-neutral-dark border border-gray-300"
                  }`}
                  onClick={() => onWindQualityFilterChange("Fair")}
                >
                  <Wind className="w-4 h-4" /> Fair
                </Button>
              </motion.div>
            </div>
          </div>
          
          <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <Search className="h-4 w-4 text-gray-400" />
            </div>
            <Input
              className="pl-10 pr-4 py-2 w-full md:w-64"
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
