import React from 'react';
import {
  TouchableOpacity,
  Text,
  ActivityIndicator,
  TouchableOpacityProps,
} from 'react-native';
import { colors } from '@/constants/theme';

interface ButtonProps extends TouchableOpacityProps {
  title: string;
  variant?: 'primary' | 'outline';
  loading?: boolean;
}

export function Button({
  title,
  variant = 'primary',
  loading = false,
  disabled,
  style,
  ...props
}: ButtonProps) {
  const baseClasses = 'min-h-[52px] rounded-xl items-center justify-center py-3.5 px-6';
  const variantClasses =
    variant === 'primary'
      ? 'bg-primary'
      : 'bg-transparent border-2 border-primary';
  const disabledClasses = (disabled || loading) ? 'opacity-60' : '';
  const textClasses =
    variant === 'primary'
      ? 'text-base font-bold text-white'
      : 'text-base font-bold text-primary';

  return (
    <TouchableOpacity
      className={`${baseClasses} ${variantClasses} ${disabledClasses}`}
      style={style}
      disabled={disabled || loading}
      accessibilityLabel={title}
      accessibilityRole="button"
      {...props}
    >
      {loading ? (
        <ActivityIndicator
          color={variant === 'primary' ? '#fff' : colors.primary}
          size="small"
        />
      ) : (
        <Text className={textClasses}>{title}</Text>
      )}
    </TouchableOpacity>
  );
}
