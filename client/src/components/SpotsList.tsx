import { useState } from "react";
import { Spot, MonthNames, WindQuality } from "@shared/schema";
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
  Check,
  Droplets
} from "lucide-react";
import { motion } from "framer-motion";
import { getCountryFlag } from "@/lib/countryUtils";
import { Toggle } from "@/components/ui/toggle";



interface SpotWithWindCondition extends Spot {
  windCondition?: {
    windQuality: WindQuality;
    windSpeed: number;
    airTemp: number;
    waterTemp: number;
    seasonalNotes?: string;
  };
}

interface SpotsListProps {
  spots: SpotWithWindCondition[];
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
    <Card className="w-full rounded-xl border border-theme-border shadow-sm">
      <CardContent className="p-6">
        <h3 className="mb-4 flex items-center">
          <Sparkles className="w-6 h-6 mr-2 text-theme-accent" />
          top ffffKitesurfing Spots in {MonthNames[selectedMonth - 1]}
        </h3>
        
        {spots.length === 0 && !isLoading ? (
          <div className="text-center py-12 px-4">
            <Wind className="w-16 h-16 mx-auto mb-4 text-theme-primary" />
            <p className="text-theme-text font-medium">No kitesurfing spots found for {MonthNames[selectedMonth - 1]}.</p>
            <p className="text-theme-text-light mt-2">Wind conditions may be better in other months!</p>
          </div>
        ) : (
          // Spots list with fun animations
          spots.map((spot, index) => {
            const isInCompare = spotsToCompare.some(s => s.id === spot.id);
            return (
              <motion.div
                key={spot.id}
                className={`spot-card relative rounded-lg p-4 mb-4 ${index < spots.length - 1 ? 'border-b border-theme-border pb-6' : ''}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.1 }}
                whileHover={{ scale: 1.01, transition: { duration: 0.1 } }}
              >
                <div className="flex justify-between items-start mb-3 pt-4 px-3">
                  <div className="flex">
                    <span className="flex mr-2 items-center gap-1">
                      {
                        (() => {
                          const flag = getCountryFlag(spot.country);
                          return flag ? (
                            <img 
                              src={flag.url} 
                              alt={`${spot.country} flag`} 
                              title={spot.country}
                              className="h-3.5 inline-block"
                            />
                          ) : null
                        })()
                      }
                    </span>
                  <h3>{spot.name}</h3>
                    </div>
                  <div className="px-3 py-1 rounded-full bg-theme-primary/10 text-xs text-theme-primary font-medium">
                    <Wind className="w-3 h-3 inline mr-1" /> {spot.bestMonths}
                  </div>
                </div>
                
                <div className="flex flex-col gap-3">
                  <p className="text-sm text-theme-text-light leading-relaxed px-3">
                    {spot.description.length > 300 
                      ? `${spot.description.substring(0, 300)}...` 
                      : spot.description}
                  </p>
                  
                  <div className="flex flex-wrap gap-2 mt-1 px-3">
                    <div className="px-3 py-1 bg-theme-surface rounded-full text-xs text-theme-text flex items-center">
                      <Waves className="w-3 h-3 inline text-theme-primary mr-1" /> {spot.waveSize}
                    </div>
                    <div className="px-3 py-1 bg-theme-surface rounded-full text-xs text-theme-text flex items-center">
                      <Thermometer className="w-3 h-3 inline text-theme-primary mr-1" /> {spot.tempRange}
                    </div>
                    <div className="px-3 py-1 bg-theme-surface rounded-full text-xs text-theme-text flex items-center gap-1.5">
                      <Wind className="w-3 h-3 inline text-theme-primary mr-1" /> {spot.localAttractions}
                    </div>
                  </div>
                  
                  {/* Monthly Wind Conditions */}
                  <div className="flex flex-wrap gap-2 mt-2 px-3 bg-theme-accent/5 py-2 rounded-lg">
                    <h4 className="w-full text-xs font-medium mb-1 text-theme-text-light">{MonthNames[selectedMonth - 1]} Conditions:</h4>
                    {spot.windCondition ? (
                      <>
                        <div className="px-3 py-1 bg-theme-primary/10 rounded-full text-xs text-theme-primary flex items-center">
                          <Wind className="w-3 h-3 inline text-theme-primary mr-1" /> 
                          {spot.windCondition.windSpeed} knots
                        </div>
                        <div className="px-3 py-1 bg-theme-primary/10 rounded-full text-xs text-theme-primary flex items-center">
                          <Thermometer className="w-3 h-3 inline text-theme-primary mr-1" /> 
                          {spot.windCondition.airTemp}°C air
                        </div>
                        <div className="px-3 py-1 bg-theme-primary/10 rounded-full text-xs text-theme-primary flex items-center">
                          <Droplets className="w-3 h-3 inline text-theme-primary mr-1" /> 
                          {spot.windCondition.waterTemp}°C water
                        </div>
                      </>
                    ) : (
                      <div className="text-xs text-theme-text-light italic">No data available for this month</div>
                    )}
                  </div>
                  
                  <div className="flex items-center justify-between mt-2">
                    <Button 
                      variant="accent"
                      size="sm"
                      className="flex items-center justify-start transition-all duration-300 ml-4"
                      onClick={() => onSpotSelect(spot.id)}
                    >
                      View details <ChevronRight className="ml-1 w-4 h-4" />
                    </Button>
                    
                    {onToggleCompare && (
                      <Toggle
                        aria-label={isInCompare ? "Remove from comparison" : "Add to comparison"}
                        pressed={isInCompare}
                        onPressedChange={() => onToggleCompare(spot)}
                        disabled={!isInCompare && spotsToCompare.length >= 3}
                        className={`h-8 text-xs mr-2 ${
                          isInCompare 
                            ? "bg-theme-accent-warning/30 text-theme-accent-warning hover:bg-theme-accent-warning/40" 
                            : "text-theme-text-light hover:text-theme-primary hover:bg-theme-primary/5"
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
