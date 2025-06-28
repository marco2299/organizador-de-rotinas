const express = require('express');
const app = express();
const router = require('./router/router');
const path = require('path');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Log para debug
console.log('Carregando rotas...');
app.use('/api', router);
console.log('Rotas carregadas com sucesso!');

// Servir arquivos estáticos da pasta view
app.use(express.static(path.join(__dirname, 'view')));

// Rota para a página inicial (deve vir depois das rotas da API)
app.get('/', (req, res) => {
    console.log('Acessando página inicial...');
    const filePath = path.join(__dirname, 'view', 'index.html');
    console.log('Caminho do arquivo:', filePath);
    res.sendFile(filePath, (err) => {
        if (err) {
            console.error('Erro ao enviar arquivo:', err);
            res.status(500).send('Erro interno do servidor');
        } else {
            console.log('Arquivo enviado com sucesso');
        }
    });
});

app.listen(3000, function(request, response) {
    console.log('Servidor rodando na porta 3000');
    console.log('Acesse: http://localhost:3000');
});

module.exports = app;