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

export const QUERY_MEN = gql`
  query getMen {
    getMen(gender: "male") {
      id
      firstName
      nickName
      lastName
      liveBirth
    }
  }
`;

export const QUERY_WOMEN = gql`
  query getWomen {
    getWomen(gender: "female") {
      id
      firstName
      nickName
      lastName
      liveBirth
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
    fandomId
  }
}
`;