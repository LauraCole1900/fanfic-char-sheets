const sequelize = require('../config/connection');
const { Character, Fandom, Fans, User } = require('../models');

const characterSeedData = require('./characterSeeds.json');
const fandomSeedData = require('./fandomSeeds.json');

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  try {
    const user = await User.create({
      email: process.env.EMAIL,
      password: process.env.USER_PASSWORD
    });

    const fandoms = await Fandom.bulkCreate(fandomSeedData);

    for (let i = 0; i < fandoms.length; i++) {
      await Fans.create({
        fandomId: fandoms[i].id,
        userId: user.id
      })
    }

    const characters = await Character.bulkCreate(characterSeedData);
  } catch (err) {
    console.error(err)
  }

  process.exit(0);
};

seedDatabase();