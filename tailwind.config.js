/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'void': '#0a0a0f',
        'obsidian': '#12121a',
        'slate-dark': '#1a1a2e',
        'neon-cyan': '#00f5ff',
        'neon-magenta': '#ff00ff',
        'neon-lime': '#39ff14',
        'electric-blue': '#0066ff',
        'solar-orange': '#ff6b35',
        'plasma-purple': '#8b5cf6',
      },
      fontFamily: {
        'display': ['Orbitron', 'sans-serif'],
        'body': ['JetBrains Mono', 'monospace'],
      },
      boxShadow: {
        'neon-cyan': '0 0 20px rgba(0, 245, 255, 0.5)',
        'neon-magenta': '0 0 20px rgba(255, 0, 255, 0.5)',
        'glow': '0 0 40px rgba(0, 245, 255, 0.3)',
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 6s ease-in-out infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        glow: {
          '0%': { boxShadow: '0 0 20px rgba(0, 245, 255, 0.3)' },
          '100%': { boxShadow: '0 0 40px rgba(0, 245, 255, 0.6)' },
        }
      }
    },
  },
  plugins: [],
}

