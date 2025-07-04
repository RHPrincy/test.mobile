import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { COLORS, SIZES } from '../../../constants/theme';

interface LogoutButtonProps {
  onPress: () => void;
}

const LogoutButton = ({ onPress }: LogoutButtonProps) => {
  return (
    <TouchableOpacity style={styles.logoutButton} onPress={onPress}>
      <FontAwesome name="sign-out" size={22} color={COLORS.white} />
      <Text style={styles.logoutButtonText}>Se déconnecter</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#E74C3C', 
    height: 55,
    borderRadius: SIZES.radius,
    marginHorizontal: SIZES.padding,
    marginVertical: SIZES.padding,
    elevation: 4,
    shadowColor: '#E74C3C',
    shadowOpacity: 0.3,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
  },
  logoutButtonText: {
    color: COLORS.white,
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 10,
  },
});

export default LogoutButton;