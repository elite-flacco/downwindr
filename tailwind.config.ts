import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: ["./client/index.html", "./client/src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    fontFamily: {
      // Define fonts using the Tailwind config instead of CSS variables
      'title': ['Fredoka', 'cursive'],
      'heading': ['Bangers', 'cursive'],
      'body': ['Quicksand', 'sans-serif'],
      'fun': ['Kalam', 'cursive'],
    },
    extend: {
      container: {
        center: true,
        padding: '1rem',
        screens: {
          sm: '640px',
          md: '768px',
          lg: '1024px',
          xl: '1280px',
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      colors: {
        // ShadCN default colors
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        primary: {
          DEFAULT: "hsl(var(--primary))",
          '50': 'hsl(var(--color-primary-50))',
          '100': 'hsl(var(--color-primary-100))',
          '200': 'hsl(var(--color-primary-200))',
          '300': 'hsl(var(--color-primary-300))',
          '400': 'hsl(var(--color-primary-400))',
          '500': 'hsl(var(--color-primary-500))',
          '600': 'hsl(var(--color-primary-600))',
          '700': 'hsl(var(--color-primary-700))',
          '800': 'hsl(var(--color-primary-800))',
          '900': 'hsl(var(--color-primary-900))',
          '950': 'hsl(var(--color-primary-950))',
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        chart: {
          "1": "hsl(var(--chart-1))",
          "2": "hsl(var(--chart-2))",
          "3": "hsl(var(--chart-3))",
          "4": "hsl(var(--chart-4))",
          "5": "hsl(var(--chart-5))",
        },
        sidebar: {
          DEFAULT: "hsl(var(--sidebar-background))",
          foreground: "hsl(var(--sidebar-foreground))",
          primary: "hsl(var(--sidebar-primary))",
          "primary-foreground": "hsl(var(--sidebar-primary-foreground))",
          accent: "hsl(var(--sidebar-accent))",
          "accent-foreground": "hsl(var(--sidebar-accent-foreground))",
          border: "hsl(var(--sidebar-border))",
          ring: "hsl(var(--sidebar-ring))",
        },
        
        // Theme color system - moved from CSS variables to Tailwind config
        "theme-primary": "hsl(var(--theme-primary))",
        "theme-primary-hover": "hsl(var(--theme-primary-hover))",
        "theme-secondary": "hsl(var(--theme-secondary))",
        "theme-accent": "hsl(var(--theme-accent))",
        "theme-action": "hsl(var(--theme-action))",
        "theme-success": "hsl(var(--theme-success))",
        "theme-warning": "hsl(var(--theme-warning))",
        "theme-info": "hsl(var(--theme-info))",
        "theme-background": "hsl(var(--theme-background))",
        "theme-surface": "hsl(var(--theme-surface))",
        "theme-text": "hsl(var(--theme-text))",
        "theme-text-light": "hsl(var(--theme-text-light))",
        "theme-border": "hsl(var(--theme-border))",
        "theme-button": "hsl(var(--theme-button))",
        "theme-button-hover": "hsl(var(--theme-button-hover))",
        
        // Wind quality indicators
        "theme-wind-excellent": "hsl(var(--theme-wind-excellent))",
        "theme-wind-good": "hsl(var(--theme-wind-good))",
        "theme-wind-moderate": "hsl(var(--theme-wind-moderate))",
        "theme-wind-poor": "hsl(var(--theme-wind-poor))",
        
        // Vibrant colors
        "yellow": "hsl(var(--color-yellow))",
        "coral": "hsl(var(--color-coral))",
        "slate": "hsl(var(--color-slate))",
      },
      
      // Additional background utilities
      backgroundImage: {
        'ocean-gradient': 'linear-gradient(135deg, hsl(var(--theme-primary)) 0%, hsl(var(--theme-primary-hover)) 100%)',
        'page-gradient': 'linear-gradient(135deg, hsl(var(--theme-background)) 0%, hsl(var(--theme-surface) / 30%) 100%)',
        'card-gradient': 'linear-gradient(135deg, hsl(var(--theme-background)) 0%, hsl(var(--theme-surface) / 40%) 100%)',
      },
      
      // Add animation keyframes
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        "slide-in": {
          from: { transform: "translateX(-100%)" },
          to: { transform: "translateX(0)" },
        },
        "wind-wave": {
          "0%, 100%": { transform: "translateX(-50%) translateZ(0)" },
          "50%": { transform: "translateX(0) translateZ(0)" },
        },
        "marker-pulse": {
          "0%": { transform: "scale(1)" },
          "50%": { transform: "scale(1.3)" },
          "100%": { transform: "scale(1)" },
        },
        "wave": {
          "0%": { transform: "translateX(-100%) translateZ(0)" },
          "100%": { transform: "translateX(100%) translateZ(0)" },
        },
      },
      
      // Define animations
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "slide-in": "slide-in 0.3s ease-out",
        "wind-wave": "wind-wave 3s infinite ease-in-out",
        "marker-pulse": "marker-pulse 0.5s ease-out",
        "wave": "wave 2s infinite linear",
      },
      
      // Typography scales
      fontSize: {
        xs: ['0.75rem', { lineHeight: '1rem' }],
        sm: ['0.875rem', { lineHeight: '1.25rem' }],
        base: ['1rem', { lineHeight: '1.5rem' }],
        lg: ['1.125rem', { lineHeight: '1.75rem' }],
        xl: ['1.25rem', { lineHeight: '1.75rem' }],
        '2xl': ['1.5rem', { lineHeight: '2rem' }],
        '3xl': ['1.875rem', { lineHeight: '2.25rem' }],
        '4xl': ['2.25rem', { lineHeight: '2.5rem' }],
        '5xl': ['3rem', { lineHeight: '1' }],
      },
    },
  },
  plugins: [require("tailwindcss-animate"), require("@tailwindcss/typography")],
} satisfies Config;
