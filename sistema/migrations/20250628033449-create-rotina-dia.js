"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("RotinaDia", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      diaSemana: {
        allowNull: false,
        type: Sequelize.INTEGER,
        validate: {
          notEmpty: {
            msg: "O campo diaSemana é obrigatório",
          },
        },
      },
      rotinaId: {
        type: Sequelize.INTEGER,
        references: {
          model: "Rotinas",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("RotinaDia");
  },
};
