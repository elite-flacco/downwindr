import { useState, useEffect, useRef } from 'react';
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { useAuth } from "@/hooks/use-auth";

// Singleton WebSocket connection for the entire application
let globalWebsocket: WebSocket | null = null;
const avatarUpdateCallbacks = new Set<() => void>();

// Initialize websocket connection
function initializeWebSocket() {
  if (globalWebsocket?.readyState === WebSocket.OPEN) {
    return; // Already connected
  }
  
  try {
    // Clean up any existing connection
    if (globalWebsocket) {
      globalWebsocket.close();
    }
    
    // Create websocket connection with proper protocol
    const protocol = window.location.protocol === "https:" ? "wss:" : "ws:";
    const wsUrl = `${protocol}//${window.location.host}/ws`;
    
    globalWebsocket = new WebSocket(wsUrl);
    
    globalWebsocket.onopen = () => {
      console.log('WebSocket connected to server');
    };
    
    globalWebsocket.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        
        // Handle avatar update messages from the server
        if (data.type === 'avatar_update') {
          console.log('Received avatar update notification');
          // Notify all registered components to refresh their avatar
          avatarUpdateCallbacks.forEach(callback => callback());
        }
      } catch (error) {
        console.error('Error parsing WebSocket message:', error);
      }
    };
    
    globalWebsocket.onerror = (error) => {
      console.error('WebSocket error:', error);
    };
    
    globalWebsocket.onclose = () => {
      console.log('WebSocket connection closed');
      // Try to reconnect after a delay
      setTimeout(() => {
        initializeWebSocket();
      }, 3000);
    };
  } catch (error) {
    console.error('Error initializing WebSocket:', error);
  }
}

// Initialize the WebSocket when this module loads
if (typeof window !== 'undefined') {
  initializeWebSocket();
}

interface AvatarWithRefreshProps {
  userAvatarUrl: string | null;
  userName: string;
  className?: string;
  fallbackClassName?: string;
}

/**
 * A component that displays an avatar and automatically refreshes when the
 * prop values change or when avatar updates are received via WebSocket.
 */
export function AvatarWithRefresh({
  userAvatarUrl,
  userName,
  className = "h-8 w-8",
  fallbackClassName = ""
}: AvatarWithRefreshProps) {
  // Use a unique cache-busting URL to ensure fresh image fetching
  const [imageUrl, setImageUrl] = useState<string | undefined>(undefined);
  const [refreshCounter, setRefreshCounter] = useState(0);
  const { user } = useAuth();
  
  // Function to refresh the image URL with a cache-busting timestamp
  const refreshImage = () => {
    if (userAvatarUrl) {
      setImageUrl(`${userAvatarUrl}?t=${new Date().getTime()}&r=${refreshCounter}`);
      setRefreshCounter(prev => prev + 1);
    } else {
      setImageUrl(undefined);
    }
  };
  
  // Update the image URL when props change
  useEffect(() => {
    refreshImage();
  }, [userAvatarUrl, refreshCounter]);
  
  // Register this component for WebSocket updates
  useEffect(() => {
    const handleAvatarUpdate = () => {
      refreshImage();
    };
    
    // Add this component's refresh callback to the global set
    avatarUpdateCallbacks.add(handleAvatarUpdate);
    
    // Ensure WebSocket is initialized
    initializeWebSocket();
    
    // Clean up when component unmounts
    return () => {
      avatarUpdateCallbacks.delete(handleAvatarUpdate);
    };
  }, []);
  
  // Extract initials for fallback
  const initials = userName ? userName.substring(0, 2).toUpperCase() : "??";
  
  return (
    <Avatar className={className}>
      {imageUrl && (
        <AvatarImage 
          src={imageUrl} 
          alt={userName}
          key={`avatar-${refreshCounter}`} // Force re-render on refresh
        />
      )}
      <AvatarFallback className={fallbackClassName || "bg-primary text-primary-foreground"}>
        {initials}
      </AvatarFallback>
    </Avatar>
  );
}