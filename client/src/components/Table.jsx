import { useEffect, useState } from 'react';
import { useQuery } from '@apollo/client';
import { QUERY_ALL_CHARS } from "../utils/gql";
import { findAge } from "../utils/helpers";

const Table = () => {
  const [characters, setCharacters] = useState([]);

  const { loading, data } = useQuery(QUERY_ALL_CHARS);

  useEffect(() => {
    if (data) {
      setCharacters(data.allChars);
    }
  }, [data]);

  if (loading) {
    return <h1>Loading....</h1>
  }

  return (
    <>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Birthdate</th>
            <th>Death date</th>
            <th>Age at death</th>
            <th>Service branch</th>
            <th>Occupation</th>
          </tr>
        </thead>
        <tbody>
          {characters.map(character => (
            <tr key={character.id}>
              <td>{character.firstName} {character.lastName}</td>
              <td>{character.birthDate}</td>
              <td>{character.deathDate}</td>
              {character.deathDate
                ? <td>{findAge(character.birthDate, character.deathDate)}</td>
                : <td>-</td>}
              <td>{character.milBranch}</td>
              <td>{character.occupation}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  )
};

export default Table;