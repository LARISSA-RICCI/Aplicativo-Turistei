import React from 'react';
import { Text, Pressable } from 'react-native';
import { Link as ExpoLink, LinkProps } from 'expo-router';

interface StyledLinkProps extends Omit<LinkProps<string>, 'asChild'> {
  children: React.ReactNode;
  style?: object;
}

export function Link({ children, style, ...props }: StyledLinkProps) {
  return (
    <ExpoLink {...props} asChild>
      <Pressable>
        <Text className="text-sm text-primary font-bold underline" style={style}>
          {children}
        </Text>
      </Pressable>
    </ExpoLink>
  );
}
