import React, { useState, useEffect, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Alert,
  ScrollView,
  SafeAreaView,
  ActivityIndicator,
  StatusBar as RNStatusBar,
} from 'react-native';
import { useAuth } from '../../hooks/useAuth';
import { getProductsBySeller } from '../../services/ProductService';
import LoadingIndicator from '../../components/loading/LoadingIndicator';
import { COLORS, FONTS, SIZES } from '../../constants/theme';

import ProfileHeader from './components/ProfileHeader';
import InfoCard from './components/InfoCard';
import StatCard from './components/StatCard';
import LogoutButton from './components/LogoutButton';

export default function UserProfileScreen() {
  const { userData, signOut, updateUserData, isLoading: isAuthLoading } = useAuth();

  // State
  const [isEditing, setIsEditing] = useState(false);
  const [isLoadingStats, setIsLoadingStats] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [productCount, setProductCount] = useState(0);

  // Form state
  const [name, setName] = useState(userData?.name || '');
  const [email, setEmail] = useState(userData?.email || '');

  // Fetch stats effect
  useEffect(() => {
    const fetchUserStats = async () => {
      if (userData?.name) {
        setIsLoadingStats(true);
        try {
          const userProducts = await getProductsBySeller(userData.name);
          setProductCount(userProducts.length);
        } catch (error) {
          console.error("Erreur de chargement des statistiques:", error);
        } finally {
          setIsLoadingStats(false);
        }
      } else {
        setIsLoadingStats(false);
      }
    };
    fetchUserStats();
  }, [userData?.name]);

  // Handlers
  const handleLogout = useCallback(() => {
    Alert.alert("Déconnexion", "Voulez-vous vraiment vous déconnecter ?", [
      { text: "Annuler", style: "cancel" },
      { text: "Oui", onPress: signOut, style: 'destructive' },
    ]);
  }, [signOut]);

  const handleSaveProfile = async () => {
    if (!name.trim() || !email.trim()) {
      Alert.alert("Validation", "Le nom et l'email sont requis.");
      return;
    }
    setIsSaving(true);
    try {
      await updateUserData({ ...userData!, name, email });
      Alert.alert("Succès", "Votre profil a été mis à jour.");
      setIsEditing(false);
    } catch (error) {
      Alert.alert("Erreur", "La mise à jour a échoué.");
    } finally {
      setIsSaving(false);
    }
  };

  const handleCancelEdit = () => {
    setName(userData?.name || '');
    setEmail(userData?.email || '');
    setIsEditing(false);
  };

  if (isAuthLoading || !userData) {
    return <LoadingIndicator />;
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <RNStatusBar backgroundColor="transparent" barStyle="dark-content" translucent />
      
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
      >
        <ProfileHeader />

        <InfoCard
          isEditing={isEditing}
          onEditToggle={() => setIsEditing(true)}
          name={name}
          onNameChange={setName}
          email={email}
          onEmailChange={setEmail}
          onSave={handleSaveProfile}
          onCancel={handleCancelEdit}
          isSaving={isSaving}
          userData={userData}
        />

        <View style={styles.statsSection}>
          <Text style={styles.sectionTitle}>Statistiques</Text>
          {isLoadingStats ? (
            <ActivityIndicator color={COLORS.primary} size="small" />
          ) : (
            <StatCard
              icon="cube"
              label="Produits en ligne"
              value={productCount.toString()}
              color={COLORS.primary}
            />
          )}
        </View>

        <LogoutButton onPress={handleLogout} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.lightGray,
  },
  container: {
    flex: 1,
  },
  contentContainer: {
    paddingBottom: 30,
  },
  statsSection: {
    paddingHorizontal: SIZES.padding,
    marginBottom: SIZES.padding,
  },
  sectionTitle: {
    ...FONTS.h3,
    color: COLORS.darkGray,
    marginBottom: SIZES.base,
  },
});