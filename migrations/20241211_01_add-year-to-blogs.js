const { DataTypes } = require('sequelize');

module.exports = {
  up: async ({ context: queryInterface }) => {
    await queryInterface.addColumn('blogs', 'year', {
      type: DataTypes.INTEGER,
      validate: {
        min: {
          args: 1991,
          msg: 'Year must be between 1991 and 2024',
        },
        max: {
          args: 2024,
          msg: 'Year must be between 1991 and 2024',
        },
      },
    });
  },

  down: async ({ context: queryInterface }) => {
    await queryInterface.removeColumn('blogs', 'year');
  },
};
