const typeDefs = `#graphql

scalar Date

input CharacterInput {
  userId: ID!
  firstName: String!
  nickName: String
  middleName: String
  lastName: String!
  gender: String!
  race: String!
  birthDate: Date!
  marriedDate: Date
  deathDate: Date
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
  birthDate: Date!
  marriedDate: Date
  deathDate: Date
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
  singleChar(id: ID!): Character
}

type Mutation {
  login(email: String!, password: String!): Auth
  createChar(input: CharInput!): Character
  updateChar(id: ID! input: CharInput!): Character
  deleteChar(id: ID!): Character
}
`;

module.exports = typeDefs;