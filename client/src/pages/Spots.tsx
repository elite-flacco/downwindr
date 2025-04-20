import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
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
  const [viewMode, setViewMode] = useState<"both" | "map" | "list">("both");
  
  // New states for recommendation feature
  const [showPreferencesModal, setShowPreferencesModal] = useState<boolean>(false);
  const [showRecommendations, setShowRecommendations] = useState<boolean>(false);
  const [isRecommending, setIsRecommending] = useState<boolean>(false);
  const [recommendedSpots, setRecommendedSpots] = useState<any[]>([]);

  // Fetch all spots for the selected month
  const { data: spots, isLoading: spotsLoading } = useQuery<Spot[]>({
    queryKey: [`/api/spots/month/${selectedMonth}`],
    staleTime: 1000 * 60 * 5, // 5 minutes
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
  const filteredSpots = spots?.filter(spot => {
    // Filter by search query
    const matchesSearch = searchQuery === "" || 
      spot.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      spot.country.toLowerCase().includes(searchQuery.toLowerCase());
      
    // Filter by wind quality is handled by the backend based on selected month
    
    return matchesSearch;
  });

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
        {/* Page Title */}
        <div className="mb-6">
          <h2 className="text-3xl font-bold text-primary">Find Perfect Kitesurfing Spots</h2>
          <p className="text-slate-600">Discover the best kitesurfing locations worldwide based on optimal wind conditions by month</p>
        </div>
        
        {/* Month Selector + Personalized Recommendation Button */}
        <div className="flex flex-wrap items-center justify-between mb-4">
          <MonthSelector 
            selectedMonth={selectedMonth} 
            onMonthChange={handleMonthChange} 
          />
          
          <Button 
            onClick={handleShowPreferencesModal}
            variant="default"
            className="bg-teal-600 hover:bg-teal-700 text-white shadow-md"
            size="sm"
          >
            <Sparkles className="h-4 w-4 mr-2" />
            Get Personalized Recommendations
          </Button>
        </div>
        
        <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
          {/* Filter Controls */}
          <div className="flex-grow">
            <FilterControls 
              windQualityFilter={windQualityFilter}
              onWindQualityFilterChange={handleWindQualityFilterChange}
              searchQuery={searchQuery}
              onSearchChange={handleSearchChange}
            />
          </div>
          
          {/* Compare Button */}
          <div className="flex gap-2 items-center">
            <div className="hidden sm:flex gap-1">
              <Button
                variant={viewMode === "both" ? "default" : "outline"}
                size="sm"
                onClick={() => setViewMode("both")}
                className="w-10 h-8"
              >
                <List className="h-4 w-4" />
              </Button>
              <Button
                variant={viewMode === "map" ? "default" : "outline"}
                size="sm"
                onClick={() => setViewMode("map")}
                className="w-10 h-8"
              >
                <Map className="h-4 w-4" />
              </Button>
              <Button
                variant={viewMode === "list" ? "default" : "outline"}
                size="sm"
                onClick={() => setViewMode("list")}
                className="w-10 h-8"
              >
                <BarChart className="h-4 w-4" />
              </Button>
            </div>
            
            <div className="flex gap-1">
              <Button
                onClick={handleShowComparison}
                disabled={spotsToCompare.length < 2}
                size="sm"
                variant="secondary"
                className="flex items-center"
              >
                <SplitSquareVertical className="h-4 w-4 mr-2" />
                Compare Selected {spotsToCompare.length > 0 && `(${spotsToCompare.length})`}
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
                className="flex items-center"
                disabled={!filteredSpots || filteredSpots.length < 2}
              >
                <SplitSquareVertical className="h-4 w-4 mr-2" />
                Compare All
              </Button>
            </div>
            
            {spotsToCompare.length > 0 && (
              <Button
                onClick={clearComparison}
                size="sm"
                variant="ghost"
                className="text-red-500 h-8 px-2"
              >
                Clear
              </Button>
            )}
          </div>
        </div>
        
        {/* Spots to compare */}
        {spotsToCompare.length > 0 && !showComparison && (
          <div className="mb-4 p-2 bg-sky-50 rounded-md border border-sky-100">
            <div className="text-sm text-sky-700 font-medium mb-2">Selected for comparison:</div>
            <div className="flex flex-wrap gap-2">
              {spotsToCompare.map(spot => (
                <div key={spot.id} className="bg-white rounded-full px-3 py-1 text-sm flex items-center gap-1 border border-sky-200">
                  {spot.name}
                  <button 
                    onClick={() => toggleSpotComparison(spot)}
                    className="text-gray-400 hover:text-red-500"
                  >
                    ✕
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
        
        {/* Comparison View */}
        {showComparison ? (
          <div className="mt-4">
            <SpotComparison 
              spots={spotsWithConditions || spotsToCompare}
              selectedMonth={selectedMonth}
              onClose={handleCloseComparison}
            />
            <div className="mt-4 text-center">
              <Button 
                onClick={handleCloseComparison}
                variant="outline"
              >
                Back to Map
              </Button>
            </div>
          </div>
        ) : (
          <div className="flex flex-col md:flex-row gap-6">
            {/* Map */}
            {(viewMode === "both" || viewMode === "map") && (
              <div className={`${viewMode === "both" ? "md:w-3/5" : "w-full"}`}>
                <KiteMap 
                  spots={filteredSpots || []} 
                  onSpotSelect={handleSpotSelect}
                  isLoading={spotsLoading}
                />
              </div>
            )}
            
            {/* Spots List */}
            {(viewMode === "both" || viewMode === "list") && (
              <div className={`${viewMode === "both" ? "md:w-2/5" : "w-full"}`}>
                <SpotsList 
                  spots={filteredSpots || []} 
                  onSpotSelect={handleSpotSelect}
                  isLoading={spotsLoading}
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
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50 p-4">
          <div className="w-full max-w-4xl max-h-[90vh] overflow-y-auto">
            <RecommendedSpots
              spots={recommendedSpots}
              isLoading={isRecommending}
              onSpotSelect={handleSpotSelect}
              onClose={handleCloseRecommendations}
            />
          </div>
        </div>
      )}
      
      <Footer />
    </div>
  );
}