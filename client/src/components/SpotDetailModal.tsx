import { useState, useEffect } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { X, Wind, Waves, Thermometer, Calendar, Heart } from "lucide-react";
import { MonthNames, WindQuality } from "@shared/schema";
import { motion, AnimatePresence } from "framer-motion";

interface SpotDetailModalProps {
  spotDetails: { spot: any; windConditions: any[] } | undefined;
  isLoading: boolean;
  onClose: () => void;
}

export default function SpotDetailModal({ spotDetails, isLoading, onClose }: SpotDetailModalProps) {
  // State to track if the modal is open (for animation)
  const [isOpen, setIsOpen] = useState(true);
  
  // Function to close with animation
  const handleClose = () => {
    setIsOpen(false);
    setTimeout(onClose, 300); // Wait for animation to complete
  };
  
  // Get wind quality color class
  const getWindQualityClass = (quality: WindQuality) => {
    switch (quality) {
      case WindQuality.Excellent:
        return "bg-wind-good";
      case WindQuality.Good:
        return "bg-wind-good";
      case WindQuality.Moderate:
        return "bg-wind-moderate";
      case WindQuality.Poor:
        return "bg-wind-poor";
      default:
        return "bg-neutral-light";
    }
  };
  
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50 spot-detail-modal">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="bg-white rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto m-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.3 }}
          >
            {isLoading || !spotDetails ? (
              // Loading state
              <div>
                <div className="relative">
                  <Skeleton className="w-full h-64" />
                  <Button
                    size="icon"
                    variant="outline"
                    className="absolute top-4 right-4 bg-white rounded-full p-2 shadow-md"
                    onClick={handleClose}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
                <div className="p-6">
                  <Skeleton className="h-8 w-64 mb-4" />
                  <div className="flex flex-wrap gap-3 mb-4">
                    {Array(4).fill(0).map((_, i) => (
                      <Skeleton key={i} className="h-8 w-28" />
                    ))}
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div>
                      <Skeleton className="h-6 w-40 mb-3" />
                      <div className="space-y-3">
                        <Skeleton className="h-4 w-full" />
                        <Skeleton className="h-4 w-full" />
                        <Skeleton className="h-4 w-full" />
                      </div>
                    </div>
                    <div>
                      <Skeleton className="h-6 w-40 mb-3" />
                      <div className="space-y-3">
                        <Skeleton className="h-4 w-full" />
                        <Skeleton className="h-4 w-full" />
                        <Skeleton className="h-4 w-full" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              // Spot details
              <div>
                <div className="relative">
                  {/* We use a gradient overlay instead of an actual image */}
                  <div className="w-full h-64 bg-gradient-to-r from-blue-400 to-cyan-500 object-cover" />
                  <Button
                    size="icon"
                    variant="outline"
                    className="absolute top-4 right-4 bg-white rounded-full p-2 shadow-md"
                    onClick={handleClose}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-6">
                    <h2 className="text-2xl font-bold font-heading text-white">{spotDetails.spot.name}</h2>
                  </div>
                </div>
                
                <div className="p-6">
                  <div className="flex flex-wrap gap-3 mb-4">
                    {/* Wind badge based on current month */}
                    {spotDetails.windConditions.find(wc => wc.month === new Date().getMonth() + 1) && (
                      <div className={`flex items-center ${getWindQualityClass(spotDetails.windConditions.find(wc => wc.month === new Date().getMonth() + 1)?.windQuality)} text-white px-3 py-1 rounded-full text-sm`}>
                        <Wind className="mr-2 h-4 w-4" /> 
                        {spotDetails.windConditions.find(wc => wc.month === new Date().getMonth() + 1)?.windSpeed} knots
                      </div>
                    )}
                    
                    <div className="flex items-center bg-neutral-light text-neutral-dark px-3 py-1 rounded-full text-sm">
                      <Waves className="mr-2 h-4 w-4" /> {spotDetails.spot.waveSize} Waves
                    </div>
                    
                    <div className="flex items-center bg-neutral-light text-neutral-dark px-3 py-1 rounded-full text-sm">
                      <Thermometer className="mr-2 h-4 w-4" /> {spotDetails.spot.tempRange}
                    </div>
                    
                    <div className="flex items-center bg-neutral-light text-neutral-dark px-3 py-1 rounded-full text-sm">
                      <Calendar className="mr-2 h-4 w-4" /> Best: {spotDetails.spot.bestMonths}
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div>
                      <h3 className="text-xl font-semibold font-heading mb-3 text-neutral-dark">Kitesurfing Info</h3>
                      <div className="space-y-3 text-gray-700">
                        <p>{spotDetails.spot.description}</p>
                        
                        <div className="flex flex-wrap gap-2 mt-4">
                          {spotDetails.spot.tags.map((tag: string, index: number) => (
                            <div key={index} className="text-sm border border-gray-300 px-3 py-1 rounded-full">
                              {tag}
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="text-xl font-semibold font-heading mb-3 text-neutral-dark">Local Attractions</h3>
                      <div className="space-y-3 text-gray-700">
                        <p>{spotDetails.spot.localAttractions}</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mb-6">
                    <h3 className="text-xl font-semibold font-heading mb-3 text-neutral-dark">Wind Conditions by Month</h3>
                    <div className="grid grid-cols-6 md:grid-cols-12 gap-2 text-center">
                      {spotDetails.windConditions
                        .sort((a, b) => a.month - b.month)
                        .map((condition) => (
                          <div 
                            key={condition.id} 
                            className={`p-2 rounded-md ${getWindQualityClass(condition.windQuality)}`}
                          >
                            <div className="font-semibold text-white">{MonthNames[condition.month - 1].substring(0, 3)}</div>
                            <div className="text-xs text-white">{condition.windSpeed} knots</div>
                          </div>
                        ))}
                    </div>
                  </div>
                  
                  <div className="flex justify-between items-center mt-6">
                    <Button 
                      variant="outline" 
                      className="px-4 py-2 bg-neutral-light text-neutral-dark"
                      onClick={handleClose}
                    >
                      <Wind className="mr-2 h-4 w-4" /> Back to Map
                    </Button>
                    
                    <Button className="px-4 py-2 bg-primary text-white">
                      Add to Favorites <Heart className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
