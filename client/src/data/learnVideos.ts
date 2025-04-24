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
    id: '1',
    title: 'Kitesurfing Basics: Getting Started',
    description: 'Learn the fundamental concepts and safety considerations before getting on the water.',
    thumbnailUrl: 'https://img.youtube.com/vi/DEXnDZZX-uc/mqdefault.jpg',
    youtubeId: 'DEXnDZZX-uc',
    categories: ['basics', 'safety'],
    level: 'beginner',
    duration: '8:22'
  },
  {
    id: '2',
    title: 'How to Set Up Your Kitesurfing Equipment',
    description: 'A step-by-step guide to properly setting up your kite, board, and safety systems.',
    thumbnailUrl: 'https://img.youtube.com/vi/hFREBzK0NF8/mqdefault.jpg',
    youtubeId: 'hFREBzK0NF8',
    categories: ['equipment', 'basics', 'safety'],
    level: 'beginner',
    duration: '12:15'
  },
  {
    id: '3',
    title: 'Kiteboarding Waterstart Tutorial',
    description: 'Master the waterstart technique to get up and riding on your board.',
    thumbnailUrl: 'https://img.youtube.com/vi/QptVt3aXIqs/mqdefault.jpg',
    youtubeId: 'QptVt3aXIqs',
    categories: ['techniques', 'basics'],
    level: 'beginner',
    duration: '9:43'
  },
  {
    id: '4',
    title: 'Advanced Kite Control Techniques',
    description: 'Improve your kite control skills for better performance and safety.',
    thumbnailUrl: 'https://img.youtube.com/vi/KHYOOUlcbas/mqdefault.jpg',
    youtubeId: 'KHYOOUlcbas',
    categories: ['techniques', 'safety'],
    level: 'intermediate',
    duration: '15:27'
  },
  {
    id: '5',
    title: 'How to Jump and Land Safely in Kitesurfing',
    description: 'Learn the proper technique for basic jumps and safe landings.',
    thumbnailUrl: 'https://img.youtube.com/vi/JHRcxBaGNJw/mqdefault.jpg',
    youtubeId: 'JHRcxBaGNJw',
    categories: ['techniques', 'tricks'],
    level: 'intermediate',
    duration: '11:36'
  },
  {
    id: '6',
    title: 'Understanding Wind Windows for Kitesurfing',
    description: 'Essential knowledge about wind patterns and kite positioning for effective riding.',
    thumbnailUrl: 'https://img.youtube.com/vi/5M0DJarOzKw/mqdefault.jpg',
    youtubeId: '5M0DJarOzKw',
    categories: ['weather', 'basics'],
    level: 'beginner',
    duration: '7:51'
  },
  {
    id: '7',
    title: 'Kitesurfing Gear Guide 2023',
    description: 'Overview of the latest kitesurfing equipment and how to choose the right gear for your level.',
    thumbnailUrl: 'https://img.youtube.com/vi/hF8yHiI_KJQ/mqdefault.jpg',
    youtubeId: 'hF8yHiI_KJQ',
    categories: ['equipment'],
    level: 'beginner',
    duration: '14:02'
  },
  {
    id: '8',
    title: 'Advanced Kitesurfing Transitions Tutorial',
    description: 'Learn how to perform smooth transitions while maintaining speed and control.',
    thumbnailUrl: 'https://img.youtube.com/vi/v7gON_V3F8E/mqdefault.jpg',
    youtubeId: 'v7gON_V3F8E',
    categories: ['techniques'],
    level: 'advanced',
    duration: '10:19'
  },
  {
    id: '9',
    title: 'How to Perform a Front Roll in Kitesurfing',
    description: 'Step-by-step guide to mastering the front roll trick safely.',
    thumbnailUrl: 'https://img.youtube.com/vi/YOzFmPh9UlM/mqdefault.jpg',
    youtubeId: 'YOzFmPh9UlM',
    categories: ['tricks'],
    level: 'advanced',
    duration: '8:45'
  },
  {
    id: '10',
    title: 'Top 5 Kitesurfing Destinations in Europe',
    description: 'Explore the best spots for kitesurfing in Europe with tips on when to visit.',
    thumbnailUrl: 'https://img.youtube.com/vi/Bg7UFndLCxE/mqdefault.jpg',
    youtubeId: 'Bg7UFndLCxE',
    categories: ['travel'],
    level: 'beginner',
    duration: '13:27'
  },
  {
    id: '11',
    title: 'Reading Weather Forecasts for Kitesurfers',
    description: 'How to interpret weather data to find the perfect riding conditions.',
    thumbnailUrl: 'https://img.youtube.com/vi/ZNpXNGqoUcI/mqdefault.jpg',
    youtubeId: 'ZNpXNGqoUcI',
    categories: ['weather', 'safety'],
    level: 'intermediate',
    duration: '16:09'
  },
  {
    id: '12',
    title: 'Kitesurfing Self-Rescue Techniques',
    description: 'Essential safety skills every kitesurfer needs to know for emergency situations.',
    thumbnailUrl: 'https://img.youtube.com/vi/q2SYUZxCkWY/mqdefault.jpg',
    youtubeId: 'q2SYUZxCkWY',
    categories: ['safety'],
    level: 'beginner',
    duration: '18:33'
  }
];