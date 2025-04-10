'use client';

import React from 'react';
import { Moon, Sun } from 'lucide-react';
import { useTheme } from '@/context/ThemeContext';

interface ThemeToggleProps {
  isDark?: boolean;
  onToggle?: () => void;
}

export default function ThemeToggle({ isDark, onToggle }: ThemeToggleProps) {
  const themeContext = useTheme();
  
  // Use props if provided, otherwise use context
  const isDarkTheme = isDark !== undefined ? isDark : themeContext.isDarkTheme;
  const toggleTheme = onToggle || themeContext.toggleTheme;

  // Component is now hidden/disabled
  return null;
}