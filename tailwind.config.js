/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        gold: {
          400: '#ffd700',
          500: '#ffcc00',
          600: '#e6b800',
        },
      },
      fontFamily: {
        'sans': ['Inter', 'system-ui', 'sans-serif'],
        'mono': ['JetBrains Mono', 'Consolas', 'monospace'],
      },
      animation: {
        'pulse-gold': 'pulse-gold 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'glow': 'glow 3s ease-in-out infinite alternate',
        'refresh-pulse': 'refresh-pulse 0.8s ease-out',
        'waveform': 'waveform 1.5s ease-in-out infinite',
      },
      keyframes: {
        'pulse-gold': {
          '0%, 100%': {
            opacity: '1',
            boxShadow: '0 0 0 0 rgba(255, 215, 0, 0.7)'
          },
          '50%': {
            opacity: '.8',
            boxShadow: '0 0 0 10px rgba(255, 215, 0, 0)'
          },
        },
        'glow': {
          'from': {
            textShadow: '0 0 5px #ffd700, 0 0 10px #ffd700, 0 0 15px #ffd700',
          },
          'to': {
            textShadow: '0 0 10px #ffd700, 0 0 20px #ffd700, 0 0 30px #ffd700',
          },
        },
        'refresh-pulse': {
          '0%': { transform: 'scale(1)', opacity: '1' },
          '50%': { transform: 'scale(1.05)', opacity: '0.8' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        'waveform': {
          '0%, 100%': { height: '4px' },
          '50%': { height: '12px' },
        },
      },
    },
  },
  plugins: [],
}