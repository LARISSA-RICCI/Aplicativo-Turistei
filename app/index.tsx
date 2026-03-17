import React, { useState } from 'react';
import {
  ScrollView,
  StyleSheet,
  Text, TouchableOpacity,
  View,
} from 'react-native';

const CATEGORIES = [
  { id: '1', nome: 'Restaurantes', emoji: '🍽️', cor: '#E53935' },
  { id: '2', nome: 'Bares',        emoji: '🍺', cor: '#FB8C00' },
  { id: '3', nome: 'Pubs',         emoji: '🎸', cor: '#7B1FA2' },
  { id: '4', nome: 'Padarias',     emoji: '🥐', cor: '#8D6E63' },
  { id: '5', nome: 'Cafeterias',   emoji: '☕', cor: '#43A047' },
];

const PLACES = [
  { id: '1',  nome: 'Sabor Tropeiro',              categoria: 'Restaurantes', avaliacao: 4.8, votos: 980,  endereco: 'Barretos, SP', preco: 'R$$',  emoji: '🍽️', aberto: true  },
  { id: '2',  nome: 'Santina Restaurante',          categoria: 'Restaurantes', avaliacao: 4.8, votos: 292,  endereco: 'Barretos, SP', preco: 'R$$',  emoji: '🍝', aberto: true  },
  { id: '3',  nome: 'Leopoldina Gastronomia',       categoria: 'Restaurantes', avaliacao: 4.6, votos: 150,  endereco: 'Barretos, SP', preco: 'R$$',  emoji: '🍕', aberto: true  },
  { id: '4',  nome: 'Saikoo Sushi Lounge',          categoria: 'Restaurantes', avaliacao: 4.8, votos: 809,  endereco: 'Barretos, SP', preco: 'R$$$', emoji: '🍱', aberto: false },
  { id: '5',  nome: 'Boa Sorte Bar do Alcebíades', categoria: 'Bares',        avaliacao: 4.4, votos: 1129, endereco: 'Barretos, SP', preco: 'R$$',  emoji: '🍺', aberto: true  },
  { id: '6',  nome: 'Boiadeiro Choperia',           categoria: 'Bares',        avaliacao: 4.4, votos: 1386, endereco: 'Barretos, SP', preco: 'R$$',  emoji: '🍻', aberto: true  },
  { id: '7',  nome: 'Água Doce Cachaçaria',         categoria: 'Pubs',         avaliacao: 4.5, votos: 1098, endereco: 'Barretos, SP', preco: 'R$$',  emoji: '🎸', aberto: false },
  { id: '8',  nome: 'Samauma American Bar',         categoria: 'Pubs',         avaliacao: 4.4, votos: 67,   endereco: 'Barretos, SP', preco: 'R$$',  emoji: '🎵', aberto: true  },
  { id: '9',  nome: 'La Maison 22 Street',          categoria: 'Padarias',     avaliacao: 4.5, votos: 310,  endereco: 'Barretos, SP', preco: 'R$',   emoji: '🥐', aberto: true  },
  { id: '10', nome: 'Panificadora União',            categoria: 'Padarias',     avaliacao: 4.2, votos: 60,   endereco: 'Barretos, SP', preco: 'R$',   emoji: '🍞', aberto: false },
  { id: '11', nome: 'La Maison Café',               categoria: 'Cafeterias',   avaliacao: 4.6, votos: 420,  endereco: 'Barretos, SP', preco: 'R$',   emoji: '☕', aberto: true  },
  { id: '12', nome: 'Empório da Amizade',           categoria: 'Cafeterias',   avaliacao: 4.5, votos: 199,  endereco: 'R. 24, 1252',  preco: 'R$',   emoji: '🫖', aberto: true  },
];

export default function Home() {
  const [catSelecionada, setCatSelecionada] = useState<string | null>(null);
  const [favoritos, setFavoritos] = useState<string[]>([]);
  const [aba, setAba] = useState(0);

  const toggleFav = (id: string) =>
    setFavoritos(prev => prev.includes(id) ? prev.filter(f => f !== id) : [...prev, id]);

  const lugares = catSelecionada
    ? PLACES.filter(p => p.categoria === CATEGORIES.find(c => c.id === catSelecionada)?.nome)
    : PLACES;

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <View style={styles.headerTop}>
            <View>
              <Text style={styles.ola}>Olá, Viajante 👋</Text>
              <Text style={styles.localizacao}>📍 Barretos, SP</Text>
            </View>
            <TouchableOpacity style={styles.notifBtn}>
              <Text style={{ fontSize: 20 }}>🔔</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.searchBar}>
            <Text style={styles.searchIcon}>🔍</Text>
            <Text style={styles.searchPlaceholder}>Buscar bares, restaurantes...</Text>
          </View>
        </View>

        <View style={styles.content}>
          <Text style={styles.secao}>Categorias</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ marginBottom: 20 }}>
            {CATEGORIES.map(cat => (
              <TouchableOpacity
                key={cat.id}
                style={[styles.catItem, catSelecionada === cat.id && { borderColor: cat.cor, borderWidth: 2 }]}
                onPress={() => setCatSelecionada(catSelecionada === cat.id ? null : cat.id)}
              >
                <View style={[styles.catIcon, { backgroundColor: cat.cor + '22' }]}>
                  <Text style={{ fontSize: 24 }}>{cat.emoji}</Text>
                </View>
                <Text style={[styles.catNome, catSelecionada === cat.id && { color: cat.cor, fontWeight: '700' }]}>
                  {cat.nome}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>

          <View style={styles.secaoHeader}>
            <Text style={styles.secao}>
              {catSelecionada ? CATEGORIES.find(c => c.id === catSelecionada)?.nome : 'Perto de você'}
            </Text>
            <Text style={styles.contador}>{lugares.length} locais</Text>
          </View>

          {lugares.map(lugar => (
            <TouchableOpacity key={lugar.id} style={styles.card} activeOpacity={0.88}>
              <View style={[styles.cardImg, { backgroundColor: (CATEGORIES.find(c => c.nome === lugar.categoria)?.cor ?? '#43A047') + '33' }]}>
                <Text style={{ fontSize: 52 }}>{lugar.emoji}</Text>
                {!lugar.aberto && (
                  <View style={styles.fechadoBadge}>
                    <Text style={styles.fechadoText}>Fechado agora</Text>
                  </View>
                )}
                <TouchableOpacity style={styles.favBtn} onPress={() => toggleFav(lugar.id)}>
                  <Text style={{ fontSize: 18 }}>{favoritos.includes(lugar.id) ? '❤️' : '🤍'}</Text>
                </TouchableOpacity>
              </View>
              <View style={styles.cardBody}>
                <View style={styles.cardRow}>
                  <Text style={styles.cardNome} numberOfLines={1}>{lugar.nome}</Text>
                  <View style={styles.ratingPill}>
                    <Text style={styles.ratingText}>⭐ {lugar.avaliacao}</Text>
                  </View>
                </View>
                <Text style={styles.enderecoText}>📍 {lugar.endereco}</Text>
                <View style={styles.cardRow}>
                  <View style={[styles.tagPill, { backgroundColor: (CATEGORIES.find(c => c.nome === lugar.categoria)?.cor ?? '#43A047') + '22' }]}>
                    <Text style={[styles.tagText, { color: CATEGORIES.find(c => c.nome === lugar.categoria)?.cor ?? '#43A047' }]}>{lugar.categoria}</Text>
                  </View>
                  <Text style={styles.metaText}>{lugar.votos} avaliações · {lugar.preco}</Text>
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>

      <View style={styles.bottomNav}>
        {[
          { icon: '🏠', label: 'Início' },
          { icon: '🔍', label: 'Buscar' },
          { icon: '❤️', label: 'Favoritos' },
          { icon: '👤', label: 'Perfil' },
        ].map((item, i) => (
          <TouchableOpacity key={i} style={styles.navItem} onPress={() => setAba(i)}>
            <Text style={styles.navIcon}>{item.icon}</Text>
            <Text style={[styles.navLabel, aba === i && styles.navAtivo]}>{item.label}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F5F5F5' },
  header: { backgroundColor: '#2E7D32', paddingTop: 56, paddingBottom: 24, paddingHorizontal: 16 },
  headerTop: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 16 },
  ola: { fontSize: 20, fontWeight: '700', color: '#fff' },
  localizacao: { fontSize: 13, color: 'rgba(255,255,255,0.8)', marginTop: 2 },
  notifBtn: { backgroundColor: 'rgba(255,255,255,0.2)', borderRadius: 999, padding: 10 },
  searchBar: { flexDirection: 'row', alignItems: 'center', gap: 10, backgroundColor: '#fff', borderRadius: 999, paddingHorizontal: 16, height: 46 },
  searchIcon: { fontSize: 16 },
  searchPlaceholder: { color: '#BDBDBD', fontSize: 14 },
  content: { padding: 16 },
  secao: { fontSize: 17, fontWeight: '700', color: '#212121', marginBottom: 12, marginTop: 4 },
  secaoHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 },
  contador: { fontSize: 13, color: '#757575' },
  catItem: { alignItems: 'center', marginRight: 12, borderRadius: 14, padding: 8, backgroundColor: '#fff', minWidth: 72 },
  catIcon: { width: 52, height: 52, borderRadius: 14, alignItems: 'center', justifyContent: 'center', marginBottom: 6 },
  catNome: { fontSize: 11, color: '#757575', textAlign: 'center' },
  card: { backgroundColor: '#fff', borderRadius: 14, overflow: 'hidden', marginBottom: 16, elevation: 3, shadowColor: '#000', shadowOpacity: 0.08, shadowRadius: 8, shadowOffset: { width: 0, height: 3 } },
  cardImg: { height: 140, alignItems: 'center', justifyContent: 'center' },
  fechadoBadge: { position: 'absolute', top: 12, left: 12, backgroundColor: 'rgba(0,0,0,0.55)', borderRadius: 6, paddingHorizontal: 10, paddingVertical: 4 },
  fechadoText: { color: '#fff', fontSize: 11, fontWeight: '600' },
  favBtn: { position: 'absolute', top: 10, right: 12, backgroundColor: 'rgba(0,0,0,0.2)', borderRadius: 999, padding: 8 },
  cardBody: { padding: 12 },
  cardRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 },
  cardNome: { flex: 1, fontSize: 16, fontWeight: '700', color: '#212121', marginRight: 8 },
  ratingPill: { backgroundColor: '#E8F5E9', paddingHorizontal: 8, paddingVertical: 3, borderRadius: 999 },
  ratingText: { fontSize: 12, fontWeight: '600', color: '#2E7D32' },
  enderecoText: { fontSize: 12, color: '#757575', marginBottom: 6 },
  tagPill: { paddingHorizontal: 8, paddingVertical: 3, borderRadius: 999 },
  tagText: { fontSize: 11, fontWeight: '600' },
  metaText: { fontSize: 12, color: '#757575' },
  bottomNav: { flexDirection: 'row', borderTopWidth: 0.5, borderTopColor: '#E0E0E0', backgroundColor: '#fff', paddingBottom: 24, paddingTop: 10 },
  navItem: { flex: 1, alignItems: 'center' },
  navIcon: { fontSize: 22 },
  navLabel: { fontSize: 11, color: '#BDBDBD', marginTop: 2 },
  navAtivo: { color: '#2E7D32', fontWeight: '700' },
});