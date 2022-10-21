// criando conexao com sequelize
const Sequelize = require('sequelize');
// conectando ao banco
const connection = new Sequelize('database.name', 'user', 'database.password', {
    host: 'localhost',
    dialect: 'mysql',
    port: ''
});
// exportando a conexao
module.exports = connection;
