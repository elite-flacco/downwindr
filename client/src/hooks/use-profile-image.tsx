import { createContext, useContext, useState, ReactNode, useEffect } from 'react';

// Create a global timestamp that we can increment to force cache busting
let globalImageVersion = Date.now();

// Function to refresh the global timestamp to ensure new URL generation
export function refreshGlobalImageTimestamp() {
  globalImageVersion = Date.now();
  return globalImageVersion;
}

// Helper function to add cache-busting to avatar URLs
export function getTimestampedUrl(url: string | null): string | undefined {
  if (!url) return undefined;
  // Add both a global version and a random number to ensure browser always loads fresh image
  return `${url}?v=${globalImageVersion}&r=${Math.random()}`;
}

type ProfileImageContextType = {
  imageVersion: number;
  refreshImage: () => void;
};

const ProfileImageContext = createContext<ProfileImageContextType | null>(null);

export function ProfileImageProvider({ children }: { children: ReactNode }) {
  const [imageVersion, setImageVersion] = useState(globalImageVersion);

  const refreshImage = () => {
    // Update the global timestamp first
    const newVersion = refreshGlobalImageTimestamp();
    // Then update local state to trigger re-renders
    setImageVersion(newVersion);
  };

  // Keep track of the global timestamp changes
  useEffect(() => {
    // Make sure context always has latest global version
    if (imageVersion !== globalImageVersion) {
      setImageVersion(globalImageVersion);
    }
  }, [imageVersion]);

  return (
    <ProfileImageContext.Provider
      value={{
        imageVersion,
        refreshImage,
      }}
    >
      {children}
    </ProfileImageContext.Provider>
  );
}

export function useProfileImage() {
  const context = useContext(ProfileImageContext);
  if (!context) {
    throw new Error('useProfileImage must be used within a ProfileImageProvider');
  }
  return context;
}