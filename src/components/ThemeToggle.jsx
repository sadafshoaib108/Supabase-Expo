import React from 'react';
import { TouchableOpacity } from 'react-native';
import { MotiView } from 'moti';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../context/ThemeContext';

export default function ThemeToggle() {
  const { toggleTheme, isDark } = useTheme();

  return (
    <TouchableOpacity
      onPress={toggleTheme}
      className="p-3 rounded-full bg-slate-200 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 items-center justify-center shadow-lg"
      activeOpacity={0.8}
    >
      <MotiView
        from={{ rotate: '0deg', scale: 0.8 }}
        animate={{ rotate: isDark ? '360deg' : '0deg', scale: 1 }}
        transition={{ type: 'spring', damping: 15 }}
      >
        <Ionicons
          name={isDark ? 'moon' : 'sunny'}
          size={22}
          color={isDark ? '#818CF8' : '#F59E0B'}
        />
      </MotiView>
    </TouchableOpacity>
  );
}