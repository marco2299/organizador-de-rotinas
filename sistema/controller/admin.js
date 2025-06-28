const { Sequelize } = require('sequelize');
const model = require('../models');
const Admin = model.Admin;

module.exports = {
    async create(req, res) {
        try {
            const { nome, email, senha } = req.body;
            
            const novoAdmin = await Admin.create({ nome, email, senha });
            return res.json({ msg: 'Admin criado com sucesso', data: novoAdmin });
        } catch (error) {
            return res.json({msg: "Não foi possível cadastrar o admin: " + error.message});
        }
    },

    async update(req, res) {
        try {
            const { id } = req.params;
            const { nome, email, senha } = req.body;
            const adminAtualizado = await Admin.update({ nome, email, senha }, { where: { id } });
            return res.json({ msg: 'Admin atualizado com sucesso' });
        } catch (error) {
            return res.json({msg: "Não foi possível atualizar o admin: " + error.message});
        }
    },

    async findAll(req, res) {
        try {
            const { page } = req.params;
            const limite = 10;

            const admins = await Admin.findAll({
                    order: [
                        ['id', 'ASC']
                    ],
                    limit: limite,
                    offset: parseInt(page)
                }
            );
            return res.json(admins);
        } catch (error) {
            return res.json({msg: "Não foi possível buscar os admins: " + error.message});
        }
    }
}