import { useState } from "react";
import { Spot, MonthNames } from "@shared/schema";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Wind, Waves, Thermometer, ChevronRight } from "lucide-react";
import { motion } from "framer-motion";

interface SpotsListProps {
  spots: Spot[];
  onSpotSelect: (spotId: number) => void;
  isLoading: boolean;
  selectedMonth: number;
}

export default function SpotsList({ spots, onSpotSelect, isLoading, selectedMonth }: SpotsListProps) {
  return (
    <Card className="w-full md:w-1/3 overflow-y-auto" style={{ maxHeight: "calc(100vh - 16rem)" }}>
      <CardContent className="p-4">
        <h3 className="text-xl font-bold font-heading mb-4 text-neutral-dark">
          Top Spots in {MonthNames[selectedMonth - 1]}
        </h3>
        
        {isLoading ? (
          // Loading skeleton
          Array(4).fill(0).map((_, i) => (
            <div key={i} className="mb-4 border-b border-gray-200 pb-4">
              <div className="flex justify-between items-start mb-2">
                <Skeleton className="h-6 w-40" />
                <Skeleton className="h-6 w-24" />
              </div>
              <Skeleton className="h-4 w-full mb-2" />
              <Skeleton className="h-4 w-full mb-2" />
              <div className="flex items-center">
                <Skeleton className="h-4 w-24 mr-4" />
                <Skeleton className="h-4 w-24" />
              </div>
            </div>
          ))
        ) : spots.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-gray-500">No spots found for the selected month.</p>
            <p className="text-gray-500 mt-2">Try selecting a different month or adjusting your filters.</p>
          </div>
        ) : (
          // Spots list
          spots.map((spot, index) => (
            <motion.div
              key={spot.id}
              className={`spot-card ${index < spots.length - 1 ? 'mb-4 border-b border-gray-200 pb-4' : ''}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <div className="flex justify-between items-start mb-2">
                <h4 className="text-lg font-semibold font-heading">{spot.name}</h4>
                <div className="wind-indicator px-2 py-1 rounded-full bg-wind-good text-xs text-white font-semibold">
                  <Wind className="w-3 h-3 inline mr-1" /> {spot.bestMonths}
                </div>
              </div>
              
              <div className="flex flex-col gap-2">
                <p className="text-sm text-gray-600">
                  {spot.description.length > 100 
                    ? `${spot.description.substring(0, 100)}...` 
                    : spot.description}
                </p>
                
                <div className="flex items-center text-sm text-gray-700">
                  <div className="mr-4">
                    <Waves className="w-3 h-3 inline text-primary mr-1" /> Waves: {spot.waveSize}
                  </div>
                  <div>
                    <Thermometer className="w-3 h-3 inline text-accent mr-1" /> {spot.tempRange}
                  </div>
                </div>
                
                <Button 
                  variant="link"
                  className="text-primary text-sm font-semibold p-0 h-auto flex items-center justify-start hover:text-blue-700 transition"
                  onClick={() => onSpotSelect(spot.id)}
                >
                  See details <ChevronRight className="ml-1 w-3 h-3" />
                </Button>
              </div>
            </motion.div>
          ))
        )}
      </CardContent>
    </Card>
  );
}
