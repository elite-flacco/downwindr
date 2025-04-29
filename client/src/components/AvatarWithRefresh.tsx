import { useState, useEffect } from 'react';
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { useWebSocket } from "@/hooks/use-websocket";

interface AvatarWithRefreshProps {
  userAvatarUrl: string | null;
  userName: string;
  userId?: number;
  className?: string;
  fallbackClassName?: string;
}

/**
 * A component that displays an avatar with cache-busting and live updates via WebSocket.
 * Updates automatically when notified of avatar changes through WebSocket.
 */
export function AvatarWithRefresh({
  userAvatarUrl,
  userName,
  userId,
  className = "h-8 w-8",
  fallbackClassName = ""
}: AvatarWithRefreshProps) {
  const [timestamp, setTimestamp] = useState(Date.now());
  const { lastMessage } = useWebSocket();
  
  // Update timestamp when a relevant WebSocket message is received
  useEffect(() => {
    if (lastMessage && lastMessage.type === 'avatar_update' && userId) {
      // If the message pertains to this user, update the timestamp
      if (lastMessage.userId === userId) {
        setTimestamp(lastMessage.timestamp || Date.now());
      }
    }
  }, [lastMessage, userId]);
  
  // Build the image URL with cache-busting timestamp
  const imageUrl = userAvatarUrl ? `${userAvatarUrl}?t=${timestamp}` : null;
  
  // Extract initials for fallback
  const initials = userName ? userName.substring(0, 2).toUpperCase() : "??";
  
  return (
    <Avatar className={className}>
      {imageUrl && (
        <AvatarImage 
          src={imageUrl} 
          alt={userName}
        />
      )}
      <AvatarFallback className={fallbackClassName || "bg-primary text-primary-foreground"}>
        {initials}
      </AvatarFallback>
    </Avatar>
  );
}