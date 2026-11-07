import {
    createContext,
    useContext,
    useEffect,
    useState,
} from 'react';

import * as SecureStore from 'expo-secure-store';
import { useColorScheme } from 'react-native';

const ThemeContext = createContext({
  theme: 'dark',
  isDark: true,
  toggleTheme: async () => {},
});

export const ThemeProvider = ({ children }) => {
  const systemColorScheme = useColorScheme();
  const [theme, setTheme] = useState('dark');

  useEffect(() => {
    const loadSavedTheme = async () => {
      try {
        const savedTheme = await SecureStore.getItemAsync('user_theme');

        if (savedTheme === 'dark' || savedTheme === 'light') {
          setTheme(savedTheme);
        } else if (systemColorScheme) {
          setTheme(systemColorScheme);
        }
      } catch (error) {
        console.log('Error loading theme:', error);
      }
    };

    loadSavedTheme();
  }, [systemColorScheme]);

  const toggleTheme = async () => {
    const nextTheme = theme === 'dark' ? 'light' : 'dark';

    setTheme(nextTheme);

    try {
      await SecureStore.setItemAsync('user_theme', nextTheme);
    } catch (error) {
      console.log('Error saving theme:', error);
    }
  };

  return (
    <ThemeContext.Provider
      value={{
        theme,
        isDark: theme === 'dark',
        toggleTheme,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);