import React, { createContext, useContext, useState, useEffect } from 'react';

const defaultTheme = {
  isDark: false,
  accentColor: '#6C63FF',
};

const ThemeContext = createContext({
  theme: defaultTheme,
  toggleTheme: () => { },
  setAccentColor: () => { },
});

export const useTheme = () => useContext(ThemeContext);

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(() => {
    try {
      const savedTheme = localStorage.getItem('theme');
      if (!savedTheme) return defaultTheme;

      const parsedTheme = JSON.parse(savedTheme);
      // Validate the parsed theme has the required properties
      if (typeof parsedTheme.isDark !== 'boolean' || typeof parsedTheme.accentColor !== 'string') {
        return defaultTheme;
      }
      return parsedTheme;
    } catch (error) {
      console.warn('Failed to parse theme from localStorage:', error);
      return defaultTheme;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('theme', JSON.stringify(theme));

      if (theme.isDark) {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }

      document.documentElement.style.setProperty('--primary', theme.accentColor);
    } catch (error) {
      console.warn('Failed to save theme to localStorage:', error);
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => ({ ...prev, isDark: !prev.isDark }));
  };

  const setAccentColor = (color) => {
    setTheme(prev => ({ ...prev, accentColor: color }));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, setAccentColor }}>
      {children}
    </ThemeContext.Provider>
  );
};