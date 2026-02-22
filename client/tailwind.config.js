/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  safelist: [
    'from-ethiopian-green',
    'to-ethiopian-green',
    'from-ethiopian-gold',
    'to-ethiopian-gold',
    'from-ethiopian-red',
    'to-ethiopian-red',
    'via-ethiopian-gold',
    'border-ethiopian-green',
    'border-primary',
    'text-ethiopian-green',
    'text-ethiopian-gold',
    'text-ethiopian-red',
    'bg-ranger-olive',
    'bg-ranger-tan',
    'bg-ranger-khaki',
    'from-ranger-olive',
    'to-ranger-tan',
    'via-ranger-khaki',
    'border-ranger-olive',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#001F3F',
          dark: '#001529',
          light: '#003366',
        },
        ethiopian: {
          green: '#006A4E',
          gold: '#FCD116',
          red: '#D81E05',
        },
        ranger: {
          olive: '#556B2F',
          'olive-light': '#6B8E23',
          'olive-dark': '#4A5A1F',
          tan: '#C3B091',
          'tan-light': '#D2B48C',
          'tan-dark': '#A0826D',
          khaki: '#F5DEB3',
          earth: '#8B7355',
          'earth-light': '#A0826D',
        },
      },
      fontFamily: {
        sans: ['Inter', 'Plus Jakarta Sans', 'Noto Sans Ethiopic', 'system-ui', 'sans-serif'],
        heading: ['Inter', 'Plus Jakarta Sans', 'system-ui', 'sans-serif'],
      },
      letterSpacing: {
        tighter: '-0.02em',
        tight: '-0.01em',
      },
      animation: {
        'fade-in': 'fadeIn 0.6s ease-out',
        'fade-in-up': 'fadeInUp 0.6s ease-out',
        'scale-in': 'scaleIn 0.5s ease-out',
        'slide-up': 'slideUp 0.5s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        scaleIn: {
          '0%': { opacity: '0', transform: 'scale(0.95)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      backdropBlur: {
        xs: '2px',
      },
    },
  },
  plugins: [],
}

