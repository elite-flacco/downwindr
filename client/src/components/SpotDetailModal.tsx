import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { X, Wind, Waves, Thermometer, Calendar, Heart, ExternalLink } from "lucide-react";
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
  
  // Render wind info badge
  const renderCurrentWindBadge = () => {
    if (!spotDetails) return null;
    
    const currentMonth = new Date().getMonth() + 1;
    const currentCondition = spotDetails.windConditions.find(wc => wc.month === currentMonth);
    
    if (!currentCondition) return null;
    
    return (
      <div className={`flex items-center ${getWindQualityClass(currentCondition.windQuality)} text-white px-4 py-2 rounded-full text-sm font-bold shadow-md wind-indicator`}>
        <Wind className="mr-2 h-4 w-4" /> 
        {currentCondition.windSpeed} knots
      </div>
    );
  };
  
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50 spot-detail-modal">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="bg-white rounded-xl shadow-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto m-4"
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
              // Spot details with fun beach theme
              <div>
                {/* Header section with gradient and waves */}
                <div className="relative">
                  <div className="w-full h-72 bg-gradient-to-br from-ocean-blue via-ocean-dark to-tropical-green">
                    {/* Wave patterns */}
                    <div className="absolute inset-0 opacity-20">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" className="absolute bottom-0">
                        <path fill="#fff" fillOpacity="0.3" d="M0,192L48,176C96,160,192,128,288,133.3C384,139,480,181,576,197.3C672,213,768,203,864,170.7C960,139,1056,85,1152,69.3C1248,53,1344,75,1392,85.3L1440,96L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z" className="animate-pulse" />
                      </svg>
                    </div>
                  </div>
                  
                  <Button
                    size="icon"
                    variant="outline"
                    className="absolute top-4 right-4 bg-white rounded-full p-2 shadow-md hover:bg-ocean-blue hover:text-white transition-colors duration-300"
                    onClick={handleClose}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                  
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-6">
                    <motion.h2 
                      className="text-3xl font-bold font-heading text-white"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1 }}
                    >
                      {spotDetails.spot.name}
                    </motion.h2>
                    <motion.p 
                      className="text-white text-opacity-90 flex items-center"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 }}
                    >
                      <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      {spotDetails.spot.country}
                    </motion.p>
                  </div>
                </div>
                
                {/* Content section */}
                <div className="p-6">
                  {/* Info badges */}
                  <motion.div 
                    className="flex flex-wrap gap-3 mb-5"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                  >
                    {renderCurrentWindBadge()}
                    
                    <div className="flex items-center bg-ocean-blue bg-opacity-10 text-ocean-dark px-4 py-2 rounded-full text-sm font-medium shadow">
                      <Waves className="mr-2 h-4 w-4 text-ocean-blue" /> {spotDetails.spot.waveSize} Waves
                    </div>
                    
                    <div className="flex items-center bg-sunny-yellow bg-opacity-10 text-ocean-dark px-4 py-2 rounded-full text-sm font-medium shadow">
                      <Thermometer className="mr-2 h-4 w-4 text-sunny-yellow" /> {spotDetails.spot.tempRange}
                    </div>
                    
                    <div className="flex items-center bg-tropical-green bg-opacity-10 text-ocean-dark px-4 py-2 rounded-full text-sm font-medium shadow">
                      <Calendar className="mr-2 h-4 w-4 text-tropical-green" /> Best: {spotDetails.spot.bestMonths}
                    </div>
                    
                    {spotDetails.spot.windguruCode && (
                      <a 
                        href={`https://www.windguru.cz/${spotDetails.spot.windguruCode}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center bg-purple-600 text-white px-4 py-2 rounded-full text-sm font-medium shadow hover:bg-purple-700 transition-colors"
                      >
                        <ExternalLink className="mr-2 h-4 w-4" /> Windguru Forecast
                      </a>
                    )}
                  </motion.div>
                  
                  {/* Two column info section */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                    <motion.div
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.4 }}
                      className="bg-white rounded-xl p-5 shadow-md"
                    >
                      <h3 className="text-xl font-bold font-heading mb-3 text-ocean-dark flex items-center">
                        <svg className="w-5 h-5 mr-2 text-ocean-blue" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        Kitesurfing Info
                      </h3>
                      <div className="space-y-3 text-gray-700">
                        <p className="leading-relaxed">{spotDetails.spot.description}</p>
                        
                        <div className="flex flex-wrap gap-2 mt-4">
                          {spotDetails.spot.tags.map((tag: string, index: number) => (
                            <div 
                              key={index} 
                              className="text-sm border border-ocean-blue border-opacity-30 px-3 py-1 rounded-full bg-ocean-blue bg-opacity-5 text-ocean-dark"
                            >
                              {tag}
                            </div>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                    
                    <motion.div
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.4 }}
                      className="bg-white rounded-xl p-5 shadow-md"
                    >
                      <h3 className="text-xl font-bold font-heading mb-3 text-ocean-dark flex items-center">
                        <svg className="w-5 h-5 mr-2 text-ocean-blue" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        Local Attractions
                      </h3>
                      <div className="space-y-3 text-gray-700">
                        <p className="leading-relaxed">{spotDetails.spot.localAttractions}</p>
                      </div>
                    </motion.div>
                  </div>
                  
                  {/* Wind conditions table */}
                  <motion.div 
                    className="mb-8 bg-beach-sand rounded-xl p-5 shadow-md"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 }}
                  >
                    <h3 className="text-xl font-bold font-heading mb-4 text-ocean-dark flex items-center">
                      <svg className="w-5 h-5 mr-2 text-ocean-blue" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                      </svg>
                      Wind Conditions by Month
                    </h3>
                    <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-12 gap-2 text-center">
                      {spotDetails.windConditions
                        .sort((a, b) => a.month - b.month)
                        .map((condition, idx) => (
                          <div 
                            key={condition.id} 
                            className={`p-3 rounded-lg shadow-sm ${getWindQualityClass(condition.windQuality)} wind-indicator`}
                          >
                            <div className="font-bold text-white">{MonthNames[condition.month - 1].substring(0, 3)}</div>
                            <div className="text-xs text-white font-medium">{condition.windSpeed} knots</div>
                          </div>
                        ))}
                    </div>
                  </motion.div>
                  
                  {/* Action buttons */}
                  <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mt-8">
                    <Button 
                      variant="outline" 
                      className="w-full sm:w-auto px-5 py-3 bg-ocean-dark text-white border-ocean-dark hover:bg-ocean-blue transition-colors duration-300"
                      onClick={handleClose}
                    >
                      <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                      </svg>
                      Back to Map
                    </Button>
                    
                    <Button 
                      className="w-full sm:w-auto px-5 py-3 bg-gradient-to-r from-ocean-blue to-tropical-green text-white border-none hover:opacity-90 transition-opacity duration-300 shadow-lg"
                    >
                      Add to Favorites 
                      <Heart className="ml-2 h-5 w-5 animate-pulse" />
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
