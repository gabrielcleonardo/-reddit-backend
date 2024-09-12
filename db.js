const { Sequelize } = require('sequelize');

// Configura o banco de dados SQLite
const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: './database.sqlite',  // O banco de dados será salvo nesse arquivo
  logging: false  // Desativa logs SQL, ajuste conforme necessário
});

// Testa a conexão com o banco de dados
const testConnection = async () => {
  try {
    await sequelize.authenticate();
    console.log('Conexão com o banco de dados foi estabelecida com sucesso.');
  } catch (error) {
    console.error('Não foi possível conectar ao banco de dados:', error);
  }
};

// Chama a função para testar a conexão
testConnection();

module.exports = sequelize;
