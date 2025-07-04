import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, KeyboardAvoidingView, Platform, SafeAreaView, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { AuthStackParamList } from '../../navigation/AppNavigator';
import { useAuth } from '../../hooks/useAuth';
import { COLORS, FONTS, SIZES } from '../../constants/theme';
import AppButton from '../../components/common/AppButton';
import AppTextInput from '../../components/common/AppTextInput';

type LoginNavProps = StackNavigationProp<AuthStackParamList, 'Login'>;

export default function LoginScreen() {
  const [email, setEmail] = useState('test@example.com');
  const [password, setPassword] = useState('password');
  const [error, setError] = useState('');
  const { signIn, isLoading } = useAuth();
  const navigation = useNavigation<LoginNavProps>();

  const handleLogin = async () => {
    setError('');
    if (!email || !password) { setError('Veuillez remplir tous les champs.'); return; }
    try { await signIn(email, password); } catch (e: any) { setError(e.message); }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={{flex: 1}}>
        <ScrollView contentContainerStyle={styles.container}>
          <View style={styles.header}>
            <Text style={styles.title}>Bienvenue</Text>
            <Text style={styles.subtitle}>Connectez-vous pour gérer vos produits</Text>
          </View>
          <View style={styles.form}>
            <AppTextInput label="Adresse Email" value={email} onChangeText={setEmail} icon="envelope" keyboardType="email-address" autoCapitalize="none" />
            <AppTextInput label="Mot de passe" value={password} onChangeText={setPassword} icon="lock" secureTextEntry />
            {error ? <Text style={styles.errorText}>{error}</Text> : null}
            <View style={{ marginTop: SIZES.padding }}>
              <AppButton title="Se connecter" onPress={handleLogin} isLoading={isLoading} />
            </View>
          </View>
          <View style={styles.footer}>
            <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
              <Text style={styles.footerText}>
                Pas encore de compte ? <Text style={styles.link}>S'inscrire</Text>
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  // View styles
  safeArea: { flex: 1, backgroundColor: COLORS.white } as const,
  container: { flexGrow: 1, justifyContent: 'center', padding: SIZES.padding } as const,
  header: { alignItems: 'center', marginBottom: SIZES.padding * 2 } as const,
  form: { width: '100%' } as const,
  footer: { paddingTop: SIZES.padding * 2, alignItems: 'center' } as const,

  // Text styles
  title: { ...(FONTS.h1 as object), color: COLORS.black } as const,
  subtitle: { ...(FONTS.body3 as object), color: COLORS.gray, marginTop: SIZES.base } as const,
  errorText: { ...(FONTS.body4 as object), color: COLORS.error, textAlign: 'center', marginTop: SIZES.base } as const,
  footerText: { ...(FONTS.body3 as object), color: COLORS.gray } as const,
  link: { color: COLORS.primary, fontWeight: 'bold' as 'bold' } as const,
});