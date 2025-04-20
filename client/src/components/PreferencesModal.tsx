import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { 
  X, 
  Wind, 
  Waves, 
  ThermometerSun, 
  School, 
  DollarSign,
  Compass,
  Award,
  Utensils,
  Home,
  Globe,
  SendHorizonal
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";

interface UserPreferences {
  windSpeedMin: number;
  windSpeedMax: number;
  temperature: "cold" | "moderate" | "warm" | "hot";
  difficulty: string;
  budget: "budget" | "moderate" | "luxury";
  preferredRegion: string;
  hasKiteSchools: boolean;
  preferWaves: boolean;
  foodOptions: boolean;
  culture: boolean;
  month: number;
}

interface PreferencesModalProps {
  onClose: () => void;
  onSavePreferences: (preferences: UserPreferences) => void;
  currentMonth: number;
}

export default function PreferencesModal({ onClose, onSavePreferences, currentMonth }: PreferencesModalProps) {
  // State to track if the modal is open (for animation)
  const [isOpen, setIsOpen] = useState(true);
  
  // Set default preferences
  const [preferences, setPreferences] = useState<UserPreferences>({
    windSpeedMin: 15,
    windSpeedMax: 25,
    temperature: "moderate",
    difficulty: "all",
    budget: "moderate",
    preferredRegion: "any",
    hasKiteSchools: true,
    preferWaves: false,
    foodOptions: false,
    culture: false,
    month: currentMonth,
  });
  
  // Function to close with animation
  const handleClose = () => {
    setIsOpen(false);
    setTimeout(onClose, 300); // Wait for animation to complete
  };
  
  // Function to save preferences and close
  const handleSave = () => {
    onSavePreferences(preferences);
    handleClose();
  };

  // Function to handle value change
  const handleChange = (key: keyof UserPreferences, value: any) => {
    setPreferences(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const regions = [
    { value: "any", label: "Any Region" },
    { value: "caribbean", label: "Caribbean" },
    { value: "north-america", label: "North America" },
    { value: "south-america", label: "South America" },
    { value: "europe", label: "Europe" },
    { value: "africa", label: "Africa" },
    { value: "asia", label: "Asia" },
    { value: "oceania", label: "Oceania" },
  ];

  const difficultyLevels = [
    { value: "all", label: "All Levels" },
    { value: "beginner", label: "Beginner Friendly" },
    { value: "intermediate", label: "Intermediate" },
    { value: "advanced", label: "Advanced" },
  ];

  const temperatureRanges = [
    { value: "cold", label: "Cold (< 20°C)" },
    { value: "moderate", label: "Moderate (20-25°C)" },
    { value: "warm", label: "Warm (25-30°C)" },
    { value: "hot", label: "Hot (> 30°C)" },
  ];

  const budgetRanges = [
    { value: "budget", label: "Budget-friendly" },
    { value: "moderate", label: "Moderate" },
    { value: "luxury", label: "Luxury" },
  ];

  const monthNames = [
    "January", "February", "March", "April", 
    "May", "June", "July", "August", 
    "September", "October", "November", "December"
  ];
  
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50 preferences-modal">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="bg-white rounded-xl shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto m-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.3 }}
          >
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-slate-800">Your Kitesurfing Preferences</h2>
                <Button
                  size="icon"
                  variant="outline"
                  className="rounded-full"
                  onClick={handleClose}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>

              <div className="space-y-8">
                {/* Wind Speed Preferences */}
                <div className="space-y-4">
                  <div className="flex items-center gap-2 text-slate-800 font-medium">
                    <Wind className="h-5 w-5 text-blue-700" />
                    <h3>Wind Speed Range</h3>
                  </div>
                  <div className="px-2">
                    <div className="flex justify-between text-sm text-slate-500 mb-2">
                      <span>Minimum: {preferences.windSpeedMin} knots</span>
                      <span>Maximum: {preferences.windSpeedMax} knots</span>
                    </div>
                    <div className="flex items-center gap-4">
                      <Slider 
                        value={[preferences.windSpeedMin]} 
                        min={5} 
                        max={35} 
                        step={1}
                        onValueChange={(value) => handleChange("windSpeedMin", value[0])}
                        className="w-full"
                      />
                      <Slider 
                        value={[preferences.windSpeedMax]} 
                        min={5} 
                        max={35} 
                        step={1}
                        onValueChange={(value) => handleChange("windSpeedMax", value[0])}
                        className="w-full"
                      />
                    </div>
                  </div>
                </div>

                {/* Month Preference */}
                <div className="space-y-4">
                  <div className="flex items-center gap-2 text-slate-800 font-medium">
                    <Compass className="h-5 w-5 text-blue-700" />
                    <h3>Travel Month</h3>
                  </div>
                  <div className="px-2">
                    <Select 
                      value={preferences.month.toString()} 
                      onValueChange={(value) => handleChange("month", parseInt(value))}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select month" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          {monthNames.map((month, index) => (
                            <SelectItem key={index + 1} value={(index + 1).toString()}>
                              {month}
                            </SelectItem>
                          ))}
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* Temperature Preference */}
                <div className="space-y-4">
                  <div className="flex items-center gap-2 text-slate-800 font-medium">
                    <ThermometerSun className="h-5 w-5 text-teal-600" />
                    <h3>Temperature Preference</h3>
                  </div>
                  <div className="px-2">
                    <Select 
                      value={preferences.temperature} 
                      onValueChange={(value: "cold" | "moderate" | "warm" | "hot") => handleChange("temperature", value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select temperature range" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          {temperatureRanges.map((temp) => (
                            <SelectItem key={temp.value} value={temp.value}>
                              {temp.label}
                            </SelectItem>
                          ))}
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* Difficulty Level */}
                <div className="space-y-4">
                  <div className="flex items-center gap-2 text-slate-800 font-medium">
                    <Award className="h-5 w-5 text-teal-600" />
                    <h3>Skill Level</h3>
                  </div>
                  <div className="px-2">
                    <Select 
                      value={preferences.difficulty} 
                      onValueChange={(value) => handleChange("difficulty", value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select skill level" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          {difficultyLevels.map((level) => (
                            <SelectItem key={level.value} value={level.value}>
                              {level.label}
                            </SelectItem>
                          ))}
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* Budget Range */}
                <div className="space-y-4">
                  <div className="flex items-center gap-2 text-slate-800 font-medium">
                    <DollarSign className="h-5 w-5 text-teal-600" />
                    <h3>Budget Range</h3>
                  </div>
                  <div className="px-2">
                    <Select 
                      value={preferences.budget} 
                      onValueChange={(value: "budget" | "moderate" | "luxury") => handleChange("budget", value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select budget range" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          {budgetRanges.map((budget) => (
                            <SelectItem key={budget.value} value={budget.value}>
                              {budget.label}
                            </SelectItem>
                          ))}
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* Preferred Region */}
                <div className="space-y-4">
                  <div className="flex items-center gap-2 text-slate-800 font-medium">
                    <Globe className="h-5 w-5 text-teal-600" />
                    <h3>Preferred Region</h3>
                  </div>
                  <div className="px-2">
                    <Select 
                      value={preferences.preferredRegion} 
                      onValueChange={(value) => handleChange("preferredRegion", value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select region" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          {regions.map((region) => (
                            <SelectItem key={region.value} value={region.value}>
                              {region.label}
                            </SelectItem>
                          ))}
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* Additional Preferences */}
                <div className="space-y-4">
                  <div className="flex items-center gap-2 text-slate-800 font-medium">
                    <Waves className="h-5 w-5 text-teal-600" />
                    <h3>Additional Preferences</h3>
                  </div>
                  <div className="px-2 space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <School className="h-4 w-4 text-teal-600" />
                        <Label htmlFor="kite-schools">Has Kite Schools</Label>
                      </div>
                      <Switch 
                        id="kite-schools" 
                        checked={preferences.hasKiteSchools}
                        onCheckedChange={(checked) => handleChange("hasKiteSchools", checked)}
                      />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Waves className="h-4 w-4 text-teal-600" />
                        <Label htmlFor="prefer-waves">Prefer Waves</Label>
                      </div>
                      <Switch 
                        id="prefer-waves" 
                        checked={preferences.preferWaves}
                        onCheckedChange={(checked) => handleChange("preferWaves", checked)}
                      />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Utensils className="h-4 w-4 text-teal-600" />
                        <Label htmlFor="food-options">Food Options Important</Label>
                      </div>
                      <Switch 
                        id="food-options" 
                        checked={preferences.foodOptions}
                        onCheckedChange={(checked) => handleChange("foodOptions", checked)}
                      />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Globe className="h-4 w-4 text-teal-600" />
                        <Label htmlFor="culture">Culture/Activities Important</Label>
                      </div>
                      <Switch 
                        id="culture" 
                        checked={preferences.culture}
                        onCheckedChange={(checked) => handleChange("culture", checked)}
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-8 flex justify-end">
                <Button 
                  variant="outline" 
                  className="mr-2"
                  onClick={handleClose}
                >
                  Cancel
                </Button>
                <Button 
                  onClick={handleSave}
                  className="bg-blue-700 hover:bg-blue-800 text-white"
                >
                  <SendHorizonal className="mr-2 h-4 w-4" />
                  Find Perfect Spots
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}