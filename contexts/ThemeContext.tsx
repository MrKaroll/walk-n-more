import { createContext, ReactNode, useContext, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { darkTheme, lightTheme } from '../constants/theme';

type ThemeContextValue = {
  isDarkMode: boolean;
  colors: typeof lightTheme;
  toggleTheme: () => Promise<void>;
};

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

type Props = {
  children: ReactNode;
};

export function AppThemeProvider({ children }: Props) {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const colors = isDarkMode ? darkTheme : lightTheme;

  useEffect(() => {
    const loadTheme = async () => {
      try {
        const storedTheme = await AsyncStorage.getItem('themeMode');

        if (storedTheme === 'dark') {
          setIsDarkMode(true);
        }
      } catch (error) {
        console.log(error);
      }
    };

    loadTheme();
  }, []);

  const toggleTheme = async () => {
    try {
      const nextValue = !isDarkMode;

      setIsDarkMode(nextValue);
      await AsyncStorage.setItem('themeMode', nextValue ? 'dark' : 'light');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <ThemeContext.Provider value={{ isDarkMode, colors, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useAppTheme() {
  const context = useContext(ThemeContext);

  if (!context) {
    throw new Error('useAppTheme must be used inside AppThemeProvider');
  }

  return context;
}