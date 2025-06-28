const { Sequelize } = require('sequelize');
const model = require('../models');
const Aluno = model.Aluno;

module.exports = {
    async create(req, res) {
        try {
            const { nome, email, senha } = req.body;
            console.log('Dados recebidos:', { nome, email, senha });
            console.log('Aluno model:', Aluno);
            
            const novoAluno = await Aluno.create({ nome, email, senha });
            return res.json({ msg: 'Aluno criado com sucesso', data: novoAluno });
        } catch (error) {
            console.error('Erro completo:', error);
            return res.json({msg: "Não foi possível cadastrar o aluno: " + error.message});
        }
    },

    async update(req, res) {
        try {
            const { id } = req.params;
            const { nome, email, senha } = req.body;
            const alunoAtualizado = await Aluno.update({ nome, email, senha }, { where: { id } });
            return res.json({ msg: 'Aluno atualizado com sucesso' });
        } catch (error) {
            return res.json({msg: "Não foi possível atualizar o aluno: " + error.message});
        }
    },

    async findAll(req, res) {
        try {
            const { page } = req.params;
            const limite = 10;

            const alunos = await Aluno.findAll({
                    order: [
                        ['id', 'ASC']
                    ],
                    limit: limite,
                    offset: parseInt(page)
                }
            );
            return res.json(alunos);
        } catch (error) {
            return res.json({msg: "Não foi possível buscar os alunos: " + error.message});
        }
    },

    async findById(req, res) {
        try {
            const { id } = req.params;
            const aluno = await Aluno.findByPk(id);
            
            if (!aluno) {
                return res.status(404).json({ msg: 'Aluno não encontrado' });
            }
            
            return res.json(aluno);
        } catch (error) {
            return res.json({msg: "Não foi possível buscar o aluno: " + error.message});
        }
    },

    async delete(req, res) {
        try {
            const { id } = req.params;
            const aluno = await Aluno.findByPk(id);
            
            if (!aluno) {
                return res.status(404).json({ msg: 'Aluno não encontrado' });
            }
            
            await aluno.destroy();
            return res.json({ msg: 'Aluno deletado com sucesso' });
        } catch (error) {
            return res.json({msg: "Não foi possível deletar o aluno: " + error.message});
        }
    }
} 