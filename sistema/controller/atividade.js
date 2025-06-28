const { Sequelize } = require('sequelize');
const model = require('../models');

const Atividade = model.Atividade;

module.exports = {
    async create(req, res) {
        try {
            const { nome, descricao, duracao, peso, rotinaDiaId, alunoId } = req.body;
            console.log('Dados recebidos:', { nome, descricao, duracao, peso, rotinaDiaId, alunoId });
            
            const novaAtividade = await Atividade.create({ 
                nome, 
                descricao, 
                duracao, 
                peso, 
                rotinaDiaId, 
                alunoId 
            });
            return res.json({ msg: 'Atividade criada com sucesso', data: novaAtividade });
        } catch (error) {
            console.error('Erro completo:', error);
            return res.json({msg: "Não foi possível cadastrar a atividade: " + error.message});
        }
    },

    async update(req, res) {
        try {
            const { id } = req.params;
            const { nome, descricao, duracao, peso, rotinaDiaId, alunoId } = req.body;
            const atividadeAtualizada = await Atividade.update({ 
                nome, 
                descricao, 
                duracao, 
                peso, 
                rotinaDiaId, 
                alunoId 
            }, { where: { id } });
            return res.json({ msg: 'Atividade atualizada com sucesso' });
        } catch (error) {
            return res.json({msg: "Não foi possível atualizar a atividade: " + error.message});
        }
    },

    async findAll(req, res) {
        try {
            const { page } = req.params;
            const limite = 10;

            const atividades = await Atividade.findAll({
                    order: [
                        ['id', 'ASC']
                    ],
                    limit: limite,
                    offset: parseInt(page)
                }
            );
            return res.json(atividades);
        } catch (error) {
            return res.json({msg: "Não foi possível buscar as atividades: " + error.message});
        }
    },

    async findById(req, res) {
        try {
            const { id } = req.params;
            const atividade = await Atividade.findByPk(id);
            
            if (!atividade) {
                return res.status(404).json({ msg: 'Atividade não encontrada' });
            }
            
            return res.json(atividade);
        } catch (error) {
            return res.json({msg: "Não foi possível buscar a atividade: " + error.message});
        }
    },

    async delete(req, res) {
        try {
            const { id } = req.params;
            const atividade = await Atividade.findByPk(id);
            
            if (!atividade) {
                return res.status(404).json({ msg: 'Atividade não encontrada' });
            }
            
            await atividade.destroy();
            return res.json({ msg: 'Atividade deletada com sucesso' });
        } catch (error) {
            return res.json({msg: "Não foi possível deletar a atividade: " + error.message});
        }
    },

    async findByAluno(req, res) {
        try {
            const { alunoId } = req.params;
            const { page = 0 } = req.query;
            const limite = 10;

            const atividades = await Atividade.findAll({
                where: { alunoId },
                order: [
                    ['id', 'ASC']
                ],
                limit: limite,
                offset: parseInt(page)
            });
            
            return res.json(atividades);
        } catch (error) {
            return res.json({msg: "Não foi possível buscar as atividades do aluno: " + error.message});
        }
    },

    async findByRotinaDia(req, res) {
        try {
            const { rotinaDiaId } = req.params;
            const { page = 0 } = req.query;
            const limite = 10;

            const atividades = await Atividade.findAll({
                where: { rotinaDiaId },
                order: [
                    ['id', 'ASC']
                ],
                limit: limite,
                offset: parseInt(page)
            });
            
            return res.json(atividades);
        } catch (error) {
            return res.json({msg: "Não foi possível buscar as atividades da rotina: " + error.message});
        }
    }
} 