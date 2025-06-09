import React, { useEffect } from 'react';
import { Moon, Sun } from 'lucide-react';

interface ThemeToggleProps {
  darkMode: boolean;
  setDarkMode: (value: boolean) => void;
}

export function ThemeToggle({ darkMode, setDarkMode }: ThemeToggleProps) {
  // Detect and set the theme on initial load
  useEffect(() => {
    const savedTheme = sessionStorage.getItem('theme');
    if (savedTheme) {
      setDarkMode(savedTheme === 'dark');
    } else {
      const systemDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
      setDarkMode(systemDarkMode);
      sessionStorage.setItem('theme', systemDarkMode ? 'dark' : 'light');
    }
  }, [setDarkMode]);

  // Update session storage whenever the user toggles the theme
  const handleToggle = () => {
    const newTheme = !darkMode ? 'dark' : 'light';
    setDarkMode(!darkMode);
    sessionStorage.setItem('theme', newTheme);
  };

  return (
    <button
      onClick={handleToggle}
      className={`p-2 rounded-lg ${
        darkMode ? 'bg-gray-700 text-yellow-400' : 'bg-gray-100 text-gray-600'
      } hover:opacity-80 transition-colors duration-200`}
      type="button"
    >
      {darkMode ? <Sun className="w-6 h-6" /> : <Moon className="w-6 h-6" />}
    </button>
  );
}