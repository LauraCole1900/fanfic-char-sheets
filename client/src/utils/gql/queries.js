import { gql } from "@apollo/client";

export const QUERY_ME = gql`
  query me {
    me {
      _id
      email
    }
  }
`;

export const QUERY_ALL_CHARS = gql`
query allChars {
  allChars{
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
    father {
      id
      firstName
      lastName
    }
    mother {
      id
      firstName
      lastName
    }
    spouse {
      id
      firstName
      lastName
    }
    milBranch
    occupation
    liveBirth
    miscarriage
    lifeNotes
    deathNotes
    fandom
  }
}
`;

export const QUERY_SINGLE_CHAR = gql`
query singleChar($charId: ID!) {
  singleChar(id: $charId) {
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
    father {
      id
      firstName
      middleName
      lastName
    }
    mother {
      id
      firstName
      middleName
      lastName
    }
    spouse {
      id
      firstName
      middleName
      lastName
      birthDate
    }
    hisKids {
      id
      firstName
      middleName
      liveBirth
      miscarriage
    }
    herKids {
      id
      firstName
      middleName
      liveBirth
      miscarriage
    }
    Married {
      id
      firstName
      middleName
      lastName
    }
    milBranch
    occupation
    liveBirth
    miscarriage
    lifeNotes
    deathNotes
    fandom
  }
}
`;