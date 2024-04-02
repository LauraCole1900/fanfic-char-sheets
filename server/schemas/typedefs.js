const typeDefs = `#graphql

scalar Date

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
`;

export default typeDefs;