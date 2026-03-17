import React, { useMemo, useState } from 'react';
import { ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Header, CategoryChip, PlaceCardHorizontal } from '@/components';
import { CATEGORIES } from '@/data/categories';
import { PLACES } from '@/data/places';
import { useFavorites } from '@/hooks/useFavorites';
import { useAuth } from '@/hooks/useAuth';
import { colors } from '@/constants/theme';

function filterPlacesBySearch(places: typeof PLACES, query: string) {
  if (!query.trim()) return places;
  const q = query.toLowerCase().trim();
  return places.filter(
    (p) =>
      p.nome.toLowerCase().includes(q) ||
      p.categoria.toLowerCase().includes(q) ||
      p.endereco.toLowerCase().includes(q)
  );
}

export default function HomeScreen() {
  const router = useRouter();
  const [catSelecionada, setCatSelecionada] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const { toggleFav, isFavorite } = useFavorites();
  const { user } = useAuth();
  const greeting = user?.user_metadata?.full_name
    ? `Olá, ${user.user_metadata.full_name.split(' ')[0]}! 👋`
    : 'Olá, Viajante! 👋';

  const lugares = useMemo(() => {
    let filtered = PLACES;
    if (catSelecionada) {
      const catNome = CATEGORIES.find((c) => c.id === catSelecionada)?.nome;
      filtered = filtered.filter((p) => p.categoria === catNome);
    }
    return filterPlacesBySearch(filtered, searchQuery);
  }, [catSelecionada, searchQuery]);

  return (
    <SafeAreaView className="flex-1 bg-background" edges={['top']}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Header
          greeting={greeting}
          searchPlaceholder="Para onde você quer ir?"
          searchValue={searchQuery}
          onSearchChange={setSearchQuery}
        />
        <View className="p-4">
          <Text className="text-[17px] font-bold text-text mb-3 mt-1">
            Categorias
          </Text>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            className="mb-5"
          >
            {CATEGORIES.map((cat) => (
              <CategoryChip
                key={cat.id}
                category={cat}
                selected={catSelecionada === cat.id}
                onPress={() =>
                  setCatSelecionada(catSelecionada === cat.id ? null : cat.id)
                }
              />
            ))}
          </ScrollView>

          <View className="flex-row justify-between items-center mb-3">
            <Text className="text-[17px] font-bold text-text">
              Perto de você
            </Text>
            <Text className="text-[13px] text-textSecondary">
              {lugares.length} locais
            </Text>
          </View>

          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            className="mb-6"
          >
            {lugares.map((lugar) => {
              const catColor =
                CATEGORIES.find((c) => c.nome === lugar.categoria)?.cor ??
                colors.primary;
              return (
                <PlaceCardHorizontal
                  key={lugar.id}
                  place={lugar}
                  categoryColor={catColor}
                  isFavorite={isFavorite(lugar.id)}
                  onPress={() =>
                    router.push({
                      pathname: '/lugar/[id]',
                      params: { id: lugar.id },
                    })
                  }
                  onFavoritePress={() => toggleFav(lugar.id)}
                />
              );
            })}
          </ScrollView>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
