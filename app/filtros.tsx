import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Button } from '@/components/ui';
import { CATEGORIES } from '@/data/categories';
import { colors } from '@/constants/theme';

const PRECO_OPCOES = ['R$', 'R$$', 'R$$$'];

export default function FiltrosScreen() {
  const router = useRouter();
  const [categorias, setCategorias] = useState<Set<string>>(new Set());
  const [preco, setPreco] = useState<string | null>(null);
  const [avaliacaoMin, setAvaliacaoMin] = useState(4);

  const toggleCategoria = (nome: string) => {
    setCategorias((prev) => {
      const next = new Set(prev);
      if (next.has(nome)) next.delete(nome);
      else next.add(nome);
      return next;
    });
  };

  const limpar = () => {
    setCategorias(new Set());
    setPreco(null);
    setAvaliacaoMin(4);
  };

  const handleBack = () => {
    if (router.canGoBack()) {
      router.back();
    } else {
      router.replace('/(tabs)');
    }
  };

  const aplicar = () => {
    handleBack();
  };

  return (
    <SafeAreaView className="flex-1 bg-background" edges={['top']}>
      <View className="flex-row items-center justify-between p-4 border-b border-border">
        <TouchableOpacity
          onPress={handleBack}
          className="p-2"
          accessibilityLabel="Voltar"
          accessibilityRole="button"
        >
          <Text className="text-2xl text-text">←</Text>
        </TouchableOpacity>
        <Text className="text-lg font-bold text-text">Filtros</Text>
        <TouchableOpacity
          onPress={limpar}
          className="p-2"
          accessibilityLabel="Limpar filtros"
          accessibilityRole="button"
        >
          <Text className="text-sm text-primary font-semibold">Limpar</Text>
        </TouchableOpacity>
      </View>

      <ScrollView className="flex-1 p-5" showsVerticalScrollIndicator={false}>
        <Text className="text-[17px] font-bold text-text mb-3 mt-2">
          Categorias
        </Text>
        <View className="flex-row flex-wrap gap-3 mb-6">
          {CATEGORIES.map((cat) => (
            <TouchableOpacity
              key={cat.id}
              className={`flex-row items-center bg-surface rounded-xl p-3.5 gap-2 border-2 ${
                categorias.has(cat.nome)
                  ? 'border-primary bg-primaryLight'
                  : 'border-transparent'
              }`}
              onPress={() => toggleCategoria(cat.nome)}
            >
              <Text className="text-2xl">{cat.emoji}</Text>
              <Text
                className={`text-sm font-semibold ${
                  categorias.has(cat.nome) ? 'text-primary' : 'text-text'
                }`}
              >
                {cat.nome}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <Text className="text-[17px] font-bold text-text mb-3 mt-2">
          Faixa de preço
        </Text>
        <View className="flex-row gap-3 mb-6">
          {PRECO_OPCOES.map((p) => (
            <TouchableOpacity
              key={p}
              className={`px-5 py-3 rounded-xl border-2 ${
                preco === p
                  ? 'border-primary bg-primaryLight'
                  : 'bg-surface border-transparent'
              }`}
              onPress={() => setPreco(preco === p ? null : p)}
            >
              <Text
                className={`text-sm font-semibold ${
                  preco === p ? 'text-primary' : 'text-text'
                }`}
              >
                {p}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <Text className="text-[17px] font-bold text-text mb-3 mt-2">
          Avaliação mínima
        </Text>
        <View className="flex-row gap-3">
          <TouchableOpacity
            className={`px-5 py-3 rounded-xl border-2 ${
              avaliacaoMin >= 4
                ? 'border-primary bg-primaryLight'
                : 'bg-surface border-transparent'
            }`}
            onPress={() => setAvaliacaoMin(4)}
          >
            <Text
              className={`text-sm font-semibold ${
                avaliacaoMin >= 4 ? 'text-primary' : 'text-text'
              }`}
            >
              4.0+
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      <View className="p-5 pb-8 border-t border-border">
        <Button title="Aplicar Filtros" onPress={aplicar} />
      </View>
    </SafeAreaView>
  );
}
