import * as SQLite from 'expo-sqlite';

// A função openDatabaseAsync funciona tanto na web quanto no nativo.
// Ela retorna uma promessa que resolve com a instância do banco de dados.
const dbPromise = SQLite.openDatabaseAsync('partidas.db');

// Função para inicializar o banco de dados e criar a tabela
export const init = async () => {
  const db = await dbPromise; // Espera a conexão com o banco ser estabelecida
  await db.execAsync(
    `CREATE TABLE IF NOT EXISTS partidas (
      id INTEGER PRIMARY KEY NOT NULL,
      escolhaUsuario TEXT NOT NULL,
      escolhaComputador TEXT NOT NULL,
      resultado TEXT NOT NULL,
      data TEXT NOT NULL
    );`
  );
};

// Função para inserir uma nova partida
export const inserirPartida = async (escolhaUsuario, escolhaComputador, resultado) => {
  const db = await dbPromise;
  const data = new Date().toISOString();
  await db.runAsync(
    `INSERT INTO partidas (escolhaUsuario, escolhaComputador, resultado, data) VALUES (?, ?, ?, ?);`,
    escolhaUsuario,
    escolhaComputador,
    resultado,
    data
  );
};

// Função para buscar todas as partidas
export const buscarPartidas = async () => {
  const db = await dbPromise;
  const allRows = await db.getAllAsync('SELECT * FROM partidas ORDER BY id DESC;');
  return allRows;
};

