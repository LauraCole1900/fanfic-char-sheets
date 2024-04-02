import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { QUERY_ALL_CHARS } from "../../utils/gql";

const ListPage = () => {
  const [characters, setCharacters] = useState([]);

  const { error, loading, data } = useQuery(QUERY_ALL_CHARS);

  useEffect(() => {
    if (data) {
      setCharacters(data.allChars);
    }
  }, [data]);

  if (loading) {
    return <h1>Loading....</h1>
  }

  if (error) {
    console.error(JSON.parse(JSON.stringify(error)));
  }

  return (
    <>
      <ul className='namesList'>
        {characters.map(character => (
          <li key={character.id}><Link to={`/character/${character.id}`}>{character.firstName} {character.lastName}</Link></li>
        ))}
      </ul>
    </>
  )
};

export default ListPage;