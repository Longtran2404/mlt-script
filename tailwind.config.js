/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/index.html"
  ],
  theme: {
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        mlt: {
          red: "#C4161C",
          dark: "#0F0F10",
          ink: "#141518",
          gray: "#6B7280",
          light: "#F8FAFC"
        }
      },
      backgroundImage: {
        "grid": "radial-gradient(circle at 1px 1px, rgba(0,0,0,0.08) 1px, transparent 0)",
        "mlt-radial": "radial-gradient(1200px 600px at 85% -10%, rgba(196,22,28,.12), transparent 40%), radial-gradient(800px 400px at -10% 10%, rgba(196,22,28,.10), transparent 40%)",
        "mlt-linear": "linear-gradient(135deg, rgba(196,22,28,.12), rgba(20,21,24,.06))"
      },
      boxShadow: {
        "soft": "0 10px 30px rgba(0,0,0,0.08)",
        "elev": "0 20px 60px rgba(0,0,0,0.12)",
        "glow": "0 0 20px rgba(59, 130, 246, 0.3)",
        "glow-lg": "0 0 40px rgba(59, 130, 246, 0.4)"
      },
      borderRadius: {
        xl: "14px",
        "2xl": "18px"
      },
      fontFamily: {
        sans: ["system-ui", "Segoe UI", "Roboto", "sans-serif"]
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'pulse-slow': 'pulse 3s ease-in-out infinite',
        'shimmer': 'shimmer 2s linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        shimmer: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(100%)' },
        },
      },
    }
  },
  plugins: []
}
