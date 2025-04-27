import { useState, useEffect } from 'react';
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

interface AvatarWithRefreshProps {
  userAvatarUrl: string | null;
  userName: string;
  className?: string;
  fallbackClassName?: string;
}

/**
 * A component that displays an avatar and automatically refreshes when the
 * prop values change, ensuring cache-busting for updated profile images.
 */
export function AvatarWithRefresh({
  userAvatarUrl,
  userName,
  className = "h-8 w-8",
  fallbackClassName = ""
}: AvatarWithRefreshProps) {
  // Use a unique cache-busting URL to ensure fresh image fetching
  const [imageUrl, setImageUrl] = useState<string | undefined>(undefined);
  
  // Update the image URL whenever the avatar URL changes
  useEffect(() => {
    if (userAvatarUrl) {
      setImageUrl(`${userAvatarUrl}?t=${new Date().getTime()}`);
    } else {
      setImageUrl(undefined);
    }
  }, [userAvatarUrl]);
  
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