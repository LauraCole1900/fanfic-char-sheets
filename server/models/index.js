const Character = require('./Character');
const User = require('./User');

// User to character relationship

User.hasMany(Character, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE',
  onUpdate: 'CASCADE'
});

Character.hasOne(User, {
  foreignKey: 'user_id'
});



// Father to children relationship

Character.hasMany(Character, {
  foreignKey: 'father_id',
  as: 'Sired',
  sourceKey: 'id',
  onDelete: 'NO ACTION',
  onUpdate: 'NO ACTION'
});

Character.belongsTo(Character, {
  foreignKey: 'father_id',
  as: 'father',
  targetKey: 'id'
});



// Mother to children relationship

Character.hasMany(Character, {
  foreignKey: 'mother_id',
  as: 'Bore',
  sourceKey: 'id',
  onDelete: 'NO ACTION',
  onUpdate: 'NO ACTION'
});

Character.belongsTo(Character, {
  foreignKey: 'mother_id',
  as: 'mother',
  targetKey: 'id'
});



// Character to spouse relationship

Character.hasOne(Character, {
  foreignKey: 'spouse_id',
  as: 'Married',
  sourceKey: 'id',
  onDelete: 'NO ACTION',
  onUpdate: 'NO ACTION'
});

Character.belongsTo(Character, {
  foreignKey: 'spouse_id',
  as: 'spouse',
  targetKey: 'id'
});



module.exports = { Character, User };