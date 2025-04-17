import { useState, useEffect, useRef, useCallback } from "react";
import Map, { Marker, Popup, NavigationControl, FullscreenControl, ViewStateChangeEvent } from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { Spot, WindQuality } from "@shared/schema";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Wind, MapPin, Compass, Waves, Anchor } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";

// Import Mapbox GL CSS
import 'mapbox-gl/dist/mapbox-gl.css';

interface KiteMapProps {
  spots: Spot[];
  onSpotSelect: (spotId: number) => void;
  isLoading: boolean;
}

export default function KiteMap({ spots, onSpotSelect, isLoading }: KiteMapProps) {
  // State for the map
  const [viewState, setViewState] = useState({
    longitude: 0,
    latitude: 25,
    zoom: 1.8,
    bearing: 0,
    pitch: 0
  });
  
  // State for popup
  const [popupInfo, setPopupInfo] = useState<{
    spot: Spot;
    quality: WindQuality;
  } | null>(null);
  
  // Fetch Mapbox token
  const { data: mapboxData, isLoading: isTokenLoading } = useQuery({
    queryKey: ['mapbox-token'],
    queryFn: async () => {
      const response = await fetch('/api/mapbox-token');
      if (!response.ok) {
        throw new Error('Failed to fetch Mapbox token');
      }
      return response.json();
    }
  });
  
  // Handle map movement
  const onMove = useCallback(({ viewState }: ViewStateChangeEvent) => {
    setViewState(viewState);
  }, []);
  
  // Fit map to show all spots
  useEffect(() => {
    if (spots.length > 0 && !isLoading) {
      // Calculate bounds to fit all spots
      const minLng = Math.min(...spots.map(spot => spot.longitude)) - 10;
      const maxLng = Math.max(...spots.map(spot => spot.longitude)) + 10;
      const minLat = Math.min(...spots.map(spot => spot.latitude)) - 10;
      const maxLat = Math.max(...spots.map(spot => spot.latitude)) + 10;
      
      // Update view state with new bounds
      setViewState(prev => ({
        ...prev,
        bounds: [minLng, minLat, maxLng, maxLat]
      }));
    }
  }, [spots, isLoading]);
  
  // Generate a "month quality" for each spot based on current month
  const getSpotQuality = (spot: Spot): WindQuality => {
    const currentMonth = new Date().getMonth() + 1; // 1-12
    const currentMonthName = new Intl.DateTimeFormat('en-US', { month: 'short' }).format(new Date());
    
    // Check if best months text includes the current month name
    if (spot.bestMonths && spot.bestMonths.includes(currentMonthName)) {
      return WindQuality.Excellent;
    }
    
    // For simplicity in this demo, determine quality based on current selection
    const monthRange = spot.bestMonths?.split('-') || [];
    if (monthRange.length >= 2) {
      // If we're within 1 month of the range
      if (spot.bestMonths && (
          spot.bestMonths.includes(currentMonthName) || 
          spot.bestMonths.includes(new Intl.DateTimeFormat('en-US', { month: 'short' }).format(new Date(new Date().setMonth(new Date().getMonth() - 1))))
      )) {
        return WindQuality.Good;
      }
    }
    
    // For demo purposes, give coastal spots better quality
    if (spot.tags && (
        spot.tags.includes('beach') || 
        spot.tags.includes('coastal') ||
        spot.name.includes('Beach') || 
        spot.name.includes('Coast')
    )) {
      return WindQuality.Moderate;
    }
    
    // Otherwise it's poor for this demo
    return WindQuality.Poor;
  };

  // Get pin color based on wind quality
  const getPinColor = (quality: WindQuality) => {
    switch(quality) {
      case WindQuality.Excellent:
        return '#10b981'; // Green
      case WindQuality.Good:
        return '#06b6d4'; // Cyan
      case WindQuality.Moderate:
        return '#f59e0b'; // Amber
      case WindQuality.Poor:
        return '#ef4444'; // Red
      default:
        return '#3b82f6'; // Blue
    }
  };

  return (
    <Card className="w-full md:w-2/3 overflow-hidden rounded-2xl shadow-xl border-0">
      {isLoading ? (
        <div className="map-container bg-slate-50 flex items-center justify-center">
          <div className="flex flex-col items-center justify-center">
            <Wind className="w-12 h-12 text-ocean-blue animate-pulse mb-4" />
            <Skeleton className="w-48 h-6 mb-2" />
            <Skeleton className="w-36 h-4" />
          </div>
        </div>
      ) : (
        <div className="map-container relative">
          {/* Header overlay */}
          <div className="absolute top-4 left-4 z-[9] bg-white/95 backdrop-blur-sm px-4 py-3 rounded-xl shadow-lg flex items-center space-x-3 border border-blue-100">
            <div className="bg-gradient-to-br from-ocean-blue to-teal rounded-full p-2">
              <Wind className="text-white w-5 h-5" />
            </div>
            <div>
              <h3 className="font-title text-ocean-dark text-lg tracking-wide">KiteSpotter</h3>
              <p className="font-fun text-xs text-ocean-blue">Discover the perfect winds</p>
            </div>
          </div>
          
          {/* Main map component */}
          {mapboxData && mapboxData.token && (
            <Map
              {...viewState}
              mapStyle="mapbox://styles/mapbox/outdoors-v12" // Colorful outdoor style
              onMove={onMove}
              mapboxAccessToken={mapboxData.token}
              reuseMaps
              attributionControl={false}
              style={{ width: '100%', height: '100%' }}
            >
            {/* Navigation controls */}
            <NavigationControl position="bottom-right" showCompass={false} />
            
            {/* Interactive markers */}
            {spots.map(spot => {
              const quality = getSpotQuality(spot);
              const pinColor = getPinColor(quality);
              
              return (
                <Marker
                  key={spot.id}
                  longitude={spot.longitude}
                  latitude={spot.latitude}
                  anchor="bottom"
                  onClick={e => {
                    // Prevent map click event
                    e.originalEvent.stopPropagation();
                    setPopupInfo({ spot, quality });
                  }}
                >
                  <motion.div
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ type: "spring", damping: 10 }}
                    whileHover={{ scale: 1.2, y: -5 }}
                    className="marker-container"
                  >
                    <svg
                      height="46"
                      viewBox="0 0 24 36"
                      style={{ 
                        fill: pinColor, 
                        stroke: 'white', 
                        strokeWidth: 1.5, 
                        cursor: 'pointer',
                        filter: 'drop-shadow(0 3px 5px rgba(0,0,0,0.3))'
                      }}
                    >
                      <path d="M12 0C5.383 0 0 5.383 0 12c0 3.912 1.983 7.475 5.207 9.75L12 36l6.793-14.25C22.017 19.475 24 15.912 24 12c0-6.617-5.383-12-12-12z" />
                    </svg>
                    <div 
                      className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white"
                      style={{ marginTop: '-8px' }}
                    >
                      <Wind className="w-4 h-4" />
                    </div>
                    {/* Add a pulsing ring effect */}
                    <div className="absolute -inset-1 rounded-full animate-ping opacity-30" 
                      style={{ backgroundColor: pinColor, animationDuration: '3s' }}>
                    </div>
                  </motion.div>
                </Marker>
              );
            })}
            
            {/* Popup for selected spot */}
            {popupInfo && (
              <Popup
                longitude={popupInfo.spot.longitude}
                latitude={popupInfo.spot.latitude}
                anchor="bottom"
                onClose={() => setPopupInfo(null)}
                closeOnClick={false}
                className="custom-popup"
                offset={[0, -10]}
              >
                <div className="p-3 max-w-[280px]">
                  <div className="mb-3 pb-2 border-b border-gray-100">
                    <h3 className="font-title text-ocean-dark text-xl tracking-wide">{popupInfo.spot.name}</h3>
                    <div className="text-xs text-ocean-dark/70 flex items-center font-fun">
                      <MapPin className="w-3 h-3 mr-1" />
                      {popupInfo.spot.country}
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center">
                      <div 
                        className="w-4 h-4 rounded-full mr-2"
                        style={{ backgroundColor: getPinColor(popupInfo.quality) }}
                      ></div>
                      <span className="text-sm font-fun font-bold" style={{ color: getPinColor(popupInfo.quality) }}>
                        {popupInfo.quality} wind
                      </span>
                    </div>
                    <div className="flex items-center text-xs font-fun text-ocean-dark/80">
                      <Waves className="w-3 h-3 mr-1" />
                      {popupInfo.spot.waveSize}
                    </div>
                  </div>
                  
                  <div className="text-sm mb-3 text-gray-700 max-h-[80px] overflow-y-auto font-body leading-snug">
                    {popupInfo.spot.description.substring(0, 120)}...
                  </div>
                  
                  <Button 
                    size="sm"
                    className="w-full bg-gradient-to-r from-ocean-blue to-teal text-white font-fun hover:opacity-90 shadow-md"
                    onClick={() => {
                      onSpotSelect(popupInfo.spot.id);
                      setPopupInfo(null);
                    }}
                  >
                    <Compass className="w-4 h-4 mr-1" /> View Details
                  </Button>
                </div>
              </Popup>
            )}
            
            {/* Legend */}
            <div className="absolute bottom-8 left-4 z-[9] bg-white/95 backdrop-blur-sm p-4 rounded-xl shadow-md text-xs border border-blue-100">
              <div className="font-heading text-sm mb-2 text-ocean-dark">Wind Quality</div>
              <div className="flex items-center mb-2">
                <div className="w-4 h-4 rounded-full mr-2 shadow-sm" style={{ backgroundColor: getPinColor(WindQuality.Excellent) }}></div>
                <span className="font-fun" style={{ color: getPinColor(WindQuality.Excellent) }}>Excellent</span>
              </div>
              <div className="flex items-center mb-2">
                <div className="w-4 h-4 rounded-full mr-2 shadow-sm" style={{ backgroundColor: getPinColor(WindQuality.Good) }}></div>
                <span className="font-fun" style={{ color: getPinColor(WindQuality.Good) }}>Good</span>
              </div>
              <div className="flex items-center mb-2">
                <div className="w-4 h-4 rounded-full mr-2 shadow-sm" style={{ backgroundColor: getPinColor(WindQuality.Moderate) }}></div>
                <span className="font-fun" style={{ color: getPinColor(WindQuality.Moderate) }}>Moderate</span>
              </div>
              <div className="flex items-center">
                <div className="w-4 h-4 rounded-full mr-2 shadow-sm" style={{ backgroundColor: getPinColor(WindQuality.Poor) }}></div>
                <span className="font-fun" style={{ color: getPinColor(WindQuality.Poor) }}>Poor</span>
              </div>
            </div>
          </Map>
          )}
        </div>
      )}
    </Card>
  );
}
