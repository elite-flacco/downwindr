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
    <Card className="w-full md:w-1/3 overflow-y-auto rounded-xl shadow-lg" style={{ maxHeight: "calc(100vh - 16rem)" }}>
      <CardContent className="p-6">
        <h3 className="text-xl font-bold font-heading mb-4 text-ocean-dark flex items-center">
          <svg className="w-6 h-6 mr-2 text-ocean-blue" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
          </svg>
          Top Spots in {MonthNames[selectedMonth - 1]}
        </h3>
        
        {isLoading ? (
          // Loading skeleton with animation
          Array(4).fill(0).map((_, i) => (
            <div key={i} className="mb-6 pb-6 border-b border-gray-200">
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
            <svg className="w-16 h-16 mx-auto mb-4 text-ocean-blue opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 15a4 4 0 004 4h9a5 5 0 10-4.5-8.599A5 5 0 105.5 10.5a6.5 6.5 0 00-1.4 1.378" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M18 20v-3M18 14v-3" />
            </svg>
            <p className="text-gray-600 font-medium">No kitesurfing spots found for {MonthNames[selectedMonth - 1]}.</p>
            <p className="text-gray-500 mt-2">Wind conditions may be better in other months!</p>
          </div>
        ) : (
          // Spots list with fun animations
          spots.map((spot, index) => (
            <motion.div
              key={spot.id}
              className={`spot-card relative rounded-lg p-4 mb-4 ${index < spots.length - 1 ? 'border-b border-gray-200 pb-6' : ''}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              whileHover={{ scale: 1.02 }}
            >
              <div className="flex justify-between items-start mb-3">
                <h4 className="text-lg font-bold font-heading text-ocean-dark">{spot.name}</h4>
                <div className="wind-indicator px-3 py-1 rounded-full bg-wind-good text-xs text-white font-bold shadow-md">
                  <Wind className="w-3 h-3 inline mr-1" /> {spot.bestMonths}
                </div>
              </div>
              
              <div className="flex flex-col gap-3">
                <p className="text-sm text-gray-600 leading-relaxed">
                  {spot.description.length > 100 
                    ? `${spot.description.substring(0, 100)}...` 
                    : spot.description}
                </p>
                
                <div className="flex flex-wrap gap-2 mt-1">
                  <div className="px-3 py-1 bg-ocean-blue bg-opacity-10 rounded-full text-xs text-ocean-dark flex items-center">
                    <Waves className="w-3 h-3 inline text-ocean-blue mr-1" /> {spot.waveSize}
                  </div>
                  <div className="px-3 py-1 bg-sunny-yellow bg-opacity-10 rounded-full text-xs text-ocean-dark flex items-center">
                    <Thermometer className="w-3 h-3 inline text-sunny-yellow mr-1" /> {spot.tempRange}
                  </div>
                  <div className="px-3 py-1 bg-tropical-green bg-opacity-10 rounded-full text-xs text-ocean-dark flex items-center">
                    <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 21v-4m0 0V5a2 2 0 012-2h6.5l1 1H21l-3 6 3 6h-8.5l-1-1H5a2 2 0 00-2 2zm9-13.5V9" />
                    </svg>
                    {spot.country}
                  </div>
                </div>
                
                <Button 
                  variant="ghost"
                  className="text-ocean-blue font-semibold mt-2 flex items-center justify-start hover:text-ocean-dark transition-all duration-300 hover:bg-ocean-blue hover:bg-opacity-10 wave-bg"
                  onClick={() => onSpotSelect(spot.id)}
                >
                  See details <ChevronRight className="ml-1 w-4 h-4" />
                </Button>
              </div>
            </motion.div>
          ))
        )}
      </CardContent>
    </Card>
  );
}
