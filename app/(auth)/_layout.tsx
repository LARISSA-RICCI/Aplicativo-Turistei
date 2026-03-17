import { useEffect } from 'react';
import { BackHandler } from 'react-native';
import { Stack, usePathname } from 'expo-router';

export default function AuthLayout() {
  const pathname = usePathname();

  useEffect(() => {
    const isLogin = pathname === '/login' || pathname === '/(auth)/login';
    if (!isLogin) return;

    const sub = BackHandler.addEventListener('hardwareBackPress', () => {
      return true;
    });
    return () => sub.remove();
  }, [pathname]);

  return (
    <Stack
      screenOptions={{
        headerShown: false,
        animation: 'slide_from_right',
      }}
    >
      <Stack.Screen name="login" />
      <Stack.Screen name="cadastro" />
    </Stack>
  );
}
