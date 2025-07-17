import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Wind, Thermometer, Calendar, Waves, Navigation, Award, DollarSign } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { Spot, WindQuality } from "@shared/schema";
import { getCountryFlag } from "@/lib/countryUtils";

interface SpotWithMatchScore extends Spot {
  matchScore: number;
  reasons: string[];
  windCondition?: any;
}

interface RecommendedSpotsProps {
  spots: SpotWithMatchScore[];
  isLoading: boolean;
  onSpotSelect: (spotId: number) => void;
  onClose: () => void;
}

export default function RecommendedSpots({ spots, isLoading, onSpotSelect, onClose }: RecommendedSpotsProps) {
  const [selectedMatchIndex, setSelectedMatchIndex] = useState<number | null>(null);
  
  if (isLoading) {
    return (
      <Card className="w-full shadow-lg border-slate-200 p-0">
        <CardHeader className="bg-gradient-to-r from-theme-primary to-theme-primary-hover text-white rounded-t-lg">
          <CardTitle className="text-xl text-center flex items-center justify-center text-white">
            <Navigation className="mr-2 h-5 w-5 text-white" /> Finding your perfect spots...
          </CardTitle>
        </CardHeader>
        <CardContent className="p-4">
          <div className="space-y-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex flex-col md:flex-row gap-4 p-4 border-b border-slate-100">
                <Skeleton className="h-40 w-full md:w-48 rounded-md bg-slate-200" />
                <div className="flex-1 space-y-3">
                  <Skeleton className="h-7 w-3/4 bg-slate-200" />
                  <div className="flex flex-wrap gap-2">
                    <Skeleton className="h-6 w-20 bg-slate-200" />
                    <Skeleton className="h-6 w-24 bg-slate-200" />
                    <Skeleton className="h-6 w-28 bg-slate-200" />
                  </div>
                  <Skeleton className="h-4 w-full bg-slate-200" />
                  <Skeleton className="h-4 w-full bg-slate-200" />
                  <Skeleton className="h-4 w-3/4 bg-slate-200" />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }
  
  if (!spots || spots.length === 0) {
    return (
      <Card className="w-full shadow-lg border-slate-200 p-0">
        <CardHeader className="bg-gradient-to-r from-theme-primary to-theme-primary-hover text-white rounded-t-lg">
          <CardTitle className="text-xl text-center">No Matching Spots Found</CardTitle>
        </CardHeader>
        <CardContent className="p-6 text-center">
          <p className="mb-4">We couldn't find any spots matching your preferences. Try adjusting your criteria.</p>
          <Button onClick={onClose} variant="outline">Go Back</Button>
        </CardContent>
      </Card>
    );
  }

  // Helper to get wind quality badge color
  const getWindBadgeClass = (quality: WindQuality) => {
    switch (quality) {
      case WindQuality.Excellent:
        return "bg-theme-wind-excellent text-white";
      case WindQuality.Good:
        return "bg-theme-wind-good text-white";
      case WindQuality.Moderate:
        return "bg-theme-wind-moderate text-white";
      case WindQuality.Poor:
        return "bg-theme-wind-poor text-theme-text";
      default:
        return "bg-slate-500 text-white";
    }
  };

  // Direct pass-through of the raw score as the percentage
  const getMatchPercent = (score: number) => {
    // No adjustments at all - show the exact score as provided by the server
    return score;
  };

  // Progress bar color based on match score
  const getMatchColor = (score: number) => {
    const percent = getMatchPercent(score);
    if (percent >= 90) return "bg-green-600"; // Excellent match
    if (percent >= 80) return "bg-green-500"; // Great match
    if (percent >= 70) return "bg-slate-600"; // Good match
    if (percent >= 60) return "bg-slate-500"; // Decent match
    return "bg-slate-400"; // Minimal match
  };

  return (
    <Card className="w-full shadow-lg border-slate-200 p-0 max-w-full">
      <CardHeader className="bg-gradient-to-r from-theme-primary to-theme-primary-hover text-white rounded-t-lg">
        <CardTitle className="text-xl text-center flex items-center justify-center text-white">
          <Navigation className="mr-2 h-5 w-5" /> Recommended Spots For You
        </CardTitle>
      </CardHeader>
      <CardContent className="px-6 py-4">
        <div className="space-y-4">
          {spots.map((spot, index) => (
            <Card 
              key={spot.id} 
              className="border-slate-200 hover:border-slate-300 transition-all duration-200 shadow-md hover:shadow-lg"
            >
              <CardContent className="p-4">
                <div className="flex flex-col gap-4 w-full">
                  {/* Header: Title, Country, Match Badge */}
                  <div className="flex flex-wrap justify-between items-start gap-2">
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-wrap items-center gap-2 mb-1">
                        <h3 className="text-xl font-bold text-slate-800 break-words">{spot.name}</h3>
                        <Badge variant="outline" className="text-xs bg-slate-50 border-slate-200 text-slate-600 flex-shrink-0">
                          {spot.country} {
                            (() => {
                              const flag = getCountryFlag(spot.country);
                              return flag ? (
                                <img 
                                  src={flag.url} 
                                  alt={`${spot.country} flag`}
                                  title={spot.country}
                                  className="h-3.5 inline-block ml-1"
                                />
                              ) : null
                            })()
                          }
                        </Badge>
                      </div>
                    </div>
                    <Badge className="bg-slate-700 text-white font-bold flex-shrink-0">
                      {getMatchPercent(spot.matchScore)}% match
                    </Badge>
                  </div>
                
                  {/* Spot Features */}
                  <div className="flex flex-wrap gap-2 mb-3">
                    {spot.windCondition && (
                      <Badge className={`${getWindBadgeClass(spot.windCondition.windQuality)} flex-shrink-0`}>
                        <Wind className="mr-1 h-3 w-3" /> 
                        {spot.windCondition.windSpeed} knots
                      </Badge>
                    )}
                    
                    {spot.difficultyLevel && (
                      <Badge variant="outline" className="border-slate-300 bg-white text-slate-700 flex-shrink-0">
                        <Award className="mr-1 h-3 w-3" /> 
                        {spot.difficultyLevel}
                      </Badge>
                    )}
                    
                    {spot.waveSize && (
                      <Badge variant="outline" className="border-slate-300 bg-white text-slate-700 flex-shrink-0">
                        <Waves className="mr-1 h-3 w-3" /> 
                        {spot.waveSize}
                      </Badge>
                    )}
                    
                    {spot.tempRange && (
                      <Badge variant="outline" className="border-slate-300 bg-white flex-shrink-0">
                        <Thermometer className="mr-1 h-3 w-3 text-slate-600" />
                        {spot.tempRange}
                      </Badge>
                    )}
                    
                    {spot.bestMonths && (
                      <Badge variant="outline" className="border-slate-300 bg-slate-50 text-slate-700 flex-shrink-0">
                        <Calendar className="mr-1 h-3 w-3" />
                        Best: {spot.bestMonths}
                      </Badge>
                    )}
                    
                    {spot.averageSchoolCost && (
                      <Badge variant="outline" className="border-slate-200 bg-slate-50 text-slate-700 flex-shrink-0">
                        <DollarSign className="mr-1 h-3 w-3" />
                        ${spot.averageSchoolCost}/day
                      </Badge>
                    )}
                  </div>
                  
                  {/* Bottom Section: Match Reasons & Action Button */}
                  <div className="flex flex-col sm:flex-row justify-between items-start gap-3">
                    {/* Match Reasons */}
                    <div className="flex-1">
                      <button 
                        onClick={() => setSelectedMatchIndex(selectedMatchIndex === index ? null : index)}
                        className="text-sm text-slate-600 hover:text-slate-800 font-medium flex items-center"
                      >
                        {selectedMatchIndex === index ? 'Hide details' : 'Why this is a good choice'} 
                        <svg 
                          width="20" 
                          height="20" 
                          viewBox="0 0 24 24" 
                          fill="none" 
                          stroke="currentColor" 
                          strokeWidth="2" 
                          strokeLinecap="round" 
                          strokeLinejoin="round"
                          className={`ml-1 transform transition-transform ${selectedMatchIndex === index ? 'rotate-180' : ''}`}
                        >
                          <polyline points="6 9 12 15 18 9"></polyline>
                        </svg>
                      </button>
                      
                      {selectedMatchIndex === index && (
                        <div className="mt-2 pl-3 border-l-2 border-slate-200 text-sm text-slate-700 space-y-1">
                          {spot.reasons.map((reason, idx) => (
                            <div key={idx} className="flex items-start">
                              <span className="text-green-600 mr-2 flex-shrink-0">✓</span>
                              <span className="break-words break-all whitespace-normal overflow-wrap-anywhere">{reason}</span>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                    
                    {/* Action Button */}
                    <div className="flex-shrink-0">
                      <Button 
                        onClick={() => onSpotSelect(spot.id)}
                        className="bg-theme-primary hover:bg-theme-primary-hover text-white"
                        size="sm"
                      >
                        View Details
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        
        {/* Back Button */}
        <div className="mt-6 text-center">
          <Button 
            variant="outline"
            onClick={onClose}
          >
            Go Back
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}