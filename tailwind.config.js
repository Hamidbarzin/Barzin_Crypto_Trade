/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'mono': ['JetBrains Mono', 'monospace'],
        'inter': ['Inter', 'sans-serif']
      },
      colors: {
        'crypto': {
          'primary': '#00d4ff',
          'secondary': '#ff6b6b', 
          'success': '#22d3ee',
          'danger': '#ef4444'
        }
      }
    },
  },
  plugins: [],
}