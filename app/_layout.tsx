import '../global.css';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { FavoritesProvider } from '@/hooks/useFavorites';
import { FiltersProvider } from '@/hooks/useFilters';

export default function RootLayout() {
  return (
    <SafeAreaProvider>
      <FavoritesProvider>
        <FiltersProvider>
          <StatusBar style="dark" backgroundColor="#F5F5F5" />
          <Stack screenOptions={{ headerShown: false }}>
            <Stack.Screen
              name="filtros"
              options={{ presentation: 'modal', title: 'Filtros' }}
            />
          </Stack>
        </FiltersProvider>
      </FavoritesProvider>
    </SafeAreaProvider>
  );
}
