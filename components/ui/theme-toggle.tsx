"use client";

import { useState, useEffect } from 'react';
import { Moon, Sun } from 'lucide-react';
import { Button } from './button';

export function ThemeToggle() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    // Check if dark mode is saved in local storage
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
      setIsDarkMode(true);
      document.documentElement.classList.add('dark');
    }
  }, []);

  const toggleTheme = () => {
    if (isDarkMode) {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    } else {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    }
    setIsDarkMode(!isDarkMode);
  };

  return (
    <Button
      onClick={toggleTheme}
      className="fixed top-4 right-4 z-50 p-2 rounded-full bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm shadow-md hover:shadow-lg transition-all"
      aria-label="Toggle theme"
    >
      {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
    </Button>
  );
}
