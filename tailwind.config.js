/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Primary brand colors from Cryptino Figma design
        primary: {
          DEFAULT: '#00AEFF',
          50: '#E6F9FF',
          100: '#B3EEFF',
          200: '#80E3FF',
          300: '#4DD8FF',
          400: '#33D4FF',
          500: '#00AEFF',
          600: '#0083FF',
          700: '#0066CC',
          800: '#004C99',
          900: '#003366',
        },
        // Secondary blue for gradients
        secondary: {
          DEFAULT: '#0083FF',
          light: '#00B5FF',
          dark: '#0066CC',
        },
        // Bitcoin/Crypto orange accent
        crypto: {
          DEFAULT: '#F7931A',
          light: '#FFAA33',
          dark: '#CC7A15',
        },
        // Main background - Figma dark navy
        dark: {
          DEFAULT: '#0A0C15',
          50: '#151823',
          100: '#12141F',
          200: '#0F111A',
          300: '#0A0C15',
          400: '#080A11',
          500: '#05060A',
          600: '#030405',
          700: '#000000',
          800: '#000000',
          900: '#000000',
        },
        // Card/surface backgrounds - slightly lighter than bg
        surface: {
          DEFAULT: '#151823',
          light: '#1D202D',
          dark: '#0F111A',
          lighter: '#252836',
        },
        // Sidebar/header background
        sidebar: {
          DEFAULT: '#0E1018',
          hover: '#1A1D28',
        },
        // Accent colors
        accent: {
          blue: '#00B5FF',
          purple: '#8B5CF6',
          pink: '#EC4899',
          orange: '#F7931A',
          yellow: '#FFD700',
          red: '#EF4444',
          green: '#00FF88',
          cyan: '#00E5FF',
        },
        // Status colors
        success: '#00FF88',
        warning: '#FFD700',
        error: '#FF4757',
        info: '#00AEFF',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Poppins', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      fontSize: {
        '2xs': ['0.625rem', { lineHeight: '0.875rem' }],
      },
      boxShadow: {
        'glow': '0 0 20px rgba(0, 174, 255, 0.3)',
        'glow-lg': '0 0 40px rgba(0, 174, 255, 0.4)',
        'glow-primary': '0 4px 20px rgba(0, 174, 255, 0.25)',
        'glow-green': '0 0 20px rgba(0, 255, 136, 0.3)',
        'glow-orange': '0 0 20px rgba(247, 147, 26, 0.3)',
        'card': '0 4px 24px rgba(0, 0, 0, 0.4)',
        'card-hover': '0 8px 32px rgba(0, 0, 0, 0.5)',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'hero-gradient': 'linear-gradient(135deg, #151823 0%, #0A0C15 100%)',
        'card-gradient': 'linear-gradient(180deg, #1D202D 0%, #151823 100%)',
        'primary-gradient': 'linear-gradient(135deg, #00AEFF 0%, #0083FF 100%)',
        'green-gradient': 'linear-gradient(135deg, #00FF88 0%, #00CC6A 100%)',
        'orange-gradient': 'linear-gradient(135deg, #F7931A 0%, #CC7A15 100%)',
        'vip-gradient': 'linear-gradient(135deg, #FFD700 0%, #F7931A 100%)',
        'purple-gradient': 'linear-gradient(135deg, #8B5CF6 0%, #6D28D9 100%)',
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'spin-slow': 'spin 3s linear infinite',
        'bounce-slow': 'bounce 2s infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
      },
      keyframes: {
        glow: {
          '0%': { boxShadow: '0 0 20px rgba(0, 174, 255, 0.3)' },
          '100%': { boxShadow: '0 0 40px rgba(0, 174, 255, 0.6)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        scaleIn: {
          '0%': { opacity: '0', transform: 'scale(0.95)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
      },
      borderRadius: {
        '2xl': '1rem',
        '3xl': '1.5rem',
      },
    },
  },
  plugins: [],
}
