import React, { createContext, useContext, useState, useEffect } from 'react';
import { loadPortfolioData, savePortfolioData, updateSection, updateItem } from '../data/portfolioData';

const PortfolioContext = createContext();

export const PortfolioProvider = ({ children }) => {
  const [portfolioData, setPortfolioData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Load data when the app starts
    const data = loadPortfolioData();
    setPortfolioData(data);
    setIsLoading(false);
  }, []);

  const updatePortfolioSection = (section, data) => {
    const updatedData = updateSection(section, data);
    setPortfolioData(updatedData);
    return updatedData;
  };

  const updatePortfolioItem = (section, itemId, data) => {
    const updatedData = updateItem(section, itemId, data);
    setPortfolioData(updatedData);
    return updatedData;
  };

  const value = {
    portfolioData,
    isLoading,
    updatePortfolioSection,
    updatePortfolioItem
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <PortfolioContext.Provider value={value}>
      {children}
    </PortfolioContext.Provider>
  );
};

export const usePortfolio = () => {
  const context = useContext(PortfolioContext);
  if (!context) {
    throw new Error('usePortfolio must be used within a PortfolioProvider');
  }
  return context;
}; 