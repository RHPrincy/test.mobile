import { Dimensions } from 'react-native';
const { width, height } = Dimensions.get('window');

export const COLORS = {
  primary: '#5C0029',    
  secondary: '#779CAB',   
  error: '#FF3B30',  
  black: '#1C1C1E',   
  white: '#FFFFFF',     
  lightGray: '#F2F2F7', 
  gray: '#8E8E93',       
  darkGray: '#3A3A3C',   
};


export const SIZES = {
  base: 8,
  font: 14,
  radius: 12,
  padding: 20,
  h1: 30,
  h2: 24,
  h3: 18,
  h4: 14,
  body1: 30,
  body2: 22,
  body3: 16,
  body4: 14,
  width,
  height,
};

export const FONTS = {
  h1: { fontFamily: 'System', fontSize: SIZES.h1, lineHeight: 36, fontWeight: 'bold' as 'bold' },
  h2: { fontFamily: 'System', fontSize: SIZES.h2, lineHeight: 30, fontWeight: '600' as '600' },
  h3: { fontFamily: 'System', fontSize: SIZES.h3, lineHeight: 22, fontWeight: '600' as '600' },
  h4: { fontFamily: 'System', fontSize: SIZES.h4, lineHeight: 22, fontWeight: '500' as '500' },
  body3: { fontFamily: 'System', fontSize: SIZES.body3, lineHeight: 22 },
  body4: { fontFamily: 'System', fontSize: SIZES.body4, lineHeight: 22 },
};

const appTheme = { COLORS, SIZES, FONTS };
export default appTheme;