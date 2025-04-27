import { createContext, useContext, useState, ReactNode } from 'react';

type ProfileImageContextType = {
  imageVersion: number;
  refreshImage: () => void;
};

const ProfileImageContext = createContext<ProfileImageContextType | null>(null);

export function ProfileImageProvider({ children }: { children: ReactNode }) {
  const [imageVersion, setImageVersion] = useState(0);

  const refreshImage = () => {
    // Increment version to force all avatar components to re-render with a new cache key
    setImageVersion(prev => prev + 1);
  };

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

// Helper function to add cache-busting to avatar URLs
export function getTimestampedUrl(url: string | null, imageVersion: number): string | undefined {
  if (!url) return undefined;
  return `${url}?v=${imageVersion}&t=${new Date().getTime()}`;
}