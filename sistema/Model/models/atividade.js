'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Atividade extends Model {
    static associate(models) {
      this.belongsTo(models.RotinaDia, { foreignKey: 'rotinaDiaId' });
      this.belongsTo(models.Aluno, { foreignKey: 'alunoId' });
    }
  }
  Atividade.init({
    nome: DataTypes.STRING,
    descricao: DataTypes.TEXT,
    duracao: DataTypes.INTEGER,
    peso: DataTypes.INTEGER,
    rotinaDiaId: DataTypes.INTEGER,
    alunoId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Atividade',
  });
  return Atividade;
};