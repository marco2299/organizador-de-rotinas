const express = require('express');
const app = express();
const router = require('./router/router');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Log para debug
console.log('Carregando rotas...');
app.use(router);
console.log('Rotas carregadas com sucesso!');

app.listen(3000, function(request, response) {
    console.log('Servidor rodando na porta 3000');
});

module.exports = app;