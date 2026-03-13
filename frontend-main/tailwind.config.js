/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        bg: {
          light: '#F8FAFC',
          dark: '#0B0F19',
        },
        surface: {
          light: '#FFFFFF',
          dark: '#0F172A',
        },
        borderTone: {
          light: '#E5E7EB',
          dark: '#1F2937',
        },
        primary: {
          light: '#4F46E5',
          dark: '#38BDF8',
        },
        accent: '#22D3EE',
        neon: '#4ADE80',
      },
      boxShadow: {
        industrial: '0 0 0 1px rgba(148,163,184,0.2), 0 10px 25px rgba(15,23,42,0.12)',
      },
      backgroundImage: {
        grid: 'linear-gradient(to right, rgba(148,163,184,0.08) 1px, transparent 1px), linear-gradient(to bottom, rgba(148,163,184,0.08) 1px, transparent 1px)',
      },
      backgroundSize: {
        grid: '28px 28px',
      },
    },
  },
  plugins: [],
};
