import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Play, Clock, AlertCircle } from "lucide-react";
import { SiYoutube } from "react-icons/si";
import type { LearnVideo } from "@/data/learnVideos";

interface VideoPlayerProps {
  video: LearnVideo;
}

export default function VideoPlayer({ video }: VideoPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [loadError, setLoadError] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

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
    <Card className="overflow-hidden h-full transition-all duration-200 hover:shadow-md group bg-white border border-slate-200">
      <CardContent className="p-0 h-full flex flex-col">
        {!isPlaying || loadError ? (
          <div 
            className="relative" 
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            <div className="overflow-hidden">
              {/* Custom styled thumbnail design with consistent appearance */}
              <div className="relative aspect-video w-full bg-slate-50">
                {/* Clean custom background with minimal thumbnail */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="relative w-full h-full overflow-hidden bg-gradient-to-br from-sky-50 to-slate-50">
                    {/* Pattern overlay for texture */}
                    <div className="absolute inset-0 opacity-10" 
                      style={{ 
                        backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'20\' height=\'20\' viewBox=\'0 0 20 20\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'%230284c7\' fill-opacity=\'0.2\' fill-rule=\'evenodd\'%3E%3Ccircle cx=\'3\' cy=\'3\' r=\'1.5\'/%3E%3Ccircle cx=\'13\' cy=\'13\' r=\'1.5\'/%3E%3C/g%3E%3C/svg%3E")',
                        backgroundSize: '20px 20px'
                      }}>
                    </div>
                    
                    {/* Small YouTube thumbnail in circle with decorated border - in bottom right */}
                    <div className="absolute bottom-4 right-4">
                      {/* Decorative outer ring */}
                      <div className="w-[60px] h-[60px] rounded-full bg-gradient-to-tr from-theme-primary/30 to-white p-[2px] shadow-lg">
                        {/* White inner ring */}
                        <div className="w-full h-full rounded-full p-[2px] bg-white">
                          {/* Actual thumbnail container */}
                          <div className="w-full h-full rounded-full overflow-hidden">
                            {/* Loading placeholder */}
                            <div className="absolute inset-0 bg-slate-200 animate-pulse"></div>
                            
                            {/* Cropped thumbnail */}
                            <img 
                              src={video.thumbnailUrl} 
                              alt="" 
                              className="absolute inset-0 w-full h-full object-cover" 
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                    
                  </div>
                </div>
                
                {/* Interactive overlay */}
                <div 
                  className="absolute inset-0 z-20 cursor-pointer"
                  onClick={handlePlayClick}
                ></div>
              </div>
            </div>

            {/* Play button with consistent look */}
            <div 
              className={`absolute inset-0 z-30 flex items-center justify-center cursor-pointer transition-all duration-300 ${isHovered ? 'opacity-100' : 'opacity-80'}`}
              onClick={handlePlayClick}
            >
              <div className="relative">
                {/* White ring for emphasis */}
                <div className="absolute -inset-1 bg-white/40 rounded-full"></div>
                
                {/* Actual button */}
                <button 
                  className="bg-white text-theme-primary p-3 rounded-full transform transition-all duration-300 shadow-lg relative z-10 group-hover:bg-theme-primary group-hover:text-white"
                >
                  <Play className="h-6 w-6 fill-current" />
                </button>
              </div>
            </div>
            
            {loadError && (
              <div className="absolute inset-0 bg-black/80 flex flex-col items-center justify-center px-4 text-center">
                <AlertCircle className="h-8 w-8 text-red-500 mb-2" />
                <p className="text-white text-sm mb-2">Unable to load embedded video</p>
                <button 
                  className="bg-red-600/80 hover:bg-red-600 text-white px-3 py-1 rounded-md text-xs flex items-center"
                  onClick={handleExternalLinkClick}
                >
                  <SiYoutube className="h-4 w-4 mr-1" />
                  Watch on YouTube
                </button>
              </div>
            )}
          </div>
        ) : (
          <div className="aspect-video w-full relative">
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
                className="bg-black/70 text-red-600/80 hover:text-red-600 p-1 rounded-md flex items-center"
                onClick={handleExternalLinkClick}
                title="Open in YouTube"
              >
                <SiYoutube className="h-5 w-5" />
              </button>
            </div>
          </div>
        )}
        
        <div className="p-4 flex-grow flex flex-col justify-between">
          {/* Simplified title */}
          <div>
            <p className="text-base font-semibold mb-2 line-clamp-1" title={video.title}>
              {video.title}
            </p>
            <p className="text-xs text-gray-500 mb-4 line-clamp-2">{video.description}</p>
          </div>
          
          {/* Unified metadata style */}
          <div>
            {/* Unified tag row */}
            <div className="flex flex-wrap items-center justify-between gap-1 mb-3">
              <div className="flex flex-wrap items-center gap-1">
                <Badge 
                  variant="outline" 
                  className={`
                    text-xs px-2 py-0 h-5
                    ${video.level === 'beginner' 
                      ? 'bg-green-50 text-green-700 border-green-100' 
                      : video.level === 'intermediate' 
                      ? 'bg-amber-50 text-amber-700 border-amber-100' 
                      : 'bg-rose-50 text-rose-700 border-rose-100'}
                  `}
                >
                  {video.level}
                </Badge>
                
                {video.categories.slice(0, 2).map((category) => (
                  <Badge key={category} variant="outline" className="bg-slate-50 text-slate-600 border-slate-100 text-xs px-2 py-0 h-5">
                    {category}
                  </Badge>
                ))}
                
                {video.categories.length > 2 && (
                  <span className="text-xs text-slate-400">+{video.categories.length - 2}</span>
                )}
              </div>
              
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1">
                  <Clock className="h-3 w-3 text-slate-400" />
                  <span className="text-xs text-slate-400">{video.duration}</span>
                </div>
                
                <button
                  onClick={handleExternalLinkClick}
                  className="text-red-500/80 hover:text-red-600 transition-colors"
                  title="Watch on YouTube"
                >
                  <SiYoutube className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}