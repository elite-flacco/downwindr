import Footer from "@/components/Footer";
import SEOHelmet from "@/components/SEOHelmet";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { useAuth } from "@/contexts/AuthContext";
import { getCountryFlag } from "@/lib/countryUtils";
import { apiRequest } from "@/lib/queryClient";
import { useQuery } from "@tanstack/react-query";
import { format } from "date-fns";
import { motion } from "framer-motion";
import { ArrowRight, Calendar, Clock, Filter, MapPin, MessageCircle, Search, Star, Users, X } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { Link } from "wouter";

type ReviewWithUser = {
  id: number;
  userId: string;
  spotId: number;
  content: string;
  visitDate: string | null;
  createdAt: string;
  updatedAt: string;
  user: {
    id: string;
    username: string;
    displayName: string | null;
    avatarUrl: string | null;
    experience: string | null;
  };
  spot: {
    id: number;
    name: string;
    country: string;
  };
};

export default function Community() {
  const { user } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSpot, setSelectedSpot] = useState('all');
  
  const { data: recentReviews, isLoading } = useQuery({
    queryKey: ['recent-reviews'],
    queryFn: async () => {
      const response = await apiRequest('GET', '/api/reviews/recent');
      const data = await response.json();
      return data as ReviewWithUser[];
    }
  });

  // Get unique spots for filter dropdown
  const uniqueSpots = useMemo(() => {
    if (!recentReviews) return [];
    const spots = recentReviews.map(review => review.spot);
    const uniqueSpots = spots.filter((spot, index, self) => 
      index === self.findIndex(s => s.id === spot.id)
    );
    return uniqueSpots.sort((a, b) => a.name.localeCompare(b.name));
  }, [recentReviews]);

  // Filter reviews based on search and spot selection
  const filteredReviews = useMemo(() => {
    if (!recentReviews) return [];
    
    return recentReviews.filter(review => {
      const matchesSearch = searchTerm === '' || 
        review.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
        review.spot.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        review.spot.country.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (review.user.displayName && review.user.displayName !== 'New User' 
          ? review.user.displayName.toLowerCase().includes(searchTerm.toLowerCase())
          : review.user.username.toLowerCase().includes(searchTerm.toLowerCase()));
      
      const matchesSpot = selectedSpot === '' || selectedSpot === 'all' || review.spot.id.toString() === selectedSpot;
      
      return matchesSearch && matchesSpot;
    });
  }, [recentReviews, searchTerm, selectedSpot]);

  const communityStructuredData = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Downwindr Community",
    "description": "Join the global kitesurfing community. Share experiences, read reviews, and connect with fellow kiters worldwide.",
    "url": "https://downwindr.com/community",
    "sameAs": [
      "https://downwindr.com"
    ],
    "aggregateRating": recentReviews && recentReviews.length > 0 ? {
      "@type": "AggregateRating",
      "ratingCount": recentReviews.length,
      "reviewCount": recentReviews.length
    } : undefined
  };

  return (
    <div className="flex flex-col min-h-screen">
      <SEOHelmet
        title="Kitesurfing Community - Reviews, Tips & Connections | Downwindr"
        description="Join the global kitesurfing community on Downwindr. Share experiences, read authentic reviews, and connect with fellow kiters from around the world."
        keywords="kitesurfing community, kiteboarding reviews, kite surfing forum, water sports community, surfing connections, kite spots reviews"
        ogTitle="Join the Global Kitesurfing Community | Downwindr"
        ogDescription="Connect with kiters worldwide, share your experiences, and discover amazing spots through our community reviews and discussions."
        structuredData={communityStructuredData}
      />
      <main className="container mx-auto px-4 pt-8 pb-20 flex-grow">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-6xl mx-auto"
        >
          {/* Header */}
          <div className="text-center mb-12">
            <h2 className="mb-4">Join Our Community</h2>
            <p className="text-theme-text/70 mb-6 max-w-2xl mx-auto">
              Share experiences, discuss spots, and connect with fellow kiters from around the world
            </p>
            
            {/* Community Stats */}
            {/* <div className="flex justify-center items-center gap-8 mb-8">
              <div className="text-center">
                <div className="text-2xl font-bold text-theme-primary">
                  {recentReviews?.length || 0}+
                </div>
                <div className="text-sm text-theme-text/60">Reviews</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-theme-primary">🌍</div>
                <div className="text-sm text-theme-text/60">Global Community</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-theme-primary">✅</div>
                <div className="text-sm text-theme-text/60">Active Now</div>
              </div>
            </div> */}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Recent Reviews - Takes up 2 columns */}
            <div className="lg:col-span-2">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold">Community Reviews</h2>
                {user && (
                  <Link href="/spots">
                    <Button variant="accent" size="sm">
                      Write a Review <ArrowRight className="w-4 h-4 ml-1" />
                    </Button>
                  </Link>
                )}
              </div>

              {/* Search and Filter Controls */}
              <div className="flex flex-col sm:flex-row gap-3 mb-6">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    placeholder="Search reviews, spots, or users..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <Select value={selectedSpot} onValueChange={setSelectedSpot}>
                  <SelectTrigger className="w-full sm:w-64">
                    <div className="flex items-center gap-2">
                      <Filter className="w-4 h-4" />
                      <SelectValue placeholder="Filter by spot" />
                    </div>
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Spots</SelectItem>
                    {uniqueSpots.map((spot) => (
                      <SelectItem key={spot.id} value={spot.id.toString()}>
                        <div className="flex items-center gap-2">
                          {getCountryFlag(spot.country) && (
                            <img 
                              src={getCountryFlag(spot.country)?.url} 
                              alt={`${spot.country} flag`}
                              className="w-4 h-3 object-cover rounded-sm"
                            />
                          )}
                          <span>{spot.name}</span>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Results count */}
              {recentReviews && (
                <div className="flex items-center gap-2 mb-4 text-sm text-muted-foreground">
                  <span>Showing {filteredReviews.length} of {recentReviews.length} reviews</span>
                  {(searchTerm || (selectedSpot && selectedSpot !== 'all')) && (
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      onClick={() => {
                        setSearchTerm('');
                        setSelectedSpot('all');
                      }}
                      className="h-auto px-2 py-1 text-xs"
                    >
                      <X className="w-2 h-2" />
                      Clear
                    </Button>
                  )}
                </div>
              )}
              
              {isLoading ? (
                <div className="space-y-4">
                  {[1, 2, 3].map((i) => (
                    <Card key={i} className="animate-pulse">
                      <CardHeader>
                        <div className="flex items-center space-x-3">
                          <div className="w-10 h-10 bg-gray-200 rounded-full"></div>
                          <div className="space-y-2">
                            <div className="w-24 h-4 bg-gray-200 rounded"></div>
                            <div className="w-32 h-3 bg-gray-200 rounded"></div>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="w-full h-16 bg-gray-200 rounded"></div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : filteredReviews && filteredReviews.length > 0 ? (
                <div className="space-y-4 max-h-[70vh] overflow-y-auto pr-2">
                  {filteredReviews.map((review) => (
                    <Card key={review.id} className="hover:shadow-md transition-shadow">
                      <CardHeader className="pb-3">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-3">
                            <Avatar className="h-10 w-10">
                              <AvatarImage src={review.user.avatarUrl || undefined} alt={review.user.username} />
                              <AvatarFallback className="bg-primary text-primary-foreground">
                                {review.user.username.substring(0, 2).toUpperCase()}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <div className="font-semibold">
                                {review.user.displayName && review.user.displayName !== 'New User' 
                                  ? review.user.displayName 
                                  : review.user.username}
                              </div>
                              <div className="text-sm text-muted-foreground flex items-center gap-2">
                                {review.user.experience && (
                                  <span className="inline-block px-2 py-0.5 text-xs rounded-full bg-primary/10 text-primary">
                                    {review.user.experience}
                                  </span>
                                )}
                                <span className="flex items-center gap-1">
                                  <Clock className="w-3 h-3" />
                                  {format(new Date(review.createdAt), 'MMM d, yyyy')}
                                </span>
                              </div>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="flex items-center gap-1 text-sm text-muted-foreground">
                              <MapPin className="w-4 h-4" />
                              <span className="font-medium">{review.spot.name}</span>
                            </div>
                            <div className="flex items-center justify-end gap-1 text-xs text-muted-foreground">
                              <span>{review.spot.country}</span>
                              {getCountryFlag(review.spot.country) && (
                                <img 
                                  src={getCountryFlag(review.spot.country)?.url} 
                                  alt={`${review.spot.country} flag`}
                                  className="w-4 h-3 object-cover rounded-sm"
                                />
                              )}
                            </div>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm leading-relaxed">{review.content}</p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : (
                <Card className="border-dashed">
                  <CardContent className="pt-6 text-center py-10">
                    <MessageCircle className="w-12 h-12 mx-auto mb-4 text-gray-400" />
                    <h3 className="font-semibold mb-2">No Reviews Yet</h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      Be the first to share your kitesurfing experience!
                    </p>
                    {user ? (
                      <Link href="/spots">
                        <Button variant="outline">
                          Write First Review
                        </Button>
                      </Link>
                    ) : (
                      <Link href="/auth">
                        <Button variant="outline">
                          Login to Review
                        </Button>
                      </Link>
                    )}
                  </CardContent>
                </Card>
              )}
            </div>

            {/* What's Available & Coming Soon - Takes up 1 column */}
            <div className="space-y-6">
              {/* What's Available Now */}
              <Card className="border-theme-primary/20 bg-theme-primary/5 shadow-md">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-theme-primary">
                    <span className="text-lg">✅</span>
                    Live Now
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center gap-3 text-sm">
                    <Star className="w-4 h-4 text-theme-primary" />
                    <span>Share & discover spot reviews</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm">
                    <MapPin className="w-4 h-4 text-theme-primary" />
                    <span>Explore global kitesurfing spots</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm">
                    <Users className="w-4 h-4 text-theme-primary" />
                    <span>Connect with fellow kiters</span>
                  </div>
                </CardContent>
              </Card>

              {/* Coming Soon */}
              <Card className="border-theme-primary/20 shadow-md">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <span className="text-lg">🚧</span>
                    Coming Soon
                  </CardTitle>
                  <CardDescription>
                    Help us build the future of kitesurfing community
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center gap-3 text-sm">
                    <MessageCircle className="w-4 h-4" />
                    <span>Community forums & discussions</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm">
                    <Calendar className="w-4 h-4" />
                    <span>Local meetups & events</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm">
                    <Users className="w-4 h-4" />
                    <span>Find kite buddies nearby</span>
                  </div>
                </CardContent>
                <CardFooter className="flex flex-col gap-2">
                  <Button
                    size="sm"
                    variant="default"
                    className="w-full"
                    onClick={() => window.open('https://forms.gle/qJJGEmZheciTxncK8', '_blank')}
                  >
                    💌 Share ideas
                  </Button>
                  <Button
                    size="sm"
                    variant="ghost"
                    className="w-full text-xs"
                    onClick={() => window.open('https://forms.gle/upasRGT7aQwFmgSB6', '_blank')}
                  >
                    ✋ Sign me up for updates
                  </Button>
                </CardFooter>
              </Card>

              {/* Join Now CTA */}
              {!user && (
                <Card className="border-theme-action/40 bg-gradient-to-br from-theme-action/5 to-theme-action/10">
                  <CardHeader className="text-center">
                    <CardTitle className="text-theme-action">Ready to Join?</CardTitle>
                    <CardDescription>
                      Start sharing your kitesurfing experiences today
                    </CardDescription>
                  </CardHeader>
                  <CardFooter>
                    <Link href="/auth" className="w-full">
                      <Button variant="action" className="w-full">
                        Join the Community
                      </Button>
                    </Link>
                  </CardFooter>
                </Card>
              )}
            </div>
          </div>
        </motion.div>
      </main>
      <Footer />
    </div>
  );
}