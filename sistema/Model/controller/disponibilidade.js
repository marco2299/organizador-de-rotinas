const { Sequelize } = require('sequelize');
const model = require('../models');

const Disponibilidade = model.Disponibilidade;

module.exports = {
    async create(req, res) {
        try {
            const { horaInicio, horaFim, rotinaDiaId } = req.body;
            console.log('Dados recebidos:', { horaInicio, horaFim, rotinaDiaId });
            
            const novaDisponibilidade = await Disponibilidade.create({ 
                horaInicio, 
                horaFim, 
                rotinaDiaId 
            });
            return res.json({ msg: 'Disponibilidade criada com sucesso', data: novaDisponibilidade });
        } catch (error) {
            console.error('Erro completo:', error);
            return res.json({msg: "Não foi possível cadastrar a disponibilidade: " + error.message});
        }
    },

    async update(req, res) {
        try {
            const { id } = req.params;
            const { horaInicio, horaFim, rotinaDiaId } = req.body;
            const disponibilidadeAtualizada = await Disponibilidade.update({ 
                horaInicio, 
                horaFim, 
                rotinaDiaId 
            }, { where: { id } });
            return res.json({ msg: 'Disponibilidade atualizada com sucesso' });
        } catch (error) {
            return res.json({msg: "Não foi possível atualizar a disponibilidade: " + error.message});
        }
    },

    async findAll(req, res) {
        try {
            const { page } = req.params;
            const limite = 10;

            const disponibilidades = await Disponibilidade.findAll({
                    order: [
                        ['id', 'ASC']
                    ],
                    limit: limite,
                    offset: parseInt(page)
                }
            );
            return res.json(disponibilidades);
        } catch (error) {
            return res.json({msg: "Não foi possível buscar as disponibilidades: " + error.message});
        }
    },

    async findById(req, res) {
        try {
            const { id } = req.params;
            const disponibilidade = await Disponibilidade.findByPk(id);
            
            if (!disponibilidade) {
                return res.status(404).json({ msg: 'Disponibilidade não encontrada' });
            }
            
            return res.json(disponibilidade);
        } catch (error) {
            return res.json({msg: "Não foi possível buscar a disponibilidade: " + error.message});
        }
    },

    async delete(req, res) {
        try {
            const { id } = req.params;
            const disponibilidade = await Disponibilidade.findByPk(id);
            
            if (!disponibilidade) {
                return res.status(404).json({ msg: 'Disponibilidade não encontrada' });
            }
            
            await disponibilidade.destroy();
            return res.json({ msg: 'Disponibilidade deletada com sucesso' });
        } catch (error) {
            return res.json({msg: "Não foi possível deletar a disponibilidade: " + error.message});
        }
    },

    async findByRotinaDia(req, res) {
        try {
            const { rotinaDiaId } = req.params;
            const disponibilidade = await Disponibilidade.findOne({
                where: { rotinaDiaId }
            });
            
            if (!disponibilidade) {
                return res.status(404).json({ msg: 'Disponibilidade não encontrada para esta rotina/dia' });
            }
            
            return res.json(disponibilidade);
        } catch (error) {
            return res.json({msg: "Não foi possível buscar a disponibilidade da rotina: " + error.message});
        }
    }
} 