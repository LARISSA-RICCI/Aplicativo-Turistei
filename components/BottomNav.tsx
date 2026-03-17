import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

export interface NavItem {
  icon: string;
  label: string;
  route: string;
}

const DEFAULT_ITEMS: NavItem[] = [
  { icon: '🏠', label: 'Início', route: '/' },
  { icon: '🔍', label: 'Buscar', route: '/buscar' },
  { icon: '❤️', label: 'Favoritos', route: '/favoritos' },
  { icon: '👤', label: 'Perfil', route: '/perfil' },
];

interface BottomNavProps {
  items?: NavItem[];
  activeIndex?: number;
  onItemPress?: (index: number, route: string) => void;
}

export function BottomNav({
  items = DEFAULT_ITEMS,
  activeIndex = 0,
  onItemPress,
}: BottomNavProps) {
  return (
    <View
      className="flex-row border-t border-border bg-surface pb-6 pt-2.5"
      accessibilityRole="tablist"
    >
      {items.map((item, i) => (
        <TouchableOpacity
          key={item.route}
          className="flex-1 items-center"
          onPress={() => onItemPress?.(i, item.route)}
          accessibilityLabel={`${item.label}${activeIndex === i ? ', selecionado' : ''}`}
          accessibilityRole="tab"
          accessibilityState={{ selected: activeIndex === i }}
        >
          <Text className="text-[22px]">{item.icon}</Text>
          <Text
            className={`text-[11px] text-textMuted mt-0.5 ${
              activeIndex === i ? 'text-primary font-bold' : ''
            }`}
          >
            {item.label}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}
