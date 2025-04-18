import React, { createContext, useEffect } from 'react';

export const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', 'dark');
  }, []);

  return (
    <ThemeContext.Provider value={{ theme: 'dark' }}>
      {children}
    </ThemeContext.Provider>
  );
}; 