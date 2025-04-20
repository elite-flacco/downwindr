import { useState, useEffect, useRef, useCallback } from "react";
import Map, { Marker, Popup, NavigationControl, FullscreenControl, ViewStateChangeEvent } from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { Spot, WindQuality } from "@shared/schema";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Wind, MapPin, Compass, Waves, Anchor, ExternalLink } from "lucide-react";
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
        return 'rgba(255, 48, 51, 1)'; // Success accent for excellent
      case WindQuality.Good:
        return 'rgba(255, 175, 15, 1)'; // Primary hover for good
      case WindQuality.Moderate:
        return 'rgba(11, 254, 26, 1)'; // Primary for moderate
      case WindQuality.Poor:
        return 'rgba(194, 252, 249, 1)'; // Muted for poor
      default:
        return 'var(--theme-primary)'; // Primary as default
    }
  };

  return (
    <Card className="w-full md:w-2/3 overflow-hidden rounded-xl shadow-sm border border-theme-border">
      {isLoading ? (
        <div className="map-container bg-theme-surface flex items-center justify-center">
          <div className="flex flex-col items-center justify-center">
            <Wind className="w-12 h-12 text-theme-primary/70 animate-pulse mb-4" />
            <Skeleton className="w-48 h-6 mb-2" />
            <Skeleton className="w-36 h-4" />
          </div>
        </div>
      ) : (
        <div className="map-container relative">
          {/* Header overlay */}
          {/* <div className="absolute top-4 left-4 z-[9] bg-theme-background px-4 py-3 rounded-xl shadow-sm flex items-center space-x-3 border border-theme-border">
            <div>
              <h3 className="font-heading text-theme-primary text-lg" style={{ fontFamily: "'Permanent Marker', cursive" }}>Downwindr</h3>
              <p className="text-xs text-theme-text-light">Find your perfect spot</p>
            </div>
          </div> */}
          
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
                offset={[0, -10]}
              >
                <div className="p-3 max-w-[380px]">
                  <div className="mb-3 pb-2 border-b border-theme-border">
                    <h3 className="font-heading text-theme-primary text-lg">{popupInfo.spot.name}</h3>
                    <div className="text-xs text-theme-text-light flex items-center">
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
                      <span className="text-xs font-medium mr-2" style={{ color: getPinColor(popupInfo.quality) }}>
                        {popupInfo.quality} wind
                      </span>
                    </div>
                    <div className="flex items-center text-xs text-theme-text-light">
                      <Waves className="w-3 h-3 mr-1 text-theme-primary" />
                      {popupInfo.spot.waveSize}
                    </div>
                  </div>
                  
                  {/* <div className="text-sm mb-3 text-theme-text-light max-h-[80px] overflow-y-auto leading-snug">
                    {popupInfo.spot.description.substring(0, 120)}...
                  </div> */}
                  
                  <div className="flex gap-2 mb-3 mt-8">
                    <Button 
                      size="sm"
                      className="flex bg-theme-primary text-theme-background hover:bg-theme-primary-hover text-xs"
                      onClick={() => {
                        onSpotSelect(popupInfo.spot.id);
                        setPopupInfo(null);
                      }}
                    >
                      <Compass className="w-2 h-2" /> View Details
                    </Button>
                    
                    {popupInfo.spot.windguruCode && (
                      <a 
                        href={`https://www.windguru.cz/${popupInfo.spot.windguruCode}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center bg-theme-surface text-theme-text px-3 py-1 rounded-md text-xs font-medium hover:bg-theme-primary/30 transition-colors"
                      >
                        <ExternalLink className="w-2 h-2 mr-2" /> Windguru
                      </a>
                    )}
                  </div>
                </div>
              </Popup>
            )}
            
            {/* Legend */}
            <div className="absolute bottom-8 left-4 z-[9] bg-theme-background p-4 rounded-xl shadow-sm text-xs border border-theme-border">
              <div className="text-sm mb-2 text-theme-text font-medium">Wind Quality</div>
              <div className="flex items-center mb-2">
                <div className="w-3 h-3 rounded-full mr-2" style={{ backgroundColor: getPinColor(WindQuality.Excellent) }}></div>
                <span className="text-theme-text-light">Excellent</span>
              </div>
              <div className="flex items-center mb-2">
                <div className="w-3 h-3 rounded-full mr-2" style={{ backgroundColor: getPinColor(WindQuality.Good) }}></div>
                <span className="text-theme-text-light">Good</span>
              </div>
              <div className="flex items-center mb-2">
                <div className="w-3 h-3 rounded-full mr-2" style={{ backgroundColor: getPinColor(WindQuality.Moderate) }}></div>
                <span className="text-theme-text-light">Moderate</span>
              </div>
              <div className="flex items-center">
                <div className="w-3 h-3 rounded-full mr-2" style={{ backgroundColor: getPinColor(WindQuality.Poor) }}></div>
                <span className="text-theme-text-light">Poor</span>
              </div>
            </div>
          </Map>
          )}
        </div>
      )}
    </Card>
  );
}
