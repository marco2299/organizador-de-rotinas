'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Disponibilidade extends Model {
    static associate(models) {
      this.belongsTo(models.RotinaDia, { foreignKey: 'rotinaDiaId' });
    }
  }
  Disponibilidade.init({
    horaInicio: DataTypes.TIME,
    horaFim: DataTypes.TIME,
    rotinaDiaId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Disponibilidade',
  });
  return Disponibilidade;
};