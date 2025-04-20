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
        return "bg-blue-700 text-white";
      case WindQuality.Good:
        return "bg-blue-600 text-white";
      case WindQuality.Moderate:
        return "bg-slate-600 text-white";
      case WindQuality.Poor:
        return "bg-slate-500 text-white";
      default:
        return "bg-slate-500 text-white";
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
                {/* Header section with gradient */}
                <div className="relative">
                  <div className="w-full h-72 bg-gradient-to-br from-blue-600 to-blue-800">
                    {/* Wave patterns */}
                    <div className="absolute inset-0 opacity-30">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" className="absolute bottom-0">
                        <path fill="#fff" fillOpacity="0.3" d="M0,192L48,176C96,160,192,128,288,133.3C384,139,480,181,576,197.3C672,213,768,203,864,170.7C960,139,1056,85,1152,69.3C1248,53,1344,75,1392,85.3L1440,96L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z" className="animate-pulse" />
                      </svg>
                    </div>
                  </div>
                  
                  <Button
                    size="icon"
                    variant="outline"
                    className="absolute top-4 right-4 bg-white rounded-full p-2 shadow-sm hover:bg-blue-700 hover:text-white transition-colors duration-300"
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
                    
                    <div className="flex items-center bg-slate-700 text-white px-4 py-2 rounded-full text-sm font-medium shadow-sm">
                      <Waves className="mr-2 h-4 w-4" /> {spotDetails.spot.waveSize} Waves
                    </div>
                    
                    <div className="flex items-center border border-slate-300 text-slate-800 bg-white px-4 py-2 rounded-full text-sm font-medium">
                      <Thermometer className="mr-2 h-4 w-4 text-slate-600" /> {spotDetails.spot.tempRange}
                    </div>
                    
                    <div className="flex items-center border border-slate-300 text-slate-800 bg-white px-4 py-2 rounded-full text-sm font-medium">
                      <Calendar className="mr-2 h-4 w-4 text-slate-600" /> Best: {spotDetails.spot.bestMonths}
                    </div>
                    
                    {spotDetails.spot.windguruCode && (
                      <a 
                        href={`https://www.windguru.cz/${spotDetails.spot.windguruCode}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center bg-blue-700 text-white px-4 py-2 rounded-full text-sm font-medium shadow-sm hover:bg-blue-800 transition-colors"
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
                      <h3 className="text-xl font-bold font-heading mb-3 text-slate-800 flex items-center">
                        <svg className="w-5 h-5 mr-2 text-blue-700" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
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
                              className="text-sm border border-slate-300 px-3 py-1 rounded-full bg-white text-slate-700"
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
                      <h3 className="text-xl font-bold font-heading mb-3 text-slate-800 flex items-center">
                        <svg className="w-5 h-5 mr-2 text-blue-700" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        Local Attractions
                      </h3>
                      <div className="space-y-3 text-gray-700">
                        <p className="leading-relaxed">{spotDetails.spot.localAttractions}</p>
                      </div>
                      
                      {/* Kite Schools Section */}
                      {spotDetails.spot.kiteSchools && spotDetails.spot.kiteSchools.length > 0 && (
                        <div className="mt-6 pt-6 border-t border-slate-200">
                          <h4 className="font-bold text-slate-800 mb-3 flex items-center">
                            <svg className="w-4 h-4 mr-2 text-blue-700" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                            </svg>
                            Kite Schools
                          </h4>
                          <ul className="space-y-2">
                            {spotDetails.spot.kiteSchools.map((school: string, idx: number) => {
                              const parts = school.split('|');
                              const name = parts[0];
                              const mapLink = parts[1];
                              const rating = parts[2] || null;
                              const reviews = parts[3] || null;
                              
                              return (
                                <li key={idx} className="flex flex-col mb-3">
                                  <div className="flex items-center">
                                    <a 
                                      href={mapLink}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      className="text-blue-700 hover:text-blue-900 transition-colors duration-300 flex items-center"
                                    >
                                      <svg className="w-4 h-4 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                                      </svg>
                                      <span className="font-medium">{name}</span>
                                      <svg className="w-3 h-3 ml-1 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                                      </svg>
                                    </a>
                                  </div>
                                  
                                  {rating && reviews && (
                                    <div className="ml-6 mt-1 flex items-center text-sm text-slate-600">
                                      <div className="flex items-center">
                                        <svg className="w-4 h-4 text-yellow-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118l-2.8-2.034c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                        </svg>
                                        <span className="ml-1 font-medium">{rating}</span>
                                        <span className="mx-1.5">•</span>
                                        <span>{reviews} reviews</span>
                                      </div>
                                    </div>
                                  )}
                                </li>
                              );
                            })}
                          </ul>
                        </div>
                      )}
                    </motion.div>
                  </div>
                  
                  {/* Wind conditions table */}
                  <motion.div 
                    className="mb-8 bg-white rounded-xl p-5 shadow-md border border-slate-200"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 }}
                  >
                    <h3 className="text-xl font-bold font-heading mb-4 text-slate-800 flex items-center">
                      <svg className="w-5 h-5 mr-2 text-blue-700" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
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
                            className={`p-3 rounded-lg shadow-sm ${getWindQualityClass(condition.windQuality)}`}
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
                      className="w-full sm:w-auto px-5 py-3 border-slate-300 hover:bg-slate-100 text-slate-700 transition-colors duration-300"
                      onClick={handleClose}
                    >
                      <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                      </svg>
                      Back to Map
                    </Button>
                    
                    <Button 
                      className="w-full sm:w-auto px-5 py-3 bg-blue-700 hover:bg-blue-800 text-white transition-colors duration-300 shadow-sm"
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
