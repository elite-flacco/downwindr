import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import MonthSelector from "@/components/MonthSelector";
import FilterControls from "@/components/FilterControls";
import KiteMap from "@/components/KiteMap";
import SpotsList from "@/components/SpotsList";
import SpotDetailModal from "@/components/SpotDetailModal";
import { MonthNames } from "@shared/schema";
import type { Spot, SpotWithWindConditions } from "@shared/schema";

export default function Spots() {
  // State for selected month (1-12)
  const [selectedMonth, setSelectedMonth] = useState<number>(new Date().getMonth() + 1);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [windQualityFilter, setWindQualityFilter] = useState<string[]>(["Excellent"]);
  const [selectedSpot, setSelectedSpot] = useState<number | null>(null);
  const [showDetailModal, setShowDetailModal] = useState<boolean>(false);

  // Fetch spots by selected month
  const { data: spots, isLoading: spotsLoading } = useQuery<Spot[]>({
    queryKey: [`/api/spots/month/${selectedMonth}`],
    staleTime: 1000 * 60 * 5, // 5 minutes
  });

  // Fetch spot details when a spot is selected
  const { data: spotDetails, isLoading: detailsLoading } = useQuery<{spot: Spot, windConditions: any[]}>({
    queryKey: [`/api/spots/${selectedSpot}`],
    enabled: selectedSpot !== null,
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

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="container mx-auto px-4 py-6 flex-grow">
        {/* Page Title */}
        <div className="mb-6">
          <h2 className="text-3xl font-bold text-primary">Find Perfect Kitesurfing Spots</h2>
          <p className="text-slate-600">Discover the best kitesurfing locations worldwide based on optimal wind conditions by month</p>
        </div>
        
        {/* Month Selector */}
        <MonthSelector 
          selectedMonth={selectedMonth} 
          onMonthChange={handleMonthChange} 
        />
        
        {/* Filter Controls */}
        <FilterControls 
          windQualityFilter={windQualityFilter}
          onWindQualityFilterChange={handleWindQualityFilterChange}
          searchQuery={searchQuery}
          onSearchChange={handleSearchChange}
        />
        
        <div className="flex flex-col md:flex-row gap-6">
          {/* Map */}
          <KiteMap 
            spots={filteredSpots || []} 
            onSpotSelect={handleSpotSelect}
            isLoading={spotsLoading}
          />
          
          {/* Spots List */}
          <SpotsList 
            spots={filteredSpots || []} 
            onSpotSelect={handleSpotSelect}
            isLoading={spotsLoading}
            selectedMonth={selectedMonth}
          />
        </div>
      </main>
      
      {/* Spot Detail Modal */}
      {showDetailModal && (
        <SpotDetailModal 
          spotDetails={spotDetails}
          isLoading={detailsLoading}
          onClose={handleCloseDetailModal} 
        />
      )}
      
      <Footer />
    </div>
  );
}