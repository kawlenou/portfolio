/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useMemo } from 'react';
import { defaultPortfolioContent } from '../data/portfolioContent';

const ContentContext = createContext(null);

export const ContentProvider = ({ children }) => {
  const value = useMemo(() => ({
    content: defaultPortfolioContent,
    loading: false,
  }), []);

  return <ContentContext.Provider value={value}>{children}</ContentContext.Provider>;
};

export const useContent = () => {
  const ctx = useContext(ContentContext);
  if (!ctx) throw new Error('useContent must be used inside ContentProvider');
  return ctx;
};
