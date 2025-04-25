export interface LearnVideo {
  id: string;
  title: string;
  description: string;
  thumbnailUrl: string;
  youtubeId: string;
  categories: string[];
  level: 'beginner' | 'intermediate' | 'advanced';
  duration: string; // in format "MM:SS"
}

export const videoCategories = [
  'basics',
  'techniques',
  'equipment',
  'safety',
  'tricks',
  'weather',
  'travel'
];

export const videoLevels = [
  'beginner',
  'intermediate',
  'advanced'
];

export const learnVideos: LearnVideo[] = [
  {
    "id": "1",
    "title": "Video to watch before your first kitesurfing lesson (Basic kitesurfing overview)",
    "description": "Learn the fundamental concepts and safety considerations before getting on the water.",
    "thumbnailUrl": "https://img.youtube.com/vi/-n1R0hwEr6s/mqdefault.jpg",
    "youtubeId": "-n1R0hwEr6s",
    "categories": ["basics", "safety"],
    "level": "beginner",
    "duration": "21:52"
  },
  {
    "id": "2",
    "title": "Kite Control 101 (tips for first kitesurf lesson)",
    "description": "This guide looks at basic slow piloting of a kite, specifically a modern 4-line, inflatable kitesurf kite.",
    "thumbnailUrl": "https://img.youtube.com/vi/Vaa3RMTyxEg/mqdefault.jpg",
    "youtubeId": "Vaa3RMTyxEg",
    "categories": ["basics", "technique"],
    "level": "beginner",
    "duration": "6:45"
  },
  {
    "id": "3",
    "title": "Learning How To Kitesurf: Your First Lesson!",
    "description": "A quick overview of the day your life will change forever, your first kitesurfing lesson.",
    "thumbnailUrl": "https://img.youtube.com/vi/3CkqjnGBKQE/mqdefault.jpg",
    "youtubeId": "3CkqjnGBKQE",
    "categories": ["basics", "overview"],
    "level": "beginner",
    "duration": "10:30"
  },
  {
    "id": "4",
    "title": "How to Kitesurf: Waterstart Tutorial 2017",
    "description": "The tutorial looks at the waterstart. It's designed to help people taking lessons, not replace lessons.",
    "thumbnailUrl": "https://img.youtube.com/vi/_XGb2LmLEnI/mqdefault.jpg",
    "youtubeId": "_XGb2LmLEnI",
    "categories": ["technique", "waterstart"],
    "level": "beginner",
    "duration": "7:15"
  },
  {
    "id": "5",
    "title": "5 Easy Tricks For Kiteboarding Beginners // SA Masterclass",
    "description": "Learn five easy tricks to get started with kiteboarding, presented in the SA Masterclass series.",
    "thumbnailUrl": "https://img.youtube.com/vi/GmnHt5FhUFw/mqdefault.jpg",
    "youtubeId": "GmnHt5FhUFw",
    "categories": ["technique", "tricks"],
    "level": "beginner",
    "duration": "9:20"
  },
  {
    "id": "6",
    "title": "Kitesurfing for Beginners | Where to Position Your Hands on the Bar",
    "description": "In this video, we cover where to hold your hands when flying a kite.",
    "thumbnailUrl": "https://img.youtube.com/vi/usy-Xtpmtu8/mqdefault.jpg",
    "youtubeId": "usy-Xtpmtu8",
    "categories": ["basics", "technique"],
    "level": "beginner",
    "duration": "4:12"
  },
  {
    "id": "7",
    "title": "How to Kitesurf in 60 seconds (Must learn with instructor)",
    "description": "A quick overview of essential kitesurfing techniques and safety tips.",
    "thumbnailUrl": "https://img.youtube.com/vi/5E6H6lRZjUg/mqdefault.jpg",
    "youtubeId": "5E6H6lRZjUg",
    "categories": ["overview", "safety"],
    "level": "beginner",
    "duration": "1:00"
  },
  {
    "id": "8",
    "title": "Kitesurfing: How To Waterstart (The Easy Way)",
    "description": "Everything you need to know to learn how to waterstart kiteboarding! Fast track your progression by joining the kite & wing crew!",
    "thumbnailUrl": "https://img.youtube.com/vi/WBnwAbN0jiU/mqdefault.jpg",
    "youtubeId": "WBnwAbN0jiU",
    "categories": ["waterstart", "technique"],
    "level": "beginner",
    "duration": "8:15"
  },
  {
    "id": "9",
    "title": "Kiteboarding Lesson | How to Water Start",
    "description": "Learn the basics of the water start in kiteboarding with this comprehensive lesson.",
    "thumbnailUrl": "https://img.youtube.com/vi/uZIjbwJ9yCg/mqdefault.jpg",
    "youtubeId": "uZIjbwJ9yCg",
    "categories": ["waterstart", "basics"],
    "level": "beginner",
    "duration": "6:30"
  },
  {
    "id": "10",
    "title": "Kiteboarding waterstart fully explained",
    "description": "This will be the last kiteboarding waterstart tutorial you ever have to watch! Learn in my kite school on lake Como.",
    "thumbnailUrl": "https://img.youtube.com/vi/lshndxx6pfQ/mqdefault.jpg",
    "youtubeId": "lshndxx6pfQ",
    "categories": ["waterstart", "detailed"],
    "level": "beginner",
    "duration": "9:45"
  },
  {
    "id": "11",
    "title": "Kitesurfing Water Start 3 BEST ways to manage it easily - Tutorial",
    "description": "One tip from me: do not try to stand up at all, point the board downwind, roll body forward after the stroke and let the kite pull you while...",
    "thumbnailUrl": "https://img.youtube.com/vi/VZ9fRGVftSk/mqdefault.jpg",
    "youtubeId": "VZ9fRGVftSk",
    "categories": ["waterstart", "technique"],
    "level": "beginner",
    "duration": "7:20"
  },
  {
    "id": "12",
    "title": "Kiteboarding- The Basic Waterstart (In 2 Minutes)",
    "description": "Two tips that helped me...Front leg extended to move the board more downwind at the start. Sheet out after you stand to keep from 'choking'...",
    "thumbnailUrl": "https://img.youtube.com/vi/vmElYpVL2jU/mqdefault.jpg",
    "youtubeId": "vmElYpVL2jU",
    "categories": ["waterstart", "quick tips"],
    "level": "beginner",
    "duration": "2:00"
  },
  {
    "id": "13",
    "title": "How to Kitesurf: Transitions (turns) Tutorial",
    "description": "This kiteboarding tutorial looks at a basic transition (or turn), focusing on kite control and body position.",
    "thumbnailUrl": "https://img.youtube.com/vi/VukH2orkr04/mqdefault.jpg",
    "youtubeId": "VukH2orkr04",
    "categories": ["transition", "turns"],
    "level": "beginner",
    "duration": "7:00"
  },
  {
    "id": "14",
    "title": "How to Turn Around / Transition Kitesurfing",
    "description": "In this video, I explain a very important beginner kitesurfing skill: how to turn around or transition.",
    "thumbnailUrl": "https://img.youtube.com/vi/RNa56bCooHg/mqdefault.jpg",
    "youtubeId": "RNa56bCooHg",
    "categories": ["transition", "turns"],
    "level": "beginner",
    "duration": "6:30"
  },
  {
    "id": "15",
    "title": "Master Kiteboarding Transitions with These 5 Easy Techniques",
    "description": "Learn five easy techniques to master kiteboarding transitions, improving your control and style.",
    "thumbnailUrl": "https://img.youtube.com/vi/zZl5p64eyAI/mqdefault.jpg",
    "youtubeId": "zZl5p64eyAI",
    "categories": ["transition", "techniques"],
    "level": "beginner",
    "duration": "8:00"
  },
  {
    "id": "16",
    "title": "Beginner Kiteboarding Lesson - Phase 10 'Transitions'",
    "description": "This video will teach you the easy way to learn kiteboarding transitions, allowing you to practice safely with control.",
    "thumbnailUrl": "https://img.youtube.com/vi/8PHt-YqilUQ/mqdefault.jpg",
    "youtubeId": "8PHt-YqilUQ",
    "categories": ["transition", "lesson"],
    "level": "beginner",
    "duration": "9:00"
  },
  {
    "id": "17",
    "title": "High-speed Carve Transitions (kiteboard tutorial)",
    "description": "This tutorial explains how to do a much faster carve turn, building on previous tutorials for basic carving transitions.",
    "thumbnailUrl": "https://img.youtube.com/vi/EzOQOjS6qLU/mqdefault.jpg",
    "youtubeId": "EzOQOjS6qLU",
    "categories": ["transition", "carve"],
    "level": "intermediate",
    "duration": "7:30"
  },
  {
    "id": "18",
    "title": "11 Advanced Tricks (Kite Tricktip)",
    "description": "A comprehensive guide to 11 advanced kitesurfing tricks, including the nuclear grab, unhooked tantrum, and surface pass.",
    "thumbnailUrl": "https://img.youtube.com/vi/EpJk9mtiX0o/mqdefault.jpg",
    "youtubeId": "EpJk9mtiX0o",
    "categories": ["advanced", "tricks"],
    "level": "advanced",
    "duration": "15:00"
  },
  {
    "id": "19",
    "title": "5 Advanced Tricks to Get You Stoked (Kite Tricktip)",
    "description": "Focuses on high-speed carving transitions, one-foot slides, and inverted frontrolls to enhance your freestyle repertoire.",
    "thumbnailUrl": "https://img.youtube.com/vi/jytwMdEr_wY/mqdefault.jpg",
    "youtubeId": "jytwMdEr_wY",
    "categories": ["advanced", "freestyle"],
    "level": "advanced",
    "duration": "10:30"
  },
  {
    "id": "20",
    "title": "How to Darkslide | 2 Easy Steps (Kiteboarding SA Masterclass)",
    "description": "A step-by-step tutorial on mastering the darkslide, an essential move for unhooked freestyle progression.",
    "thumbnailUrl": "https://img.youtube.com/vi/NMUeVV3OZYQ/mqdefault.jpg",
    "youtubeId": "NMUeVV3OZYQ",
    "categories": ["advanced", "freestyle"],
    "level": "advanced",
    "duration": "6:40"
  },
  {
    "id": "21",
    "title": "How to Sushi Roll (Advanced)",
    "description": "An advanced trick tutorial focusing on the sushi roll, a stylish and challenging move in kiteboarding.",
    "thumbnailUrl": "https://img.youtube.com/vi/PgZSEcsQAJs/mqdefault.jpg",
    "youtubeId": "PgZSEcsQAJs",
    "categories": ["advanced", "tricks"],
    "level": "advanced",
    "duration": "8:20"
  },
  {
    "id": "22",
    "title": "WTF Are These Big Air Kitesurfing Tricks?! Explained!",
    "description": "Explains various big air tricks, providing insights into execution and safety considerations.",
    "thumbnailUrl": "https://img.youtube.com/vi/tWljyB-TRZI/mqdefault.jpg",
    "youtubeId": "tWljyB-TRZI",
    "categories": ["advanced", "big air"],
    "level": "advanced",
    "duration": "12:10"
  }
];