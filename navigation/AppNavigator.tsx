import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useAuth } from '../hooks/useAuth';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { COLORS } from '../constants/theme';
import LoadingIndicator from '../components/loading/LoadingIndicator';
import LoginScreen from '../screens/Auth/LoginScreen';
import SignupScreen from '../screens/Auth/SignupScreen';
import HomeScreen from '../screens/Home/HomeScreen';
import UserProfileScreen from '../screens/UserProfile/UserProfile';
import ProductDetailScreen from '../screens/ProductDetail/ProductDetailScreen';
import AddEditProductScreen from '../screens/AddEditProduct/AddEditProductStyle';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export type AuthStackParamList = { Login: undefined; Signup: undefined; };
export type MainTabParamList = { HomeTab: undefined; ProfileTab: undefined; };
export type RootStackParamList = { MainTabs: { screen?: string, params?: any }; ProductDetail: { productId: string }; AddEditProduct: { productId?: string }; };

const AuthStack = createStackNavigator<AuthStackParamList>();
const MainTab = createBottomTabNavigator<MainTabParamList>();
const RootStack = createStackNavigator<RootStackParamList>();

function MainTabNavigator() {
  const insets = useSafeAreaInsets();
  return (
     <MainTab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: COLORS.primary,
        tabBarInactiveTintColor: COLORS.gray,
        tabBarStyle: {
          height: 60 + insets.bottom,
          paddingTop: 10,
          paddingBottom: insets.bottom || 20,
          backgroundColor: COLORS.white,
          borderTopWidth: 0,
        },
      }}
    >
      <MainTab.Screen
      name="HomeTab"
      component={HomeScreen}
      options={{
        tabBarLabel: 'Catalogue',
        tabBarIcon: ({ color, size }) => (
        <FontAwesome name="home" size={size} color={color} />
        ),
      }}
      />
      <MainTab.Screen
      name="ProfileTab"
      component={UserProfileScreen}
      options={{
        tabBarLabel: 'Profil',
        tabBarIcon: ({ color, size }) => (
        <FontAwesome name="user" size={size} color={color} />
        ),
      }}
      />
    </MainTab.Navigator>
  );
}

function RootStackNavigator() {
  return (
    <RootStack.Navigator screenOptions={{ headerShown: false }}>
      <RootStack.Screen name="MainTabs" component={MainTabNavigator} />
      <RootStack.Screen name="ProductDetail" component={ProductDetailScreen} />
      <RootStack.Screen name="AddEditProduct" component={AddEditProductScreen} options={{ presentation: 'modal' }} />
    </RootStack.Navigator>
  );
}

export default function AppNavigator() {
    const { userToken, isLoading } = useAuth();

    if (isLoading) {
        return <LoadingIndicator />;
    }

    return userToken ? (
        <RootStackNavigator />
    ) : (
        <AuthStack.Navigator screenOptions={{ headerShown: false }}>
            <AuthStack.Screen name="Login" component={LoginScreen} />
            <AuthStack.Screen name="Signup" component={SignupScreen} />
        </AuthStack.Navigator>
    );
}


