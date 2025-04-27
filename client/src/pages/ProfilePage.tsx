import { useState, useRef } from "react";
import { useAuth } from "@/hooks/use-auth";
import { useQuery, useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { format } from "date-fns";
import { Link } from "wouter";
import { apiRequest, queryClient } from "../lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";

// UI Components
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  User,
  Key,
  Star,
  Edit,
  MapPin,
  Calendar,
  Loader2,
  ExternalLink,
  X,
  Upload,
  Camera,
} from "lucide-react";

// Password change form schema
const passwordFormSchema = z
  .object({
    currentPassword: z.string().min(1, "Current password is required"),
    newPassword: z.string().min(6, "New password must be at least 6 characters"),
    confirmPassword: z.string().min(6, "Confirm your new password"),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

type PasswordFormValues = z.infer<typeof passwordFormSchema>;

export default function ProfilePage() {
  const { user } = useAuth();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("reviews");
  const [editingReviewId, setEditingReviewId] = useState<number | null>(null);
  const [reviewContent, setReviewContent] = useState("");
  const [showProfileImageModal, setShowProfileImageModal] = useState(false);
  const [avatarUrl, setAvatarUrl] = useState("");

  // Fetch user reviews
  const {
    data: userReviews = [],
    isLoading: reviewsLoading,
    error: reviewsError,
  } = useQuery<any[]>({
    queryKey: ["/api/user/reviews"],
    enabled: !!user,
  });

  // Password change form
  const passwordForm = useForm<PasswordFormValues>({
    resolver: zodResolver(passwordFormSchema),
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
  });

  // Password change mutation
  const passwordMutation = useMutation({
    mutationFn: async (data: Omit<PasswordFormValues, "confirmPassword">) => {
      const res = await apiRequest("POST", "/api/user/password", {
        currentPassword: data.currentPassword,
        newPassword: data.newPassword,
      });
      return res.json();
    },
    onSuccess: () => {
      toast({
        title: "Password updated",
        description: "Your password has been successfully updated.",
      });
      passwordForm.reset();
    },
    onError: (error) => {
      toast({
        title: "Error",
        description:
          error.message || "Failed to update password. Please try again.",
        variant: "destructive",
      });
    },
  });

  // Review update mutation
  const updateReviewMutation = useMutation({
    mutationFn: async ({ id, content }: { id: number, content: string }) => {
      const res = await apiRequest("PUT", `/api/reviews/${id}`, { content });
      return res.json();
    },
    onSuccess: () => {
      toast({
        title: "Review updated",
        description: "Your review has been successfully updated.",
      });
      setEditingReviewId(null);
      // Refetch reviews
      queryClient.invalidateQueries({ queryKey: ["/api/user/reviews"] });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description:
          error.message || "Failed to update review. Please try again.",
        variant: "destructive",
      });
    },
  });
  
  // Profile picture update mutation
  const updateProfilePictureMutation = useMutation({
    mutationFn: async (url: string) => {
      const res = await apiRequest("POST", "/api/user/profile-picture", { avatarUrl: url });
      return res.json();
    },
    onSuccess: () => {
      toast({
        title: "Profile picture updated",
        description: "Your profile picture has been successfully updated.",
      });
      setShowProfileImageModal(false);
      // Refresh user data
      queryClient.invalidateQueries({ queryKey: ["/api/user"] });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description:
          error.message || "Failed to update profile picture. Please try again.",
        variant: "destructive",
      });
    },
  });

  // Handle edit review
  const startEditingReview = (review: any) => {
    setEditingReviewId(review.id);
    setReviewContent(review.content);
  };

  // Handle save review
  const saveReview = () => {
    if (editingReviewId && reviewContent.trim()) {
      updateReviewMutation.mutate({
        id: editingReviewId,
        content: reviewContent,
      });
    }
  };

  // Handle cancel edit
  const cancelEditReview = () => {
    setEditingReviewId(null);
  };

  // Handle update profile picture
  const updateProfilePicture = () => {
    if (avatarUrl.trim()) {
      updateProfilePictureMutation.mutate(avatarUrl);
    }
  };

  // Password change form submit handler
  const onPasswordSubmit = (data: PasswordFormValues) => {
    const { confirmPassword, ...passwordData } = data;
    passwordMutation.mutate(passwordData);
  };

  if (!user) {
    return (
      <div className="container mx-auto py-10 text-center">
        <h1 className="text-2xl font-bold mb-4">Profile</h1>
        <p className="mb-4">Please log in to view your profile.</p>
        <Link href="/auth">
          <Button>Login</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-10 px-4 md:px-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Your Profile</h1>
        <Link href="/">
          <Button variant="outline" className="flex items-center gap-2">
            <X className="h-4 w-4" />
            Close
          </Button>
        </Link>
      </div>
      <div className="flex flex-col md:flex-row gap-8">
        {/* Left sidebar - Profile info */}
        <div className="md:w-1/3">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-2xl font-bold">Your Profile</CardTitle>
              <CardDescription>
                Manage your profile information
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-4">
              <div className="flex flex-col items-center mb-6">
                <div className="relative group">
                  <Avatar className="h-24 w-24 mb-3">
                    <AvatarImage
                      src={user.avatarUrl || undefined}
                      alt={user.username}
                    />
                    <AvatarFallback className="text-lg bg-primary text-primary-foreground">
                      {user.username.substring(0, 2).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <button 
                    onClick={() => setShowProfileImageModal(true)}
                    className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity rounded-full"
                  >
                    <Camera className="h-8 w-8 text-white" />
                  </button>
                </div>
                <h2 className="text-xl font-bold">{user.displayName || user.username}</h2>
                <p className="text-sm text-muted-foreground">{user.email}</p>
                {user.experience && (
                  <span className="inline-block mt-1 px-3 py-1 text-sm rounded-full bg-primary/10 text-primary">
                    {user.experience}
                  </span>
                )}
              </div>

              <div className="space-y-4">
                <div className="flex items-center">
                  <User className="h-5 w-5 text-muted-foreground mr-3" />
                  <div>
                    <p className="text-sm font-medium">Username</p>
                    <p className="text-sm text-muted-foreground">
                      {user.username}
                    </p>
                  </div>
                </div>
                <div className="flex items-center">
                  <Calendar className="h-5 w-5 text-muted-foreground mr-3" />
                  <div>
                    <p className="text-sm font-medium">Member Since</p>
                    <p className="text-sm text-muted-foreground">
                      {format(new Date(user.createdAt), "MMMM yyyy")}
                    </p>
                  </div>
                </div>
                {/* More profile fields could be added here */}
              </div>
            </CardContent>
            <CardFooter>
              <Button 
                variant="outline" 
                className="w-full flex items-center gap-2"
                onClick={() => setShowProfileImageModal(true)}
              >
                <Camera className="h-4 w-4" />
                Change Profile Picture
              </Button>
            </CardFooter>
          </Card>
        </div>

        {/* Right content area - Tabs for reviews and settings */}
        <div className="flex-1">
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="reviews">Your Reviews</TabsTrigger>
              <TabsTrigger value="security">Security</TabsTrigger>
            </TabsList>

            {/* Reviews Tab */}
            <TabsContent value="reviews" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Your Reviews</CardTitle>
                  <CardDescription>
                    Reviews you've written for kitesurfing spots
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {reviewsLoading ? (
                    <div className="flex justify-center py-8">
                      <Loader2 className="h-8 w-8 animate-spin text-primary" />
                    </div>
                  ) : reviewsError ? (
                    <p className="text-center py-6 text-destructive">
                      Error loading reviews. Please try again.
                    </p>
                  ) : !userReviews || userReviews.length === 0 ? (
                    <div className="text-center py-8 space-y-3">
                      <p className="text-muted-foreground">
                        You haven't written any reviews yet
                      </p>
                      <Link href="/spots">
                        <Button variant="outline" className="mt-2">
                          Explore Spots to Review
                        </Button>
                      </Link>
                    </div>
                  ) : (
                    <div className="space-y-6">
                      {userReviews.map((review: any) => (
                        <div
                          key={review.id}
                          className="border rounded-lg p-4 space-y-3"
                        >
                          <div className="flex justify-between items-start">
                            <div>
                              <Link href={`/spots/${review.spotId}`}>
                                <h3 className="font-medium hover:underline flex items-center">
                                  {review.spot?.name}
                                  <ExternalLink className="h-3.5 w-3.5 ml-1" />
                                </h3>
                              </Link>
                              <div className="flex items-center text-sm text-muted-foreground">
                                <MapPin className="h-3.5 w-3.5 mr-1" />
                                {review.spot?.country}
                              </div>
                            </div>
                            <div className="text-sm text-muted-foreground">
                              {format(new Date(review.createdAt), "MMM d, yyyy")}
                            </div>
                          </div>
                          
                          {editingReviewId === review.id ? (
                            <div className="space-y-3">
                              <Textarea
                                value={reviewContent}
                                onChange={(e) => setReviewContent(e.target.value)}
                                className="min-h-[100px]"
                                placeholder="Share your experience at this spot..."
                              />
                              <div className="flex justify-end space-x-2">
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={cancelEditReview}
                                >
                                  Cancel
                                </Button>
                                <Button
                                  size="sm"
                                  onClick={saveReview}
                                  disabled={!reviewContent.trim() || updateReviewMutation.isPending}
                                >
                                  {updateReviewMutation.isPending ? (
                                    <>
                                      <Loader2 className="mr-2 h-3.5 w-3.5 animate-spin" />
                                      Saving...
                                    </>
                                  ) : (
                                    "Save"
                                  )}
                                </Button>
                              </div>
                            </div>
                          ) : (
                            <>
                              <p className="text-sm">{review.content}</p>
                              <div className="flex justify-end">
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() => startEditingReview(review)}
                                >
                                  <Edit className="h-3.5 w-3.5 mr-1.5" />
                                  Edit
                                </Button>
                              </div>
                            </>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            {/* Security Tab */}
            <TabsContent value="security" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Key className="h-5 w-5 mr-2" />
                    Password
                  </CardTitle>
                  <CardDescription>
                    Update your password to keep your account secure
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Form {...passwordForm}>
                    <form
                      onSubmit={passwordForm.handleSubmit(onPasswordSubmit)}
                      className="space-y-4"
                    >
                      <FormField
                        control={passwordForm.control}
                        name="currentPassword"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Current Password</FormLabel>
                            <FormControl>
                              <Input
                                type="password"
                                placeholder="Your current password"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={passwordForm.control}
                        name="newPassword"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>New Password</FormLabel>
                            <FormControl>
                              <Input
                                type="password"
                                placeholder="Create a new password"
                                {...field}
                              />
                            </FormControl>
                            <FormDescription>
                              At least 6 characters
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={passwordForm.control}
                        name="confirmPassword"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Confirm New Password</FormLabel>
                            <FormControl>
                              <Input
                                type="password"
                                placeholder="Confirm new password"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <Button
                        type="submit"
                        className="mt-4"
                        disabled={passwordMutation.isPending}
                      >
                        {passwordMutation.isPending ? (
                          <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Updating...
                          </>
                        ) : (
                          "Update Password"
                        )}
                      </Button>
                    </form>
                  </Form>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
      
      {/* Profile Picture Edit Dialog */}
      <Dialog open={showProfileImageModal} onOpenChange={setShowProfileImageModal}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Update Profile Picture</DialogTitle>
            <DialogDescription>
              Enter the URL of your new profile picture
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="flex items-center justify-center">
              <Avatar className="h-32 w-32">
                <AvatarImage src={avatarUrl || user.avatarUrl || undefined} />
                <AvatarFallback className="text-2xl">
                  {user.username.substring(0, 2).toUpperCase()}
                </AvatarFallback>
              </Avatar>
            </div>
            <div className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="picture-url">Picture URL</Label>
                <Input
                  id="picture-url"
                  placeholder="https://example.com/your-picture.jpg"
                  value={avatarUrl}
                  onChange={(e) => setAvatarUrl(e.target.value)}
                />
              </div>
              <p className="text-xs text-muted-foreground">
                Enter a direct link to an image (JPG, PNG, or GIF)
              </p>
            </div>
          </div>
          <DialogFooter className="sm:justify-between">
            <Button
              type="button"
              variant="outline"
              onClick={() => setShowProfileImageModal(false)}
            >
              Cancel
            </Button>
            <Button
              type="button"
              disabled={!avatarUrl.trim() || updateProfilePictureMutation.isPending}
              onClick={updateProfilePicture}
            >
              {updateProfilePictureMutation.isPending ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Updating...
                </>
              ) : (
                <>
                  <Upload className="mr-2 h-4 w-4" />
                  Update Picture
                </>
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}