'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class RotinaAtividade extends Model {
    static associate(models) {
      this.belongsTo(models.RotinaDia, { foreignKey: 'rotinaDiaId' });
      this.belongsTo(models.Atividade, { foreignKey: 'atividadeId' });
      
    }
  }
  RotinaAtividade.init({
    horaInicio: DataTypes.TIME,
    horaFim: DataTypes.TIME,
    rotinaDiaId: DataTypes.INTEGER,
    atividadeId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'RotinaAtividade',
  });
  return RotinaAtividade;
};