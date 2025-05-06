import { useState, useEffect } from 'react';
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

interface AvatarWithRefreshProps {
  userAvatarUrl: string | null;
  userName: string;
  className?: string;
  fallbackClassName?: string;
}

/**
 * A simple component that displays an avatar with cache-busting.
 * This implementation uses a very straightforward approach to ensure fresh image loading.
 */
export function AvatarWithRefresh({
  userAvatarUrl,
  userName,
  className = "h-8 w-8",
  fallbackClassName = ""
}: AvatarWithRefreshProps) {
  // Create a timestamp-based URL to bust browser cache
  const timestamp = Date.now();
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