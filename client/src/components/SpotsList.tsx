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
  waveHeight: number;
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
        <h3 className="mb-6 flex items-center">
          <Sparkles className="w-6 h-6 mr-4 text-theme-accent" />
          Top Kitesurfing Spots in {MonthNames[selectedMonth - 1]}
        </h3>

        {spots.length === 0 && !isLoading ? (
          <div className="text-center py-12 px-4">
            <Wind className="w-16 h-16 mx-auto mb-6 text-theme-primary" />
            <p className="card-subtitle">No kitesurfing spots found for {MonthNames[selectedMonth - 1]}.</p>
            <p className="card-caption mt-4">Wind conditions may be better in other months!</p>
          </div>
        ) : (
          <div className="grid gap-4 sm:gap-6 md:grid-cols-2 lg:grid-cols-3">
            {spots.map((spot, index) => {
              const isInCompare = spotsToCompare.some(s => s.id === spot.id);
              return (
                <motion.div
                  key={spot.id}
                  className="spot-card relative rounded-lg overflow-hidden group"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.1 }}
                  whileHover={{ scale: 1.01, transition: { duration: 0.1 } }}
                >
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-theme-background/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                  <div className="relative flex flex-col h-full p-6">
                    <div className="flex-1">
                      <div className="flex items-center gap-4 mb-4">
                        <div className="flex items-center gap-2">
                          {
                            (() => {
                              const flag = getCountryFlag(spot.country);
                              return flag ? (
                                <img
                                  src={flag.url}
                                  alt={`${spot.country} flag`}
                                  title={spot.country}
                                  className="w-6 h-6 rounded-full border-2 border-theme-primary/20"
                                />
                              ) : null
                            })()
                          }
                          <h3 className="spot-name text-lg font-semibold text-theme-primary">{spot.name}</h3>
                        </div>
                        <div className="flex items-center gap-2 ml-auto">
                          <Wind className="w-4 h-4 text-theme-primary" />
                          <span className="text-sm text-theme-text-light/70">{spot.bestMonths}</span>
                        </div>
                      </div>

                      <div className="mb-4">
                        <p className="card-body text-sm text-theme-text-light/80 leading-relaxed">
                        {spot.description.length > 200
                          ? `${spot.description.substring(0, 200)}...`
                          : spot.description}
                        </p>
                      </div>
                      <div className="space-y-3">
                        <div className="flex items-center gap-4">
                          <div className="flex items-center gap-2">
                            <Wind className="w-5 h-5 text-theme-primary" />
                            <span className="text-sm font-medium text-theme-text-light/90">{spot.windCondition?.windSpeed} knots</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Waves className="w-5 h-5 text-theme-primary" />
                            <span className="text-sm font-medium text-theme-text-light/90">{spot.waveSize}</span>
                          </div>
                        </div>

                        <div className="flex items-center gap-4">
                          <div className="flex items-center gap-2">
                            <Thermometer className="w-5 h-5 text-theme-primary" />
                            <span className="text-sm font-medium text-theme-text-light/90">{spot.windCondition?.airTemp}°C</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Droplets className="w-5 h-5 text-theme-primary" />
                            <span className="text-sm font-medium text-theme-text-light/90">{spot.windCondition?.waterTemp}°C</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="mt-6 flex flex-col sm:flex-row justify-end gap-2 sm:gap-4">
                      <Button
                        variant="accent"
                        size="sm"
                        onClick={() => onSpotSelect(spot.id)}
                        className="button-text flex items-center justify-center sm:justify-start transition-all duration-300 w-full sm:w-auto"
                      >
                        <ChevronRight className="w-4 h-4" />
                        View Details
                      </Button>
                      {onToggleCompare && (
                        <Toggle
                          pressed={isInCompare}
                          onClick={() => onToggleCompare(spot)}
                          className="h-8 px-3 text-xs text-theme-text bg-theme-surface hover:bg-theme-surface/80 active:bg-theme-surface/90 shadow-md hover:shadow-lg active:shadow-sm border-2 border-theme-border hover:border-theme-border/60 transform hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-2 hand-drawn chalk-texture chalk-drawn w-full sm:w-auto"
                        >
                          {isInCompare ? (
                            <Check className="w-4 h-4" />
                          ) : (
                            <Plus className="w-4 h-4" />
                          )}
                          Compare
                        </Toggle>
                      )}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
