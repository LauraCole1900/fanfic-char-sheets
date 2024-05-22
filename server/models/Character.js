const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Character extends Model { }

Character.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'user',
        key: 'id'
      }
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    nickName: {
      type: DataTypes.STRING
    },
    middleName: {
      type: DataTypes.STRING
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    suffix: {
      type: DataTypes.STRING
    },
    gender: {
      type: DataTypes.STRING,
      allowNull: false
    },
    race: {
      type: DataTypes.STRING,
      allowNull: false
    },
    birthDate: {
      type: DataTypes.DATEONLY,
      allowNull: false
    },
    marriedDate: {
      type: DataTypes.DATEONLY
    },
    deathDate: {
      type: DataTypes.DATEONLY
    },
    birthLoc: {
      type: DataTypes.STRING,
      allowNull: false
    },
    marriedLoc: {
      type: DataTypes.STRING
    },
    deathLoc: {
      type: DataTypes.STRING
    },
    fatherId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'character',
        key: 'id'
      }
    },
    motherId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'character',
        key: 'id'
      }
    },
    spouseId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'character',
        key: 'id'
      }
    },
    milBranch: {
      type: DataTypes.STRING
    },
    occupation: {
      type: DataTypes.STRING
    },
    liveBirth: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    },
    miscarriage: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    },
    lifeNotes: {
      type: DataTypes.TEXT
    },
    deathNotes: {
      type: DataTypes.STRING,
    },
    fandomId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'fandom',
        key: 'id'
      }
    }
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'character'
  }
);

module.exports = Character;