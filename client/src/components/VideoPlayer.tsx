import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Play, Clock, ExternalLink, AlertCircle, Youtube } from "lucide-react";
import type { LearnVideo } from "@/data/learnVideos";

interface VideoPlayerProps {
  video: LearnVideo;
}

export default function VideoPlayer({ video }: VideoPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [loadError, setLoadError] = useState(false);

  // Reset error state when video changes
  useEffect(() => {
    setLoadError(false);
    setIsPlaying(false);
  }, [video.id]);

  const handlePlayClick = () => {
    setIsPlaying(true);
    setLoadError(false);
  };

  const handleVideoError = () => {
    setLoadError(true);
    console.error("Error loading video:", video.youtubeId);
  };

  const handleExternalLinkClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    window.open(`https://www.youtube.com/watch?v=${video.youtubeId}`, '_blank', 'noopener,noreferrer');
  };

  return (
    <Card className="overflow-hidden">
      <CardContent className="p-0">
        {!isPlaying || loadError ? (
          <div className="relative group">
            <img 
              src={video.thumbnailUrl} 
              alt={video.title} 
              className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105" 
            />
            <div 
              className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center cursor-pointer"
              onClick={handlePlayClick}
            >
              <button 
                className="bg-theme-primary text-white p-3 rounded-full transform transition-transform duration-300 group-hover:scale-110"
              >
                <Play className="h-6 w-6" />
              </button>
            </div>
            
            {/* External link button */}
            <div 
              className="absolute top-2 right-2 bg-black/70 text-white p-1.5 rounded-md flex items-center cursor-pointer hover:bg-black/90 transition-colors"
              onClick={handleExternalLinkClick}
              title="Open in YouTube"
            >
              <Youtube className="h-4 w-4" />
            </div>
            
            <div className="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded-md flex items-center">
              <Clock className="h-3 w-3 mr-1" />
              {video.duration}
            </div>
            
            {loadError && (
              <div className="absolute inset-0 bg-black/80 flex flex-col items-center justify-center px-4 text-center">
                <AlertCircle className="h-8 w-8 text-red-500 mb-2" />
                <p className="text-white text-sm mb-2">Unable to load embedded video</p>
                <button 
                  className="bg-theme-primary text-white px-3 py-1 rounded-md text-xs flex items-center"
                  onClick={handleExternalLinkClick}
                >
                  <ExternalLink className="h-3 w-3 mr-1" />
                  Watch on YouTube
                </button>
              </div>
            )}
          </div>
        ) : (
          <div className="h-48 w-full relative">
            <iframe
              width="100%"
              height="100%"
              src={`https://www.youtube.com/embed/${video.youtubeId}?autoplay=1&rel=0&modestbranding=1`}
              title={video.title}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
              onError={handleVideoError}
              loading="lazy"
            ></iframe>
            
            {/* Fallback button if iframe doesn't trigger error event */}
            <div className="absolute top-2 right-2 z-10">
              <button 
                className="bg-black/70 text-white text-xs px-2 py-1 rounded-md flex items-center"
                onClick={handleExternalLinkClick}
                title="Open in YouTube"
              >
                <ExternalLink className="h-3 w-3 mr-1" />
                YouTube
              </button>
            </div>
          </div>
        )}
        
        <div className="p-4">
          <h3 className="font-semibold text-lg mb-1 line-clamp-1">{video.title}</h3>
          <p className="text-sm text-gray-600 mb-3 line-clamp-2">{video.description}</p>
          
          <div className="flex flex-wrap gap-2 mb-2">
            {video.categories.map((category) => (
              <Badge key={category} variant="outline" className="bg-theme-primary/10 text-theme-primary">
                {category}
              </Badge>
            ))}
          </div>
          
          <div className="flex items-center">
            <Badge 
              variant="outline" 
              className={`
                ${video.level === 'beginner' 
                  ? 'bg-green-100 text-green-800 border-green-200' 
                  : video.level === 'intermediate' 
                  ? 'bg-yellow-100 text-yellow-800 border-yellow-200' 
                  : 'bg-red-100 text-red-800 border-red-200'}
              `}
            >
              {video.level}
            </Badge>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}