import { useState, useMemo } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import VideoPlayer from "@/components/VideoPlayer";
import VideoFilters from "@/components/VideoFilters";
import { learnVideos } from "@/data/learnVideos";
import { motion } from "framer-motion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { GraduationCap, Video, Lightbulb } from "lucide-react";

export default function Learn() {
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedLevel, setSelectedLevel] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [tabValue, setTabValue] = useState("videos");

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

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="container mx-auto px-4 py-0 flex-grow">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* <div className="mb-6">
            <h1 className="text-3xl font-bold text-theme-primary mb-2">Learn & Improve</h1>
            <p className="text-lg text-theme-text-light">Boost your kitesurfing skills with curated videos and resources</p>
          </div> */}

          <Tabs 
            defaultValue="videos" 
            value={tabValue} 
            onValueChange={setTabValue}
            className="mb-6"
          >
            {/* <TabsList className="grid w-full md:w-auto grid-cols-2">
              <TabsTrigger value="videos" className="flex items-center">
                <Video className="h-4 w-4 mr-2" />
                Video Library
              </TabsTrigger>
              <TabsTrigger value="resources" className="flex items-center">
                <GraduationCap className="h-4 w-4 mr-2" />
                Learning Resources
              </TabsTrigger>
            </TabsList> */}
            
            <TabsContent value="videos" className="mt-6">
              <VideoFilters 
                onCategoryChange={setSelectedCategory}
                onLevelChange={setSelectedLevel}
                onSearchChange={setSearchQuery}
                selectedCategory={selectedCategory}
                selectedLevel={selectedLevel}
                searchQuery={searchQuery}
              />
              
              {filteredVideos.length === 0 ? (
                <div className="text-center py-12">
                  <p className="text-lg text-gray-500">No videos match your filters. Try adjusting your search criteria.</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredVideos.map((video) => (
                    <VideoPlayer key={video.id} video={video} />
                  ))}
                </div>
              )}
            </TabsContent>
            
            <TabsContent value="resources" className="mt-6">
              <div className="bg-theme-primary/5 border border-theme-primary/20 rounded-lg p-6 mb-6">
                <div className="flex items-start mb-4">
                  <Lightbulb className="h-6 w-6 text-theme-primary mr-3 mt-1" />
                  <div>
                    <h2 className="text-xl font-semibold mb-2">Coming Soon!</h2>
                    <p className="text-theme-text-light">
                      We're building a comprehensive learning section with articles, tutorials, and interactive lessons.
                      Check back soon for more educational content to enhance your kitesurfing journey.
                    </p>
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </motion.div>
      </main>
      
      <Footer />
    </div>
  );
}