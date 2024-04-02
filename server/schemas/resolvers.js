const { GraphQLError } = require('graphql');
const { Character, User } = require('../models/index.js');
const auth = require('../utils/auth.js');

const resolvers = {
  Query: {
    me: async (_, __, context) => {
      if (context.user) {
        const userData = await User.findOne({ _id: context.user._id }).select(
          '-__v -password'
        );

        return userData;
      }

      throw new GraphQLError("Not logged in", {
        extensions: { code: "FORBIDDEN" },
      });
    },
    allChars: async () => {
      return await Character.findAll({});
    },
    singleChar: async (_, args) => {
      return await Character.findByPk(args.id, {
        include: [{ model: Character }]
      })
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
    createChar: async (_, args) => {
      const character = await Character.create(args)
      return character;
    },
    updateChar: async (_, args) => {
      const updatedChar = Character.update(
        { ...args },
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
  }
};

module.exports = resolvers;