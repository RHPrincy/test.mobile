import React, {
  createContext,
  useReducer,
  useEffect,
  useMemo,
  ReactNode,
} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import userDataStore from '../data/users';
import { User } from '../constants/types';

interface AuthState {
  isLoading: boolean;
  userToken: string | null;
  userData: User | null;
}

interface AuthContextType {
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
  signUp: (name: string, email: string, password: string) => Promise<void>;
  updateUserData: (newUserData: User) => Promise<void>;
  isLoading: boolean;
  userToken: string | null;
  userData: User | null;
}

type AuthAction =
  | { type: 'RESTORE_TOKEN'; token: string | null; userData: User | null }
  | { type: 'SIGN_IN'; token: string; userData: User }
  | { type: 'SIGN_OUT' }
  | { type: 'UPDATE_USER_DATA'; userData: User };

const authReducer = (prevState: AuthState, action: AuthAction): AuthState => {
  switch (action.type) {
    case 'RESTORE_TOKEN':
      return {
        ...prevState,
        userToken: action.token,
        userData: action.userData,
        isLoading: false,
      };
    case 'SIGN_IN':
      return {
        ...prevState,
        userToken: action.token,
        userData: action.userData,
      };
    case 'SIGN_OUT':
      return {
        ...prevState,
        userToken: null,
        userData: null,
      };
    case 'UPDATE_USER_DATA':
      return {
        ...prevState,
        userData: action.userData,
      };
    default:
      return prevState;
  }
};

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, {
    isLoading: true,
    userToken: null,
    userData: null,
  });

  useEffect(() => {
    const bootstrapAsync = async () => {
      try {
        const userToken = await AsyncStorage.getItem('userToken');
        const storedUserData = await AsyncStorage.getItem('userData');
        const userData = storedUserData ? JSON.parse(storedUserData) : null;
        dispatch({ type: 'RESTORE_TOKEN', token: userToken, userData });
      } catch (e) {
        console.error('Erreur de restauration:', e);
        dispatch({ type: 'RESTORE_TOKEN', token: null, userData: null });
      }
    };
    bootstrapAsync();
  }, []);

  const authContext = useMemo<AuthContextType>(
    () => ({
      isLoading: state.isLoading,
      userToken: state.userToken,
      userData: state.userData,
      signIn: async (email: string, password: string) => {
        const user = userDataStore.users.find(
          (u: User) => u.email === email && u.password === password
        );
        if (user) {
          const userDataToStore: User = {
            id: user.id,
            name: user.name,
            email: user.email,
          };
          await AsyncStorage.setItem('userToken', user.id);
          await AsyncStorage.setItem('userData', JSON.stringify(userDataToStore));
          dispatch({ type: 'SIGN_IN', token: user.id, userData: userDataToStore });
        } else {
          throw new Error('Email ou mot de passe incorrect.');
        }
      },
      signOut: async () => {
        await AsyncStorage.multiRemove(['userToken', 'userData']);
        dispatch({ type: 'SIGN_OUT' });
      },
      signUp: async (name: string, email: string, password: string) => {
        if (userDataStore.users.find((u: User) => u.email === email)) {
          throw new Error('Cet email est déjà utilisé.');
        }
        const newUser: User = {
          id: String(Date.now()),
          name,
          email,
          password,
        };
        userDataStore.users.push(newUser);
        const userDataToStore: User = {
          id: newUser.id,
          name: newUser.name,
          email: newUser.email,
        };
        await AsyncStorage.setItem('userToken', newUser.id);
        await AsyncStorage.setItem('userData', JSON.stringify(userDataToStore));
        dispatch({ type: 'SIGN_IN', token: newUser.id, userData: userDataToStore });
      },
      updateUserData: async (newUserData: User) => {
        const { password, ...dataToStore } = newUserData;
        await AsyncStorage.setItem('userData', JSON.stringify(dataToStore));
        const userIndex = userDataStore.users.findIndex((u: User) => u.id === newUserData.id);
        if (userIndex !== -1) {
          userDataStore.users[userIndex] = {
            ...userDataStore.users[userIndex],
            ...newUserData,
          };
        }
        dispatch({ type: 'UPDATE_USER_DATA', userData: dataToStore as User });
      },
    }),
    [state]
  );

  return <AuthContext.Provider value={authContext}>{children}</AuthContext.Provider>;
};