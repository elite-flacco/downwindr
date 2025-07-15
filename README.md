# Downwindr

A kitesurfing community platform that helps kitesurfers discover the best spots, connect with other riders, and learn new techniques.

## Features

- **Spot Discovery**: Find and explore kitesurfing spots worldwide with detailed information
- **Interactive Maps**: Visual spot locations with weather data and conditions
- **Community**: Connect with other kitesurfers and share experiences
- **Learning Resources**: Access educational content and video tutorials
- **User Profiles**: Personal profiles with preferences and activity tracking
- **Reviews & Ratings**: Rate and review kitesurfing spots

## Tech Stack

### Frontend
- **React 18** with TypeScript
- **Vite** for development and build tooling
- **Tailwind CSS** for styling
- **Radix UI** components for accessible UI primitives
- **Wouter** for client-side routing
- **React Query** for data fetching and state management
- **Leaflet/Mapbox** for interactive maps
- **Framer Motion** for animations

### Backend
- **Node.js** with Express
- **TypeScript**
- **PostgreSQL** with Drizzle ORM
- **Passport.js** for authentication
- **Supabase** for database and storage
- **Session-based authentication**

## Getting Started

### Prerequisites
- Node.js (v18 or later)
- PostgreSQL database
- Supabase account (optional, for hosted database)

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd downwindr
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp server/.env.example server/.env
# Edit server/.env with your configuration
```

4. Set up the database:
```bash
npm run db:push
```

### Development

Start the development server:
```bash
npm run dev
```

This will start both the frontend and backend servers with hot reloading.

### Build

Build the application for production:
```bash
npm run build
```

Start the production server:
```bash
npm start
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run check` - Type check with TypeScript
- `npm run lint` - Lint code with ESLint
- `npm run preview` - Preview production build
- `npm run db:push` - Push database schema changes

## Project Structure

```
downwindr/
├── client/                 # Frontend React application
│   ├── src/
│   │   ├── components/     # Reusable UI components
│   │   ├── pages/         # Page components
│   │   ├── hooks/         # Custom React hooks
│   │   ├── lib/           # Utility functions
│   │   └── data/          # Static data and types
├── server/                # Backend Express application
│   ├── auth.ts           # Authentication logic
│   ├── db.ts             # Database connection
│   ├── routes.ts         # API routes
│   └── index.ts          # Server entry point
├── shared/               # Shared types and schemas
├── migrations/           # Database migrations
└── public/              # Static assets
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Run tests and linting
5. Submit a pull request

## License

MIT License