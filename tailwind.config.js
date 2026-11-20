/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}',
  ],
  theme: {
    extend: {
      colors: {
        // KitchenHub Brand Palette
        'kh': {
          'carbon': '#0A0A0A',
          'charcoal': '#141414',
          'graphite': '#1E1E1E',
          'steel': '#2A2A2A',
          'slate': '#3A3A3A',
        },
        'copper': {
          50: '#FFF5EE',
          100: '#FFE8D6',
          200: '#FFD4B3',
          300: '#FFBF80',
          400: '#FFA64D',
          500: '#FF9933',  // Primary copper
          600: '#E67E00',
          700: '#CC6600',
          800: '#B35200',
          900: '#994200',
        },
        'steel': {
          50: '#F0F2F5',
          100: '#E1E4E8',
          200: '#C3C9CF',
          300: '#A5ADB8',
          400: '#87919E',
          500: '#6B7B8C',
          600: '#546573',
          700: '#43505D',
          800: '#36404A',
          900: '#2D3540',
        },
        'gold': {
          50: '#FFF8E1',
          100: '#FFECB3',
          200: '#FFE082',
          300: '#FFD54F',
          400: '#FFCA28',
          500: '#FFC107',
          600: '#FFA000',
          700: '#FF8F00',
          800: '#FF6F00',
          900: '#E65100',
        },
      },
      fontFamily: {
        display: ['Space Grotesk', 'sans-serif'],
        editorial: ['Playfair Display', 'serif'],
        mono: ['JetBrains Mono', 'monospace'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        'display-xl': ['clamp(4rem, 8vw, 8rem)', { lineHeight: '0.9', letterSpacing: '-0.04em', fontWeight: '700' }],
        'display-lg': ['clamp(3rem, 6vw, 6rem)', { lineHeight: '0.95', letterSpacing: '-0.03em', fontWeight: '700' }],
        'display-md': ['clamp(2.5rem, 5vw, 4.5rem)', { lineHeight: '1', letterSpacing: '-0.02em', fontWeight: '600' }],
        'display-sm': ['clamp(2rem, 4vw, 3rem)', { lineHeight: '1.05', letterSpacing: '-0.01em', fontWeight: '600' }],
        'editorial-lg': ['clamp(1.5rem, 3vw, 2.25rem)', { lineHeight: '1.2', letterSpacing: '0.01em', fontWeight: '500' }],
        'editorial-md': ['clamp(1.25rem, 2.5vw, 1.75rem)', { lineHeight: '1.3', letterSpacing: '0.005em', fontWeight: '400' }],
        'editorial-sm': ['clamp(1rem, 2vw, 1.25rem)', { lineHeight: '1.4', letterSpacing: '0', fontWeight: '400' }],
        'micro': ['0.7rem', { lineHeight: '1.5', letterSpacing: '0.1em', textTransform: 'uppercase' }],
      },
      spacing: {
        '18': '4.5rem',
        '22': '5.5rem',
        '30': '7.5rem',
        '40': '10rem',
        '50': '12.5rem',
        '60': '15rem',
      },
      borderRadius: {
        '4xl': '2rem',
        '5xl': '2.5rem',
      },
      boxShadow: {
        'glow-copper': '0 0 60px rgba(255, 153, 51, 0.3), 0 0 120px rgba(255, 153, 51, 0.15)',
        'glow-gold': '0 0 40px rgba(255, 215, 0, 0.3), 0 0 80px rgba(255, 215, 0, 0.1)',
        'inner-glow': 'inset 0 1px 0 rgba(255,255,255,0.1), inset 0 -1px 0 rgba(0,0,0,0.1)',
        'brutal': '8px 8px 0 rgba(0,0,0,0.15)',
        'brutal-lg': '12px 12px 0 rgba(0,0,0,0.15)',
      },
      transitionDuration: {
        '2000': '2000ms',
        '3000': '3000ms',
      },
      transitionTimingFunction: {
        'elastic-out': 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
        'expo-out': 'cubic-bezier(0.16, 1, 0.3, 1)',
        'circ-out': 'cubic-bezier(0.075, 0.82, 0.165, 1)',
      },
      animation: {
        'fade-in': 'fadeIn 0.8s ease-out forwards',
        'slide-up': 'slideUp 0.8s ease-out forwards',
        'slide-down': 'slideDown 0.8s ease-out forwards',
        'scale-in': 'scaleIn 0.6s ease-out forwards',
        'spin-slow': 'spin 20s linear infinite',
        'pulse-slow': 'pulse 3s ease-in-out infinite',
        'float': 'float 6s ease-in-out infinite',
        'grid-flow': 'gridFlow 20s linear infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(40px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideDown: {
          '0%': { opacity: '0', transform: 'translateY(-40px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        scaleIn: {
          '0%': { opacity: '0', transform: 'scale(0.9)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        gridFlow: {
          '0%': { backgroundPosition: '0 0' },
          '100%': { backgroundPosition: '100px 100px' },
        },
      },
      backgroundImage: {
        'grid-pattern': "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.02'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h-4zm0-30V0H4v4H0v2h4v4h2V6h4V4H0z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")",
        'grid-pattern-dark': "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.03'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h-4zm0-30V0H4v4H0v2h4v4h2V6h4V4H0z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")",
        'copper-gradient': 'linear-gradient(135deg, #FF9933 0%, #FF6F00 50%, #E65100 100%)',
        'steel-gradient': 'linear-gradient(135deg, #1E1E1E 0%, #2A2A2A 50%, #141414 100%)',
        'carbon-gradient': 'radial-gradient(ellipse at center, #1A1A1A 0%, #0A0A0A 70%)',
      },
    },
  },
  plugins: [],
}