const typeDefs = `#graphql

type Fandom {
  id: ID!
  fandomName: String!
}

type Character {
  id: ID!
  userId: ID!
  firstName: String!
  nickName: String
  middleName: String
  lastName: String!
  suffix: String
  gender: String!
  race: String!
  birthDate: String!
  marriedDate: String
  deathDate: String
  birthLoc: String!
  marriedLoc: String
  deathLoc: String
  fatherId: ID
  motherId: ID
  spouseId: ID
  milBranch: String
  occupation: String
  liveBirth: Boolean!
  miscarriage: Boolean!
  lifeNotes: String
  deathNotes: String
  fandomId: ID!
  father: Character
  mother: Character
  spouse: Character
  hisKids: [Character]
  herKids: [Character]
  Married: Character
}

type User {
  id: ID!
  email: String!
  password: String!
}

type Auth {
  token: ID!
  user: User
}

input CreateCharacterInput {
  id: ID
  userId: ID
  firstName: String
  nickName: String
  middleName: String
  lastName: String
  suffix: String
  gender: String
  race: String
  birthDate: String
  marriedDate: String
  deathDate: String
  birthLoc: String
  marriedLoc: String
  deathLoc: String
  fatherId: ID
  motherId: ID
  spouseId: ID
  milBranch: String
  occupation: String
  liveBirth: Boolean
  miscarriage: Boolean
  lifeNotes: String
  deathNotes: String
  fandomId: ID
  father: CreateCharacterInput
  mother: CreateCharacterInput
  spouse: CreateCharacterInput
  hisKids: [CreateCharacterInput]
  herKids: [CreateCharacterInput]
  Married: CreateCharacterInput
}

input UpdateCharacterInput {
  id: ID!
  userId: ID
  firstName: String
  nickName: String
  middleName: String
  lastName: String
  suffix: String
  gender: String
  race: String
  birthDate: String
  marriedDate: String
  deathDate: String
  birthLoc: String
  marriedLoc: String
  deathLoc: String
  fatherId: ID
  motherId: ID
  spouseId: ID
  milBranch: String
  occupation: String
  liveBirth: Boolean
  miscarriage: Boolean
  lifeNotes: String
  deathNotes: String
  fandomId: ID
  father: UpdateCharacterInput
  mother: UpdateCharacterInput
  spouse: UpdateCharacterInput
  hisKids: [UpdateCharacterInput]
  herKids: [UpdateCharacterInput]
  Married: UpdateCharacterInput
}

type Query {
  me: User
  allChars: [Character]
  allFandomChars(fandomId: ID!): [Character]
  allFandoms: [Fandom]
  getParents(gender: String!): [Character]
  getFullSiblings(id: ID!): [Character]
  getHalfSiblings(id: ID!): [Character]
  getSpouses: [Character]
  singleChar(id: ID!): Character
}

type Mutation {
  login(email: String!, password: String!): Auth
  createChar(character: CreateCharacterInput!): Character
  updateChar(id: ID!, character: UpdateCharacterInput!): Character
  deleteChar(id: ID!): Character
}
`;

module.exports = typeDefs;