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
import { Spot } from "@shared/schema";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { MapPin, Plus, Minus } from "lucide-react";
import { motion } from "framer-motion";

// Custom marker icon
const iconUrl = "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png";
const shadowUrl = "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png";

const customIcon = L.icon({
  iconUrl,
  shadowUrl,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

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
  
  return (
    <Card className="w-full md:w-2/3 overflow-hidden">
      {isLoading ? (
        <div className="map-container bg-gray-100 flex items-center justify-center">
          <Skeleton className="w-full h-full" />
        </div>
      ) : (
        <div className="map-container relative">
          <MapContainer
            center={defaultCenter}
            zoom={2}
            className="h-full w-full"
            zoomControl={false}
            ref={mapRef}
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            
            {spots.map(spot => (
              <Marker 
                key={spot.id}
                position={[spot.latitude, spot.longitude]}
                icon={customIcon}
              >
                <Popup>
                  <div className="text-center">
                    <h3 className="font-semibold mb-1">{spot.name}</h3>
                    <p className="text-sm mb-2">{spot.description.substring(0, 100)}...</p>
                    <Button 
                      size="sm"
                      onClick={() => onSpotSelect(spot.id)}
                    >
                      View Details
                    </Button>
                  </div>
                </Popup>
              </Marker>
            ))}
            
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
