'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    
      return queryInterface.bulkInsert('Todos', [{
        title: "Morning Calls",
        description: "Go to the gym",
        completed: false,
        userId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: "Leisure time",
        description: "Play call of duty",
        completed: false,
        userId: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: "Chores",
        description: "Clean up the house",
        completed: false,
        userId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      }], {});
    
  },

  down: (queryInterface, Sequelize) => {
   
    return queryInterface.bulkDelete('Todos', null, {});
  }
};
