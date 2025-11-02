/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'teal-glow': '#64ffda',
        'bg-1': '#0a0a0a',
        'bg-2': '#1a1a2e',
        'bg-3': '#16213e'
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' }
        },
        logoPop: {
          '0%': { transform: 'scale(0.8) rotate(-10deg)', opacity: '0' },
          '50%': { transform: 'scale(1.1) rotate(5deg)', opacity: '0.8' },
          '100%': { transform: 'scale(1) rotate(0deg)', opacity: '1' }
        },
        floating: {
          '0%,100%': { transform: 'translateY(0px) rotate(0deg)' },
          '50%': { transform: 'translateY(-20px) rotate(180deg)' }
        },
        pulseGlow: {
          '0%,100%': { boxShadow: '0 0 20px rgba(100,255,218,0.3)' },
          '50%': { boxShadow: '0 0 40px rgba(100,255,218,0.8)' }
        }
      },
      animation: {
        fadeIn: 'fadeIn 0.5s ease-out both',
        logoPop: 'logoPop 1.5s ease-out both',
        floating: 'floating 3s ease-in-out infinite',
        pulseGlow: 'pulseGlow 2s infinite'
      }
    }
  },
  plugins: [require('daisyui')],
  plugins: [require("tailwindcss-animate")],
  daisyui: {
    themes: ["light", "night"],
  },
};