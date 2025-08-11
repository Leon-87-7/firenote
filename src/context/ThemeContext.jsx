import {
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react';

//theme context creation
const ThemeContext = createContext();

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState('cordovanChalkTheme');

  useEffect(() => {
    //load savedTheme
    const savedTheme =
      localStorage.getItem('theme') || 'cordovanChalkTheme';
    setTheme(savedTheme);
    //apply theme attribute (for DaisyUI theme switching)
    document.documentElement.setAttribute('data-theme', savedTheme);
  }, []);

  const toggleTheme = () => {
    //theme switching logic
    const nextTheme =
      theme === 'cordovanChalkTheme'
        ? 'brownPinkRoseTheme'
        : 'cordovanChalkTheme';
    setTheme(nextTheme);
    //update DOM attribute (for DaisyUI theme switching)
    document.documentElement.setAttribute('data-theme', nextTheme);
    //saving theme
    localStorage.setItem('theme', nextTheme);
  };

  //context value object
  const value = {
    theme,
    toggleTheme,
  };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  //get theme context
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}
