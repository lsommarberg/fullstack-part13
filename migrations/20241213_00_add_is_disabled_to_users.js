const { DataTypes } = require('sequelize');

module.exports = {
  up: async ({ context: queryInterface }) => {
    await queryInterface.addColumn('users', 'is_disabled', {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
      field: 'is_disabled',
    });
  },

  down: async ({ context: queryInterface }) => {
    await queryInterface.removeColumn('users', 'is_disabled');
  },
};
