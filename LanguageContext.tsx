import React, { createContext, useContext, useState, ReactNode } from 'react';

type Language = 'pt' | 'en';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  toggleLanguage: () => void;
  isTransitioning: boolean;
  targetLanguage: Language | null; // Language being transitioned TO
  startTransition: (callback: () => void) => void;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('pt');
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [targetLanguage, setTargetLanguage] = useState<Language | null>(null);

  const shouldAnimateTransition = () => {
    if (typeof window === 'undefined' || !window.matchMedia) return true;
    return !window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  };

  const toggleLanguage = () => {
    const nextLang = language === 'pt' ? 'en' : 'pt';

    if (!shouldAnimateTransition()) {
      setLanguage(nextLang);
      setIsTransitioning(false);
      setTargetLanguage(null);
      return;
    }
    
    // Set target language FIRST (for display in transition)
    setTargetLanguage(nextLang);
    setIsTransitioning(true);
    
    // Wait for expand animation (600ms)
    setTimeout(() => {
      setLanguage(nextLang); // Change language
      
      // Wait a bit then start reveal (200ms pause at full cover)
      setTimeout(() => {
        setIsTransitioning(false);
        setTargetLanguage(null); // Clear target after transition
      }, 200);
    }, 600);
  };

  const startTransition = (callback: () => void) => {
    if (!shouldAnimateTransition()) {
      callback();
      setIsTransitioning(false);
      setTargetLanguage(null);
      return;
    }

    setIsTransitioning(true);
    
    // Wait for expand animation (600ms)
    setTimeout(() => {
      callback(); // Change language
      
      // Wait a bit then start reveal (200ms pause at full cover)
      setTimeout(() => {
        setIsTransitioning(false);
        setTargetLanguage(null); // Clear target after transition
      }, 200);
    }, 600);
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, toggleLanguage, isTransitioning, targetLanguage, startTransition }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};