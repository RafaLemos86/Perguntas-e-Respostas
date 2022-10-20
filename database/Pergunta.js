// importando sequelize para escrever comandos sql no js
const Sequelize = require('sequelize');
// importando conexao com o banco
const connection = require('./database')

// defindo tabela
const Pergunta = connection.define('pergunta', {
    titulo: {
        type: Sequelize.STRING,
        allowNull: false
    },
    descricao: {
        type: Sequelize.TEXT,
        allowNull: false
    }
});

// sincronizar tabela com o banco de dados
Pergunta.sync({ force: false }).then(() => {
    console.log('Tabela Criada')
})

// exportar tabela para IMPORTAR em outro arquivo
module.exports = Pergunta;