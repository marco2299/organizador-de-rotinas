const { Sequelize } = require('sequelize');
const model = require('../models');

const RotinaAtividade = model.RotinaAtividade;

module.exports = {
    async create(req, res) {
        try {
            const { horaInicio, horaFim, rotinaDiaId, atividadeId } = req.body;
            console.log('Dados recebidos:', { horaInicio, horaFim, rotinaDiaId, atividadeId });
            
            const novaRotinaAtividade = await RotinaAtividade.create({ 
                horaInicio, 
                horaFim, 
                rotinaDiaId, 
                atividadeId 
            });
            return res.json({ msg: 'RotinaAtividade criada com sucesso', data: novaRotinaAtividade });
        } catch (error) {
            console.error('Erro completo:', error);
            return res.json({msg: "Não foi possível cadastrar a rotina/atividade: " + error.message});
        }
    },

    async update(req, res) {
        try {
            const { id } = req.params;
            const { horaInicio, horaFim, rotinaDiaId, atividadeId } = req.body;
            const rotinaAtividadeAtualizada = await RotinaAtividade.update({ 
                horaInicio, 
                horaFim, 
                rotinaDiaId, 
                atividadeId 
            }, { where: { id } });
            return res.json({ msg: 'RotinaAtividade atualizada com sucesso' });
        } catch (error) {
            return res.json({msg: "Não foi possível atualizar a rotina/atividade: " + error.message});
        }
    },

    async findAll(req, res) {
        try {
            const { page } = req.params;
            const limite = 10;

            const rotinasAtividades = await RotinaAtividade.findAll({
                    order: [
                        ['horaInicio', 'ASC']
                    ],
                    limit: limite,
                    offset: parseInt(page)
                }
            );
            return res.json(rotinasAtividades);
        } catch (error) {
            return res.json({msg: "Não foi possível buscar as rotinas/atividades: " + error.message});
        }
    },

    async findById(req, res) {
        try {
            const { id } = req.params;
            const rotinaAtividade = await RotinaAtividade.findByPk(id);
            
            if (!rotinaAtividade) {
                return res.status(404).json({ msg: 'RotinaAtividade não encontrada' });
            }
            
            return res.json(rotinaAtividade);
        } catch (error) {
            return res.json({msg: "Não foi possível buscar a rotina/atividade: " + error.message});
        }
    },

    async delete(req, res) {
        try {
            const { id } = req.params;
            const rotinaAtividade = await RotinaAtividade.findByPk(id);
            
            if (!rotinaAtividade) {
                return res.status(404).json({ msg: 'RotinaAtividade não encontrada' });
            }
            
            await rotinaAtividade.destroy();
            return res.json({ msg: 'RotinaAtividade deletada com sucesso' });
        } catch (error) {
            return res.json({msg: "Não foi possível deletar a rotina/atividade: " + error.message});
        }
    },

    async findByRotinaDia(req, res) {
        try {
            const { rotinaDiaId } = req.params;
            const { page = 0 } = req.query;
            const limite = 10;

            const rotinasAtividades = await RotinaAtividade.findAll({
                where: { rotinaDiaId },
                order: [
                    ['horaInicio', 'ASC']
                ],
                limit: limite,
                offset: parseInt(page)
            });
            
            return res.json(rotinasAtividades);
        } catch (error) {
            return res.json({msg: "Não foi possível buscar as atividades da rotina/dia: " + error.message});
        }
    },

    async findByAtividade(req, res) {
        try {
            const { atividadeId } = req.params;
            const { page = 0 } = req.query;
            const limite = 10;

            const rotinasAtividades = await RotinaAtividade.findAll({
                where: { atividadeId },
                order: [
                    ['horaInicio', 'ASC']
                ],
                limit: limite,
                offset: parseInt(page)
            });
            
            return res.json(rotinasAtividades);
        } catch (error) {
            return res.json({msg: "Não foi possível buscar as rotinas da atividade: " + error.message});
        }
    },

    async findByAluno(req, res) {
        try {
            const { alunoId } = req.params;
            
            // Primeiro, buscar todas as atividades do aluno
            const atividades = await model.Atividade.findAll({
                where: { alunoId },
                attributes: ['id']
            });
            
            const atividadeIds = atividades.map(atv => atv.id);
            
            if (atividadeIds.length === 0) {
                return res.json([]);
            }
            
            // Buscar todas as rotinaatividades dessas atividades
            const rotinasAtividades = await RotinaAtividade.findAll({
                where: { 
                    atividadeId: atividadeIds 
                },
                order: [
                    ['horaInicio', 'ASC']
                ]
            });
            
            return res.json(rotinasAtividades);
        } catch (error) {
            console.error('Erro ao buscar rotinaatividades do aluno:', error);
            return res.json({msg: "Não foi possível buscar as rotinaatividades do aluno: " + error.message});
        }
    }
} 