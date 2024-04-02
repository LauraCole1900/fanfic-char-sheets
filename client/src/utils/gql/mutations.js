import { gql } from '@apollo/client';

export const LOG_ME_IN = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        id
        email
    }
  }
}`

export const CREATE_CHARACTER = gql`
  mutation createChar(
    $firstName: String!
    $nickName: String
    $middleName: String
    $lastName: String!
    $gender: String!
    $race: String!
    $birthDate: Date!
    $marriedDate: Date
    $deathDate: Date
    $birthLoc: String!
    $marriedLoc: String
    $deathLoc: String
    $fatherId: ID
    $motherId: ID
    $spouseId: ID
    $milBranch: String
    $occupation: String
    $liveBirth: Boolean!
    $miscarriage: Boolean!
    $lifeNotes: String
    $deathNotes: String
    $fandom: [String!]!
  ) {
    createChar(
      firstName: $firstName
      nickName: $nickName
      middleName: $middleName
      lastName: $lastName
      gender: $gender
      race: $race
      birthDate: $birthDate
      marriedDate: $marriedDate
      deathDate: $deathDate
      birthLoc: $birthLoc
      marriedLoc: $marriedLoc
      deathLoc: $deathLoc
      fatherId: $fatherId
      motherId: $motherId
      spouseId: $spouseId
      milBranch: $milBranch
      occupation: $occupation
      liveBirth: $liveBirth
      miscarriage: $miscarriage
      lifeNotes: $lifeNotes
      deathNotes: $deathNotes
      fandom: $fandom
    ) {
      id
      userId
      firstName
      nickName
      middleName
      lastName
      gender
      race
      birthDate
      marriedDate
      deathDate
      birthLoc
      marriedLoc
      deathLoc
      fatherId
      motherId
      spouseId
      milBranch
      occupation
      liveBirth
      miscarriage
      lifeNotes
      deathNotes
      fandom
    }

}`