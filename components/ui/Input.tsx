import React from 'react';
import {
  View,
  TextInput,
  Text,
  TextInputProps,
  TouchableOpacity,
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { colors } from '@/constants/theme';

export type InputIcon = 'person' | 'email' | 'lock' | 'calendar';

const iconMap: Record<InputIcon, keyof typeof MaterialIcons.glyphMap> = {
  person: 'person',
  email: 'email',
  lock: 'lock',
  calendar: 'calendar-today',
};

interface InputProps extends Omit<TextInputProps, 'style'> {
  icon?: InputIcon;
  label?: string;
  error?: string;
  containerStyle?: object;
  rightElement?: React.ReactNode;
}

export function Input({
  icon,
  label,
  error,
  containerStyle,
  rightElement,
  secureTextEntry,
  ...props
}: InputProps) {
  const [showPassword, setShowPassword] = React.useState(false);
  const isPassword = secureTextEntry !== undefined;

  return (
    <View className="mb-4" style={containerStyle}>
      {label ? (
        <Text
          className="text-sm font-semibold text-text mb-2"
          accessibilityLabel={label}
        >
          {label}
        </Text>
      ) : null}
      <View
        className={`flex-row items-center bg-primaryLight rounded-xl px-4 min-h-12 border ${
          error ? 'border-error' : 'border-transparent'
        }`}
      >
        {icon ? (
          <MaterialIcons
            name={iconMap[icon]}
            size={20}
            color={error ? colors.error : colors.textSecondary}
            style={{ marginRight: 12 }}
          />
        ) : null}
        <TextInput
          className={`flex-1 text-base text-text py-3 ${icon ? 'pl-0' : ''}`}
          placeholderTextColor={colors.textMuted}
          secureTextEntry={isPassword && !showPassword}
          accessibilityLabel={label}
          accessibilityHint={error}
          {...props}
        />
        {isPassword ? (
          <TouchableOpacity
            onPress={() => setShowPassword((v) => !v)}
            className="p-1"
            accessibilityLabel={showPassword ? 'Ocultar senha' : 'Mostrar senha'}
            accessibilityRole="button"
          >
            <MaterialIcons
              name={showPassword ? 'visibility-off' : 'visibility'}
              size={22}
              color={colors.textSecondary}
            />
          </TouchableOpacity>
        ) : (
          rightElement
        )}
      </View>
      {error ? (
        <Text className="text-xs text-error mt-1 ml-1">{error}</Text>
      ) : null}
    </View>
  );
}
