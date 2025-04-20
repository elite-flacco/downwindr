import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: ["./client/index.html", "./client/src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      colors: {
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
        // Theme color system
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
        
        // Wind quality indicators
        "theme-wind-excellent": "hsl(var(--theme-wind-excellent))",
        "theme-wind-good": "hsl(var(--theme-wind-good))",
        "theme-wind-moderate": "hsl(var(--theme-wind-moderate))",
        "theme-wind-poor": "hsl(var(--theme-wind-poor))",
        
        // Vibrant Blues
        "electric": "hsl(var(--color-electric-blue))",
        "cerulean": "hsl(var(--color-cerulean))",
        "azure": "hsl(var(--color-azure))",
        "yellow": "hsl(var(--color-yellow))",
        "coral": "hsl(var(--color-coral))",
        "lime": "hsl(var(--color-lime))",
        "navy": "hsl(var(--color-navy))",
        "sky": "hsl(var(--color-light-blue))",
        
        // Legacy colors (for backward compatibility)
        "neutral-light": "hsl(var(--theme-background))",
        "neutral-dark": "hsl(var(--theme-text))",
        "wind-good": "hsl(var(--theme-wind-good))",
        "wind-moderate": "hsl(var(--theme-wind-moderate))",
        "wind-poor": "hsl(var(--theme-wind-poor))",
        "ocean-blue": "hsl(var(--color-electric-blue))",
        "ocean-dark": "hsl(var(--color-navy))",
      },
      keyframes: {
        "accordion-down": {
          from: {
            height: "0",
          },
          to: {
            height: "var(--radix-accordion-content-height)",
          },
        },
        "accordion-up": {
          from: {
            height: "var(--radix-accordion-content-height)",
          },
          to: {
            height: "0",
          },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate"), require("@tailwindcss/typography")],
} satisfies Config;
