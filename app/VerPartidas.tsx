import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, FlatList, SafeAreaView, TouchableOpacity } from 'react-native-web';
import { Link } from 'expo-router';
import { buscarPartidas } from '../database';

const VerPartidas = () => {
  const [partidas, setPartidas] = useState([]);

  // useEffect para buscar as partidas quando a tela carregar
  useEffect(() => {
    const carregarPartidas = async () => {
      try {
        const partidasSalvas = await buscarPartidas();
        setPartidas(partidasSalvas);
      } catch (error) {
        console.log('Erro ao carregar partidas:', error);
      }
    };
    carregarPartidas();
  }, []);

  const renderItem = ({ item }) => (
    <View style={estilos.itemPartida}>
      <Text style={estilos.textoItem}>Data: {new Date(item.data).toLocaleString('pt-BR')}</Text>
      <Text style={estilos.textoItem}>Você: {item.escolhaUsuario} | PC: {item.escolhaComputador}</Text>
      <Text style={[
          estilos.textoResultado,
          item.resultado.includes('Ganhou') ? estilos.vitoria : item.resultado.includes('Perdeu') ? estilos.derrota : {}
      ]}>
        {item.resultado}
      </Text>
    </View>
  );

  return (
    <SafeAreaView style={estilos.container}>
      <Text style={estilos.titulo}>Histórico de Partidas</Text>
      {partidas.length === 0 ? (
        <Text style={estilos.textoVazio}>Nenhuma partida foi jogada ainda.</Text>
      ) : (
        <FlatList
          data={partidas}
          renderItem={renderItem}
          keyExtractor={(item) => item.id.toString()}
          style={estilos.lista}
        />
      )}
      <Link href="/" asChild>
        <TouchableOpacity style={estilos.botaoVoltar}>
          <Text style={estilos.textoBotao}>Voltar ao Menu</Text>
        </TouchableOpacity>
      </Link>
    </SafeAreaView>
  );
};

const estilos = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1e1e1e',
    alignItems: 'center',
    padding: 20,
  },
  titulo: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 20,
    marginTop: 20,
  },
  lista: {
    width: '100%',
  },
  itemPartida: {
    backgroundColor: '#333',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    width: '100%',
  },
  textoItem: {
    fontSize: 16,
    color: '#ccc',
  },
  textoResultado: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    marginTop: 5,
  },
  vitoria: {
    color: '#28a745', // Verde
  },
  derrota: {
    color: '#dc3545', // Vermelho
  },
  textoVazio: {
    fontSize: 18,
    color: '#aaa',
    flex: 1,
    textAlignVertical: 'center',
  },
  botaoVoltar: {
    backgroundColor: '#6c757d',
    paddingVertical: 15,
    paddingHorizontal: 50,
    borderRadius: 10,
    marginTop: 20,
  },
  textoBotao: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default VerPartidas;
