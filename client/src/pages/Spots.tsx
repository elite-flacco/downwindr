import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { motion, AnimatePresence } from "framer-motion";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import MonthSelector from "@/components/MonthSelector";
import FilterControls from "@/components/FilterControls";
import KiteMap from "@/components/KiteMap";
import SpotsList from "@/components/SpotsList";
import SpotDetailModal from "@/components/SpotDetailModal";
import SpotComparison from "@/components/SpotComparison";
import PreferencesModal from "@/components/PreferencesModal";
import RecommendedSpots from "@/components/RecommendedSpots";
import { MonthNames } from "@shared/schema";
import type { Spot, SpotWithWindConditions } from "@shared/schema";
import { Button } from "@/components/ui/button";
import { compareDesc } from "date-fns";
import { BarChart, ChevronDown, List, Map, SplitSquareVertical, Navigation, Sparkles } from "lucide-react";

export default function Spots() {
  // State for selected month (1-12)
  const [selectedMonth, setSelectedMonth] = useState<number>(new Date().getMonth() + 1);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [windQualityFilter, setWindQualityFilter] = useState<string[]>(["Excellent"]);
  const [selectedSpot, setSelectedSpot] = useState<number | null>(null);
  const [showDetailModal, setShowDetailModal] = useState<boolean>(false);
  const [showComparison, setShowComparison] = useState<boolean>(false);
  const [spotsToCompare, setSpotsToCompare] = useState<Spot[]>([]);
  const [viewMode, setViewMode] = useState<"both" | "map" | "list">("map");
  
  // New states for recommendation feature
  const [showPreferencesModal, setShowPreferencesModal] = useState<boolean>(false);
  const [showRecommendations, setShowRecommendations] = useState<boolean>(false);
  const [isRecommending, setIsRecommending] = useState<boolean>(false);
  const [recommendedSpots, setRecommendedSpots] = useState<any[]>([]);

  // Fetch spots for the selected month filtered by wind quality
  const { data: spots, isLoading: spotsLoading, isPending, isFetching } = useQuery<Spot[]>({
    queryKey: [`/api/spots/month/${selectedMonth}`, { windQuality: windQualityFilter }],
    queryFn: async ({ queryKey }) => {
      // Build the URL with wind quality filters
      const baseUrl = `/api/spots/month/${selectedMonth}`;
      const params = new URLSearchParams();
      
      // Add each wind quality as a separate query parameter
      if (windQualityFilter.length > 0) {
        windQualityFilter.forEach(quality => {
          params.append('windQuality', quality);
        });
      }
      
      // Fetch with the constructed URL
      const response = await apiRequest('GET', `${baseUrl}?${params.toString()}`);
      return await response.json();
    },
    staleTime: Infinity, // Keep data fresh forever (small dataset)
    gcTime: Infinity, // Keep in cache forever (v5 renamed cacheTime to gcTime)
    placeholderData: (previousData) => previousData // Use previous data while loading
  });

  // Fetch spot details with wind conditions when a spot is selected
  const { data: spotDetails, isLoading: detailsLoading } = useQuery<{spot: Spot, windConditions: any[]}>({
    queryKey: [`/api/spots/${selectedSpot}`],
    enabled: selectedSpot !== null,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
  
  // Fetch additional data for spots being compared
  const { data: spotsWithConditions, isLoading: comparisonLoading } = useQuery<Spot[]>({
    queryKey: [`/api/spots/details`, spotsToCompare.map(s => s.id)],
    enabled: showComparison && spotsToCompare.length > 0,
    queryFn: async () => {
      const response = await fetch(`/api/spots/details`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ids: spotsToCompare.map(spot => spot.id)
        }),
      });
      
      if (!response.ok) {
        throw new Error('Failed to fetch comparison data');
      }
      
      const results = await response.json();
      return results.map((result: any) => ({
        ...result.spot,
        windConditions: result.windConditions
      }));
    },
    staleTime: 1000 * 60 * 5, // 5 minutes
  });

  // Filtered spots based on search query and wind quality filter
  const filteredSpots = spots ? spots.filter((spot: Spot) => {
    // Filter by search query
    const matchesSearch = searchQuery === "" || 
      spot.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      spot.country.toLowerCase().includes(searchQuery.toLowerCase());
      
    // Filter by wind quality is handled by the backend based on selected month
    
    return matchesSearch;
  }) : [];

  // Handle month selection
  const handleMonthChange = (month: number) => {
    setSelectedMonth(month);
  };

  // Handle search input
  const handleSearchChange = (query: string) => {
    setSearchQuery(query);
  };

  // Handle wind quality filter
  const handleWindQualityFilterChange = (filter: string) => {
    // Toggle wind quality filter
    if (windQualityFilter.includes(filter)) {
      setWindQualityFilter(windQualityFilter.filter(f => f !== filter));
    } else {
      setWindQualityFilter([...windQualityFilter, filter]);
    }
  };

  // Handle spot selection
  const handleSpotSelect = (spotId: number) => {
    setSelectedSpot(spotId);
    setShowDetailModal(true);
  };

  // Close detail modal
  const handleCloseDetailModal = () => {
    setShowDetailModal(false);
  };
  
  // Toggle a spot in the comparison list
  const toggleSpotComparison = (spot: Spot) => {
    if (spotsToCompare.some(s => s.id === spot.id)) {
      setSpotsToCompare(spotsToCompare.filter(s => s.id !== spot.id));
    } else {
      // Limit to max 3 spots for comparison
      if (spotsToCompare.length < 3) {
        setSpotsToCompare([...spotsToCompare, spot]);
      }
    }
  };
  
  // Show comparison view
  const handleShowComparison = () => {
    setShowComparison(true);
  };
  
  // Close comparison view
  const handleCloseComparison = () => {
    setShowComparison(false);
  };
  
  // Clear all spots from comparison
  const clearComparison = () => {
    setSpotsToCompare([]);
    setShowComparison(false);
  };
  
  // Show preferences modal
  const handleShowPreferencesModal = () => {
    setShowPreferencesModal(true);
  };
  
  // Close preferences modal
  const handleClosePreferencesModal = () => {
    setShowPreferencesModal(false);
  };
  
  // Handle saving preferences and getting recommendations
  const handleSavePreferences = async (preferences: any) => {
    setIsRecommending(true);
    setShowRecommendations(true);
    
    try {
      const response = await fetch('/api/spots/recommendations', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(preferences),
      });
      
      if (!response.ok) {
        throw new Error('Failed to get recommendations');
      }
      
      const data = await response.json();
      setRecommendedSpots(data);
    } catch (error) {
      console.error('Error getting recommendations:', error);
    } finally {
      setIsRecommending(false);
    }
  };
  
  // Close recommendations view
  const handleCloseRecommendations = () => {
    setShowRecommendations(false);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="container mx-auto px-4 py-6 flex-grow">
        {/* Page Title with more visual impact */}
        <div className="mb-2 pt-2">
          <h2 className="text-xl text-ocean-dark mb-2">Find your dream spots</h2>
          {/* <div className="flex items-center">
            <div className="h-1 w-12 bg-primary rounded-full mr-3"></div>
            <p className="text-slate-600">Discover the best kitesurfing locations worldwide based on optimal wind conditions</p>
          </div> */}
        </div>
        
        {/* Enhanced filter bar with controls */}
        <div className="bg-white rounded-xl border border-slate-100 shadow-lg p-5 mb-6">
          <div className="flex flex-col md:flex-row justify-between gap-4 mb-4">
            {/* Top row: Month Selector and Recommendation Button */}
            <div className="flex items-center justify-between md:justify-start gap-3 flex-wrap">
              <MonthSelector 
                selectedMonth={selectedMonth} 
                onMonthChange={handleMonthChange} 
              />
              
              <Button 
                onClick={handleShowPreferencesModal}
                variant="default"
                className="bg-primary text-white h-9 px-3 shadow-md text-sm font-medium transition-all duration-300"
                size="sm"
              >
                <Sparkles className="h-4 w-4" />
              </Button>
            </div>
            
            {/* View Toggles */}
            <div className="flex items-center gap-2">
              <span className="text-sm text-slate-500 mr-1 hidden md:inline"></span>
              <div className="flex gap-1 p-1 bg-blue-50 rounded-md shadow-sm">
                {/* <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setViewMode("both")}
                  className={`w-9 h-8 p-0 transition-all duration-200 ${viewMode === "both" ? "bg-white shadow-md text-ocean-dark" : "text-slate-500"}`}
                >
                  <SplitSquareVertical className="h-4 w-4" />
                </Button> */}
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setViewMode("map")}
                  className={`w-9 h-8 p-0 transition-all duration-200 ${viewMode === "map" ? "bg-white shadow-md text-ocean-dark" : "text-slate-500"}`}
                >
                  <Map className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setViewMode("list")}
                  className={`w-9 h-8 p-0 transition-all duration-200 ${viewMode === "list" ? "bg-white shadow-md text-ocean-dark" : "text-slate-500"}`}
                >
                  <List className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
          
          {/* Bottom row: Filter Controls and Compare Buttons */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
            {/* Filter Controls */}
            <div className="w-full sm:flex-grow">
              <FilterControls 
                windQualityFilter={windQualityFilter}
                onWindQualityFilterChange={handleWindQualityFilterChange}
                searchQuery={searchQuery}
                onSearchChange={handleSearchChange}
              />
            </div>
            
            {/* Compare Buttons - Enhanced */}
            <div className="flex gap-2 items-center mt-2 sm:mt-0">
              <Button
                onClick={handleShowComparison}
                disabled={spotsToCompare.length < 2}
                size="sm"
                variant={spotsToCompare.length >= 2 ? "default" : "secondary"}
                className={`h-9 text-xs font-medium px-3 ${spotsToCompare.length >= 2 ? "bg-yellow hover:bg-yellow/60 text-slate shadow-md" : "bg-white"}`}
              >
                <SplitSquareVertical className="h-4 w-4 mr-1.5" />
                Compare {spotsToCompare.length > 0 && `(${spotsToCompare.length})`}
              </Button>
              
              <Button
                onClick={() => {
                  // Set all filtered spots as spots to compare (limited to first 3)
                  const spotsToAdd = filteredSpots?.slice(0, 3) || [];
                  setSpotsToCompare(spotsToAdd);
                  if (spotsToAdd.length >= 2) {
                    setShowComparison(true);
                  }
                }}
                size="sm"
                variant="action"
                className="h-9 text-xs font-medium px-3"
                disabled={!filteredSpots || filteredSpots.length < 2}
              >
                <SplitSquareVertical className="h-4 w-4 mr-1.5" />
                Compare All
              </Button>
              
              {spotsToCompare.length > 0 && (
                <Button
                  onClick={clearComparison}
                  size="sm"
                  variant="ghost"
                  className="text-red-500 h-9 p-0 w-9 hover:bg-red-50"
                >
                  ✕
                </Button>
              )}
            </div>
          </div>
        </div>
        
        {/* Spots to compare - Enhanced badges */}
        {spotsToCompare.length > 0 && !showComparison && (
          <div className="mb-4 flex items-center gap-2 bg-blue-50/50 p-3 rounded-lg border border-blue-100">
            <span className="text-sm font-medium text-ocean-dark">Selected for comparison:</span>
            <div className="flex flex-wrap gap-2">
              {spotsToCompare.map(spot => (
                <div key={spot.id} className="bg-white rounded-full px-3 py-1 text-sm flex items-center gap-2 border border-blue-100 shadow-sm">
                  {spot.name}
                  <button 
                    onClick={() => toggleSpotComparison(spot)}
                    className="text-gray-400 hover:text-red-500 w-4 h-4 flex items-center justify-center rounded-full hover:bg-red-50 transition-colors duration-200"
                  >
                    <span className="text-xs">✕</span>
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
        
        {/* Comparison View */}
        {showComparison ? (
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="mt-4 overflow-hidden"
          >
            <SpotComparison 
              spots={spotsWithConditions || spotsToCompare}
              selectedMonth={selectedMonth}
              onClose={handleCloseComparison}
            />
            
            <div className="py-4 text-center mt-6">
              <Button 
                onClick={handleCloseComparison}
                variant="outline"
                className="hover:bg-blue-50 text-xs"
              >
                <Map className="w-4 h-4 mr-2" /> Back to Map
              </Button>
            </div>
          </motion.div>
        ) : (
          <div className="flex flex-col md:flex-row gap-6 w-full">
            {/* Map - Full width */}
            {(viewMode === "both" || viewMode === "map") && (
              <div className={`${viewMode === "both" ? "md:w-2/3 lg:w-3/4" : "w-full"} w-full relative`}>
                {/* Subtle loading overlay */}
                {isFetching && filteredSpots && Array.isArray(filteredSpots) && filteredSpots.length > 0 && (
                  <div className="absolute inset-0 bg-white/40 flex items-center justify-center z-10 rounded-xl pointer-events-none">
                    <div className="bg-white/80 px-3 py-2 rounded-full shadow-md flex items-center space-x-2">
                      <div className="animate-pulse flex space-x-1">
                        <div className="h-2 w-2 bg-primary rounded-full"></div>
                        <div className="h-2 w-2 bg-primary rounded-full delay-75"></div>
                        <div className="h-2 w-2 bg-primary rounded-full delay-150"></div>
                      </div>
                      <span className="text-xs font-medium text-primary">Updating map...</span>
                    </div>
                  </div>
                )}
                <KiteMap 
                  spots={filteredSpots} 
                  onSpotSelect={handleSpotSelect}
                  isLoading={spotsLoading && (!spots || !Array.isArray(spots) || spots.length === 0)} // Only show full loading state on initial load
                />
              </div>
            )}
            
            {/* Spots List - Reduced width */}
            {(viewMode === "both" || viewMode === "list") && (
              <div className={`${viewMode === "both" ? "md:w-1/3 lg:w-1/4" : "w-full"} relative`}>
                {/* Subtle loading overlay */}
                {isFetching && filteredSpots && Array.isArray(filteredSpots) && filteredSpots.length > 0 && (
                  <div className="absolute inset-0 bg-white/40 flex items-center justify-center z-10 rounded-xl pointer-events-none">
                    <div className="bg-white/80 px-3 py-2 rounded-full shadow-md">
                      <div className="animate-pulse flex space-x-1">
                        <div className="h-2 w-2 bg-primary rounded-full"></div>
                        <div className="h-2 w-2 bg-primary rounded-full delay-75"></div>
                        <div className="h-2 w-2 bg-primary rounded-full delay-150"></div>
                      </div>
                    </div>
                  </div>
                )}
                <SpotsList 
                  spots={filteredSpots} 
                  onSpotSelect={handleSpotSelect}
                  isLoading={spotsLoading && (!spots || !Array.isArray(spots) || spots.length === 0)} // Only show full loading state on initial load
                  selectedMonth={selectedMonth}
                  spotsToCompare={spotsToCompare}
                  onToggleCompare={toggleSpotComparison}
                />
              </div>
            )}
          </div>
        )}
      </main>
      
      {/* Spot Detail Modal */}
      {showDetailModal && (
        <SpotDetailModal 
          spotDetails={spotDetails}
          isLoading={detailsLoading}
          onClose={handleCloseDetailModal} 
        />
      )}
      
      {/* Preferences Modal */}
      {showPreferencesModal && (
        <PreferencesModal
          onClose={handleClosePreferencesModal}
          onSavePreferences={handleSavePreferences}
          currentMonth={selectedMonth}
        />
      )}
      
      {/* Recommendations Modal */}
      {showRecommendations && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/60 backdrop-blur-sm p-4">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.2 }}
            className="w-full max-w-4xl max-h-[90vh] overflow-y-auto"
          >
            <div className="w-full overflow-y-auto overflow-x-hidden">
              <RecommendedSpots
                spots={recommendedSpots}
                isLoading={isRecommending}
                onSpotSelect={handleSpotSelect}
                onClose={handleCloseRecommendations}
              />
            </div>
          </motion.div>
        </div>
      )}
      
      <Footer />
    </div>
  );
}