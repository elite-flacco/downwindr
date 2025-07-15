import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { getSpotRegion } from "@/lib/countryUtils";
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
import { Input } from "@/components/ui/input";
import { compareDesc } from "date-fns";
import { BarChart, ChevronDown, List, Map, Search, SplitSquareVertical, Navigation, Sparkles } from "lucide-react";

export default function Spots() {
  // State for selected month (1-12)
  const [selectedMonth, setSelectedMonth] = useState<number>(new Date().getMonth() + 1);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [windQualityFilter, setWindQualityFilter] = useState<string[]>(["Excellent"]);
  const [selectedRegion, setSelectedRegion] = useState<string>("all");
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
  const { data: spotDetails, isLoading: detailsLoading } = useQuery<{ spot: Spot, windConditions: any[] }>({
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

    // Filter by region
    const matchesRegion = selectedRegion === "all" || getSpotRegion(spot.country) === selectedRegion;

    // Filter by wind quality is handled by the backend based on selected month

    return matchesSearch && matchesRegion;
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

      <main className="container mx-auto px-4 pt-4 pb-20 flex-grow">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Page Title with more visual impact */}
          <div className="flex items-center justify-between mb-2 pt-2">
            <h3 className="mb-2">Find your dream spots</h3>
            {/* Map/List View Toggle */}
            <div className="flex gap-2">
              <div className="flex gap-0 p-0.5 bg-slate-100 rounded-full">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setViewMode("map")}
                  className={`h-8 px-3 text-sm rounded-full transition-all ${viewMode === "map"
                      ? "bg-white shadow-sm text-slate-800 font-medium"
                      : "text-slate-600 hover:text-slate-800"
                    }`}
                >
                  <Map className="h-4 w-4 mr-1" />
                </Button>
                <span className="text-slate-400 self-center">|</span>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setViewMode("list")}
                  className={`h-8 px-3 text-sm rounded-full transition-all ${viewMode === "list"
                      ? "bg-white shadow-sm text-slate-800 font-medium"
                      : "text-slate-600 hover:text-slate-800"
                    }`}
                >
                  <List className="h-4 w-4 mr-1" />
                </Button>
              </div>
            </div>
          </div>

          {/* New layout matching the design */}
          <div className="bg-white rounded-xl border border-slate-100 shadow-lg p-6 mb-6">
            {/* First Row: Season, Wind, Region, and View */}
            <div className="mb-6">
              <FilterControls
                selectedMonth={selectedMonth}
                onMonthChange={handleMonthChange}
                windQualityFilter={windQualityFilter}
                onWindQualityFilterChange={handleWindQualityFilterChange}
                selectedRegion={selectedRegion}
                onRegionChange={setSelectedRegion}
                searchQuery={searchQuery}
                onSearchChange={handleSearchChange}
              />
            </div>

            {/* Divider */}
            {/* <div className="border-t border-slate-100 mb-6"></div> */}

            {/* Second Row: Recommendations, Search, and Compare Actions */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
<div className="flex items-center gap-4">
              {/* Search Input */}
              <div className="relative flex-1 max-w-xs">
                <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
                  <Search className="h-4 w-4 text-slate-400" />
                </div>
                <Input
                  className="pl-10 pr-4 py-2 h-9 text-sm bg-white border-slate-200 rounded-full shadow-sm hover:shadow-md transition-shadow focus-visible:ring-primary/30 w-full"
                  placeholder="Search spots..."
                  value={searchQuery}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleSearchChange(e.target.value)}
                />
              </div>
              <div className="flex items-center gap-4">
                {/* Recommendations Button */}
                <Button
                  onClick={handleShowPreferencesModal}
                  variant="outline"
                  size="sm"
                  className="h-9 px-2 text-sm rounded-full bg-white border-slate-200 shadow-sm hover:shadow-md transition-shadow"
                >
                  <Sparkles className="h-4 w-4" />
                  Recs
                </Button>
              </div>
              </div>
              {/* Compare Actions */}
              <div className="flex items-center gap-2">
                <Button
                  onClick={handleShowComparison}
                  disabled={spotsToCompare.length < 2}
                  size="sm"
                  variant="outline"
                  className={`h-9 px-4 text-sm rounded-full transition-all ${spotsToCompare.length >= 2
                      ? "bg-white border-slate-200 shadow-sm hover:shadow-md"
                      : "bg-slate-50 border-slate-200 text-slate-400 cursor-not-allowed"
                    }`}
                >
                  ⬜ Compare {spotsToCompare.length > 0 && `(${spotsToCompare.length})`}
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
                  variant="outline"
                  className={`h-9 px-4 text-sm rounded-full transition-all ${!filteredSpots || filteredSpots.length < 2
                      ? "bg-slate-50 border-slate-200 text-slate-400 cursor-not-allowed"
                      : "bg-red-50 border-red-200 text-red-600 hover:bg-red-100 hover:border-red-300 shadow-sm hover:shadow-md"
                    }`}
                  disabled={!filteredSpots || filteredSpots.length < 2}
                >
                  🟥 Compare All
                </Button>

                {spotsToCompare.length > 0 && (
                  <Button
                    onClick={clearComparison}
                    size="sm"
                    variant="ghost"
                    className="text-red-500 h-9 px-3 hover:bg-red-50 rounded-full"
                  >
                    ✕
                  </Button>
                )}
              </div>
            </div>
          </div>

          {/* Spots to compare - Compact badges */}
          {spotsToCompare.length > 0 && !showComparison && (
            <div className="mb-4 bg-blue-50/50 p-2 rounded-lg border border-blue-100">
              <div className="flex items-center gap-2">
                <span className="text-xs font-medium text-slate-600 whitespace-nowrap">Comparing:</span>
                <div className="flex flex-wrap gap-1">
                  {spotsToCompare.map(spot => (
                    <div key={spot.id} className="bg-white rounded-full px-2 py-1 text-xs flex items-center gap-1 border border-blue-100 shadow-sm">
                      <span className="truncate max-w-[100px]">{spot.name}</span>
                      <button
                        onClick={() => toggleSpotComparison(spot)}
                        className="text-gray-400 hover:text-red-500 w-3 h-3 flex items-center justify-center rounded-full hover:bg-red-50 transition-colors duration-200 flex-shrink-0"
                      >
                        <span className="text-xs">✕</span>
                      </button>
                    </div>
                  ))}
                </div>
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
        </motion.div>
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