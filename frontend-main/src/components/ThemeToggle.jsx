import { Moon, Sun } from 'lucide-react';

export const ThemeToggle = ({ theme, onToggle }) => (
  <button
    onClick={onToggle}
    className="rounded-full border border-borderTone-light p-2 transition-all duration-300 hover:scale-105 dark:border-borderTone-dark"
    aria-label="Toggle theme"
  >
    {theme === 'dark' ? <Sun size={18} className="text-amber-400" /> : <Moon size={18} className="text-primary-light" />}
  </button>
);
