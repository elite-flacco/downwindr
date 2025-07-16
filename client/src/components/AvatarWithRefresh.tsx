import { useState, useEffect, memo } from 'react';
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { User } from "lucide-react";

interface AvatarWithRefreshProps {
  userAvatarUrl: string | null;
  userName?: string;
  className?: string;
  fallbackClassName?: string;
}

/**
 * A simple component that displays an avatar with cache-busting.
 * This implementation uses a very straightforward approach to ensure fresh image loading.
 */
export const AvatarWithRefresh = memo(function AvatarWithRefresh({
  userAvatarUrl,
  userName,
  className = "h-8 w-8",
  fallbackClassName = ""
}: AvatarWithRefreshProps) {
  const [imageError, setImageError] = useState(false);
  
  // Reset error state when userAvatarUrl changes
  useEffect(() => {
    setImageError(false);
  }, [userAvatarUrl]);
  
  // Extract initials for fallback, or use a default icon
  const initials = userName ? userName.substring(0, 2).toUpperCase() : null;
  
  return (
    <Avatar className={className}>
      {userAvatarUrl && !imageError && (
        <AvatarImage 
          src={userAvatarUrl} 
          alt={userName || "User"}
          onError={() => setImageError(true)}
        />
      )}
      <AvatarFallback className={fallbackClassName || "bg-primary text-primary-foreground"}>
        {initials || <User className="h-4 w-4" />}
      </AvatarFallback>
    </Avatar>
  );
});