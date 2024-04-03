const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Fandom extends Model { }

Fandom.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    fandomName: {
      type: DataTypes.STRING,
      allowNull: false
    }
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'fandom'
  }
);

module.exports = Fandom;