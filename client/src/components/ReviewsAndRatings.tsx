import { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useQuery, useMutation } from "@tanstack/react-query";
import { Review, Rating, User } from "@shared/schema";
import { apiRequest, queryClient } from "../lib/queryClient";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useToast } from "@/hooks/use-toast";
import { Link } from "wouter";
import { Star, Edit2, Trash2, AlertCircle, PlusCircle, ThumbsUp, Loader2 } from "lucide-react";
import { format } from "date-fns";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger, DialogFooter, DialogClose } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { Progress } from "@/components/ui/progress";
import { motion } from "framer-motion";

// Types
type ReviewWithUser = Review & {
  user: Pick<User, 'id' | 'username' | 'displayName' | 'avatarUrl' | 'experience'>;
};

type RatingBreakdown = {
  windReliability: number;
  beginnerFriendly: number;
  scenery: number;
  uncrowded: number;
  localVibe: number;
  overall: number;
};

type SpotDetails = {
  spot: any;
  windConditions: any[];
  reviews: ReviewWithUser[];
  averageRating: number;
  totalRatings: number;
  ratingBreakdown: RatingBreakdown;
};

// Review form schema
const reviewFormSchema = z.object({
  content: z.string().min(10, "Review must be at least 10 characters"),
  visitDate: z.date().optional()
});

// Rating form schema
const ratingFormSchema = z.object({
  windReliability: z.number().min(1).max(5),
  beginnerFriendly: z.number().min(1).max(5),
  scenery: z.number().min(1).max(5),
  uncrowded: z.number().min(1).max(5),
  localVibe: z.number().min(1).max(5),
  overall: z.number().min(1).max(5),
});

type RatingKeys = keyof RatingBreakdown;

const ratingLabels: Record<RatingKeys, string> = {
  windReliability: "Wind Reliability",
  beginnerFriendly: "Beginner Friendly",
  scenery: "Scenery",
  uncrowded: "Uncrowded",
  localVibe: "Local Vibe",
  overall: "Overall"
};

export default function ReviewsAndRatings({ spotId }: { spotId: number }) {
  const { user } = useAuth();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState<string>("reviews");
  const [reviewDialogOpen, setReviewDialogOpen] = useState(false);
  const [ratingDialogOpen, setRatingDialogOpen] = useState(false);
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
  const [editReviewDialogOpen, setEditReviewDialogOpen] = useState(false);
  const [currentReviewId, setCurrentReviewId] = useState<number | null>(null);
  const [currentReviewContent, setCurrentReviewContent] = useState("");
  const [selectedStars, setSelectedStars] = useState<Record<string, number>>({
    windReliability: 3,
    beginnerFriendly: 3,
    scenery: 3,
    uncrowded: 3,
    localVibe: 3,
    overall: 3
  });

  // Fetch spot details with ratings and reviews
  const { 
    data: spotDetails, 
    loading,
    error,
    refetch
  } = useQuery<SpotDetails>({
    queryKey: [`/api/spots/${spotId}/details`],
  });

  // Check if the user has already rated the spot
  const { data: userRating } = useQuery<Rating>({
    queryKey: [`/api/spots/${spotId}/ratings/user`],
    enabled: !!user && !!spotId,
    retry: false, // Don't retry on 404
    staleTime: 60000, // 1 minute
    gcTime: 300000, // 5 minutes
  });

  // Submit review mutation
  const reviewMutation = useMutation({
    mutationFn: async (data: z.infer<typeof reviewFormSchema>) => {
      const res = await apiRequest("POST", "/api/reviews", {
        ...data,
        spotId,
      });
      return await res.json();
    },
    onSuccess: () => {
      toast({
        title: "Review submitted",
        description: "Your review has been successfully submitted!",
      });
      // First invalidate the query cache
      queryClient.invalidateQueries({ queryKey: [`/api/spots/${spotId}/details`] });
      // Then explicitly refetch to ensure UI updates
      refetch();
      // Close the dialog
      setReviewDialogOpen(false);
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: error.message || "Failed to submit review. Please try again.",
        variant: "destructive",
      });
    },
  });

  // Submit rating mutation
  const ratingMutation = useMutation({
    mutationFn: async (data: z.infer<typeof ratingFormSchema>) => {
      const res = await apiRequest("POST", "/api/ratings", {
        ...data,
        spotId,
      });
      return await res.json();
    },
    onSuccess: () => {
      toast({
        title: "Rating submitted",
        description: "Your rating has been successfully submitted!",
      });
      // First invalidate the query cache
      queryClient.invalidateQueries({ queryKey: [`/api/spots/${spotId}/details`] });
      // Then explicitly refetch to ensure UI updates
      refetch();
      // Close the dialog
      setRatingDialogOpen(false);
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: error.message || "Failed to submit rating. Please try again.",
        variant: "destructive",
      });
    },
  });
  
  // Edit review mutation
  const editReviewMutation = useMutation({
    mutationFn: async ({ id, content }: { id: number; content: string }) => {
      const res = await apiRequest("PUT", `/api/reviews/${id}`, { content });
      return await res.json();
    },
    onSuccess: () => {
      toast({
        title: "Review updated",
        description: "Your review has been successfully updated!",
      });
      queryClient.invalidateQueries({ queryKey: [`/api/spots/${spotId}/details`] });
      refetch();
      setEditReviewDialogOpen(false);
      setCurrentReviewId(null);
      setCurrentReviewContent("");
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: error.message || "Failed to update review. Please try again.",
        variant: "destructive",
      });
    },
  });
  
  // Delete review mutation
  const deleteReviewMutation = useMutation({
    mutationFn: async (id: number) => {
      const res = await apiRequest("DELETE", `/api/reviews/${id}`);
      return id;
    },
    onSuccess: () => {
      toast({
        title: "Review deleted",
        description: "Your review has been successfully deleted.",
      });
      queryClient.invalidateQueries({ queryKey: [`/api/spots/${spotId}/details`] });
      refetch();
      setDeleteConfirmOpen(false);
      setCurrentReviewId(null);
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: error.message || "Failed to delete review. Please try again.",
        variant: "destructive",
      });
    },
  });

  // Review form setup
  const reviewForm = useForm<z.infer<typeof reviewFormSchema>>({
    resolver: zodResolver(reviewFormSchema),
    defaultValues: {
      content: "",
    },
  });
  
  // Edit review form setup
  const editReviewForm = useForm<z.infer<typeof reviewFormSchema>>({
    resolver: zodResolver(reviewFormSchema),
    defaultValues: {
      content: currentReviewContent,
    },
  });
  
  // Update the form value when currentReviewContent changes
  useEffect(() => {
    editReviewForm.setValue("content", currentReviewContent);
  }, [currentReviewContent, editReviewForm]);

  // Rating form setup
  const ratingForm = useForm<z.infer<typeof ratingFormSchema>>({
    resolver: zodResolver(ratingFormSchema),
    defaultValues: userRating ? {
      windReliability: userRating.windReliability,
      beginnerFriendly: userRating.beginnerFriendly,
      scenery: userRating.scenery,
      uncrowded: userRating.uncrowded,
      localVibe: userRating.localVibe,
      overall: userRating.overall,
    } : {
      windReliability: 3,
      beginnerFriendly: 3,
      scenery: 3,
      uncrowded: 3,
      localVibe: 3,
      overall: 3,
    },
  });

  // Function to handle star rating selection
  const handleStarSelect = (category: string, value: number) => {
    setSelectedStars(prev => ({
      ...prev,
      [category]: value
    }));
    ratingForm.setValue(category as keyof z.infer<typeof ratingFormSchema>, value);
  };

  // Functions to handle form submissions
  const onReviewSubmit = (values: z.infer<typeof reviewFormSchema>) => {
    if (!user) {
      toast({
        title: "Authentication required",
        description: "Please log in to submit a review.",
        variant: "destructive",
      });
      return;
    }
    
    reviewMutation.mutate(values);
  };

  const onEditReviewSubmit = (values: z.infer<typeof reviewFormSchema>) => {
    if (!user || !currentReviewId) {
      toast({
        title: "Error",
        description: "Cannot edit review. Please try again.",
        variant: "destructive",
      });
      return;
    }
    
    editReviewMutation.mutate({
      id: currentReviewId,
      content: values.content,
    });
  };
  
  const handleEditClick = (review: Review) => {
    setCurrentReviewId(review.id);
    setCurrentReviewContent(review.content);
    setEditReviewDialogOpen(true);
  };
  
  const handleDeleteClick = (reviewId: number) => {
    setCurrentReviewId(reviewId);
    setDeleteConfirmOpen(true);
  };
  
  const confirmDelete = () => {
    if (currentReviewId) {
      deleteReviewMutation.mutate(currentReviewId);
    }
  };

  const onRatingSubmit = (values: z.infer<typeof ratingFormSchema>) => {
    if (!user) {
      toast({
        title: "Authentication required",
        description: "Please log in to submit a rating.",
        variant: "destructive",
      });
      return;
    }
    
    ratingMutation.mutate(values);
  };

  // Loading state
  if (loading) {
    return (
      <div className="flex justify-center items-center h-48">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
        <span className="ml-2 text-lg">Loading reviews and ratings...</span>
      </div>
    );
  }

  // Error state
  if (error || !spotDetails) {
    return (
      <div className="p-4 bg-destructive/10 rounded-lg text-center">
        <AlertCircle className="w-8 h-8 text-destructive mx-auto mb-2" />
        <h3 className="text-lg font-medium">Failed to load reviews and ratings</h3>
        <p className="text-muted-foreground">{error instanceof Error ? error.message : 'An unknown error occurred'}</p>
      </div>
    );
  }

  // Render star rating component
  const StarRating = ({ value, size = "small" }: { value: number, size?: "small" | "medium" | "large" }) => {
    const starSize = size === "small" ? "w-4 h-4" : size === "medium" ? "w-5 h-5" : "w-6 h-6";
    const totalStars = 5;
    
    return (
      <div className="flex">
        {[...Array(totalStars)].map((_, i) => (
          <Star 
            key={i}
            className={`${starSize} ${i < Math.round(value) ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`}
          />
        ))}
      </div>
    );
  };

  // Interactive star selector component
  const StarSelector = ({ 
    category, 
    value, 
    onChange 
  }: { 
    category: string, 
    value: number, 
    onChange: (category: string, value: number) => void 
  }) => {
    return (
      <div className="flex items-center space-x-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <motion.button
            key={star}
            type="button"
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => onChange(category, star)}
            className="focus:outline-none"
          >
            <Star 
              className={`w-7 h-7 cursor-pointer transition-colors ${
                star <= value ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'
              }`}
            />
          </motion.button>
        ))}
      </div>
    );
  };

  return (
    <div className="space-y-4">
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        {/* <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="reviews">
            Reviews ({spotDetails.reviews.length})
          </TabsTrigger>
          <TabsTrigger value="ratings">
            Ratings ({spotDetails.totalRatings})
          </TabsTrigger>
        </TabsList> */}

        {/* Reviews Tab */}
        <TabsContent value="reviews" className="space-y-4">
          {spotDetails.reviews.length === 0 ? (
            <Card className="border border-dashed">
              <CardContent className="pt-6 text-center py-10">
                <h5 className="mb-2 font-semibold">No Reviews Yet</h5>
                <p className="mb-4 text-sm">
                  Be the first to share your experience at this kitesurfing spot!
                </p>
                <div className="flex justify-center">
                  {user ? (
                    <Button 
                      onClick={() => setReviewDialogOpen(true)}
                      variant="outline" 
                      className="flex items-center gap-1"
                    >
                      <PlusCircle className="w-4 h-4" />
                      Write First Review
                    </Button>
                  ) : (
                    <Link href="/auth">
                      <Button variant="outline" className="flex items-center gap-1">
                        Login to Review
                      </Button>
                    </Link>
                  )}
                </div>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-4 max-h-[60vh] overflow-y-auto pr-2">
              {spotDetails.reviews.map((review, index) => (
                <Card key={review.id} className="overflow-hidden">
                  <CardHeader className="pb-3">
                    <div className="flex justify-between">
                      <div className="flex items-center space-x-3">
                        <Avatar className="h-10 w-10">
                          <AvatarImage 
                            src={review.user.avatarUrl || undefined} 
                            alt={review.user.username} 
                          />
                          <AvatarFallback className="bg-primary text-primary-foreground">
                            {review.user.username.substring(0, 2).toUpperCase()}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="font-semibold leading-none">
                            {review.user.displayName && review.user.displayName !== 'New User' ? review.user.displayName : review.user.username}
                          </div>
                          <div className="text-sm text-muted-foreground">
                            {review.user.experience && (
                              <span className="inline-block mr-2 px-2 py-0.5 text-xs rounded-full bg-primary/10 text-primary">
                                {review.user.experience}
                              </span>
                            )}
                            <span>{format(new Date(review.createdAt), 'PPP')}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                  
                  <CardContent className="pb-4">
                    <p>{review.content}</p>
                  </CardContent>
                  
                  {/* Show edit/delete buttons if the review is by the current user */}
                  {user && user.id === review.userId && (
                    <CardFooter className="pt-0 flex justify-end gap-2">
                      <Button 
                        size="sm" 
                        variant="outline" 
                        className="h-8"
                        onClick={() => handleEditClick(review)}
                      >
                        <Edit2 className="h-3.5 w-3.5 mr-1" />
                        Edit
                      </Button>
                      <Button 
                        size="sm" 
                        variant="destructive" 
                        className="h-8"
                        onClick={() => handleDeleteClick(review.id)}
                      >
                        <Trash2 className="h-3.5 w-3.5 mr-1" />
                        Delete
                      </Button>
                    </CardFooter>
                  )}
                </Card>
              ))}
            </div>
          )}
        </TabsContent>

        {/* Ratings Tab */}
        <TabsContent value="ratings" className="space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-xl font-semibold">Community Ratings</h3>
            
            {user ? (
              <Dialog open={ratingDialogOpen} onOpenChange={setRatingDialogOpen}>
                <DialogTrigger asChild>
                  <Button size="sm" className="flex items-center gap-1">
                    <StarRating value={0} />
                    {userRating ? 'Update Rating' : 'Rate Spot'}
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>{userRating ? 'Update Your Rating' : 'Rate This Spot'}</DialogTitle>
                    <DialogDescription>
                      Share your rating to help other kitesurfers find the best spots.
                    </DialogDescription>
                  </DialogHeader>
                  
                  <Form {...ratingForm}>
                    <form onSubmit={ratingForm.handleSubmit(onRatingSubmit)} className="space-y-6">
                      <div className="grid gap-4">
                        {Object.entries(ratingLabels).map(([key, label]) => (
                          <FormField
                            key={key}
                            control={ratingForm.control}
                            name={key as keyof z.infer<typeof ratingFormSchema>}
                            render={({ field }) => (
                              <FormItem className="space-y-0">
                                <div className="flex justify-between items-center">
                                  <span className="text-sm font-medium">{label}</span>
                                  <FormControl>
                                    <StarSelector 
                                      category={key} 
                                      value={selectedStars[key]} 
                                      onChange={handleStarSelect}
                                    />
                                  </FormControl>
                                </div>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        ))}
                      </div>
                      
                      <DialogFooter>
                        <DialogClose asChild>
                          <Button variant="outline" type="button">Cancel</Button>
                        </DialogClose>
                        <Button 
                          type="submit" 
                          disabled={ratingMutation.isPending}
                        >
                          {ratingMutation.isPending ? (
                            <>
                              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                              Submitting...
                            </>
                          ) : (
                            userRating ? 'Update Rating' : 'Submit Rating'
                          )}
                        </Button>
                      </DialogFooter>
                    </form>
                  </Form>
                </DialogContent>
              </Dialog>
            ) : (
              <Link href="/auth">
                <Button size="sm" variant="outline" className="flex items-center gap-1">
                  <span>Login to Rate</span>
                </Button>
              </Link>
            )}
          </div>

          {spotDetails.totalRatings === 0 ? (
            <Card className="border border-dashed">
              <CardContent className="pt-6 text-center py-10">
                <h3 className="text-lg font-medium mb-2">No Ratings Yet</h3>
                <p className="text-muted-foreground mb-4">
                  Be the first to rate this kitesurfing spot!
                </p>
                {user ? (
                  <Button 
                    onClick={() => setRatingDialogOpen(true)} 
                    variant="outline" 
                    className="flex items-center gap-1"
                  >
                    <Star className="w-4 h-4 mr-1" />
                    Add First Rating
                  </Button>
                ) : (
                  <Link href="/auth">
                    <Button variant="outline" className="flex items-center gap-1 bg-theme-primary">
                      Login to Rate
                    </Button>
                  </Link>
                )}
              </CardContent>
            </Card>
          ) : (
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Overall Rating</CardTitle>
                    <CardDescription>Based on {spotDetails.totalRatings} ratings</CardDescription>
                  </div>
                  <div className="text-center">
                    <div className="flex items-center">
                      <span className="text-3xl font-bold mr-2">
                        {spotDetails.averageRating.toFixed(1)}
                      </span>
                      <StarRating value={spotDetails.averageRating} size="large" />
                    </div>
                  </div>
                </div>
              </CardHeader>
              
              <CardContent className="space-y-4">
                <Separator />
                
                <div className="space-y-3">
                  {Object.entries(spotDetails.ratingBreakdown).map(([key, value]) => (
                    <div key={key} className="grid grid-cols-12 gap-2 items-center">
                      <div className="col-span-3 text-sm">
                        {ratingLabels[key as RatingKeys]}
                      </div>
                      <div className="col-span-7">
                        <Progress value={value * 20} className="h-2" />
                      </div>
                      <div className="col-span-2 flex items-center">
                        <span className="text-sm font-medium mr-1">{value.toFixed(1)}</span>
                        <Star className="w-3.5 h-3.5 text-yellow-400 fill-yellow-400" />
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </TabsContent>
      </Tabs>
      {/* Standalone Review Dialog */}
      {reviewDialogOpen && (
        <div className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm flex items-center justify-center">
          <div className="bg-background border rounded-lg shadow-lg max-w-md w-full p-6 space-y-4">
            <div className="flex justify-between items-center">
              <h5>Write Your Review</h5>
              <Button 
                variant="ghost" 
                size="sm" 
                className="h-8 w-8 p-0"
                onClick={() => setReviewDialogOpen(false)} 
              >
                X
              </Button>
            </div>
            
            <Form {...reviewForm}>
              <form onSubmit={reviewForm.handleSubmit(onReviewSubmit)} className="space-y-4">
                <FormField
                  control={reviewForm.control}
                  name="content"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Textarea 
                          placeholder="What was your experience like? How were the conditions?" 
                          className="min-h-[120px]" 
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <div className="flex justify-end gap-2">
                  <Button 
                    type="button" 
                    variant="outline" 
                    onClick={() => setReviewDialogOpen(false)}
                  >
                    Cancel
                  </Button>
                  <Button 
                    type="submit" 
                    disabled={reviewMutation.isPending}
                  >
                    {reviewMutation.isPending ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Submitting...
                      </>
                    ) : (
                      "Submit Review"
                    )}
                  </Button>
                </div>
              </form>
            </Form>
          </div>
        </div>
      )}
      
      {/* Edit Review Dialog */}
      {editReviewDialogOpen && (
        <div className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm flex items-center justify-center">
          <div className="bg-background border rounded-lg shadow-lg max-w-md w-full p-6 space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-xl font-semibold">Edit Your Review</h3>
              <Button 
                variant="ghost" 
                size="sm" 
                className="h-8 w-8 p-0"
                onClick={() => setEditReviewDialogOpen(false)} 
              >
                X
              </Button>
            </div>
            
            <Form {...editReviewForm}>
              <form onSubmit={editReviewForm.handleSubmit(onEditReviewSubmit)} className="space-y-4">
                <FormField
                  control={editReviewForm.control}
                  name="content"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Textarea 
                          placeholder="What was your experience like? How were the conditions?" 
                          className="min-h-[120px]" 
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <div className="flex justify-end gap-2">
                  <Button 
                    type="button" 
                    variant="outline" 
                    onClick={() => setEditReviewDialogOpen(false)}
                  >
                    Cancel
                  </Button>
                  <Button 
                    type="submit" 
                    disabled={editReviewMutation.isPending}
                  >
                    {editReviewMutation.isPending ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Updating...
                      </>
                    ) : (
                      "Save Changes"
                    )}
                  </Button>
                </div>
              </form>
            </Form>
          </div>
        </div>
      )}
      
      {/* Delete Confirmation Dialog */}
      {deleteConfirmOpen && (
        <div className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm flex items-center justify-center">
          <div className="bg-background border rounded-lg shadow-lg max-w-md w-full p-6 space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-xl font-semibold">Delete Review</h3>
              <Button 
                variant="ghost" 
                size="sm" 
                className="h-8 w-8 p-0"
                onClick={() => setDeleteConfirmOpen(false)} 
              >
                X
              </Button>
            </div>
            
            <p>Are you sure you want to delete this review? This action cannot be undone.</p>
            
            <div className="flex justify-end gap-2 pt-4">
              <Button 
                type="button" 
                variant="outline" 
                onClick={() => setDeleteConfirmOpen(false)}
              >
                Cancel
              </Button>
              <Button 
                type="button"
                variant="destructive"
                onClick={confirmDelete}
                disabled={deleteReviewMutation.isPending}
              >
                {deleteReviewMutation.isPending ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Deleting...
                  </>
                ) : (
                  "Delete Review"
                )}
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}