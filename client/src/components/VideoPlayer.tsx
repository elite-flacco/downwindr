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
              <div className="relative aspect-video w-full bg-[url('/attached_assets/d2598bca-0fed-425d-8ccf-e9e18a8f0b43.png')] bg-contain bg-center bg-no-repeat">
                {/* Clean custom background with minimal thumbnail */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="relative w-full h-full overflow-hidden bg-white">
                    {/* Kitesurfer illustration background */}
                    <div className="absolute inset-0 opacity-[0.15]" 
                      style={{ 
                        backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'1024\' height=\'1024\' viewBox=\'0 0 1024 1024\' fill=\'none\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cpath d=\'M695 150c-4.667 1.333-14.6 4.4-29.8 9.2-22.8 7.2-45.367 15.4-67.7 24.6-33.533 13.733-67.4 28.733-101.6 45-34.2 16.267-63.267 31.533-87.2 45.8-35.933 21.467-69.133 43.667-99.6 66.6-30.467 22.933-56.867 44.733-79.2 65.4-29.867 27.733-56.733 54.933-80.6 81.6-23.867 26.667-43.733 51.733-59.6 75.2-21.2 31.333-39.133 61.467-53.8 90.4-14.667 28.933-25.8 55.867-33.4 80.8-10 32.667-16.533 63.867-19.6 93.6-3.067 29.733-2.8 57.333.8 82.8 4.8 34 13.6 64.8 26.4 92.4 12.8 27.6 29.2 51.8 49.2 72.6 26.8 27.867 58.4 49.6 94.8 65.2 36.4 15.6 76.4 24.4 120 26.4 58.4 2.667 121.2-4.4 188.4-21.2 67.2-16.8 137.733-42.533 211.6-77.2 110.4-51.733 227.6-121.733 351.6-210 82.667-58.933 159.333-121.2 230-186.8-70.667-65.6-147.333-127.867-230-186.8-124-88.267-241.2-158.267-351.6-210-73.867-34.667-144.4-60.4-211.6-77.2-67.2-16.8-130-23.867-188.4-21.2-43.6 2-83.6 10.8-120 26.4-36.4 15.6-68 37.333-94.8 65.2-20 20.8-36.4 45-49.2 72.6-12.8 27.6-21.6 58.4-26.4 92.4-3.6 25.467-3.867 53.067-.8 82.8 3.067 29.733 9.6 60.933 19.6 93.6 7.6 24.933 18.733 51.867 33.4 80.8 14.667 28.933 32.6 59.067 53.8 90.4 15.867 23.467 35.733 48.533 59.6 75.2 23.867 26.667 50.733 53.867 80.6 81.6 22.333 20.667 48.733 42.467 79.2 65.4 30.467 22.933 63.667 45.133 99.6 66.6 23.933 14.267 52.667 29.533 86.2 45.8 33.533 16.267 67.4 31.267 101.6 45 22.333 9.2 45.233 17.4 68.7 24.6 15.2 4.8 25.133 7.867 29.8 9.2\' stroke=\'%2315AABF\' stroke-width=\'2\'/%3E%3C/svg%3E")',
                        backgroundSize: 'contain',
                        backgroundPosition: 'center',
                        backgroundRepeat: 'no-repeat'
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