const sequelize = require('../config/connection');
const { Character, User } = require('../models');

const characterSeedData = require('./characterSeeds.json');

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  const user = await User.create({
    email: process.env.EMAIL,
    password: process.env.USER_PASSWORD
  });

  const characters = await Character.bulkCreate(characterSeedData);
  
  process.exit(0);
};

seedDatabase();