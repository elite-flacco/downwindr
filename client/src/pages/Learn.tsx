import Footer from "@/components/Footer";
import VideoFilters from "@/components/VideoFilters";
import VideoPlayer from "@/components/VideoPlayer";
import { learnVideos } from "@/data/learnVideos";
import { motion } from "framer-motion";
import { GraduationCap, PlayCircle, TrendingUp, Video } from "lucide-react";
import { useMemo, useState } from "react";

export default function Learn() {
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedLevel, setSelectedLevel] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredVideos = useMemo(() => {
    return learnVideos.filter((video) => {
      // Filter by search query
      const matchesSearch =
        video.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        video.description.toLowerCase().includes(searchQuery.toLowerCase());

      // Filter by category
      const matchesCategory =
        selectedCategory === "" ||
        video.categories.includes(selectedCategory);

      // Filter by level
      const matchesLevel =
        selectedLevel === "" ||
        video.level === selectedLevel;

      return matchesSearch && matchesCategory && matchesLevel;
    });
  }, [selectedCategory, selectedLevel, searchQuery]);

  const stats = useMemo(() => {
    const totalVideos = learnVideos.length;
    const beginnerCount = learnVideos.filter(v => v.level === 'beginner').length;
    const intermediateCount = learnVideos.filter(v => v.level === 'intermediate').length;
    const advancedCount = learnVideos.filter(v => v.level === 'advanced').length;
    const totalDuration = learnVideos.reduce((acc, video) => {
      const [minutes, seconds] = video.duration.split(':').map(Number);
      return acc + minutes + (seconds / 60);
    }, 0);

    return {
      totalVideos,
      beginnerCount,
      intermediateCount,
      advancedCount,
      totalHours: Math.floor(totalDuration / 60),
      totalMinutes: Math.floor(totalDuration % 60)
    };
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      <main className="container mx-auto px-4 py-8 flex-grow">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Header Section */}
          <div className="mb-8">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="mb-3 flex items-center gap-2">
                  <GraduationCap className="h-6 w-6 md:h-8 md:w-8 text-theme-primary" />
                  From Zero to Hero
                </h3>
                <p className="text-theme-text-light">Curated videos and resources to help you improve your kitesurfing skills</p>
              </div>

              {/* Quick stats */}
              <div className="hidden md:flex items-center gap-4 text-sm text-slate-500">
                <span className="flex items-center gap-1">
                  <Video className="h-4 w-4" />
                  {stats.totalVideos} videos
                </span>
                <span className="flex items-center gap-1">
                  <TrendingUp className="h-4 w-4" />
                  {stats.totalHours}h {stats.totalMinutes}m
                </span>
              </div>
            </div>
          </div>

          <VideoFilters
            onCategoryChange={setSelectedCategory}
            onLevelChange={setSelectedLevel}
            onSearchChange={setSearchQuery}
            selectedCategory={selectedCategory}
            selectedLevel={selectedLevel}
            searchQuery={searchQuery}
          />

          {filteredVideos.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
              className="text-center py-16"
            >
              <div className="max-w-md mx-auto">
                <div className="bg-gradient-to-r from-theme-surface/30 to-theme-surface/60 rounded-full p-6 w-20 h-20 mx-auto mb-6 flex items-center justify-center">
                  <PlayCircle className="h-8 w-8 text-theme-text-light" />
                </div>
                <h3 className="mb-2">No videos found</h3>
                <p className="text-theme-text-light mb-6">Try adjusting your filters or search terms to find the perfect learning content.</p>
                <button
                  onClick={() => {
                    setSelectedCategory("");
                    setSelectedLevel("");
                    setSearchQuery("");
                  }}
                  className="bg-theme-primary text-white px-6 py-2 rounded-lg hover:bg-theme-primary/90 transition-colors"
                >
                  Clear all filters
                </button>
              </div>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, staggerChildren: 0.1 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-8"
            >
              {filteredVideos.map((video, index) => (
                <motion.div
                  key={video.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <VideoPlayer video={video} />
                </motion.div>
              ))}
            </motion.div>
          )}

          {/* Results count */}
          {filteredVideos.length > 0 && (
            <div className="mt-8 text-center">
              <p className="text-sm text-theme-text-light">
                Showing {filteredVideos.length} of {stats.totalVideos} videos
              </p>
            </div>
          )}
        </motion.div>
      </main>

      <Footer />
    </div>
  );
}