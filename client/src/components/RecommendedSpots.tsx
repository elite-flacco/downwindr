import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Wind, Thermometer, Calendar, Waves, Navigation, Award, DollarSign } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { Spot, WindQuality } from "@shared/schema";

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
      <Card className="w-full shadow-lg border-sky-100 p-0">
        <CardHeader className="bg-gradient-to-r from-teal-600 to-sky-600 text-white rounded-t-lg">
          <CardTitle className="text-xl text-center flex items-center justify-center">
            <Navigation className="mr-2 h-5 w-5" /> Finding your perfect spots...
          </CardTitle>
        </CardHeader>
        <CardContent className="p-4">
          <div className="space-y-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex flex-col md:flex-row gap-4 p-4 border-b border-sky-100">
                <Skeleton className="h-40 w-full md:w-48 rounded-md" />
                <div className="flex-1 space-y-3">
                  <Skeleton className="h-7 w-3/4" />
                  <div className="flex flex-wrap gap-2">
                    <Skeleton className="h-6 w-20" />
                    <Skeleton className="h-6 w-24" />
                    <Skeleton className="h-6 w-28" />
                  </div>
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-3/4" />
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
      <Card className="w-full shadow-lg border-sky-100 p-0">
        <CardHeader className="bg-gradient-to-r from-teal-600 to-sky-600 text-white rounded-t-lg">
          <CardTitle className="text-xl text-center">No Matching Spots Found</CardTitle>
        </CardHeader>
        <CardContent className="p-6 text-center">
          <p className="mb-4">We couldn't find any spots matching your preferences. Try adjusting your criteria.</p>
          <Button onClick={onClose}>Back to Map</Button>
        </CardContent>
      </Card>
    );
  }

  // Helper to get wind quality badge color
  const getWindBadgeClass = (quality: WindQuality) => {
    switch (quality) {
      case WindQuality.Excellent:
        return "bg-emerald-600 text-white";
      case WindQuality.Good:
        return "bg-teal-600 text-white";
      case WindQuality.Moderate:
        return "bg-amber-600 text-white";
      case WindQuality.Poor:
        return "bg-rose-600 text-white";
      default:
        return "bg-slate-500 text-white";
    }
  };

  // Calculate match percentage display (80-100%)
  const getMatchPercent = (score: number) => {
    // Score will be between 0-1, convert to 80-100% range for better UX
    // This makes all recommendations seem good but with meaningful differences
    return Math.round(80 + score * 20);
  };

  // Progress bar color based on match score
  const getMatchColor = (score: number) => {
    const percent = getMatchPercent(score);
    if (percent >= 95) return "bg-emerald-600";
    if (percent >= 90) return "bg-teal-600";
    if (percent >= 85) return "bg-sky-600";
    return "bg-slate-600";
  };

  return (
    <Card className="w-full shadow-lg border-sky-100 p-0">
      <CardHeader className="bg-gradient-to-r from-teal-600 to-sky-600 text-white rounded-t-lg">
        <CardTitle className="text-xl text-center flex items-center justify-center">
          <Navigation className="mr-2 h-5 w-5" /> Recommended Spots For You
        </CardTitle>
      </CardHeader>
      <CardContent className="p-4">
        <div className="divide-y divide-sky-100">
          {spots.map((spot, index) => (
            <div 
              key={spot.id} 
              className={`py-4 ${index === spots.length - 1 ? 'pb-0' : ''}`}
            >
              <div className="flex flex-col md:flex-row gap-4">
                {/* Spot Image/Preview Section */}
                <div className="relative rounded-lg overflow-hidden h-40 md:w-48 bg-gradient-to-br from-sky-500 to-teal-500 flex items-center justify-center text-white font-bold">
                  {/* Match Percentage Circle */}
                  <div className="absolute top-2 right-2 bg-black bg-opacity-60 rounded-full h-14 w-14 flex items-center justify-center">
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
                <div className="flex-1">
                  <div className="flex justify-between items-start">
                    <h3 className="text-xl font-bold text-slate-800 mb-2">{spot.name}</h3>
                    <Badge variant="outline" className="text-xs bg-sky-50">
                      {spot.country}
                    </Badge>
                  </div>
                  
                  {/* Spot Features */}
                  <div className="flex flex-wrap gap-2 mb-3">
                    {spot.windCondition && (
                      <Badge className={getWindBadgeClass(spot.windCondition.windQuality)}>
                        <Wind className="mr-1 h-3 w-3" /> 
                        {spot.windCondition.windSpeed} knots
                      </Badge>
                    )}
                    
                    {spot.difficultyLevel && (
                      <Badge className="bg-indigo-600 text-white">
                        <Award className="mr-1 h-3 w-3" /> 
                        {spot.difficultyLevel}
                      </Badge>
                    )}
                    
                    {spot.waveSize && (
                      <Badge className="bg-sky-700 text-white">
                        <Waves className="mr-1 h-3 w-3" /> 
                        {spot.waveSize}
                      </Badge>
                    )}
                    
                    {spot.tempRange && (
                      <Badge className="bg-amber-600 text-white">
                        <Thermometer className="mr-1 h-3 w-3" />
                        {spot.tempRange}
                      </Badge>
                    )}
                    
                    {spot.bestMonths && (
                      <Badge className="bg-teal-700 text-white">
                        <Calendar className="mr-1 h-3 w-3" />
                        Best: {spot.bestMonths}
                      </Badge>
                    )}
                    
                    {spot.averageSchoolCost && (
                      <Badge variant="outline" className="border-slate-300">
                        <DollarSign className="mr-1 h-3 w-3" />
                        ${spot.averageSchoolCost}/day
                      </Badge>
                    )}
                  </div>
                  
                  {/* Match Score Bar */}
                  <div className="w-full h-2 bg-slate-100 rounded-full mb-2">
                    <div 
                      className={`h-full rounded-full ${getMatchColor(spot.matchScore)}`}
                      style={{ width: `${getMatchPercent(spot.matchScore)}%` }}
                    ></div>
                  </div>
                  
                  {/* Match Reasons */}
                  <div className="mb-3">
                    <button 
                      onClick={() => setSelectedMatchIndex(selectedMatchIndex === index ? null : index)}
                      className="text-sm text-teal-700 hover:text-teal-900 font-medium flex items-center"
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
                      <div className="mt-2 pl-3 border-l-2 border-teal-200 text-sm text-slate-700 space-y-1">
                        {spot.reasons.map((reason, idx) => (
                          <div key={idx} className="flex items-start">
                            <span className="text-teal-600 mr-2">✓</span>
                            <span>{reason}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                  
                  {/* Action Button */}
                  <div className="flex justify-end">
                    <Button 
                      onClick={() => onSpotSelect(spot.id)}
                      className="bg-teal-600 hover:bg-teal-700 text-white"
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