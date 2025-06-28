const express = require('express'); 
const router = express.Router();
const admin = require('../controller/admin');
const aluno = require('../controller/aluno');
const atividade = require('../controller/atividade');
const disponibilidade = require('../controller/disponibilidade');
const rotina = require('../controller/rotina');
const rotinadia = require('../controller/rotinadia');
const rotinaatividade = require('../controller/rotinaatividade');
const model = require('../models');

// Rota de login para alunos e admins
router.post('/login', async (req, res) => {
    const { email, senha } = req.body;
    try {
        // Tenta encontrar como aluno
        const aluno = await model.Aluno.findOne({ where: { email, senha } });
        if (aluno) {
            return res.json({ tipo: 'aluno', usuario: aluno });
        }
        // Tenta encontrar como admin
        const admin = await model.Admin.findOne({ where: { email, senha } });
        if (admin) {
            return res.json({ tipo: 'admin', usuario: admin });
        }
        return res.status(401).json({ message: 'E-mail ou senha inválidos.' });
    } catch (error) {
        return res.status(500).json({ message: 'Erro ao realizar login.' });
    }
});

// Rotas de admin
router.post('/criar/admin', admin.create);
router.get('/listar/admin/:page', admin.findAll);
router.put('/atualizar/admin/:id', admin.update);

// Rotas de aluno
router.post('/criar/aluno', aluno.create);
router.get('/listar/aluno/:page', aluno.findAll);
router.get('/buscar/aluno/:id', aluno.findById);
router.put('/atualizar/aluno/:id', aluno.update);
router.delete('/deletar/aluno/:id', aluno.delete);

// Rotas de atividade
router.post('/criar/atividade', atividade.create);
router.get('/listar/atividade/:page', atividade.findAll);
router.get('/buscar/atividade/:id', atividade.findById);
router.put('/atualizar/atividade/:id', atividade.update);
router.delete('/deletar/atividade/:id', atividade.delete);
router.get('/atividades/aluno/:alunoId', atividade.findByAluno);
router.get('/atividades/rotina/:rotinaDiaId', atividade.findByRotinaDia);

// Rotas de disponibilidade
router.post('/criar/disponibilidade', disponibilidade.create);
router.get('/listar/disponibilidade/:page', disponibilidade.findAll);
router.get('/buscar/disponibilidade/:id', disponibilidade.findById);
router.put('/atualizar/disponibilidade/:id', disponibilidade.update);
router.delete('/deletar/disponibilidade/:id', disponibilidade.delete);
router.get('/disponibilidade/rotina/:rotinaDiaId', disponibilidade.findByRotinaDia);

// Rotas de rotina
router.post('/criar/rotina', rotina.create);
router.get('/listar/rotina/:page', rotina.findAll);
router.get('/buscar/rotina/:id', rotina.findById);
router.put('/atualizar/rotina/:id', rotina.update);
router.delete('/deletar/rotina/:id', rotina.delete);
router.get('/rotinas/aluno/:alunoId', rotina.findByAluno);

// Rotas de rotina/dia
router.post('/criar/rotinadia', rotinadia.create);
router.get('/listar/rotinadia/:page', rotinadia.findAll);
router.get('/buscar/rotinadia/:id', rotinadia.findById);
router.put('/atualizar/rotinadia/:id', rotinadia.update);
router.delete('/deletar/rotinadia/:id', rotinadia.delete);
router.get('/rotinadias/rotina/:rotinaId', rotinadia.findByRotina);
router.get('/rotinadias/dia/:diaSemana', rotinadia.findByDiaSemana);

// Rotas de rotina/atividade
router.post('/criar/rotinaatividade', rotinaatividade.create);
router.get('/listar/rotinaatividade/:page', rotinaatividade.findAll);
router.get('/buscar/rotinaatividade/:id', rotinaatividade.findById);
router.put('/atualizar/rotinaatividade/:id', rotinaatividade.update);
router.delete('/deletar/rotinaatividade/:id', rotinaatividade.delete);
router.get('/rotinaatividades/rotinadia/:rotinaDiaId', rotinaatividade.findByRotinaDia);
router.get('/rotinaatividades/atividade/:atividadeId', rotinaatividade.findByAtividade);
router.get('/rotinaatividades/aluno/:alunoId', rotinaatividade.findByAluno);

module.exports = router;