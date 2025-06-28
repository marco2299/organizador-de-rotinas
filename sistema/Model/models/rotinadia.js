'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class RotinaDia extends Model {
    static associate(models) {
      this.belongsTo(models.Rotina, { foreignKey: 'rotinaId' });
      this.hasOne(models.Disponibilidade, { foreignKey: 'rotinaDiaId' });
      this.hasMany(models.RotinaAtividade, { foreignKey: 'rotinaDiaId' });
    }
  }
  RotinaDia.init({
    diaSemana: DataTypes.INTEGER,
    rotinaId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'RotinaDia',
  });
  return RotinaDia;
};