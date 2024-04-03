const typeDefs = `#graphql

input CharacterInput {
  userId: ID!
  firstName: String!
  nickName: String
  middleName: String
  lastName: String!
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
  fandom: [String!]!
}

type Character {
  id: ID!
  userId: ID!
  firstName: String!
  nickName: String
  middleName: String
  lastName: String!
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
  fandom: [String!]!
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

type Query {
  me: User
  allChars: [Character]
  getMen(gender: String): [Character]
  getWomen(gender: String): [Character]
  singleChar(id: ID!): Character
}

type Mutation {
  login(email: String!, password: String!): Auth
  createChar(firstName: String!, nickName: String, middleName: String, lastName: String!, gender: String!, race: String!, birthDate: String!, marriedDate: String, deathDate: String, birthLoc: String!, marriedLoc: String, deathLoc: String, fatherId: ID, motherId: ID, spouseId: ID, milBranch: String, occupation: String, liveBirth: Boolean!, miscarriage: Boolean!, lifeNotes: String, deathNotes: String, fandom: [String!]!): Character
  updateChar(id: ID! input: CharacterInput!): Character
  deleteChar(id: ID!): Character
}
`;

module.exports = typeDefs;