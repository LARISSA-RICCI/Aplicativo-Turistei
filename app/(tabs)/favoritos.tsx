import React from 'react';
import { ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { PlaceCard } from '@/components';
import { CATEGORIES } from '@/data/categories';
import { PLACES } from '@/data/places';
import { useFavorites } from '@/hooks/useFavorites';
import { colors } from '@/constants/theme';

export default function FavoritosScreen() {
  const router = useRouter();
  const { favoritos, toggleFav, isFavorite, loaded } = useFavorites();

  const lugaresFavoritos = PLACES.filter((p) => favoritos.includes(p.id));

  return (
    <SafeAreaView className="flex-1 bg-background" edges={['top']}>
      <View className="p-4 pb-2">
        <Text className="text-2xl font-bold text-text">Favoritos</Text>
        <Text className="text-sm text-textSecondary mt-1">
          {lugaresFavoritos.length} locais salvos
        </Text>
      </View>
      <ScrollView showsVerticalScrollIndicator={false} className="flex-1 px-4">
        {!loaded ? (
          <Text className="text-[15px] text-textSecondary text-center mt-12 px-6">
            Carregando...
          </Text>
        ) : lugaresFavoritos.length === 0 ? (
          <Text className="text-[15px] text-textSecondary text-center mt-12 px-6">
            Nenhum favorito ainda. Toque no coração nos lugares para salvar!
          </Text>
        ) : (
          lugaresFavoritos.map((lugar) => {
            const catColor =
              CATEGORIES.find((c) => c.nome === lugar.categoria)?.cor ??
              colors.primary;
            return (
              <PlaceCard
                key={lugar.id}
                place={lugar}
                categoryColor={catColor}
                isFavorite={true}
                onPress={() =>
                  router.push({
                    pathname: '/lugar/[id]',
                    params: { id: lugar.id },
                  })
                }
                onFavoritePress={() => toggleFav(lugar.id)}
              />
            );
          })
        )}
      </ScrollView>
    </SafeAreaView>
  );
}
