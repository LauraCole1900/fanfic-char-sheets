const { GraphQLError } = require('graphql');
const dayjs = require('dayjs');
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
      console.log(args)
      const characters = await Character.findAll({
        where: { fandom_id: args.fandomId }
      });
      console.log(characters);
      return characters
    },
    allFandoms: async () => {
      return await Fandom.findAll({});
    },
    getMen: async (_, args) => {
      return await Character.findAll({
        where: { gender: args.gender, liveBirth: true }
      });
    },
    getSpouses: async (_, args) => {
      return await Character.findAll({
        where: { liveBirth: true }
      });
    },
    getWomen: async (_, args) => {
      return await Character.findAll({
        where: { gender: args.gender, liveBirth: true }
      })
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
      console.log({ args });
      const birthday = dayjs(args.birthDate);
      const weddingday = dayjs(args.marriageDate);
      const deathday = dayjs(args.deathDate);
      const character = await Character.create({ ...args, birthDate: birthday, marriageDate: weddingday, deathDate: deathday, userId: context.user.id })
      return character;
    },
    updateChar: async (_, args) => {
      console.log({ args })
      const birthday = dayjs(args.birthDate);
      const weddingday = dayjs(args.marriageDate);
      const deathday = dayjs(args.deathDate);
      const updatedChar = Character.update(
        { ...args.character, birthDate: birthday, marriageDate: weddingday, deathDate: deathday },
        {
          where: {
            id: args.id
          }
        });
      return updatedChar;
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
        }
      });
    },
    herKids: async (character, _) => {
      return Character.findAll({
        where: {
          motherId: character.id
        }
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