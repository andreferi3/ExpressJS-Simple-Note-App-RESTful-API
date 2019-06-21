'use strict';
module.exports = (sequelize, DataTypes) => {
  const notes = sequelize.define('notes', {
    title: DataTypes.STRING
  }, {});
  notes.associate = function(models) {
    // associations can be defined here
    notes.belongsTo(models.category, {foreignKey: 'categoryId'});
  };
  return notes;
};