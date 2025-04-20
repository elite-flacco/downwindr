import React from 'react';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { WindQuality } from '@shared/schema';
import { ArrowUpCircle, ArrowDownCircle, CircleDashed, Thermometer, CircleOff, DollarSign, Shirt } from 'lucide-react';

interface SpotComparisonProps {
  spots: any[];
  selectedMonth: number;
  onClose?: () => void;
}

export default function SpotComparison({ spots, selectedMonth, onClose }: SpotComparisonProps) {
  if (!spots || spots.length === 0) {
    return <div className="p-4 text-center">No spots selected for comparison</div>;
  }

  const windQualityColor = (quality: WindQuality) => {
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

  const DifficultyBadge = ({ level }: { level: string | null }) => {
    if (!level) return <Badge variant="outline">Unknown</Badge>;
    
    if (level.includes("Beginner")) {
      return <Badge className="bg-slate-500 text-white">Beginner Friendly</Badge>;
    } else if (level.includes("Intermediate")) {
      return <Badge className="bg-slate-600 text-white">Intermediate</Badge>;
    } else if (level.includes("Advanced")) {
      return <Badge className="bg-slate-700 text-white">Advanced</Badge>;
    } else if (level.includes("All")) {
      return <Badge className="bg-blue-600 text-white">All Levels</Badge>;
    }
    
    return <Badge variant="outline">{level}</Badge>;
  };
  
  // Get wetsuit recommendation based on water temperature
  const getWetsuitRecommendation = (waterTemp: number | null | undefined) => {
    if (!waterTemp) return { needed: false, recommendation: "N/A" };
    
    if (waterTemp >= 25) {
      return { 
        needed: false, 
        recommendation: "No wetsuit needed 👙"
      };
    } else if (waterTemp >= 22) {
      return { 
        needed: true, 
        recommendation: "Rashguard or 1mm top ☀️",
        color: "bg-blue-100 text-blue-700" 
      };
    } else if (waterTemp >= 19) {
      return { 
        needed: true, 
        recommendation: "2mm shorty or top 🌤️",
        color: "bg-blue-200 text-blue-800" 
      };
    } else if (waterTemp >= 17) {
      return { 
        needed: true, 
        recommendation: "3/2mm full suit 🌥️",
        color: "bg-blue-300 text-blue-900"
      };
    } else if (waterTemp >= 14) {
      return { 
        needed: true, 
        recommendation: "4/3mm full suit 🌦️",
        color: "bg-blue-400 text-white"
      };
    } else if (waterTemp >= 10) {
      return { 
        needed: true, 
        recommendation: "5/4mm + boots & gloves ❄️",
        color: "bg-blue-600 text-white"
      };
    } else {
      return { 
        needed: true, 
        recommendation: "6/5mm + hood, boots & gloves ⛄",
        color: "bg-blue-800 text-white"
      };
    }
  };

  // Get wind conditions for each spot in the selected month and enrich with derived data
  const getSpotWithConditions = (spot: any) => {
    const windCondition = spot.windConditions?.find((cond: any) => cond.month === selectedMonth);
    
    // Calculate/derive missing values
    const numberOfSchools = spot.kiteSchools?.length || null;
    
    // Default values for accommodation cost based on country/region (if missing)
    let averageAccommodationCost = spot.averageAccommodationCost;
    if (averageAccommodationCost === null) {
      if (spot.country === "Spain") averageAccommodationCost = 75;
      else if (spot.country === "Dominican Republic") averageAccommodationCost = 80;
      else if (spot.country === "Egypt") averageAccommodationCost = 60;
      else if (spot.country === "Brazil") averageAccommodationCost = 65;
      else if (spot.country.includes("United States")) averageAccommodationCost = 120;
      else averageAccommodationCost = 85; // default
    }
    
    // Default values for school cost based on country/region (if missing)
    let averageSchoolCost = spot.averageSchoolCost;
    if (averageSchoolCost === null) {
      if (spot.country === "Spain") averageSchoolCost = 80;
      else if (spot.country === "Dominican Republic") averageSchoolCost = 90;
      else if (spot.country === "Egypt") averageSchoolCost = 70;
      else if (spot.country === "Brazil") averageSchoolCost = 75;
      else if (spot.country.includes("United States")) averageSchoolCost = 110;
      else averageSchoolCost = 85; // default
    }
    
    // If conditions array is null, create from tags
    let conditions = spot.conditions;
    if (conditions === null && spot.tags) {
      conditions = [
        spot.waveSize ? `${spot.waveSize} Waves` : "Flat Water",
        windCondition?.windQuality === "Excellent" ? "Reliable Wind" : "Variable Wind",
        spot.difficultyLevel ? `${spot.difficultyLevel} Level` : "All Levels"
      ];
    }
    
    // Default accommodation options based on tags (if missing)
    let accommodationOptions = spot.accommodationOptions;
    if (accommodationOptions === null && spot.tags) {
      accommodationOptions = spot.tags
        .filter((tag: string) => 
          tag.toLowerCase().includes('accommodation') || 
          tag.toLowerCase().includes('hotel') || 
          tag.toLowerCase().includes('resort')
        );
      
      // Add some defaults if still empty
      if (accommodationOptions.length === 0) {
        accommodationOptions = ["Hotels", "Apartments", "Hostels"];
      }
    }
    
    // Default food options (if missing)
    let foodOptions = spot.foodOptions;
    if (foodOptions === null) {
      foodOptions = ["Local Restaurants", "Beach Bars", "Cafes"];
    }
    
    // Default culture if missing
    let culture = spot.culture;
    if (culture === null) {
      if (spot.country === "Spain") culture = "Spanish coastal culture with flamenco influences";
      else if (spot.country === "Dominican Republic") culture = "Caribbean island vibe with Latin influences";
      else if (spot.country === "Egypt") culture = "Egyptian culture with Red Sea coastal lifestyle";
      else if (spot.country === "Brazil") culture = "Brazilian beach culture with samba and local festivals";
      else if (spot.country.includes("United States")) culture = "American beach town atmosphere";
      else culture = "Local coastal culture";
    }
    
    return { 
      ...spot,
      numberOfSchools,
      averageAccommodationCost,
      averageSchoolCost,
      conditions,
      accommodationOptions,
      foodOptions,
      culture,
      currentWindCondition: windCondition || null
    };
  };

  const spotsWithConditions = spots.map(getSpotWithConditions);

  // Sort spots by wind quality
  const sortedSpots = [...spotsWithConditions].sort((a, b) => {
    const qualityOrder = { 
      [WindQuality.Excellent]: 4, 
      [WindQuality.Good]: 3, 
      [WindQuality.Moderate]: 2, 
      [WindQuality.Poor]: 1 
    };
    
    const aQuality = a.currentWindCondition?.windQuality 
      ? qualityOrder[a.currentWindCondition.windQuality as WindQuality] || 0 
      : 0;
      
    const bQuality = b.currentWindCondition?.windQuality 
      ? qualityOrder[b.currentWindCondition.windQuality as WindQuality] || 0 
      : 0;
    
    return bQuality - aQuality;
  });

  const monthNames = [
    "January", "February", "March", "April", 
    "May", "June", "July", "August", 
    "September", "October", "November", "December"
  ];

  return (
    <Card className="w-full max-w-6xl mx-auto bg-white/95 shadow-lg backdrop-blur border rounded-lg">
      <CardHeader>
        <CardTitle className="text-center text-xl md:text-2xl text-blue-700">
          Spot Comparison for {monthNames[selectedMonth - 1]}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[180px]">Metric</TableHead>
                {sortedSpots.map((spot) => (
                  <TableHead key={spot.id} className="min-w-[200px] text-center">
                    {spot.name}
                  </TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              {/* Wind conditions */}
              <TableRow className="bg-slate-50">
                <TableCell className="font-medium">Wind Quality</TableCell>
                {sortedSpots.map((spot) => (
                  <TableCell key={`wind-${spot.id}`} className="text-center">
                    {spot.currentWindCondition ? (
                      <Badge className={windQualityColor(spot.currentWindCondition.windQuality as WindQuality)}>
                        {spot.currentWindCondition.windQuality} {getWindQualityEmoji(spot.currentWindCondition.windQuality as WindQuality)}
                      </Badge>
                    ) : (
                      <CircleOff className="mx-auto h-5 w-5 text-gray-400" />
                    )}
                  </TableCell>
                ))}
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Wind Speed</TableCell>
                {sortedSpots.map((spot) => (
                  <TableCell key={`speed-${spot.id}`} className="text-center">
                    {spot.currentWindCondition?.windSpeed ? 
                      `${spot.currentWindCondition.windSpeed} knots` : 
                      "N/A"}
                  </TableCell>
                ))}
              </TableRow>

              {/* Temperatures */}
              <TableRow className="bg-slate-50">
                <TableCell className="font-medium">
                  <div className="flex items-center">
                    <Thermometer className="mr-2 h-4 w-4" /> Air Temp
                  </div>
                </TableCell>
                {sortedSpots.map((spot) => (
                  <TableCell key={`air-${spot.id}`} className="text-center">
                    {spot.currentWindCondition?.airTemp ? 
                      `${spot.currentWindCondition.airTemp}°C 🌡️` : 
                      "N/A"}
                  </TableCell>
                ))}
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">
                  <div className="flex items-center">
                    <Thermometer className="mr-2 h-4 w-4" /> Water Temp
                  </div>
                </TableCell>
                {sortedSpots.map((spot) => (
                  <TableCell key={`water-${spot.id}`} className="text-center">
                    {spot.currentWindCondition?.waterTemp ? 
                      `${spot.currentWindCondition.waterTemp}°C 🌊` : 
                      "N/A"}
                  </TableCell>
                ))}
              </TableRow>
              
              {/* Wetsuit Recommendation */}
              <TableRow className="bg-slate-50">
                <TableCell className="font-medium">
                  <div className="flex items-center">
                    <Shirt className="mr-2 h-4 w-4" /> Wetsuit Recommendation
                  </div>
                </TableCell>
                {sortedSpots.map((spot) => {
                  const wetsuitRec = getWetsuitRecommendation(spot.currentWindCondition?.waterTemp);
                  return (
                    <TableCell key={`wetsuit-${spot.id}`} className="text-center">
                      {wetsuitRec.recommendation !== "N/A" ? (
                        <span className={`px-2 py-1 rounded-md inline-block text-sm ${wetsuitRec.color || ""}`}>
                          {wetsuitRec.recommendation}
                        </span>
                      ) : (
                        "N/A"
                      )}
                    </TableCell>
                  );
                })}
              </TableRow>

              {/* Schools */}
              <TableRow>
                <TableCell className="font-medium">Number of Schools</TableCell>
                {sortedSpots.map((spot) => (
                  <TableCell key={`schools-${spot.id}`} className="text-center">
                    {spot.numberOfSchools ? `${spot.numberOfSchools} 🏫` : "N/A"}
                  </TableCell>
                ))}
              </TableRow>

              {/* Difficulty */}
              <TableRow>
                <TableCell className="font-medium">Difficulty Level</TableCell>
                {sortedSpots.map((spot) => (
                  <TableCell key={`diff-${spot.id}`} className="text-center">
                    <DifficultyBadge level={spot.difficultyLevel} />
                  </TableCell>
                ))}
              </TableRow>

              {/* Conditions */}
              <TableRow className="bg-slate-50">
                <TableCell className="font-medium">Conditions</TableCell>
                {sortedSpots.map((spot) => (
                  <TableCell key={`cond-${spot.id}`} className="text-center">
                    {spot.conditions ? (
                      <div className="flex flex-wrap gap-1 justify-center">
                        {spot.conditions.slice(0, 3).map((condition: string, i: number) => (
                          <span key={i} className="text-xs px-2 py-1 bg-slate-100 rounded-full text-slate-700">
                            {condition}
                          </span>
                        ))}
                        {spot.conditions.length > 3 && (
                          <span className="text-xs px-2 py-1 bg-slate-100 rounded-full text-slate-700">
                            +{spot.conditions.length - 3} more
                          </span>
                        )}
                      </div>
                    ) : (
                      "N/A"
                    )}
                  </TableCell>
                ))}
              </TableRow>

              {/* Accommodation */}
              <TableRow>
                <TableCell className="font-medium">Accommodation</TableCell>
                {sortedSpots.map((spot) => (
                  <TableCell key={`accom-${spot.id}`} className="text-center">
                    {spot.accommodationOptions ? (
                      <div className="flex flex-wrap gap-1 justify-center">
                        {spot.accommodationOptions.slice(0, 2).map((option: string, i: number) => (
                          <span key={i} className="text-xs px-2 py-1 bg-slate-100 rounded-full text-slate-700">
                            {option}
                          </span>
                        ))}
                        {spot.accommodationOptions.length > 2 && (
                          <span className="text-xs px-2 py-1 bg-slate-100 rounded-full text-slate-700">
                            +{spot.accommodationOptions.length - 2} more
                          </span>
                        )}
                      </div>
                    ) : (
                      "N/A"
                    )}
                  </TableCell>
                ))}
              </TableRow>

              {/* Food */}
              <TableRow className="bg-slate-50">
                <TableCell className="font-medium">Food Options</TableCell>
                {sortedSpots.map((spot) => (
                  <TableCell key={`food-${spot.id}`} className="text-center">
                    {spot.foodOptions ? (
                      <div className="flex flex-wrap gap-1 justify-center">
                        {spot.foodOptions.slice(0, 2).map((option: string, i: number) => (
                          <span key={i} className="text-xs px-2 py-1 bg-slate-100 rounded-full text-slate-700">
                            {option}
                          </span>
                        ))}
                        {spot.foodOptions.length > 2 && (
                          <span className="text-xs px-2 py-1 bg-slate-100 rounded-full text-slate-700">
                            +{spot.foodOptions.length - 2} more
                          </span>
                        )}
                      </div>
                    ) : (
                      "N/A"
                    )}
                  </TableCell>
                ))}
              </TableRow>

              {/* Culture */}
              <TableRow>
                <TableCell className="font-medium">Culture</TableCell>
                {sortedSpots.map((spot) => (
                  <TableCell key={`cult-${spot.id}`} className="text-center">
                    {spot.culture || "N/A"}
                  </TableCell>
                ))}
              </TableRow>

              {/* Costs */}
              <TableRow className="bg-slate-50">
                <TableCell className="font-medium">
                  <div className="flex items-center">
                    <DollarSign className="mr-2 h-4 w-4" /> School Cost (avg)
                  </div>
                </TableCell>
                {sortedSpots.map((spot) => (
                  <TableCell key={`schoolCost-${spot.id}`} className="text-center">
                    {spot.averageSchoolCost ? 
                      `$${spot.averageSchoolCost}/day 💰` : 
                      "N/A"}
                  </TableCell>
                ))}
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">
                  <div className="flex items-center">
                    <DollarSign className="mr-2 h-4 w-4" /> Accommodation Cost (avg)
                  </div>
                </TableCell>
                {sortedSpots.map((spot) => (
                  <TableCell key={`accomCost-${spot.id}`} className="text-center">
                    {spot.averageAccommodationCost ? 
                      `$${spot.averageAccommodationCost}/night 🏨` : 
                      "N/A"}
                  </TableCell>
                ))}
              </TableRow>

              {/* Notes */}
              <TableRow className="bg-slate-50">
                <TableCell className="font-medium">Seasonal Notes</TableCell>
                {sortedSpots.map((spot) => (
                  <TableCell key={`notes-${spot.id}`} className="text-center">
                    {spot.currentWindCondition?.seasonalNotes || "No special notes"}
                  </TableCell>
                ))}
              </TableRow>
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}