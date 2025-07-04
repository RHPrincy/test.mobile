import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { COLORS, FONTS, SIZES } from '../../constants/theme';

interface AppButtonProps {
  title: string;
  onPress: () => void;
  disabled?: boolean;
  isLoading?: boolean;
  variant?: 'primary' | 'secondary' | 'error';
}

const AppButton = ({ title, onPress, disabled, isLoading, variant = 'primary' }: AppButtonProps) => {
  const buttonStyle = [
    styles.button,
    { backgroundColor: COLORS[variant] },
    (disabled || isLoading) && styles.disabled,
  ];

  return (
    <TouchableOpacity style={buttonStyle} onPress={onPress} disabled={disabled || isLoading}>
      {isLoading ? (
        <ActivityIndicator color={COLORS.white} />
      ) : (
        <Text style={styles.text}>{title}</Text>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    height: 50,
    borderRadius: SIZES.radius,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: SIZES.padding,
  },
  text: {
    ...FONTS.h3,
    color: COLORS.white,
    fontWeight: '600',
  },
  disabled: {
    opacity: 0.5,
  },
});

export default AppButton;