const Character = require('./Character');
const Fandom = require('./Fandom');
const Fans = require('./Fans');
const User = require('./User');


// User to fandom relationship

User.belongsToMany(Fandom, {
  through: {
    model: Fans,
    unique: false
  },
  as: 'favorite_fandoms',
});

Fandom.belongsToMany(User, {
  through: {
    model: Fans,
    unique: false
  },
  as: 'fandom_fans'
});


// User to character relationship

User.hasMany(Character, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE',
  onUpdate: 'CASCADE'
});

Character.hasOne(User, {
  foreignKey: 'user_id'
});


// Fandom to character relationship

Fandom.hasMany(Character, {
  foreignKey: 'fandom_id',
  onDelete: 'CASCADE',
  onUpdate: 'CASCADE'
});

Character.belongsTo(Fandom, {
  foreignKey: 'fandom_id'
})



// Father to children relationship

Character.hasMany(Character, {
  foreignKey: 'fatherId',
  as: 'hisKids',
  sourceKey: 'id',
  onDelete: 'NO ACTION',
  onUpdate: 'NO ACTION'
});

Character.belongsTo(Character, {
  foreignKey: 'fatherId',
  as: 'father',
  targetKey: 'id'
});


// Mother to children relationship

Character.hasMany(Character, {
  foreignKey: 'motherId',
  as: 'herKids',
  sourceKey: 'id',
  onDelete: 'NO ACTION',
  onUpdate: 'NO ACTION'
});

Character.belongsTo(Character, {
  foreignKey: 'motherId',
  as: 'mother',
  targetKey: 'id'
});


// Character to spouse relationship

Character.hasOne(Character, {
  foreignKey: 'spouseId',
  as: 'Married',
  sourceKey: 'id',
  onDelete: 'NO ACTION',
  onUpdate: 'NO ACTION'
});

Character.belongsTo(Character, {
  foreignKey: 'spouseId',
  as: 'spouse',
  targetKey: 'id'
});



module.exports = { Character, Fandom, Fans, User };