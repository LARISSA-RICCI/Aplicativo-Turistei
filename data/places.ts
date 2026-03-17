export interface Place {
  id: string;
  nome: string;
  categoria: string;
  avaliacao: number;
  votos: number;
  endereco: string;
  preco: string;
  emoji: string;
  aberto: boolean;
  descricao?: string;
  comodidades?: string[];
  distancia?: string;
  imagemUrl?: string;
  lat?: number;
  lng?: number;
}

export const PLACES: Place[] = [
  { id: '1', nome: 'Sabor Tropeiro', categoria: 'Restaurantes', avaliacao: 4.8, votos: 980, endereco: 'Barretos, SP', preco: 'R$$', emoji: '🍽️', aberto: true, descricao: 'Culinária tropeira autêntica em ambiente acolhedor.', comodidades: ['Estacion.', 'Wi-Fi'], distancia: '1,2 km', lat: -21.1, lng: -48.5 },
  { id: '2', nome: 'Santina Restaurante', categoria: 'Restaurantes', avaliacao: 4.8, votos: 292, endereco: 'Barretos, SP', preco: 'R$$', emoji: '🍝', aberto: true, descricao: 'Massas artesanais e pratos italianos.', comodidades: ['Estacion.', 'Wi-Fi', 'Ar condicionado'], distancia: '2,1 km', lat: -21.09, lng: -48.51 },
  { id: '3', nome: 'Leopoldina Gastronomia', categoria: 'Restaurantes', avaliacao: 4.6, votos: 150, endereco: 'Barretos, SP', preco: 'R$$', emoji: '🍕', aberto: true, descricao: 'Pizzaria e gastronomia variada.', comodidades: ['Estacion.', 'Delivery'], distancia: '0,8 km', lat: -21.11, lng: -48.49 },
  { id: '4', nome: 'Saikoo Sushi Lounge', categoria: 'Restaurantes', avaliacao: 4.8, votos: 809, endereco: 'Barretos, SP', preco: 'R$$$', emoji: '🍱', aberto: false, descricao: 'Sushi e culinária japonesa premium.', comodidades: ['Estacion.', 'Wi-Fi', 'Reservas'], distancia: '3,5 km', lat: -21.08, lng: -48.52 },
  { id: '5', nome: 'Boa Sorte Bar do Alcebíades', categoria: 'Bares', avaliacao: 4.4, votos: 1129, endereco: 'Barretos, SP', preco: 'R$$', emoji: '🍺', aberto: true, descricao: 'Bar tradicional com petiscos e chopp gelado.', comodidades: ['Estacion.'], distancia: '1,5 km', lat: -21.1, lng: -48.5 },
  { id: '6', nome: 'Boiadeiro Choperia', categoria: 'Bares', avaliacao: 4.4, votos: 1386, endereco: 'Barretos, SP', preco: 'R$$', emoji: '🍻', aberto: true, descricao: 'Choperia com ambiente descontraído.', comodidades: ['Estacion.', 'Wi-Fi'], distancia: '2,3 km', lat: -21.09, lng: -48.5 },
  { id: '7', nome: 'Água Doce Cachaçaria', categoria: 'Pubs', avaliacao: 4.5, votos: 1098, endereco: 'Barretos, SP', preco: 'R$$', emoji: '🎸', aberto: false, descricao: 'Cachaçaria com música ao vivo.', comodidades: ['Estacion.', 'Wi-Fi'], distancia: '1,8 km', lat: -21.1, lng: -48.51 },
  { id: '8', nome: 'Samauma American Bar', categoria: 'Pubs', avaliacao: 4.4, votos: 67, endereco: 'Barretos, SP', preco: 'R$$', emoji: '🎵', aberto: true, descricao: 'Bar temático com drinks especiais.', comodidades: ['Wi-Fi'], distancia: '0,5 km', lat: -21.11, lng: -48.49 },
  { id: '9', nome: 'La Maison 22 Street', categoria: 'Padarias', avaliacao: 4.5, votos: 310, endereco: 'Barretos, SP', preco: 'R$', emoji: '🥐', aberto: true, descricao: 'Padaria e confeitaria artesanal.', comodidades: ['Wi-Fi'], distancia: '1,0 km', lat: -21.1, lng: -48.5 },
  { id: '10', nome: 'Panificadora União', categoria: 'Padarias', avaliacao: 4.2, votos: 60, endereco: 'Barretos, SP', preco: 'R$', emoji: '🍞', aberto: false, descricao: 'Padaria tradicional com pães frescos.', comodidades: [], distancia: '2,8 km', lat: -21.09, lng: -48.51 },
  { id: '11', nome: 'La Maison Café', categoria: 'Cafeterias', avaliacao: 4.6, votos: 420, endereco: 'Barretos, SP', preco: 'R$', emoji: '☕', aberto: true, descricao: 'Café especial e doces.', comodidades: ['Wi-Fi', 'Ar condicionado'], distancia: '1,3 km', lat: -21.1, lng: -48.5 },
  { id: '12', nome: 'Empório da Amizade', categoria: 'Cafeterias', avaliacao: 4.5, votos: 199, endereco: 'R. 24, 1252', preco: 'R$', emoji: '🫖', aberto: true, descricao: 'Café e lanches em ambiente aconchegante.', comodidades: ['Wi-Fi'], distancia: '0,7 km', lat: -21.11, lng: -48.49 },
];
