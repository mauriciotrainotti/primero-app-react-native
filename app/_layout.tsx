import { Stack } from 'expo-router';
import React from 'react';

// Este componente define a estrutura de navegação principal do seu aplicativo.
// O <Stack /> diz ao Expo Router para tratar suas telas como uma "pilha",
// permitindo que você navegue para frente e para trás.
const RootLayout = () => {
  return (
    <Stack>
      {/* A opção screenOptions={{ headerShown: false }} esconde o cabeçalho
          que o Expo adiciona por padrão em cada tela. */}
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="TelaJogo" options={{ headerShown: false }} />
    </Stack>
  );
};

export default RootLayout;

