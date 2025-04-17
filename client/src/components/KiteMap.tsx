import { useState, useEffect, useRef } from "react";
import { 
  MapContainer, 
  TileLayer, 
  Marker, 
  Popup, 
  useMap,
  ZoomControl
} from "react-leaflet";
import L from "leaflet";
import { Spot, WindQuality } from "@shared/schema";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Wind, MapPin, Compass, Plus, Minus } from "lucide-react";
import { motion } from "framer-motion";

// SVG Marker for kitesurfing spots
const createCustomMarker = (quality: WindQuality) => {
  // Define color based on wind quality
  let color = "#38bdf8"; // Default turquoise
  
  switch(quality) {
    case "Excellent":
      color = "#10b981"; // Green
      break;
    case "Good":
      color = "#22c55e"; // Green
      break;
    case "Moderate":
      color = "#f59e0b"; // Amber
      break;
    case "Poor":
      color = "#ef4444"; // Red
      break;
  }
  
  // Create an SVG icon
  const svgIcon = `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="36" height="36">
      <circle cx="12" cy="12" r="10" fill="white" stroke="${color}" stroke-width="2" />
      <circle cx="12" cy="12" r="6" fill="${color}" />
      <path d="M12 6 L12 18 M6 12 L18 12" stroke="white" stroke-width="1.5" />
    </svg>
  `;
  
  return L.divIcon({
    html: svgIcon,
    className: "custom-marker-icon",
    iconSize: [36, 36],
    iconAnchor: [18, 18],
    popupAnchor: [0, -20]
  });
};

interface KiteMapProps {
  spots: Spot[];
  onSpotSelect: (spotId: number) => void;
  isLoading: boolean;
}

function MapRecenter({ spots }: { spots: Spot[] }) {
  const map = useMap();
  
  useEffect(() => {
    if (spots.length > 0) {
      // Create bounds that include all markers
      const bounds = L.latLngBounds(
        spots.map(spot => [spot.latitude, spot.longitude])
      );
      map.fitBounds(bounds, { padding: [30, 30] });
    }
  }, [spots, map]);
  
  return null;
}

export default function KiteMap({ spots, onSpotSelect, isLoading }: KiteMapProps) {
  // Default center position (middle of the world)
  const defaultCenter: [number, number] = [20, 0];
  const mapRef = useRef<L.Map | null>(null);
  
  const handleZoomIn = () => {
    if (mapRef.current) {
      mapRef.current.zoomIn();
    }
  };
  
  const handleZoomOut = () => {
    if (mapRef.current) {
      mapRef.current.zoomOut();
    }
  };
  
  // Generate a "month quality" for each spot based on current month
  const getSpotQuality = (spot: Spot): WindQuality => {
    const currentMonth = new Date().getMonth() + 1; // 1-12
    const currentMonthName = new Intl.DateTimeFormat('en-US', { month: 'short' }).format(new Date());
    
    // Check if best months text includes the current month name
    if (spot.bestMonths && spot.bestMonths.includes(currentMonthName)) {
      return WindQuality.Excellent;
    }
    
    // For simplicity in this demo, determine quality based on current selection
    // In a real app, you'd parse the month range properly
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

  return (
    <Card className="w-full md:w-2/3 overflow-hidden rounded-2xl shadow-lg">
      {isLoading ? (
        <div className="map-container bg-gray-100 flex items-center justify-center">
          <div className="flex flex-col items-center justify-center">
            <Skeleton className="w-12 h-12 rounded-full mb-4" />
            <Skeleton className="w-48 h-6 mb-2" />
            <Skeleton className="w-36 h-4" />
          </div>
        </div>
      ) : (
        <div className="map-container relative">
          <div className="absolute top-4 left-4 z-[400] bg-white/80 backdrop-blur-sm px-3 py-2 rounded-lg shadow-md">
            <div className="flex items-center">
              <Wind className="text-ocean-blue w-5 h-5 mr-2" />
              <span className="font-medium text-ocean-dark text-sm">KiteSpotter Map</span>
            </div>
          </div>
          
          <MapContainer
            center={defaultCenter}
            zoom={2}
            className="h-full w-full"
            zoomControl={false}
            ref={mapRef as any}
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            
            {/* Add a styled background for the map */}
            <div className="absolute inset-0 bg-gradient-to-r from-blue-50 to-cyan-50 -z-10" />
            
            {spots.map(spot => {
              // Get wind quality using our helper function
              const quality = getSpotQuality(spot);
              
              return (
                <Marker 
                  key={spot.id}
                  position={[spot.latitude, spot.longitude]}
                  icon={createCustomMarker(quality)}
                  eventHandlers={{
                    click: () => {
                      // Add a subtle animation when clicked
                      const element = document.querySelector(`.marker-${spot.id}`);
                      if (element) {
                        element.classList.add('marker-pulse');
                        setTimeout(() => element.classList.remove('marker-pulse'), 500);
                      }
                    }
                  }}
                >
                  <Popup className="spot-popup">
                    <div className="p-2 max-w-[250px]">
                      <div className="mb-3 pb-2 border-b border-gray-200">
                        <h3 className="font-bold text-ocean-dark text-lg">{spot.name}</h3>
                        <div className="text-xs text-ocean-dark/70 flex items-center">
                          <MapPin className="w-3 h-3 mr-1" />
                          {spot.country}
                        </div>
                      </div>
                      
                      <div className="flex items-center mb-2">
                        <div className={`w-3 h-3 rounded-full mr-2 ${
                          quality === WindQuality.Excellent ? 'bg-tropical-green' : 
                          quality === WindQuality.Good ? 'bg-teal' : 
                          quality === WindQuality.Moderate ? 'bg-sunny-yellow' : 
                          'bg-red-500'
                        }`}></div>
                        <span className="text-sm font-medium">{quality} conditions this month</span>
                      </div>
                      
                      <p className="text-sm mb-3 text-gray-600 max-h-[80px] overflow-y-auto">
                        {spot.description.substring(0, 120)}...
                      </p>
                      
                      <Button 
                        size="sm"
                        className="w-full bg-ocean-blue hover:bg-ocean-dark"
                        onClick={() => onSpotSelect(spot.id)}
                      >
                        <Compass className="w-4 h-4 mr-1" /> View Details
                      </Button>
                    </div>
                  </Popup>
                </Marker>
              );
            })}
            
            <MapRecenter spots={spots} />
          </MapContainer>
          
          {/* Map controls */}
          <div className="absolute bottom-4 right-4 flex flex-col gap-2">
            <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
              <Button
                size="icon"
                variant="outline"
                className="w-10 h-10 bg-white rounded-full shadow-md"
                onClick={handleZoomIn}
              >
                <Plus className="h-4 w-4" />
              </Button>
            </motion.div>
            <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
              <Button
                size="icon"
                variant="outline"
                className="w-10 h-10 bg-white rounded-full shadow-md"
                onClick={handleZoomOut}
              >
                <Minus className="h-4 w-4" />
              </Button>
            </motion.div>
          </div>
        </div>
      )}
    </Card>
  );
}
