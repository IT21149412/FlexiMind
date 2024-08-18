import { Dimensions } from 'react-native';
const { width, height } = Dimensions.get('window');

export const COLORS = {
  primary: '#252c4a',
  secondary: '#fafbfc',
  accent: '#1a338f',

  success: '#00C851',
  error: '#ff4444',

  black: '#171717',
  white: '#FFFFFF',
  background: '#4D86F7',
};

export const SIZES = {
  base: 10,
  width,
  height,
};
