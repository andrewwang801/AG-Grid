'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Products', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      remaining_quantity: {
        type: Sequelize.STRING
      },
      title: {
        type: Sequelize.STRING
      },
      mrp: {
        type: Sequelize.STRING
      },
      selling_price: {
        type: Sequelize.STRING
      },
      delivery_fee: {
        type: Sequelize.STRING
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Products');
  }
};