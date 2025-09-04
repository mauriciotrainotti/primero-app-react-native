import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, SafeAreaView, ActivityIndicator } from 'react-native-web';
import { Link } from 'expo-router';
// CORREÇÃO: O caminho agora é '../database' para sair da pasta 'app'
import { init, inserirPartida } from '../database';

// Inicializa o banco de dados quando o app começa
init()
  .then(() => {
    console.log('Banco de dados inicializado');
  })
  .catch((err) => {
    console.log('Falha na inicialização do banco de dados.');
    console.log(err);
  });


const OPCOES = ['Pedra', 'Papel', 'Tesoura'];

const TelaJogo = () => {
  const [escolhaUsuario, setEscolhaUsuario] = useState(null);
  const [escolhaComputador, setEscolhaComputador] = useState(null);
  const [resultado, setResultado] = useState('');
  const [pensando, setPensando] = useState(false);

  const handleEscolhaUsuario = (escolha) => {
    setEscolhaUsuario(escolha);
    setResultado('');
    setEscolhaComputador(null);
    setPensando(true);

    setTimeout(() => {
      gerarEscolhaComputador(escolha);
      setPensando(false);
    }, 1500);
  };

  const gerarEscolhaComputador = (escolhaDoUsuario) => {
    const escolhaAleatoria = OPCOES[Math.floor(Math.random() * OPCOES.length)];
    setEscolhaComputador(escolhaAleatoria);
    definirGanhador(escolhaDoUsuario, escolhaAleatoria);
  };
  
  const definirGanhador = async (usuario, computador) => {
    let resultadoFinal = '';
    if (usuario === computador) {
      resultadoFinal = 'Empate!';
    } else if (
      (usuario === 'Pedra' && computador === 'Tesoura') ||
      (usuario === 'Papel' && computador === 'Pedra') ||
      (usuario === 'Tesoura' && computador === 'Papel')
    ) {
      resultadoFinal = 'Você Ganhou! 🎉';
    } else {
      resultadoFinal = 'Você Perdeu! 😢';
    }
    setResultado(resultadoFinal);

    try {
      await inserirPartida(usuario, computador, resultadoFinal);
      console.log('Partida salva com sucesso!');
    } catch (err) {
      console.log('Erro ao salvar partida:', err);
    }
  };

  const resetarJogo = () => {
    setEscolhaUsuario(null);
    setEscolhaComputador(null);
    setResultado('');
  };

  return (
    <SafeAreaView style={estilos.container}>
       <Text style={estilos.titulo}>Faça sua escolha!</Text>

      {(escolhaUsuario || pensando) && (
        <View style={estilos.resultadoContainer}>
          {pensando ? (
            <>
              <Text style={estilos.textoResultado}>Sua escolha: {escolhaUsuario}</Text>
              <ActivityIndicator size="large" color="#fff" style={{ marginVertical: 10 }} />
              <Text style={estilos.textoResultadoFinal}>Computador pensando...</Text>
            </>
          ) : (
            <>
              <Text style={estilos.textoResultado}>Sua escolha: {escolhaUsuario}</Text>
              <Text style={estilos.textoResultado}>Computador: {escolhaComputador}</Text>
              <Text style={estilos.textoResultadoFinal}>{resultado}</Text>
            </>
          )}
        </View>
      )}

      {!escolhaUsuario ? (
        <View style={estilos.opcoesContainer}>
          {OPCOES.map((opcao) => (
            <TouchableOpacity
              key={opcao}
              style={pensando ? estilos.botaoOpcaoDesabilitado : estilos.botaoOpcao}
              onPress={() => handleEscolhaUsuario(opcao)}
              disabled={pensando}
            >
              <Text style={estilos.textoBotao}>{opcao}</Text>
            </TouchableOpacity>
          ))}
        </View>
      ) : (
        !pensando && (
          <TouchableOpacity style={estilos.botao} onPress={resetarJogo}>
            <Text style={estilos.textoBotao}>Jogar Novamente</Text>
          </TouchableOpacity>
        )
      )}

      <Link href="/" asChild>
        <TouchableOpacity style={pensando ? estilos.botaoVoltarDesabilitado : estilos.botaoVoltar} disabled={pensando}>
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
    justifyContent: 'center',
    padding: 20,
  },
  titulo: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 30,
  },
  opcoesContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginBottom: 40,
  },
  botaoOpcao: {
    backgroundColor: '#333',
    padding: 15,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#007bff',
  },
  botaoOpcaoDesabilitado: {
    backgroundColor: '#555',
    padding: 15,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#777',
    opacity: 0.5,
  },
  resultadoContainer: {
    minHeight: 150,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 30,
  },
  textoResultado: {
    fontSize: 18,
    color: '#aaa',
    marginBottom: 10,
  },
  textoResultadoFinal: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginTop: 10,
  },
  botao: {
    backgroundColor: '#007bff',
    paddingVertical: 15,
    paddingHorizontal: 50,
    borderRadius: 10,
    marginTop: 20,
  },
  botaoVoltar: {
    backgroundColor: '#6c757d',
    paddingVertical: 15,
    paddingHorizontal: 50,
    borderRadius: 10,
    marginTop: 20,
  },
  botaoVoltarDesabilitado: {
    backgroundColor: '#555',
    paddingVertical: 15,
    paddingHorizontal: 50,
    borderRadius: 10,
    marginTop: 20,
    opacity: 0.5,
  },
  textoBotao: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default TelaJogo;

