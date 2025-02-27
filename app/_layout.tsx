import { Stack } from 'expo-router';
import { useAuth, AuthProvider } from '../context/auth';

// Create a separate component that uses the useAuth hook
function AppNavigator() {
  const { isAuthenticated, hasCompletedOnboarding } = useAuth();

  return (
    <Stack>
      {/* Define all screens without using initialRouteName */}
      <Stack.Screen name="(app)" options={{ headerShown: false }} />
      <Stack.Screen name="(auth)" options={{ headerShown: false }} />
      <Stack.Screen name="(onboarding)" options={{ headerShown: false }} />
      <Stack.Screen name="paywall" options={{ presentation: 'modal' }} />
    </Stack>
  );
}

// Root layout that provides the AuthProvider
export default function RootLayout() {
  return (
    <AuthProvider>
      <AppNavigator />
    </AuthProvider>
  );
}