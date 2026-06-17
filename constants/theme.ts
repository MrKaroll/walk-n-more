export const lightTheme = {
  backgroundGradient: ['#E8FDF8', '#EEF3FF'] as const,
  card: '#FFFFFF',
  cardAlt: '#F3F7FF',
  text: '#061A4A',
  muted: '#6B7280',
  border: '#E5E7EB',
  option: '#F3F4F6',
  accent: '#00D5B5',
  secondary: '#008CFF',
  danger: '#FF5A5F',
  white: '#FFFFFF',
};

export const darkTheme = {
  backgroundGradient: ['#07111F', '#0B1C2F'] as const,
  card: '#111827',
  cardAlt: '#1F2937',
  text: '#F9FAFB',
  muted: '#9CA3AF',
  border: '#374151',
  option: '#1F2937',
  accent: '#00D5B5',
  secondary: '#60A5FA',
  danger: '#F87171',
  white: '#FFFFFF',
};

export type ThemeColors = typeof lightTheme;