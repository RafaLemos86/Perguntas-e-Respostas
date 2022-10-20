// criando conexao com sequelize
const Sequelize = require('sequelize');
// conectando ao banco
const connection = new Sequelize('perguntas', 'root', '0000', {
    host: 'localhost',
    dialect: 'mysql',
    port: '3307'
});
// exportando a conexao
module.exports = connection;