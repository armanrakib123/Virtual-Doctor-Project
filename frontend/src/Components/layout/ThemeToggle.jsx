'use client';

import React from 'react';
import { useTheme } from '@/Providers/ThemeProvider';
import { Sun, Moon } from 'lucide-react';

export default function ThemeToggle({ className = '', size = 'md' }) {
  const { theme, toggleTheme, mounted } = useTheme();
  const isDark = theme === 'dark';

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode`}
      className={`btn btn-ghost btn-circle relative transition-all duration-300 hover:bg-base-200 focus:outline-none ${className}`}
      title={`Switch to ${isDark ? 'Light' : 'Dark'} mode`}
    >
      <div className="relative w-6 h-6 flex items-center justify-center">
        <Sun
          className={`absolute text-amber-500 transition-all duration-300 ${
            isDark ? 'opacity-0 rotate-90 scale-50' : 'opacity-100 rotate-0 scale-100'
          }`}
          size={20}
        />
        <Moon
          className={`absolute text-cyan-400 transition-all duration-300 ${
            isDark ? 'opacity-100 rotate-0 scale-100' : 'opacity-0 -rotate-90 scale-50'
          }`}
          size={20}
        />
      </div>
    </button>
  );
}
