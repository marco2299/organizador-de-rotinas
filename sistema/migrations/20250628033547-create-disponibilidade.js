'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Disponibilidades', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      horaInicio: {
        allowNull: false,
        type: Sequelize.TIME,
        validate: {
          notEmpty: {
            msg: "O campo horaInicio é obrigatório"
          }
        }
      },
      horaFim: {
        allowNull: false,
        type: Sequelize.TIME,
        validate: {
          notEmpty: {
            msg: "O campo horaFim é obrigatório"
          }
        }
      },
      rotinaDiaId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        validate: {
          notEmpty: {
            msg: "O campo rotinaDiaId é obrigatório"
          }
        },
        references: {
          model: 'RotinaDias',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Disponibilidades');
  }
};