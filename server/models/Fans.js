const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Fans extends Model { }

Fans.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    userId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'user',
        key: 'id',
        unique: false
      }
    },
    fandomId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'fandom',
        key: 'id',
        unique: false
      }
    }
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'fans'
  }
);

module.exports = Fans