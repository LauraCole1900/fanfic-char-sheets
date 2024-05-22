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
  mutation createChar($character: CreateCharacterInput!) {
    createChar(character: $character) {
      id
      userId
      firstName
      nickName
      middleName
      lastName
      suffix
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
      fandomId
    }
}
`;

export const UPDATE_CHARACTER = gql`
  mutation updateChar($id: ID!, $character: UpdateCharacterInput!) {
    updateChar(id: $id, character: $character) {
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
      fandomId
  }
}
`;