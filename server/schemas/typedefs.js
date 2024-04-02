const typeDefs = `#graphql

scalar Date

type Character {
  id: ID!
  firstName: String!
  middleName: String
  lastName: String!
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
  liveBirth: Boolean!
  miscarriage: Boolean!
  deathNotes: String,
  fandom: [String!]!
}
`;

export default typeDefs;