import React, { useState } from 'react';
import {
  View, Text, TextInput, TouchableOpacity,
  StyleSheet, ScrollView
} from 'react-native';

const categorias = [
  { nome: 'Restaurantes', emoji: '🍽️' },
  { nome: 'Praias', emoji: '🏖️' },
  { nome: 'Cachoeiras', emoji: '🌊' },
  { nome: 'Padarias', emoji: '🥐' },
];

const lugares = [
  { nome: 'PRAIA DO SOL', avaliacao: 4.8, distancia: '2,3 km', emoji: '🏖️' },
  { nome: 'RESTAURANTE MARÉ', avaliacao: 4.7, distancia: '16 km', emoji: '🍽️' },
  { nome: 'CACHOEIRA VERDE', avaliacao: 3.5, distancia: '5 km', emoji: '🌊' },
];

export default function Home() {
  const [aba, setAba] = useState(0);

  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.header}>
          <Text style={styles.localizacao}>📍 São Paulo, SP</Text>
          <Text style={styles.ola}>Olá, Mariana!</Text>
          <View style={styles.searchContainer}>
            <Text style={styles.searchIcon}>🔍</Text>
            <TextInput style={styles.search} placeholder="Para onde você quer ir?" />
          </View>
        </View>

        <View style={styles.content}>
          <Text style={styles.secao}>Categorias</Text>
          <View style={styles.categorias}>
            {categorias.map((cat, i) => (
              <TouchableOpacity key={i} style={styles.categoria}>
                <Text style={styles.catEmoji}>{cat.emoji}</Text>
                <Text style={styles.catNome}>{cat.nome}</Text>
              </TouchableOpacity>
            ))}
          </View>

          <Text style={styles.secao}>Perto de você</Text>
          <View style={styles.lugares}>
            {lugares.map((lugar, i) => (
              <TouchableOpacity key={i} style={styles.card}>
                <View style={styles.cardImg}>
                  <Text style={styles.cardEmoji}>{lugar.emoji}</Text>
                  <Text style={styles.favorito}>❤️</Text>
                </View>
                <View style={styles.cardInfo}>
                  <Text style={styles.cardNome}>{lugar.nome}</Text>
                  <Text style={styles.cardAvaliacao}>⭐ {lugar.avaliacao}</Text>
                  <Text style={styles.cardDist}>📍 {lugar.distancia}</Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </ScrollView>

      <View style={styles.bottomNav}>
        {[['🏠','Início'],['🔍','Buscar'],['❤️','Favoritos'],['👤','Perfil']].map(([icon, label], i) => (
          <TouchableOpacity key={i} style={styles.navItem} onPress={() => setAba(i)}>
            <Text style={styles.navIcon}>{icon}</Text>
            <Text style={[styles.navLabel, aba === i && styles.navAtivo]}>{label}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  header: { backgroundColor: '#2E7D32', padding: 20, paddingTop: 50 },
  localizacao: { color: '#fff', opacity: 0.8, fontSize: 12 },
  ola: { color: '#fff', fontSize: 22, fontWeight: 'bold', marginBottom: 12 },
  searchContainer: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#fff', borderRadius: 30, paddingHorizontal: 16 },
  searchIcon: { fontSize: 18, marginRight: 8 },
  search: { flex: 1, height: 48 },
  content: { padding: 16 },
  secao: { fontSize: 18, fontWeight: 'bold', marginBottom: 12, marginTop: 8 },
  categorias: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 16 },
  categoria: { alignItems: 'center', backgroundColor: '#E8F5E9', borderRadius: 12, padding: 12, width: '23%' },
  catEmoji: { fontSize: 28 },
  catNome: { fontSize: 10, textAlign: 'center', marginTop: 4, color: '#333' },
  lugares: { flexDirection: 'row', justifyContent: 'space-between' },
  card: { width: '31%', backgroundColor: '#fff', borderRadius: 12, overflow: 'hidden', elevation: 2 },
  cardImg: { backgroundColor: '#66BB6A', height: 80, justifyContent: 'center', alignItems: 'center' },
  cardEmoji: { fontSize: 36 },
  favorito: { position: 'absolute', top: 6, right: 6, fontSize: 16 },
  cardInfo: { padding: 8 },
  cardNome: { fontSize: 9, fontWeight: 'bold', color: '#1B5E20', marginBottom: 2 },
  cardAvaliacao: { fontSize: 10, color: '#555' },
  cardDist: { fontSize: 10, color: '#888', marginTop: 2 },
  bottomNav: { flexDirection: 'row', borderTopWidth: 1, borderTopColor: '#E8F5E9', backgroundColor: '#fff', paddingBottom: 20, paddingTop: 10 },
  navItem: { flex: 1, alignItems: 'center' },
  navIcon: { fontSize: 22 },
  navLabel: { fontSize: 11, color: '#aaa', marginTop: 2 },
  navAtivo: { color: '#2E7D32', fontWeight: 'bold' },
});
