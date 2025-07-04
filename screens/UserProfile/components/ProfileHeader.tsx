import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useAuth } from '../../../hooks/useAuth';
import { COLORS, FONTS } from '../../../constants/theme';
import FontAwesome from '@expo/vector-icons/FontAwesome';

const ProfileHeader = () => {
  const { userData } = useAuth();
  const avatarInitial = userData?.name ? userData.name.charAt(0).toUpperCase() : '?';

  return (
    <View style={styles.headerContainer}>
      <View style={styles.avatarContainer}>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>{avatarInitial}</Text>
        </View>
        <View style={styles.onlineIndicator} />
      </View>
      <Text style={styles.name}>{userData?.name || 'Utilisateur Anonyme'}</Text>
      <Text style={styles.email}>{userData?.email || 'Aucun email'}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    alignItems: 'center',
    paddingVertical: 30,
    paddingHorizontal: 20,
    backgroundColor: COLORS.lightGray,
    marginTop: 50,
  },
  avatarContainer: {
    position: 'relative',
    marginBottom: 15,
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: COLORS.primary,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 4,
    borderColor: 'rgba(255, 255, 255, 0.8)',
    elevation: 10,
    shadowColor: COLORS.primary,
    shadowOpacity: 0.3,
    shadowRadius: 15,
    shadowOffset: { width: 0, height: 5 },
  },
  avatarText: {
    ...FONTS.h1,
    color: COLORS.white,
    fontSize: 52,
    fontWeight: 'bold',
  },
  onlineIndicator: {
    position: 'absolute',
    bottom: 5,
    right: 5,
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#4CAF50',
    borderWidth: 3,
    borderColor: COLORS.lightGray,
  },
  name: {
    ...FONTS.h1,
    fontSize: 26,
    fontWeight: '700',
    color: COLORS.black,
    marginBottom: 4,
  },
  email: {
    ...FONTS.body3,
    color: COLORS.gray,
  },
});

export default ProfileHeader;