'use strict';

module.exports = {
   up (queryInterface, Sequelize) {
    return queryInterface.addColumn('Courses', 'AdminId', { 
      type: Sequelize.INTEGER,
      references: {
        model: 'Admins',
        key: 'id'
      },
      onUpdate: 'cascade',
      onDelete: 'cascade'
    })
  },

   down (queryInterface, Sequelize) {
    return queryInterface.removeColumn('Courses', 'AdminId')
  }
};
