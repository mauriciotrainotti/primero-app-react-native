import React from 'react';
// 1. Importamos Platform e BackHandler para lidar com diferentes sistemas
import { StyleSheet, Text, View, TouchableOpacity, Platform, BackHandler } from 'react-native-web';
import { Link } from 'expo-router';

const TelaInicial = () => {
  // 2. Criamos a função para lidar com a saída do jogo
  const handleSairDoJogo = () => {
    if (Platform.OS === 'web') {
      // Na web, tenta fechar a aba do navegador.
      // Nota: Navegadores modernos podem impedir isso por segurança.
      window.close();
    } else if (Platform.OS === 'android') {
      // No Android, fecha o aplicativo de forma programática.
      BackHandler.exitApp();
    }
    // Para iOS, as diretrizes da Apple não recomendam fechar o app via código,
    // então o botão não terá efeito nessa plataforma.
  };

  return (
    <View style={estilos.container}>
      <Text style={estilos.titulo}>Pedra Papel Tesoura Online</Text>
      <Text style={estilos.subtitulo}>Pressione o botão novo jogo para começar</Text>

      <Link href="/TelaJogo" asChild>
        <TouchableOpacity style={estilos.botao}>
          <Text style={estilos.textoBotao}>Iniciar Jogo</Text>
        </TouchableOpacity>
      </Link>

      <Link href="/VerPartidas" asChild>
          <TouchableOpacity style={estilos.botao}>
            <Text style={estilos.textoBotao}>Ver partidas</Text>
          </TouchableOpacity>
      </Link>

      {/* 3. Adicionamos a função 'handleSairDoJogo' ao evento onPress */}
      <TouchableOpacity style={estilos.botao} onPress={handleSairDoJogo}>
        <Text style={estilos.textoBotao}>Sair do jogo</Text>
      </TouchableOpacity>
    </View>
  );
};

const estilos = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1e1e1e',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  titulo: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 10,
  },
  subtitulo: {
    fontSize: 18,
    color: '#aaa',
    marginBottom: 30,
  },
  botao: {
    backgroundColor: '#007bff',
    paddingVertical: 15,
    paddingHorizontal: 50,
    borderRadius: 10,
    marginTop: '2%',
  },
  textoBotao: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default TelaInicial;

