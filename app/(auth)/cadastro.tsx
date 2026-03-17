import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Link } from 'expo-router';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Input, Button } from '@/components/ui';

function formatDate(date: Date) {
  return date.toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  });
}

export default function CadastroScreen() {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [dataNascimento, setDataNascimento] = useState(new Date(2000, 0, 1));
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [senha, setSenha] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);

  const validate = () => {
    const err: Record<string, string> = {};
    if (!nome.trim()) err.nome = 'Nome é obrigatório';
    if (!email.trim()) err.email = 'E-mail é obrigatório';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) err.email = 'E-mail inválido';
    if (!senha) err.senha = 'Senha é obrigatória';
    else if (senha.length < 6) err.senha = 'Senha deve ter no mínimo 6 caracteres';
    setErrors(err);
    return Object.keys(err).length === 0;
  };

  const handleCadastrar = () => {
    if (!validate()) return;
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 500);
  };

  const onDateChange = (_: unknown, date?: Date) => {
    setShowDatePicker(Platform.OS === 'ios');
    if (date) setDataNascimento(date);
  };

  return (
    <SafeAreaView className="flex-1 bg-background" edges={['top']}>
      <ScrollView
        contentContainerStyle={{ flexGrow: 1, paddingBottom: 32 }}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        <View className="bg-primary p-6 pt-12 items-center min-h-[140px] overflow-hidden">
          <View className="absolute w-[100px] h-[100px] rounded-[50px] bg-white/10 top-2.5 -left-[30px]" />
          <View className="absolute w-[60px] h-[60px] rounded-[30px] bg-white/[0.08] top-10 right-2.5" />
          <Text className="text-[28px] font-bold text-white">Turistei</Text>
          <Text className="text-sm text-white/90 mt-2">
            vamos criar sua conta!
          </Text>
        </View>

        <View className="flex-1 p-6 pt-6">
          <Text className="text-lg font-bold text-text mb-5">
            Informe seus dados
          </Text>

          <Input
            icon="person"
            placeholder="Insira seu nome completo"
            value={nome}
            onChangeText={setNome}
            error={errors.nome}
            autoCapitalize="words"
          />

          <Input
            icon="email"
            placeholder="Informe seu e-mail"
            value={email}
            onChangeText={setEmail}
            error={errors.email}
            keyboardType="email-address"
            autoCapitalize="none"
          />

          <TouchableOpacity
            onPress={() => setShowDatePicker(true)}
            style={{ marginBottom: 0 }}
          >
            <Input
              icon="calendar"
              placeholder="Insira sua data de aniversário"
              value={formatDate(dataNascimento)}
              editable={false}
            />
          </TouchableOpacity>

          {showDatePicker && (
            <DateTimePicker
              value={dataNascimento}
              mode="date"
              display={Platform.OS === 'ios' ? 'spinner' : 'default'}
              onChange={onDateChange}
              maximumDate={new Date()}
              minimumDate={new Date(1900, 0, 1)}
            />
          )}

          <Input
            icon="lock"
            placeholder="Crie uma senha"
            value={senha}
            onChangeText={setSenha}
            error={errors.senha}
            secureTextEntry
          />

          <Button
            title="CADASTRAR"
            loading={loading}
            onPress={handleCadastrar}
            style={{ marginTop: 8, marginBottom: 16 }}
          />

          <Text className="text-xs text-textSecondary text-center leading-[18px]">
            Ao se cadastrar, você concorda com nossos{' '}
            <Text className="text-primary font-semibold underline">
              Termos de Uso
            </Text>{' '}
            e{' '}
            <Text className="text-primary font-semibold underline">
              Políticas de Privacidade
            </Text>
            .
          </Text>

          <View className="flex-row items-center justify-center mt-6">
            <Text className="text-sm text-text">Já tem conta? </Text>
            <Link href="/(auth)/login" asChild>
              <TouchableOpacity>
                <Text className="text-sm text-primary font-bold">
                  Faça login
                </Text>
              </TouchableOpacity>
            </Link>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
