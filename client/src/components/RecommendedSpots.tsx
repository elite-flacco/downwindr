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
        <CardHeader className="bg-gradient-to-r from-blue-700 to-blue-600 text-white rounded-t-lg">
          <CardTitle className="text-xl text-center flex items-center justify-center">
            <Navigation className="mr-2 h-5 w-5" /> Finding your perfect spots...
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
        <CardHeader className="bg-gradient-to-r from-blue-700 to-blue-600 text-white rounded-t-lg">
          <CardTitle className="text-xl text-center">No Matching Spots Found</CardTitle>
        </CardHeader>
        <CardContent className="p-6 text-center">
          <p className="mb-4">We couldn't find any spots matching your preferences. Try adjusting your criteria.</p>
          <Button onClick={onClose} variant="outline">Back to Map</Button>
        </CardContent>
      </Card>
    );
  }

  // Helper to get wind quality badge color
  const getWindBadgeClass = (quality: WindQuality) => {
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

  // Calculate match percentage display (more realistic range)
  const getMatchPercent = (score: number) => {
    // Maximum theoretical score from server-side algorithm:
    // Wind speed: 20 (optimal), Wind quality: 15 (excellent), Temperature: 15 (perfect match)
    // Difficulty: 10, Budget: 10 (exact match), Region: 10, Kite Schools: 7
    // Waves: 7, Food: 5, Culture: 5
    // Total max possible: 94
    
    // However, in practice it's nearly impossible to hit 94 points.
    // We want the top matches to show as 90-98% and worst matches to show 60-75%
    // So we'll use a more balanced approach:
    
    // Determine what 100% would be (about 85% of max theoretical score)
    const realisticMaxScore = 80;
    
    // Calculate base percentage
    let percentage = Math.round((score / realisticMaxScore) * 100);
    
    // Clamp percentage to realistic ranges
    if (percentage > 98) percentage = 98; // Absolute max cap
    if (percentage < 60 && percentage > 40) percentage = 60; // Min for recommended spots
    
    return percentage;
  };

  // Progress bar color based on match score
  const getMatchColor = (score: number) => {
    const percent = getMatchPercent(score);
    if (percent >= 95) return "bg-blue-700"; // Excellent match
    if (percent >= 90) return "bg-blue-600"; // Great match
    if (percent >= 85) return "bg-blue-500"; // Very good match
    if (percent >= 80) return "bg-blue-400"; // Good match
    if (percent >= 75) return "bg-emerald-500"; // Decent match
    if (percent >= 70) return "bg-green-500"; // Okay match
    if (percent >= 65) return "bg-amber-500"; // Fair match
    return "bg-slate-500"; // Minimal match
  };

  return (
    <Card className="w-full shadow-lg border-slate-200 p-0 max-w-full">
      <CardHeader className="bg-gradient-to-r from-blue-700 to-blue-600 text-white rounded-t-lg">
        <CardTitle className="text-xl text-center flex items-center justify-center">
          <Navigation className="mr-2 h-5 w-5" /> Recommended Spots For You
        </CardTitle>
      </CardHeader>
      <CardContent className="p-4">
        <div className="divide-y divide-slate-100">
          {spots.map((spot, index) => (
            <div 
              key={spot.id} 
              className={`py-4 ${index === spots.length - 1 ? 'pb-0' : ''}`}
            >
              <div className="flex flex-col md:flex-row gap-4 w-full">
                {/* Spot Image/Preview Section */}
                <div className="relative rounded-lg overflow-hidden h-40 md:w-48 flex-shrink-0 bg-gradient-to-br from-blue-600 to-blue-800 flex items-center justify-center text-white font-bold">
                  {/* Match Percentage Circle */}
                  <div className="absolute top-2 right-2 bg-blue-900 bg-opacity-80 rounded-full h-14 w-14 flex items-center justify-center">
                    <div className="text-center">
                      <div className="text-xl font-bold">{getMatchPercent(spot.matchScore)}%</div>
                      <div className="text-xs -mt-1">match</div>
                    </div>
                  </div>
                  
                  {/* Spot Image Placeholder */}
                  <div className="text-center px-2">
                    <div>{spot.name.split(',')[0]}</div>
                  </div>
                </div>
                
                {/* Spot Details Section */}
                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap justify-between items-start gap-2">
                    <h3 className="text-xl font-bold text-slate-800 mb-2 break-words">{spot.name}</h3>
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
                  
                  {/* Spot Features */}
                  <div className="flex flex-wrap gap-2 mb-3">
                    {spot.windCondition && (
                      <Badge className={`${getWindBadgeClass(spot.windCondition.windQuality)} flex-shrink-0`}>
                        <Wind className="mr-1 h-3 w-3" /> 
                        {spot.windCondition.windSpeed} knots
                      </Badge>
                    )}
                    
                    {spot.difficultyLevel && (
                      <Badge className="bg-slate-600 text-white flex-shrink-0">
                        <Award className="mr-1 h-3 w-3" /> 
                        {spot.difficultyLevel}
                      </Badge>
                    )}
                    
                    {spot.waveSize && (
                      <Badge className="bg-slate-500 text-white flex-shrink-0">
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
                      <Badge variant="outline" className="border-blue-200 bg-blue-50 text-blue-700 flex-shrink-0">
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
                  
                  {/* Match Score Bar */}
                  <div className="w-full h-2 bg-slate-100 rounded-full mb-2">
                    <div 
                      className={`rounded-full ${getMatchColor(spot.matchScore)}`}
                      style={{ width: `${getMatchPercent(spot.matchScore)}%` }}
                    ></div>
                  </div>
                  
                  {/* Match Reasons */}
                  <div className="mb-3">
                    <button 
                      onClick={() => setSelectedMatchIndex(selectedMatchIndex === index ? null : index)}
                      className="text-sm text-blue-700 hover:text-blue-900 font-medium flex items-center"
                    >
                      {selectedMatchIndex === index ? 'Hide match details' : 'Why this matches you'} 
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
                      <div className="mt-2 pl-3 border-l-2 border-blue-200 text-sm text-slate-700 space-y-1">
                        {spot.reasons.map((reason, idx) => (
                          <div key={idx} className="flex items-start">
                            <span className="text-blue-700 mr-2 flex-shrink-0">✓</span>
                            <span className="break-words break-all whitespace-normal overflow-wrap-anywhere">{reason}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                  
                  {/* Action Button */}
                  <div className="flex justify-end">
                    <Button 
                      onClick={() => onSpotSelect(spot.id)}
                      className="bg-blue-700 hover:bg-blue-800 text-white"
                      size="sm"
                    >
                      View Details
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {/* Back Button */}
        <div className="mt-6 text-center">
          <Button 
            variant="outline"
            onClick={onClose}
          >
            Back to Map
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}