const { Sequelize } = require('sequelize');
const model = require('../models');

const RotinaDia = model.RotinaDia;

module.exports = {
    async create(req, res) {
        try {
            const { diaSemana, rotinaId } = req.body;
            console.log('Dados recebidos:', { diaSemana, rotinaId });
            
            const novaRotinaDia = await RotinaDia.create({ 
                diaSemana, 
                rotinaId 
            });
            return res.json({ msg: 'RotinaDia criada com sucesso', data: novaRotinaDia });
        } catch (error) {
            console.error('Erro completo:', error);
            return res.json({msg: "Não foi possível cadastrar a rotina/dia: " + error.message});
        }
    },

    async update(req, res) {
        try {
            const { id } = req.params;
            const { diaSemana, rotinaId } = req.body;
            const rotinaDiaAtualizada = await RotinaDia.update({ 
                diaSemana, 
                rotinaId 
            }, { where: { id } });
            return res.json({ msg: 'RotinaDia atualizada com sucesso' });
        } catch (error) {
            return res.json({msg: "Não foi possível atualizar a rotina/dia: " + error.message});
        }
    },

    async findAll(req, res) {
        try {
            const { page } = req.params;
            const limite = 10;

            const rotinasDias = await RotinaDia.findAll({
                    order: [
                        ['id', 'ASC']
                    ],
                    limit: limite,
                    offset: parseInt(page)
                }
            );
            return res.json(rotinasDias);
        } catch (error) {
            return res.json({msg: "Não foi possível buscar as rotinas/dias: " + error.message});
        }
    },

    async findById(req, res) {
        try {
            const { id } = req.params;
            const rotinaDia = await RotinaDia.findByPk(id);
            
            if (!rotinaDia) {
                return res.status(404).json({ msg: 'RotinaDia não encontrada' });
            }
            
            return res.json(rotinaDia);
        } catch (error) {
            return res.json({msg: "Não foi possível buscar a rotina/dia: " + error.message});
        }
    },

    async delete(req, res) {
        try {
            const { id } = req.params;
            const rotinaDia = await RotinaDia.findByPk(id);
            
            if (!rotinaDia) {
                return res.status(404).json({ msg: 'RotinaDia não encontrada' });
            }
            
            await rotinaDia.destroy();
            return res.json({ msg: 'RotinaDia deletada com sucesso' });
        } catch (error) {
            return res.json({msg: "Não foi possível deletar a rotina/dia: " + error.message});
        }
    },

    async findByRotina(req, res) {
        try {
            const { rotinaId } = req.params;
            const { page = 0 } = req.query;
            const limite = 10;

            const rotinasDias = await RotinaDia.findAll({
                where: { rotinaId },
                order: [
                    ['diaSemana', 'ASC']
                ],
                limit: limite,
                offset: parseInt(page)
            });
            
            return res.json(rotinasDias);
        } catch (error) {
            return res.json({msg: "Não foi possível buscar os dias da rotina: " + error.message});
        }
    },

    async findByDiaSemana(req, res) {
        try {
            const { diaSemana } = req.params;
            const { page = 0 } = req.query;
            const limite = 10;

            const rotinasDias = await RotinaDia.findAll({
                where: { diaSemana },
                order: [
                    ['id', 'ASC']
                ],
                limit: limite,
                offset: parseInt(page)
            });
            
            return res.json(rotinasDias);
        } catch (error) {
            return res.json({msg: "Não foi possível buscar as rotinas do dia: " + error.message});
        }
    }
} 