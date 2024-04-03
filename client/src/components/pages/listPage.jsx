import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { QUERY_FANDOM_CHARS } from "../../utils/gql";

const ListPage = () => {
  const params = useParams();

  const [characters, setCharacters] = useState([]);

  const { error, loading, data } = useQuery(QUERY_FANDOM_CHARS, {
    variables: { fandomId: params.fandomId }
  });
  const chars = data?.allFandomChars || []
  console.log(chars)

  useEffect(() => {
    if (data) {
      setCharacters(data?.allFandomChars);
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