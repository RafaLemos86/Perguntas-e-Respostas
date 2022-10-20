// importando modulo express
const express = require('express');
// colocando na variavel app
const app = express();
// importando modulo parser
const bodyParser = require('body-parser');
// importando a conexao do banco
const connection = require('./database/database');
// importando a tabela pergunta
const Pergunta = require('./database/Pergunta')
// importando a tabela resposta
const Resposta = require('./database/Resposta')

// database
connection
    .authenticate()
    .then(() => {
        console.log('connection success')
    })
    .catch((msgErro) => {
        console.log(msgErro);
    });

// configurando body parser para receber os dados do formulario
app.use(bodyParser.urlencoded({
    extended: false
}));
// comando optativo para permitir que o body parser leia dados .json
app.use(bodyParser.json());

// configurando o ejs no express como engine
app.set('view engine', 'ejs');

// usar arquivos estaticos no backend
app.use(express.static('public'));

// ROTAS

app.get('/', (req, res) => {
    // metodo findALL serve como um * dentro da tabela
    Pergunta.findAll({
        raw: true, order: [
            ['id', 'desc']
        ]
    }).then(pergunta => {
        res.render('index', {
            pergunta: pergunta
        });
    });

});

app.get('/perguntar', (req, res) => {
    res.render('perguntar');
});

app.post('/salvarpergunta', (req, res) => {
    var titulo = req.body.titulo;
    var desc = req.body.desc;
    // inserindo valores na tabela pergunta com o método CREATE
    Pergunta.create({
        titulo: titulo,
        descricao: desc
    }).then(() => {
        res.redirect('/');
    });
});

app.get('/perguntar/:id', (req, res) => {
    var id = req.params.id;
    Pergunta.findOne({
        where: {
            id: id
        }
    }).then(pergunta => {
        if (pergunta != undefined) {
            Resposta.findAll({
                where: {
                    perguntaId: pergunta.id
                }, order: [
                    ['id', 'desc']
                ]
            }).then(respostas => {
                res.render('pergunta', {
                    pergunta: pergunta,
                    respostas: respostas
                });
            });
        } else {
            res.redirect('/')
        }
    })

})

app.post('/responder', (req, res) => {
    var corpo = req.body.corpo;
    var perguntaId = req.body.pergunta;
    // inserindo valores na tabela pergunta com o método CREATE
    Resposta.create({
        corpo: corpo,
        perguntaId: perguntaId
    }).then(() => {
        res.redirect('/perguntar/' + perguntaId);
    });
})



// abrindo servidor
app.listen(8080, () => {
    console.log('listening on http://localhost:8080');
});



