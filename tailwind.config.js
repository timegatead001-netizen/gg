/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        rose: {
          50: '#fff5f7',
          100: '#ffe4ec',
          200: '#ffc9da',
          300: '#ffa3bd',
          400: '#ff7194',
          500: '#f5456f',
          600: '#dc1f4f',
          700: '#b8123e',
          800: '#97133a',
          900: '#7d1538',
          950: '#47071f',
        },
        gold: {
          50: '#fffaef',
          100: '#fdf0c8',
          200: '#fae08c',
          300: '#f5c94b',
          400: '#eab308',
          500: '#d4960a',
          600: '#b27509',
          700: '#8f5a0b',
          800: '#78480f',
          900: '#663c12',
        },
        cream: {
          50: '#fffdf9',
          100: '#fdf8ee',
          200: '#f9eed4',
        },
        night: {
          900: '#1a0816',
          950: '#100410',
          975: '#0a0309',
        },
      },
      fontFamily: {
        display: ['"Cormorant Garamond"', 'serif'],
        script: ['"Dancing Script"', 'cursive'],
        body: ['"Quicksand"', 'sans-serif'],
      },
      animation: {
        'float-slow': 'floatSlow 7s ease-in-out infinite',
        'float-mid': 'floatMid 5s ease-in-out infinite',
        'glow-pulse': 'glowPulse 3s ease-in-out infinite',
        'shimmer': 'shimmer 6s linear infinite',
        'spin-slow': 'spin 24s linear infinite',
      },
      keyframes: {
        floatSlow: {
          '0%,100%': { transform: 'translateY(0) translateX(0)' },
          '50%': { transform: 'translateY(-22px) translateX(10px)' },
        },
        floatMid: {
          '0%,100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-14px)' },
        },
        glowPulse: {
          '0%,100%': { opacity: '0.6', filter: 'blur(8px)' },
          '50%': { opacity: '1', filter: 'blur(14px)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% center' },
          '100%': { backgroundPosition: '200% center' },
        },
      },
    },
  },
  plugins: [],
};
