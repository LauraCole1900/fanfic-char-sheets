const { GraphQLError } = require('graphql');
const { Op } = require('@sequelize/core');
const { Character, Fandom, Fans, User } = require('../models/index.js');
const auth = require('../utils/auth.js');

const resolvers = {
  Query: {
    me: async (_, __, context) => {
      if (context.user) {
        const userData = await User.findOne({
          where: { id: context.user.id }
        },
          {
            attributes: { exclude: ['password'] }
          });

        return userData;
      }

      throw new GraphQLError("Not logged in", {
        extensions: { code: "FORBIDDEN" },
      });
    },
    allChars: async () => {
      return await Character.findAll({});
    },
    allFandomChars: async (_, args) => {
      const characters = await Character.findAll({
        where: {
          fandom_id: args.fandomId,
          liveBirth: true
        },
        order: [['lastName', 'ASC'], ['birthDate', 'ASC']]
      });
      return characters
    },
    allFandoms: async () => {
      return await Fandom.findAll({});
    },
    getParents: async (_, args) => {
      return await Character.findAll({
        where: { gender: args.gender, liveBirth: true },
        order: [['lastName', 'ASC'], ['firstName', 'ASC']]
      });
    },
    getFullSiblings: async (_, args) => {
      const currChar = await Character.findOne({
        where: { id: args.id }
      });
      const siblings = await Character.findAll({
        where: {
          fatherId: currChar.fatherId,
          fatherId: { [Op.ne]: null },
          motherId: currChar.motherId,
          liveBirth: true,
          [Op.not]: {
            id: currChar.id,
          }
        },
        order: [['birthDate', 'ASC']]
      });
      return siblings;
    },
    getHalfSiblings: async (_, args) => {
      const currChar = await Character.findOne({
        where: { id: args.id }
      });
      const dadSibs = await Character.findAll({
        where: {
          fatherId: currChar.fatherId,
          liveBirth: true,
          [Op.not]: {
            motherId: currChar.motherId
          }
        },
        order: [['birthDate', 'ASC']]
      });
      const momSibs = await Character.findAll({
        where: {
          motherId: currChar.motherId,
          liveBirth: true,
          [Op.not]: {
            fatherId: currChar.fatherId
          }
        },
        order: [['birthDate', 'ASC']]
      });
      const halfSibs = dadSibs.concat(momSibs);
      return halfSibs;
    },
    getSpouses: async () => {
      return await Character.findAll({
        where: { liveBirth: true },
        order: [['lastName', 'ASC'], ['firstName', 'ASC']]
      });
    },
    singleChar: async (_, args) => {
      const character = await Character.findOne({
        where: {
          id: args.id
        }
      }, {
        include: [{ model: Character, as: 'father', required: true }, { model: Character, as: 'mother', required: true }, { model: Character, as: 'spouse', required: true }, { model: Fandom }]
      });
      return character;
    }
  },

  Mutation: {
    login: async (_, args) => {
      const user = await User.findOne({ email: args.email });

      if (!user) {
        throw new GraphQLError("Incorrect credentials", {
          extensions: { code: "FORBIDDEN" },
        });
      }

      const correctPw = await user.checkPassword(args.password);

      if (!correctPw) {
        throw new GraphQLError("Incorrect credentials", {
          extensions: { code: "FORBIDDEN" },
        });
      }

      const token = auth.signToken(user);
      return { token, user };
    },
    createChar: async (_, args, context) => {
      const character = await Character.create({ ...args.character });
      return character;
    },
    updateChar: async (_, args) => {
      const updatedChar = await Character.update(
        { ...args.character },
        {
          where: {
            id: args.id
          },
          returning: true
        });
      const charUpdate = { ...updatedChar[1][0].dataValues, userId: updatedChar[1][0].dataValues.user_id, fandomId: updatedChar[1][0].dataValues.fandom_id }
      return charUpdate;
    },
    deleteChar: async (_, args) => {
      const deletedChar = Character.destroy({ where: { id: args.id } });
      return deletedChar;
    }
  },

  Character: {
    father: async (character, _) => {
      return Character.findByPk(character.fatherId);
    },
    mother: async (character, _) => {
      return Character.findByPk(character.motherId);
    },
    hisKids: async (character, _) => {
      return Character.findAll({
        where: {
          fatherId: character.id
        },
        order: [['birthDate', 'ASC']]
      });
    },
    herKids: async (character, _) => {
      return Character.findAll({
        where: {
          motherId: character.id
        },
        order: [['birthDate', 'ASC']]
      });
    },
    spouse: async (character, _) => {
      return Character.findByPk(character.spouseId);
    },
    Married: async (character, _) => {
      return Character.findByPk(character.spouseId);
    }
  }
};

module.exports = resolvers;