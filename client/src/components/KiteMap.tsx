import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { getCountryFlag } from "@/lib/countryUtils";
import { apiRequest } from "@/lib/queryClient";
import { Spot, WindQuality } from "@shared/schema";
import { useQuery } from "@tanstack/react-query";
import { AnimatePresence, motion } from "framer-motion";
import { Anchor, Compass, ExternalLink, MapPin, Waves, Wind } from "lucide-react";
import 'mapbox-gl/dist/mapbox-gl.css';
import { useCallback, useEffect, useRef, useState } from "react";
import Map, { FullscreenControl, Marker, NavigationControl, Popup, ViewStateChangeEvent } from 'react-map-gl';

// Import Mapbox GL CSS
import 'mapbox-gl/dist/mapbox-gl.css';

interface KiteMapProps {
  spots: Spot[];
  onSpotSelect: (spotId: number) => void;
  isLoading: boolean;
}

interface SpotWithWindCondition extends Spot {
  windCondition?: {
    windQuality: WindQuality;
  };
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
    spot: SpotWithWindCondition;
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

  // Get the spot quality from the wind condition data if available,
  // otherwise fall back to a calculated value based on best months
  const getSpotQuality = (spot: SpotWithWindCondition): WindQuality => {
    // If the spot has a wind condition for the current month, use that quality
    if (spot.windCondition && spot.windCondition.windQuality) {
      return spot.windCondition.windQuality as WindQuality;
    }

    // Otherwise, fall back to a calculation based on best months
    const currentMonth = new Date().getMonth() + 1; // 1-12
    const currentMonthName = new Intl.DateTimeFormat('en-US', { month: 'short' }).format(new Date());

    if (spot.bestMonths) {
      // Normalize the dash character in best months to handle different dash types
      const normalizedBestMonths = spot.bestMonths.replace(/[‐‑‒–—―]/g, "-");

      // Check if best months text includes the current month name
      if (normalizedBestMonths.includes(currentMonthName)) {
        return WindQuality.Excellent;
      }

      // Check for month ranges
      const monthRanges = normalizedBestMonths.split(",").map(range => range.trim());
      for (const range of monthRanges) {
        if (range.includes("-")) {
          const [startMonth, endMonth] = range.split("-").map(m => m.trim());

          // Convert month abbreviations to month numbers (1-12)
          const startIdx = new Date(`${startMonth} 1, 2000`).getMonth();
          const endIdx = new Date(`${endMonth} 1, 2000`).getMonth();

          if (startIdx !== -1 && endIdx !== -1) {
            // Handle wrapping around the year (e.g., "Nov-Feb")
            if (startIdx > endIdx) {
              if (currentMonth - 1 >= startIdx || currentMonth - 1 <= endIdx) {
                return WindQuality.Good;
              }
            } else {
              if (currentMonth - 1 >= startIdx && currentMonth - 1 <= endIdx) {
                return WindQuality.Good;
              }
            }
          }
        }
      }
    }

    // For any spots with beach or coastal tags, give them moderate rating
    if (spot.tags && (
      spot.tags.includes('beach') ||
      spot.tags.includes('coastal') ||
      spot.name.includes('Beach') ||
      spot.name.includes('Coast')
    )) {
      return WindQuality.Moderate;
    }

    // Otherwise consider it poor
    return WindQuality.Poor;
  };

  // Get pin color based on wind quality
  const getPinColor = (quality: WindQuality) => {
    switch (quality) {
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
    <Card className="w-full overflow-hidden rounded-xl shadow-sm border border-theme-border">
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
              <h3 className="card-title" style={{ fontFamily: "'Permanent Marker', cursive" }}>Downwindr</h3>
              <p className="card-caption">Find your perfect spot</p>
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
                    <div className="flex items-center mb-3 pb-2 border-b border-theme-border">
                      <MapPin className="w-4 h-4 mr-1" />
                      <h4 className="spot-name">{popupInfo.spot.name}</h4>
                      <div className="spot-location flex items-center">
                        {
                          (() => {
                            const flag = getCountryFlag(popupInfo.spot.country);
                            return flag ? (
                              <img
                                src={flag.url}
                                alt={`${popupInfo.spot.country} flag`}
                                title={popupInfo.spot.country}
                                className="h-3.5 inline-block ml-2"
                              />
                            ) : null
                          })()
                        }
                      </div>
                    </div>

                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center">
                        <div
                          className="w-3 h-3 rounded-full mr-2"
                          style={{ backgroundColor: getPinColor(popupInfo.quality) }}
                        ></div>
                        <span className="wind-quality-text mr-2 text-xs" style={{ color: getPinColor(popupInfo.quality) }}>
                          {popupInfo.quality} wind
                        </span>
                      </div>
                      <div className="flex items-center spot-condition text-xs">
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
                        className="button-text flex bg-theme-primary text-theme-background hover:bg-theme-primary-hover"
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
                          className="link-text flex items-center justify-center bg-theme-surface text-theme-text px-3 py-1 rounded-md hover:bg-theme-primary/30 transition-colors"
                        >
                          <ExternalLink className="w-2 h-2 mr-2" /> Windguru
                        </a>
                      )}
                    </div>
                  </div>
                </Popup>
              )}

              {/* Legend */}
              <div className="absolute bottom-8 left-4 z-[9] bg-theme-background p-4 rounded-xl shadow-sm border border-theme-border">
                <div className="card-body mb-2 text-theme-text">Wind Quality</div>
                <div className="flex items-center mb-2">
                  <div className="w-3 h-3 rounded-full mr-2" style={{ backgroundColor: getPinColor(WindQuality.Excellent) }}></div>
                  <span className="tag-text text-theme-text-light">Excellent</span>
                </div>
                <div className="flex items-center mb-2">
                  <div className="w-3 h-3 rounded-full mr-2" style={{ backgroundColor: getPinColor(WindQuality.Good) }}></div>
                  <span className="tag-text text-theme-text-light">Good</span>
                </div>
                <div className="flex items-center mb-2">
                  <div className="w-3 h-3 rounded-full mr-2" style={{ backgroundColor: getPinColor(WindQuality.Moderate) }}></div>
                  <span className="tag-text text-theme-text-light">Moderate</span>
                </div>
                <div className="flex items-center">
                  <div className="w-3 h-3 rounded-full mr-2" style={{ backgroundColor: getPinColor(WindQuality.Poor) }}></div>
                  <span className="tag-text text-theme-text-light">Poor</span>
                </div>
              </div>
            </Map>
          )}
        </div>
      )}
    </Card>
  );
}
