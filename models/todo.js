'use strict';
module.exports = (sequelize, DataTypes) => {
  const Todo = sequelize.define('Todo', {
    title: DataTypes.STRING,
    description: DataTypes.STRING,
    completed: DataTypes.BOOLEAN,
    date: DataTypes.DATE,
    userId: DataTypes.INTEGER,
  }, {});
  Todo.associate = function(models) {
    // associations can be defined here
    Todo.belongsTo(models.User,{
      as: 'users',
      foreignKey: 'userId',
      targetKey: 'id',
      onDelete: 'CASCADE',
    });
  };
  return Todo;
};