import { gql } from "@apollo/client";

export const QUERY_ME = gql`
  query me {
    me {
      id
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
    suffix
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
    fandomId
  }
}
`;

export const QUERY_FANDOM_CHARS = gql`
query allFandomChars($fandomId: ID!) {
  allFandomChars(fandomId: $fandomId) {
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
    fandomId
  }
}
`;

export const QUERY_ALL_FANDOMS = gql`
  query allFandoms {
    allFandoms {
      id
      fandomName
    }
  }
`;

export const QUERY_PARENTS = gql`
  query getParents($gender: String!) {
    getParents(gender: $gender) {
      id
      firstName
      nickName
      lastName
      suffix
      liveBirth
    }
  }
`;

export const QUERY_FULL_SIBS = gql`
  query getFullSiblings($charId: ID!) {
    getFullSiblings(id: $charId) {
      id
      firstName
      nickName
      lastName
      suffix
      fandomId
      liveBirth
      miscarriage
    }
  }
`;

export const QUERY_HALF_SIBS = gql`
query getHalfSiblings($charId: ID!) {
    getHalfSiblings(id: $charId) {
      id
      firstName
      nickName
      lastName
      suffix
      fandomId
      liveBirth
      miscarriage
    }
  }
`;

export const QUERY_SPOUSES = gql`
  query getSpouses {
    getSpouses {
      id
      firstName
      nickName
      lastName
      suffix
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
    suffix
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
      suffix
    }
    fatherId
    mother {
      id
      firstName
      middleName
      lastName
      suffix
    }
    motherId
    spouse {
      id
      firstName
      middleName
      lastName
      birthDate
      suffix
    }
    spouseId
    hisKids {
      id
      firstName
      middleName
      suffix
      liveBirth
      miscarriage
    }
    herKids {
      id
      firstName
      middleName
      suffix
      liveBirth
      miscarriage
    }
    Married {
      id
      firstName
      middleName
      lastName
      suffix
    }
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