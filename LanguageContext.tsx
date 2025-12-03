import React, { createContext, useContext, useState, ReactNode } from 'react';

type Language = 'pt' | 'en';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  toggleLanguage: () => void;
  isTransitioning: boolean;
  startTransition: (callback: () => void) => void;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('pt');
  const [isTransitioning, setIsTransitioning] = useState(false);

  const startTransition = (callback: () => void) => {
    setIsTransitioning(true);
    
    // Wait for expand animation (600ms)
    setTimeout(() => {
      callback(); // Change language
      
      // Wait a bit then start reveal (200ms pause at full cover)
      setTimeout(() => {
        setIsTransitioning(false);
      }, 200);
    }, 600);
  };

  const toggleLanguage = () => {
    startTransition(() => {
      setLanguage((prev) => (prev === 'pt' ? 'en' : 'pt'));
    });
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, toggleLanguage, isTransitioning, startTransition }}>
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