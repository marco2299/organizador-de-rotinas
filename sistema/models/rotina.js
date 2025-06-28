'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Rotina extends Model {
    static associate(models) {
      this.belongsTo(models.Aluno, { foreignKey: 'alunoId' });
      this.hasMany(models.RotinaDia, { foreignKey: 'rotinaId' });
    }
  }
  Rotina.init({
    nome: DataTypes.STRING,
    descricao: DataTypes.TEXT,
    alunoId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Rotina',
  });
  return Rotina;
};