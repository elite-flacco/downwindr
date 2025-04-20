import { useState } from "react";
import { Spot, MonthNames } from "@shared/schema";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { 
  Wind, 
  Waves, 
  Thermometer, 
  ChevronRight, 
  MapPin, 
  Sparkles, 
  Plus,
  Check
} from "lucide-react";
import { motion } from "framer-motion";
import { Toggle } from "@/components/ui/toggle";

interface SpotsListProps {
  spots: Spot[];
  onSpotSelect: (spotId: number) => void;
  isLoading: boolean;
  selectedMonth: number;
  spotsToCompare?: Spot[];
  onToggleCompare?: (spot: Spot) => void;
}

export default function SpotsList({ 
  spots, 
  onSpotSelect, 
  isLoading, 
  selectedMonth,
  spotsToCompare = [],
  onToggleCompare
}: SpotsListProps) {
  return (
    <Card className="w-full overflow-y-auto rounded-xl border border-slate-100 shadow-sm" style={{ maxHeight: "calc(100vh - 16rem)" }}>
      <CardContent className="p-6">
        <h3 className="text-lg font-semibold mb-4 text-slate-700 flex items-center">
          <Sparkles className="w-5 h-5 mr-2 text-primary" />
          Top Spots in {MonthNames[selectedMonth - 1]}
        </h3>
        
        {isLoading ? (
          // Loading skeleton with animation
          Array(4).fill(0).map((_, i) => (
            <div key={i} className="mb-6 pb-6 border-b border-slate-100">
              <motion.div
                initial={{ opacity: 0.5 }}
                animate={{ opacity: [0.5, 0.8, 0.5] }}
                transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
              >
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
              </motion.div>
            </div>
          ))
        ) : spots.length === 0 ? (
          <div className="text-center py-12 px-4">
            <Wind className="w-16 h-16 mx-auto mb-4 text-slate-300" />
            <p className="text-slate-600 font-medium">No kitesurfing spots found for {MonthNames[selectedMonth - 1]}.</p>
            <p className="text-slate-500 mt-2">Wind conditions may be better in other months!</p>
          </div>
        ) : (
          // Spots list with fun animations
          spots.map((spot, index) => {
            const isInCompare = spotsToCompare.some(s => s.id === spot.id);
            return (
              <motion.div
                key={spot.id}
                className={`spot-card relative rounded-lg p-4 mb-4 ${index < spots.length - 1 ? 'border-b border-slate-100 pb-6' : ''}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                whileHover={{ scale: 1.02 }}
              >
                <div className="flex justify-between items-start mb-3">
                  <h4 className="text-lg font-bold font-heading text-primary">{spot.name}</h4>
                  <div className="px-3 py-1 rounded-full bg-primary/10 text-xs text-primary font-medium">
                    <Wind className="w-3 h-3 inline mr-1" /> {spot.bestMonths}
                  </div>
                </div>
                
                <div className="flex flex-col gap-3">
                  <p className="text-sm text-slate-600 leading-relaxed">
                    {spot.description.length > 100 
                      ? `${spot.description.substring(0, 100)}...` 
                      : spot.description}
                  </p>
                  
                  <div className="flex flex-wrap gap-2 mt-1">
                    <div className="px-3 py-1 bg-slate-100 rounded-full text-xs text-slate-600 flex items-center">
                      <Waves className="w-3 h-3 inline text-primary/70 mr-1" /> {spot.waveSize}
                    </div>
                    <div className="px-3 py-1 bg-slate-100 rounded-full text-xs text-slate-600 flex items-center">
                      <Thermometer className="w-3 h-3 inline text-primary/70 mr-1" /> {spot.tempRange}
                    </div>
                    <div className="px-3 py-1 bg-slate-100 rounded-full text-xs text-slate-600 flex items-center">
                      <MapPin className="w-3 h-3 inline text-primary/70 mr-1" /> {spot.country}
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between mt-2">
                    <Button 
                      variant="ghost"
                      className="text-primary font-medium flex items-center justify-start hover:text-primary/80 transition-all duration-300 hover:bg-primary/5 p-0"
                      onClick={() => onSpotSelect(spot.id)}
                    >
                      See details <ChevronRight className="ml-1 w-4 h-4" />
                    </Button>
                    
                    {onToggleCompare && (
                      <Toggle
                        aria-label={isInCompare ? "Remove from comparison" : "Add to comparison"}
                        pressed={isInCompare}
                        onPressedChange={() => onToggleCompare(spot)}
                        disabled={!isInCompare && spotsToCompare.length >= 3}
                        className={`h-8 ${
                          isInCompare 
                            ? "bg-primary/10 text-primary hover:bg-primary/20" 
                            : "text-slate-500 hover:text-primary hover:bg-primary/5"
                        }`}
                      >
                        {isInCompare ? (
                          <Check className="w-4 h-4 mr-1" />
                        ) : (
                          <Plus className="w-4 h-4 mr-1" />
                        )}
                        {isInCompare ? "Selected" : "Compare"}
                      </Toggle>
                    )}
                  </div>
                </div>
              </motion.div>
            );
          })
        )}
      </CardContent>
    </Card>
  );
}
