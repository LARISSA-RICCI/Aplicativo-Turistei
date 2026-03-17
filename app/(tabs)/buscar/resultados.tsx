import React, { useMemo, useState } from 'react';
import {
  ScrollView,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { MaterialIcons } from '@expo/vector-icons';
import { CategoryChip, PlaceCardGrid } from '@/components';
import { CATEGORIES } from '@/data/categories';
import { PLACES } from '@/data/places';
import { useFavorites } from '@/hooks/useFavorites';
import { colors } from '@/constants/theme';

function filterPlaces(
  places: typeof PLACES,
  query: string,
  categoryId: string | null
) {
  let filtered = places;
  if (categoryId) {
    const catNome = CATEGORIES.find((c) => c.id === categoryId)?.nome;
    filtered = filtered.filter((p) => p.categoria === catNome);
  }
  if (query?.trim()) {
    const q = query.toLowerCase().trim();
    filtered = filtered.filter(
      (p) =>
        p.nome.toLowerCase().includes(q) ||
        p.categoria.toLowerCase().includes(q) ||
        p.endereco.toLowerCase().includes(q)
    );
  }
  return filtered;
}

export default function ResultadosScreen() {
  const router = useRouter();
  const { q } = useLocalSearchParams<{ q?: string }>();
  const [searchQuery, setSearchQuery] = useState(q ?? '');
  const [catSelecionada, setCatSelecionada] = useState<string | null>(null);
  const { toggleFav, isFavorite } = useFavorites();

  const handleBack = () => {
    if (router.canGoBack()) {
      router.back();
    } else {
      router.replace('/(tabs)/buscar');
    }
  };

  const lugares = useMemo(
    () => filterPlaces(PLACES, searchQuery, catSelecionada),
    [searchQuery, catSelecionada]
  );

  return (
    <SafeAreaView className="flex-1 bg-background" edges={['top']}>
      <View className="flex-row items-center p-4 gap-3">
        <TouchableOpacity
          className="p-2 -ml-1"
          onPress={handleBack}
          accessibilityLabel="Voltar"
          accessibilityRole="button"
        >
          <MaterialIcons name="arrow-back" size={24} color={colors.text} />
        </TouchableOpacity>
        <View className="flex-1 flex-row items-center bg-primaryLight rounded-xl px-4 h-[46px] gap-2.5">
          <MaterialIcons name="search" size={20} color={colors.textMuted} />
          <Text className="flex-1 text-base text-text">
            {searchQuery || 'Barretos'}
          </Text>
        </View>
        <TouchableOpacity
          className="p-2"
          onPress={() => router.push('/filtros')}
          accessibilityLabel="Abrir filtros"
          accessibilityRole="button"
        >
          <MaterialIcons name="filter-list" size={24} color={colors.primary} />
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        <View className="p-4 pt-0">
          <View className="mb-4">
            <Text className="text-base font-bold text-text">
              {lugares.length} lugares encontrados
            </Text>
            <Text className="text-sm text-textSecondary mt-1">
              Perto de você.
            </Text>
          </View>

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

          <View className="flex-row flex-wrap justify-between">
            {lugares.map((lugar) => {
              const catColor =
                CATEGORIES.find((c) => c.nome === lugar.categoria)?.cor ??
                colors.primary;
              return (
                <PlaceCardGrid
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
          </View>

          <TouchableOpacity
            className="flex-row items-center justify-center bg-primary rounded-xl py-4 gap-2 mt-4 mb-8"
            onPress={() => router.push('/mapa')}
          >
            <MaterialIcons name="place" size={22} color="#fff" />
            <Text className="text-base font-bold text-white">+ Ver no Mapa</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
