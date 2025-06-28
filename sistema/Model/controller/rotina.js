const { Sequelize } = require('sequelize');
const model = require('../models');

const Rotina = model.Rotina;

module.exports = {
    async create(req, res) {
        try {
            const { nome, descricao, alunoId } = req.body;
            console.log('Dados recebidos:', { nome, descricao, alunoId });
            
            const novaRotina = await Rotina.create({ 
                nome, 
                descricao, 
                alunoId 
            });
            return res.json({ msg: 'Rotina criada com sucesso', data: novaRotina });
        } catch (error) {
            console.error('Erro completo:', error);
            return res.json({msg: "Não foi possível cadastrar a rotina: " + error.message});
        }
    },

    async update(req, res) {
        try {
            const { id } = req.params;
            const { nome, descricao, alunoId } = req.body;
            const rotinaAtualizada = await Rotina.update({ 
                nome, 
                descricao, 
                alunoId 
            }, { where: { id } });
            return res.json({ msg: 'Rotina atualizada com sucesso' });
        } catch (error) {
            return res.json({msg: "Não foi possível atualizar a rotina: " + error.message});
        }
    },

    async findAll(req, res) {
        try {
            const { page } = req.params;
            const limite = 10;

            const rotinas = await Rotina.findAll({
                    order: [
                        ['id', 'ASC']
                    ],
                    limit: limite,
                    offset: parseInt(page)
                }
            );
            return res.json(rotinas);
        } catch (error) {
            return res.json({msg: "Não foi possível buscar as rotinas: " + error.message});
        }
    },

    async findById(req, res) {
        try {
            const { id } = req.params;
            const rotina = await Rotina.findByPk(id);
            
            if (!rotina) {
                return res.status(404).json({ msg: 'Rotina não encontrada' });
            }
            
            return res.json(rotina);
        } catch (error) {
            return res.json({msg: "Não foi possível buscar a rotina: " + error.message});
        }
    },

    async delete(req, res) {
        try {
            const { id } = req.params;
            const rotina = await Rotina.findByPk(id);
            
            if (!rotina) {
                return res.status(404).json({ msg: 'Rotina não encontrada' });
            }
            
            await rotina.destroy();
            return res.json({ msg: 'Rotina deletada com sucesso' });
        } catch (error) {
            return res.json({msg: "Não foi possível deletar a rotina: " + error.message});
        }
    },

    async findByAluno(req, res) {
        try {
            const { alunoId } = req.params;
            const { page = 0 } = req.query;
            const limite = 10;

            const rotinas = await Rotina.findAll({
                where: { alunoId },
                order: [
                    ['id', 'ASC']
                ],
                limit: limite,
                offset: parseInt(page)
            });
            
            return res.json(rotinas);
        } catch (error) {
            return res.json({msg: "Não foi possível buscar as rotinas do aluno: " + error.message});
        }
    }
} 