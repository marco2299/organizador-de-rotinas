'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Aluno extends Model {
    static associate(models) {
      this.hasMany(models.Rotina, { foreignKey: 'alunoId' });
      this.hasMany(models.Atividade, { foreignKey: 'alunoId' });
    }
  }
  Aluno.init({
    nome: DataTypes.STRING,
    email: DataTypes.STRING,
    senha: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Aluno',
  });
  return Aluno;
};