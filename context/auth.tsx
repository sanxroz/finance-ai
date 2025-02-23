import React, { createContext, useContext, useEffect, useState } from 'react';
import * as SecureStore from 'expo-secure-store';
import { router } from 'expo-router';

interface AuthContextType {
  isAuthenticated: boolean;
  isPro: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  upgradeToProVersion: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isPro, setIsPro] = useState(false);

  useEffect(() => {
    checkAuthStatus();
  }, []);

  async function checkAuthStatus() {
    try {
      const token = await SecureStore.getItemAsync('userToken');
      const proStatus = await SecureStore.getItemAsync('proStatus');
      
      setIsAuthenticated(!!token);
      setIsPro(proStatus === 'true');

      if (!token) {
        router.replace('/(onboarding)');
      } else {
        router.replace('/(app)/(tabs)');
      }
    } catch (error) {
      console.error('Error checking auth status:', error);
    }
  }

  async function login(email: string, password: string) {
    // In a real app, validate credentials against a backend
    await SecureStore.setItemAsync('userToken', 'dummy-token');
    setIsAuthenticated(true);
    router.replace('/(app)/(tabs)');
  }

  async function logout() {
    await SecureStore.deleteItemAsync('userToken');
    setIsAuthenticated(false);
    router.replace('/(auth)/login');
  }

  async function upgradeToProVersion() {
    // await SecureStore.setItemAsync('proStatus', 'true');
    setIsPro(true);
  }

  return (
    <AuthContext.Provider value={{
      isAuthenticated,
      isPro,
      login,
      logout,
      upgradeToProVersion,
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}