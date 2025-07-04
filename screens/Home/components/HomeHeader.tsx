import React from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { SIZES, COLORS, FONTS } from '../../../constants/theme';
import { AntDesign } from '@expo/vector-icons'; 

interface HomeHeaderProps {
  user: { name?: string; avatar?: string } | null;
  onProfilePress: () => void;
}

const HomeHeader = ({ user, onProfilePress }: HomeHeaderProps) => {
  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.greetingText}>Bienvenue,</Text>
        <Text style={styles.userName}>{user?.name || 'Utilisateur'}</Text>
      </View>
      <TouchableOpacity onPress={onProfilePress} style={styles.profileButton}>
        {user?.avatar ? (
          <Image source={{ uri: user.avatar }} style={styles.avatar} />
        ) : (
          <AntDesign name="user" size={24} color={COLORS.primary} />
        )}
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: SIZES.padding,
    paddingTop: SIZES.padding,
    paddingBottom: 10,
    backgroundColor: COLORS.lightGray,
  },
  greetingText: {
    ...FONTS.body3,
    color: COLORS.gray,
  },
  userName: {
    ...FONTS.h2,
    color: COLORS.black,
    fontWeight: 'bold',
  },
  profileButton: {
    width: 45,
    height: 45,
    borderRadius: 22.5,
    backgroundColor: COLORS.white,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  avatar: {
    width: '100%',
    height: '100%',
    borderRadius: 22.5,
  },
});

export default HomeHeader;