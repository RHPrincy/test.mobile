// Point d'entree de l'application
import React from 'react';
import { AuthProvider } from '../context/AuthContext';
import AppNavigator from '../navigation/AppNavigator';
export default function AppEntryPoint() {
  return (
    <AuthProvider>
      <AppNavigator />
    </AuthProvider>
  );
}