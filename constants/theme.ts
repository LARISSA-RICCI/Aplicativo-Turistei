/**
 * Design tokens - cores e estilos centralizados
 */
export const colors = {
  primary: '#2E7D32',
  primaryLight: '#E8F5E9',
  primaryMuted: 'rgba(46, 125, 50, 0.22)',
  background: '#F5F5F5',
  surface: '#fff',
  text: '#212121',
  textSecondary: '#757575',
  textMuted: '#BDBDBD',
  border: '#E0E0E0',
  error: '#E53935',
  closedOverlay: 'rgba(0,0,0,0.55)',
  favBtnBg: 'rgba(0,0,0,0.2)',
  notifBtnBg: 'rgba(255,255,255,0.2)',
} as const;

export const categoryColors: Record<string, string> = {
  Restaurantes: '#E53935',
  Bares: '#FB8C00',
  Pubs: '#7B1FA2',
  Padarias: '#8D6E63',
  Cafeterias: '#43A047',
};
