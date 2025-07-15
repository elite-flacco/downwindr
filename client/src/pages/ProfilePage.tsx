import { useState, useRef } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useQuery, useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { format } from "date-fns";
import { Link } from "wouter";
import { apiRequest, queryClient } from "../lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { Textarea } from "@/components/ui/textarea";
import { AvatarWithRefresh } from "@/components/AvatarWithRefresh";
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
import { Label } from "@/components/ui/label";
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
  UploadCloud,
  Trash,
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
  const { user, userProfile } = useAuth();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("reviews");
  const [editingReviewId, setEditingReviewId] = useState<number | null>(null);
  const [reviewContent, setReviewContent] = useState("");
  const [showProfileImageModal, setShowProfileImageModal] = useState(false);
  const [avatarUrl, setAvatarUrl] = useState("");
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [uploadMethod, setUploadMethod] = useState<"url" | "file">("url");
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  // Force a complete refetch on profile picture changes
  const [updateCounter, setUpdateCounter] = useState(0);
  const forceReload = () => {
    setUpdateCounter(prev => prev + 1);
    // Force cache invalidation
    queryClient.invalidateQueries({ queryKey: ["/api/user"] });
    // Force a hard refetch
    window.location.reload();
  };

  // Fetch user reviews
  const {
    data: userReviews = [],
    isLoading: reviewsLoading,
    error: reviewsError,
    refetch: refetchReviews,
  } = useQuery<any[]>({
    queryKey: ["/api/user/reviews"],
    enabled: !!user,
    refetchOnWindowFocus: true,
    staleTime: 0, // Always refetch when requested
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
    onSuccess: (updatedReview) => {
      toast({
        title: "Review updated",
        description: "Your review has been successfully updated.",
      });
      setEditingReviewId(null);
      
      // Explicitly refetch reviews to ensure data is fresh
      queryClient.invalidateQueries({ queryKey: ["/api/user/reviews"] });
      
      // Use the refetch function from useQuery to immediately refresh the data
      refetchReviews();
      
      // Update spot details reviews as well
      queryClient.invalidateQueries({ queryKey: [`/api/spots/${updatedReview.spotId}/details`] });
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
  
  // Profile picture remove mutation
  const removeProfilePictureMutation = useMutation({
    mutationFn: async () => {
      const res = await apiRequest("DELETE", "/api/user/profile-picture");
      return res.json();
    },
    onSuccess: (response) => {
      toast({
        title: "Profile picture removed",
        description: "Your profile picture has been successfully removed.",
      });
      
      // Clear local image preview and avatar url
      setImagePreview(null);
      setAvatarUrl('');
      
      // Close the modal
      setShowProfileImageModal(false);
      
      // Hard reload the page to ensure all components reflect the change
      forceReload();
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: error.message || "Failed to remove profile picture. Please try again.",
        variant: "destructive",
      });
    },
  });

  // Profile picture update mutation (URL based)
  const updateProfilePictureMutation = useMutation({
    mutationFn: async (url: string) => {
      const res = await apiRequest("POST", "/api/user/profile-picture", { avatarUrl: url });
      return res.json();
    },
    onSuccess: (response) => {
      toast({
        title: "Profile picture updated",
        description: "Your profile picture has been successfully updated.",
      });
      
      // Reset state
      setShowProfileImageModal(false);
      setAvatarUrl("");
      setImagePreview(null);
      
      // Hard reload the page to ensure all components reflect the change
      forceReload();
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: error.message || "Failed to update profile picture. Please try again.",
        variant: "destructive",
      });
    },
  });
  
  // Profile picture upload mutation (File upload based)
  const uploadProfilePictureMutation = useMutation({
    mutationFn: async (file: File) => {
      const formData = new FormData();
      formData.append('profileImage', file);
      
      const response = await fetch('/api/user/profile-picture-upload', {
        method: 'POST',
        credentials: 'include',
        body: formData,
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to upload image');
      }
      
      return response.json();
    },
    onSuccess: (response) => {
      toast({
        title: "Profile picture uploaded",
        description: "Your profile picture has been successfully uploaded.",
      });
      
      // Close modal and reset state
      setShowProfileImageModal(false);
      setImagePreview(null);
      setIsUploading(false);
      
      // Hard reload the page to ensure all components reflect the change
      forceReload();
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

  // Handle file selection
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    
    // Check file type
    if (!file.type.startsWith('image/')) {
      toast({
        title: "Invalid file",
        description: "Please select an image file.",
        variant: "destructive",
      });
      return;
    }
    
    // Check file size (5MB max)
    if (file.size > 5 * 1024 * 1024) {
      toast({
        title: "File too large",
        description: "Please select an image smaller than 5MB.",
        variant: "destructive",
      });
      return;
    }
    
    // Create a preview
    const reader = new FileReader();
    reader.onload = (e) => {
      setImagePreview(e.target?.result as string);
    };
    reader.readAsDataURL(file);
    
    // Set file for upload
    setIsUploading(true);
    uploadProfilePictureMutation.mutate(file);
  };
  
  // Handle update profile picture
  const updateProfilePicture = () => {
    if (uploadMethod === 'url' && avatarUrl.trim()) {
      updateProfilePictureMutation.mutate(avatarUrl);
    } else if (uploadMethod === 'file') {
      fileInputRef.current?.click();
    }
  };
  
  // Reset the profile picture modal
  const resetProfilePictureModal = () => {
    setAvatarUrl('');
    setImagePreview(null);
    setUploadMethod('url');
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
                  <AvatarWithRefresh
                    userAvatarUrl={userProfile?.avatarUrl} 
                    userName={userProfile?.username}
                    className="h-24 w-24 mb-3"
                    fallbackClassName="text-lg bg-primary text-primary-foreground"
                  />
                  <button 
                    onClick={() => setShowProfileImageModal(true)}
                    className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity rounded-full"
                  >
                    <Camera className="h-8 w-8 text-white" />
                  </button>
                </div>
                <h2 className="text-xl font-bold">{userProfile?.displayName || userProfile?.username}</h2>
                <p className="text-sm text-muted-foreground">{user.email}</p>
                {userProfile?.experience && (
                  <span className="inline-block mt-1 px-3 py-1 text-sm rounded-full bg-primary/10 text-primary">
                    {userProfile?.experience}
                  </span>
                )}
              </div>

              <div className="space-y-4">
                <div className="flex items-center">
                  <User className="h-5 w-5 text-muted-foreground mr-3" />
                  <div>
                    <p className="text-sm font-medium">Username</p>
                    <p className="text-sm text-muted-foreground">
                      {userProfile?.username}
                    </p>
                  </div>
                </div>
                <div className="flex items-center">
                  <Calendar className="h-5 w-5 text-muted-foreground mr-3" />
                  <div>
                    <p className="text-sm font-medium">Member Since</p>
                    <p className="text-sm text-muted-foreground">
                      {userProfile?.createdAt ? format(new Date(userProfile.createdAt), "MMMM yyyy") : "Recently"}
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
                <CardHeader className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <CardTitle>Your Reviews</CardTitle>
                    <CardDescription>
                      Reviews you've written for kitesurfing spots
                    </CardDescription>
                  </div>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="mt-2 sm:mt-0" 
                    onClick={() => refetchReviews()}
                    disabled={reviewsLoading}
                  >
                    {reviewsLoading ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                      <span className="flex items-center">
                        <svg 
                          xmlns="http://www.w3.org/2000/svg" 
                          width="14" 
                          height="14" 
                          viewBox="0 0 24 24" 
                          fill="none" 
                          stroke="currentColor" 
                          strokeWidth="2" 
                          strokeLinecap="round" 
                          strokeLinejoin="round" 
                          className="mr-1.5"
                        >
                          <path d="M21 2v6h-6"></path>
                          <path d="M3 12a9 9 0 0 1 15-6.7L21 8"></path>
                          <path d="M3 12a9 9 0 0 0 6.7 15L13 21"></path>
                          <path d="M13 21h6v-6"></path>
                        </svg>
                        Refresh
                      </span>
                    )}
                  </Button>
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
                                placeholder="Confirm your new password"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <Button
                        type="submit"
                        className="mt-2"
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

      {/* Profile Picture Modal */}
      <Dialog open={showProfileImageModal} onOpenChange={setShowProfileImageModal}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Update Profile Picture</DialogTitle>
            <DialogDescription>
              Choose a new profile picture or remove your current one.
            </DialogDescription>
          </DialogHeader>
          
          <div className="flex justify-center space-x-3 pt-2">
            <Button 
              variant={uploadMethod === 'url' ? 'default' : 'outline'} 
              className="flex-1"
              onClick={() => setUploadMethod('url')}
            >
              URL
            </Button>
            <Button 
              variant={uploadMethod === 'file' ? 'default' : 'outline'} 
              className="flex-1"
              onClick={() => setUploadMethod('file')}
            >
              Upload
            </Button>
          </div>
          
          <div className="space-y-4 py-4">
            {/* Profile picture preview */}
            <div className="flex items-center justify-center">
              <Avatar className="h-32 w-32">
                {imagePreview ? (
                  <AvatarImage src={imagePreview} alt={userProfile?.username} />
                ) : avatarUrl ? (
                  <AvatarImage src={avatarUrl} alt={userProfile?.username} />
                ) : userProfile?.avatarUrl ? (
                  <AvatarImage 
                    src={`${userProfile?.avatarUrl}?t=${Date.now()}`} 
                    alt={userProfile?.username} 
                  />
                ) : null}
                <AvatarFallback className="text-2xl">
                  {userProfile?.username?.substring(0, 2).toUpperCase() || "??"}
                </AvatarFallback>
              </Avatar>
            </div>
            
            {/* URL input method */}
            {uploadMethod === 'url' && (
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
            )}
            
            {/* File upload method */}
            {uploadMethod === 'file' && (
              <div className="grid gap-4">
                <div 
                  onClick={() => fileInputRef.current?.click()}
                  className="border-2 border-dashed rounded-lg p-6 flex flex-col items-center justify-center cursor-pointer hover:bg-muted/50 transition-colors"
                >
                  <UploadCloud className="h-10 w-10 text-muted-foreground mb-2" />
                  <p className="text-sm font-medium">Click to upload</p>
                  <p className="text-xs text-muted-foreground mt-1">
                    PNG, JPG or WebP (max 5MB)
                  </p>
                </div>
                <input
                  type="file"
                  id="file-upload"
                  ref={fileInputRef}
                  className="hidden"
                  accept="image/*"
                  onChange={handleFileChange}
                />
              </div>
            )}
          </div>
          
          <DialogFooter>
            <div className="flex flex-col-reverse sm:flex-row w-full sm:justify-between gap-2">
              <div className="flex gap-2 flex-1 sm:flex-initial">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => {
                    setShowProfileImageModal(false);
                    resetProfilePictureModal();
                  }}
                >
                  Cancel
                </Button>
                
                {/* Only show the remove button if user has a profile picture */}
                {userProfile?.avatarUrl && (
                  <Button
                    type="button"
                    variant="destructive"
                    onClick={() => removeProfilePictureMutation.mutate()}
                    disabled={removeProfilePictureMutation.isPending}
                  >
                    {removeProfilePictureMutation.isPending ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Removing...
                      </>
                    ) : (
                      <>
                        <Trash className="mr-2 h-4 w-4" />
                        Remove
                      </>
                    )}
                  </Button>
                )}
              </div>
              
              <div className="flex-1 sm:flex-initial">
                {uploadMethod === 'url' ? (
                  <Button
                    type="button"
                    disabled={!avatarUrl.trim() || updateProfilePictureMutation.isPending}
                    onClick={updateProfilePicture}
                    className="w-full sm:w-auto"
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
                ) : (
                  <Button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    disabled={uploadProfilePictureMutation.isPending || isUploading}
                    className="w-full sm:w-auto"
                  >
                    {uploadProfilePictureMutation.isPending || isUploading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Uploading...
                      </>
                    ) : (
                      <>
                        <UploadCloud className="mr-2 h-4 w-4" />
                        Select File
                      </>
                    )}
                  </Button>
                )}
              </div>
            </div>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}