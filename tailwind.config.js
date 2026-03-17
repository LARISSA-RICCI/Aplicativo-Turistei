/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,tsx}',
    './components/**/*.{js,ts,tsx}',
    './constants/**/*.{js,ts,tsx}',
  ],
  presets: [require('nativewind/preset')],
  theme: {
    extend: {
      colors: {
        primary: '#2E7D32',
        primaryLight: '#E8F5E9',
        primaryMuted: 'rgba(46, 125, 50, 0.22)',
        background: '#F5F5F5',
        surface: '#ffffff',
        text: '#212121',
        textSecondary: '#757575',
        textMuted: '#BDBDBD',
        border: '#E0E0E0',
        error: '#E53935',
      },
    },
  },
  plugins: [],
};
