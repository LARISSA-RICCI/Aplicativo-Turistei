export interface Category {
  id: string;
  nome: string;
  emoji: string;
  cor: string;
}

export const CATEGORIES: Category[] = [
  { id: '1', nome: 'Restaurantes', emoji: '🍽️', cor: '#E53935' },
  { id: '2', nome: 'Bares', emoji: '🍺', cor: '#FB8C00' },
  { id: '3', nome: 'Pubs', emoji: '🎸', cor: '#7B1FA2' },
  { id: '4', nome: 'Padarias', emoji: '🥐', cor: '#8D6E63' },
  { id: '5', nome: 'Cafeterias', emoji: '☕', cor: '#43A047' },
];
