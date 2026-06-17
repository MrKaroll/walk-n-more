import { Stack } from 'expo-router';
import { AppThemeProvider } from '../contexts/ThemeContext';

export default function RootLayout() {
  return (
    <AppThemeProvider>
      <Stack screenOptions={{ headerShown: false }} />
    </AppThemeProvider>
  );
}