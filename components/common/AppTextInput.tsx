import React from 'react';
import { View, TextInput, Text, StyleSheet, TextInputProps } from 'react-native';
import { COLORS, SIZES, FONTS } from '../../constants/theme';
import FontAwesome from '@expo/vector-icons/FontAwesome';

interface AppTextInputProps extends TextInputProps {
  label: string;
  error?: string;
  icon?: React.ComponentProps<typeof FontAwesome>['name'];
}

const AppTextInput = ({ label, error, icon, ...props }: AppTextInputProps) => {
  return (
    <View style={styles.container}>
      {/* <Text style={styles.label}>{label}</Text> */}
      <View style={[styles.inputContainer, error ? styles.errorBorder : null]}>
        {icon && <FontAwesome name={icon} size={20} color={COLORS.gray} style={styles.icon} />}
        <TextInput
          style={styles.input}
          placeholderTextColor={COLORS.gray}
          {...props}
        />
      </View>
      {error && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: SIZES.padding / 2,
  },
  label: {
    ...FONTS.h4,
    color: COLORS.darkGray,
    marginBottom: SIZES.base,
  },
  inputContainer: {
    height: 50,
    backgroundColor: COLORS.lightGray,
    borderRadius: SIZES.radius,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: SIZES.base,
    borderWidth: 1,
    borderColor: 'transparent',
  },
  errorBorder: {
    borderColor: COLORS.error,
  },
  icon: {
    marginRight: SIZES.base,
  },
  input: {
    flex: 1,
    ...FONTS.body3,
    color: COLORS.black,
  },
  errorText: {
    ...FONTS.body4,
    color: COLORS.error,
    marginTop: SIZES.base / 2,
  },
});

export default AppTextInput;