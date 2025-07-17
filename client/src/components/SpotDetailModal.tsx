import { useState } from "react";
import { getCountryFlag } from "@/lib/countryUtils";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { X, Wind, Waves, Thermometer, Calendar, Heart, MapPin, ExternalLink, SchoolIcon } from "lucide-react";
import { MonthNames, WindQuality } from "@shared/schema";
import { motion, AnimatePresence } from "framer-motion";
import ReviewsAndRatings from "./ReviewsAndRatings";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

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
    setTimeout(onClose, 50); // Further reduced wait time for animation to complete
  };

  // Get wind quality color class and emoji
  const getWindQualityClass = (quality: WindQuality) => {
    switch (quality) {
      case WindQuality.Excellent:
        return "wind-quality-excellent";
      case WindQuality.Good:
        return "wind-quality-good";
      case WindQuality.Moderate:
        return "wind-quality-moderate";
      case WindQuality.Poor:
        return "wind-quality-poor";
      default:
        return "bg-theme-muted";
    }
  };

  // Get wind quality emoji
  const getWindQualityEmoji = (quality: WindQuality) => {
    switch (quality) {
      case WindQuality.Excellent:
        return "🚀";
      case WindQuality.Good:
        return "😎";
      case WindQuality.Moderate:
        return "😊";
      case WindQuality.Poor:
        return "😐";
      default:
        return "";
    }
  };

  // Render wind info badge
  const renderCurrentWindBadge = () => {
    if (!spotDetails) return null;

    const currentMonth = new Date().getMonth() + 1;
    const currentCondition = spotDetails.windConditions.find(wc => wc.month === currentMonth);

    if (!currentCondition) return null;

    return (
      <div className={`flex items-center ${getWindQualityClass(currentCondition.windQuality)} text-white px-5 py-3 rounded-2xl text-sm font-bold shadow-lg wind-indicator border border-white/20`}>
        <Wind className="mr-2 h-4 w-4" />
        {currentCondition.windSpeed} knots {getWindQualityEmoji(currentCondition.windQuality)}
      </div>
    );
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/60 backdrop-blur-sm spot-detail-modal">
      <AnimatePresence mode="sync">
        {isOpen && (
          <motion.div
            className="bg-theme-background rounded-2xl shadow-2xl w-full max-w-5xl max-h-[95vh] overflow-y-auto m-4 border-[1px] border-gradient-to-r from-theme-border/20 to-theme-border/10 shadow-sm"
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
          >
            {isLoading || !spotDetails ? (
              // Loading state
              <div>
                <div className="relative">
                  <Skeleton className="w-full h-64" />
                  <div className="absolute top-2 right-2 z-50">
                    <Button
                      size="sm"
                      variant="ghost"
                      className="h-8 w-8 rounded-full bg-theme-background/90 shadow-md hover:bg-theme-primary hover:text-white transition-colors duration-300 chalk-drawn wobbly-border"
                      onClick={handleClose}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                <div className="p-6">
                  <Skeleton className="h-8 w-64 mb-6" />
                  <div className="flex flex-wrap gap-4 mb-6">
                    {Array(4).fill(0).map((_, i) => (
                      <Skeleton key={i} className="h-8 w-28" />
                    ))}
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                    <div>
                      <Skeleton className="h-6 w-40 mb-4" />
                      <div className="space-y-4">
                        <Skeleton className="h-4 w-full" />
                        <Skeleton className="h-4 w-full" />
                        <Skeleton className="h-4 w-full" />
                      </div>
                    </div>
                    <div>
                      <Skeleton className="h-6 w-40 mb-4" />
                      <div className="space-y-4">
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
                  <div className="w-full h-56 bg-gradient-to-br from-theme-primary via-theme-primary-hover to-theme-primary overflow-hidden">
                    {/* Enhanced wave patterns */}
                    <div className="absolute inset-0 opacity-20">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" className="absolute bottom-0">
                        <path fill="#fff" fillOpacity="0.4" d="M0,192L48,176C96,160,192,128,288,133.3C384,139,480,181,576,197.3C672,213,768,203,864,170.7C960,139,1056,85,1152,69.3C1248,53,1344,75,1392,85.3L1440,96L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z" className="animate-pulse" />
                      </svg>
                    </div>
                    {/* Floating elements for visual interest */}
                    <div className="absolute top-6 right-20 w-3 h-3 bg-white/30 rounded-full animate-bounce" style={{ animationDelay: '0s' }}></div>
                    <div className="absolute top-12 right-32 w-2 h-2 bg-white/20 rounded-full animate-bounce" style={{ animationDelay: '0.5s' }}></div>
                    <div className="absolute top-8 right-48 w-4 h-4 bg-white/25 rounded-full animate-bounce" style={{ animationDelay: '1s' }}></div>
                  </div>

                  <div className="absolute top-4 right-4 z-50">
                    <Button
                      size="sm"
                      variant="ghost"
                      className="h-10 w-10 rounded-full bg-black/20 backdrop-blur-sm shadow-lg hover:bg-black/30 text-white hover:text-white transition-all duration-300 border border-white/20"
                      onClick={handleClose}
                    >
                      <X className="h-5 w-5" />
                    </Button>
                  </div>

                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/50 via-black/20 to-transparent p-8">
                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0">
                        <MapPin className="w-7 h-7 text-white mt-1" />
                      </div>
                      <div className="flex-1">
                        <motion.h3
                          className="text-4xl font-bold text-white mb-2 leading-tight"
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.3, delay: 0.1 }}
                        >
                          {spotDetails.spot.name}
                        </motion.h3>
                        <motion.div
                          className="flex items-center gap-3 text-white/90"
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.3, delay: 0.2 }}
                        >
                          <span className="text-lg font-medium">{spotDetails.spot.country}</span>
                          {
                            (() => {
                              const flag = getCountryFlag(spotDetails.spot.country);
                              return flag ? (
                                <img
                                  src={flag.url}
                                  alt={`${spotDetails.spot.country} flag`}
                                  title={spotDetails.spot.country}
                                  className="h-6 rounded shadow-sm"
                                />
                              ) : null
                            })()
                          }
                        </motion.div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Content section */}
                <div className="p-8">
                  {/* Info badges */}
                  <motion.div
                    className="flex flex-wrap gap-3 mb-8"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: 0.1 }}
                  >
                    {renderCurrentWindBadge()}

                    <div className="flex items-center bg-gradient-to-r from-blue-500 to-blue-600 text-white px-5 py-3 rounded-2xl text-sm font-semibold shadow-lg hover:shadow-xl transition-all duration-300">
                      <Waves className="mr-2 h-4 w-4" /> {spotDetails.spot.waveSize} Waves 🌊
                    </div>

                    <div className="flex items-center text-theme-text bg-theme-surface border border-theme-border px-5 py-3 rounded-2xl text-sm font-semibold shadow-md">🌡️ {spotDetails.spot.tempRange}
                    </div>

                    <div className="flex items-center text-theme-text bg-theme-surface border border-theme-border px-5 py-3 rounded-2xl text-sm font-semibold shadow-md">📅 Best: {spotDetails.spot.bestMonths}
                    </div>

                    {spotDetails.spot.windguruCode != null && spotDetails.spot.windguruCode !== '' && (
                      <a
                        href={`https://www.windguru.cz/${spotDetails.spot.windguruCode}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center text-theme-text bg-theme-surface border border-theme-border px-5 py-3 rounded-2xl text-sm font-semibold shadow-md hover:shadow-lg hover:bg-theme-primary/10 transition-all duration-300 transform hover:scale-105"
                      >
                        <Wind className="mr-2 h-4 w-4" /> Windguru
                        <ExternalLink className="ml-2 h-4 w-4" />
                      </a>
                    )}
                  </motion.div>

                  {/* Two column info section */}
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-10">
                    <motion.div
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.4, delay: 0.2 }}
                      className="bg-gradient-to-br from-theme-background to-theme-surface/30 rounded-2xl p-6 shadow-lg border-[1px] border-gradient-to-r from-theme-border/20 to-theme-border/10 shadow-sm hover:shadow-xl transition-all duration-300"
                    >
                      <h3 className="mb-4 flex items-center">
                        <svg className="w-6 h-6 mr-3 text-theme-primary/90" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        Kitesurfing Info
                      </h3>
                      <div className="space-y-4 text-sm">
                        <p className="mb-6 text-base leading-relaxed text-theme-text">{spotDetails.spot.description}</p>

                        {/* Add kite schools in the kitesurfing info card - Top 5 rated only */}
                        {(() => {
                          // First check if we have any schools with rating data
                          const hasRatedSchools = spotDetails.spot.kiteSchools &&
                            spotDetails.spot.kiteSchools.some((school: string) => {
                              const parts = school.split('|');
                              return parts.length >= 3; // At least has a rating
                            });

                          const schoolsWithData = spotDetails.spot.kiteSchools
                            // Parse the school data for sorting
                            .map((school: string) => {
                              const parts = school.split('|');
                              const name = parts[0];
                              const mapLink = parts[1] || null;
                              const rating = parts.length >= 3 ? parseFloat(parts[2]) : 0;
                              const reviews = parts.length >= 4 ? parseInt(parts[3], 10) : 0;

                              return {
                                name,
                                mapLink,
                                rating,
                                reviews,
                                hasRating: parts.length >= 3,
                                originalString: school
                              };
                            })
                            // Sort by rating (highest first), then by number of reviews
                            .sort((a: any, b: any) => {
                              if (b.rating !== a.rating) {
                                return b.rating - a.rating;
                              }
                              return b.reviews - a.reviews;
                            })
                            // Take only the top 5
                            .slice(0, 5);

                          const title = hasRatedSchools ? "Top Rated Kite Schools:" : "Kite Schools:";

                          return spotDetails.spot.kiteSchools && spotDetails.spot.kiteSchools.length > 0 && (
                            <div className="mt-12 mb-4">
                              <div className="flex items-center mb-4">
                                <SchoolIcon className="w-5 h-5 mr-3 text-theme-primary/90" />
                                <h5 className="font-semibold">
                                  {title}
                                </h5>
                              </div>
                              <ul className="text-sm mb-8">
                                {schoolsWithData.map((school: any, idx: number) => {
                                  return (
                                    <li key={idx} className="flex flex-col mb-1">
                                      <div className="flex items-center justify-between">
                                        <div className="flex items-center">
                                          {school.mapLink ? (
                                            <a
                                              href={school.mapLink}
                                              target="_blank"
                                              rel="noopener noreferrer"
                                              className="text-theme-primary/90 hover:text-theme-primary/90-hover transition-colors duration-300 flex items-center"
                                            >
                                              {/* <svg className="w-4 h-4 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                                              </svg> */}
                                              <span className="font-semibold">{school.name}</span>
                                              <ExternalLink className="ml-1 h-3 w-3" />
                                            </a>
                                          ) : (
                                            <div className="flex items-center">
                                              <svg className="w-4 h-4 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                                              </svg>
                                              <span className="font-medium">{school.name}</span>
                                            </div>
                                          )}
                                        </div>

                                        {/* Display rating badge if available */}
                                        {school.hasRating && (
                                          <div className="px-2 py-1 rounded-full bg-theme-primary/10 text-xs text-theme-primary/90 font-medium flex items-center">
                                            <svg className="w-3 h-3 mr-1 text-theme-wind-good" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118l-2.8-2.034c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                            </svg>
                                            {school.rating} {school.reviews > 0 && `(${school.reviews})`}
                                          </div>
                                        )}
                                      </div>
                                    </li>
                                  );
                                })}
                              </ul>
                            </div>
                          );
                        })()}

                        <div className="flex flex-wrap gap-2 mt-6">
                          {spotDetails.spot.tags.map((tag: string, index: number) => (
                            <div
                              key={index}
                              className="text-xs font-semibold border border-theme-primary/40 px-2 py-1 rounded-full bg-theme-primary/15 text-theme-primary font-medium hover:bg-theme-primary/25 transition-colors duration-200 shadow-sm"
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
                      transition={{ duration: 0.4, delay: 0.3 }}
                      className="bg-gradient-to-br from-theme-background to-theme-surface/30 rounded-2xl p-6 shadow-lg border-[1px] border-gradient-to-r from-theme-border/20 to-theme-border/10 shadow-sm hover:shadow-xl transition-all duration-300"
                    >
                      <h3 className="mb-4 flex items-center">
                        <svg className="w-6 h-6 mr-3 text-theme-primary/90" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        Local Attractions
                      </h3>
                      <div className="space-y-4 text-sm text-theme">
                        <p className="text-base leading-relaxed text-theme-text">{spotDetails.spot.localAttractions}</p>
                      </div>
                      {/* Removed duplicate kite schools section */}
                    </motion.div>
                  </div>

                  {/* Wind conditions table */}
                  <motion.div
                    className="mb-10 bg-gradient-to-br from-theme-background to-theme-surface/20 rounded-2xl p-6 shadow-lg border-[1px] border-gradient-to-r from-theme-border/20 to-theme-border/10 shadow-sm"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.4 }}
                  >
                    <h3 className="mb-6 flex items-center">
                      <svg className="w-6 h-6 mr-3 text-theme-primary/90" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                      </svg>
                      Wind Conditions by Month
                    </h3>
                    <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-12 gap-3 text-center">
                      {spotDetails.windConditions
                        .sort((a, b) => a.month - b.month)
                        .map((condition, idx) => (
                          <div
                            key={condition.id}
                            className={`p-3 rounded-xl ${getWindQualityClass(condition.windQuality)} transition-all duration-300 hover:shadow-lg hover:scale-110 cursor-pointer border border-white/20 backdrop-blur-sm`}
                          >
                            <div className="text-xs font-semibold">{MonthNames[condition.month - 1].substring(0, 3)}</div>
                            <div className="text-xs opacity-90 mt-1">{condition.windSpeed} knots</div>
                            <div className="text-sm mt-2">{getWindQualityEmoji(condition.windQuality)}</div>
                          </div>
                        ))}
                    </div>
                  </motion.div>

                  {/* Community Reviews & Ratings Section */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.5 }}
                    className="mt-10 mb-10 bg-gradient-to-br from-theme-background to-theme-surface/20 rounded-2xl p-6 shadow-lg border-[1px] border-gradient-to-r from-theme-border/20 to-theme-border/10 shadow-sm"
                  >
                    <h3 className="mb-6 flex items-center">
                      <svg className="w-6 h-6 mr-3 text-theme-primary/90" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z" />
                      </svg>
                      Ride Reports
                    </h3>

                    <ReviewsAndRatings spotId={spotDetails.spot.id} />
                  </motion.div>

                  {/* Action buttons */}
                  <div className="flex flex-col sm:flex-row justify-center items-center gap-4 mt-12">
                    <Button
                      variant="default"
                      size="default"
                      className="px-8 py-3 text-base font-semibold rounded-xl border-2 border-theme-primary/30 hover:border-theme-primary hover:bg-theme-primary/5 transition-all duration-300 transform hover:scale-105"
                      onClick={handleClose}
                    >
                      <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                      </svg>
                      Back to Map
                    </Button>

                    {/* <Button 
                      className="w-full sm:w-auto px-5 py-3 hover:bg-theme-accent-warning/90 bg-coral hover:bg-coral/70 transition-colors duration-300 shadow-sm"
                    >
                      Add to Favorites 
                      <Heart className="ml-2 h-5 w-5 animate-pulse" />
                    </Button> */}
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
