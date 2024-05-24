import { useEffect, useMemo, useState } from 'react';
import { Link, Navigate, useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { QUERY_ME, QUERY_FANDOM_CHARS } from "../../utils/gql";
import Auth from '../../utils/auth';

const ListPage = () => {
  const params = useParams();

  const [characters, setCharacters] = useState([]);

  const { error: meError, loading: meLoading, data: meData } = useQuery(QUERY_ME);
  const me = useMemo(() => { return meData?.me || meData?.currentId || {} }, [meData?.me, meData?.currentId]);

  const { error, loading, data } = useQuery(QUERY_FANDOM_CHARS, {
    variables: { fandomId: params.fandomId, userId: me?.id }
  });
  const chars = data?.allFandomChars || []

  useEffect(() => {
    if (data) {
      setCharacters(chars);
    }
  }, [data]);

  if (loading || meLoading) {
    return <h1>Loading....</h1>
  }

  if (error) {
    console.error('Fandom error', JSON.parse(JSON.stringify(error)));
  }
  if (meError) {
    console.error('me error', JSON.parse(JSON.stringify(meError)));
  }

  if (!Auth.loggedIn()) {
    return <Navigate to='/login' />
  }

  return (
    <>
      <ul className='namesList'>
        {characters.map(character => (
          <li key={character.id}><Link to={`/character/${character.fandomId}/${character.id}`}>{character.firstName} {character.lastName} {character.suffix}</Link></li>
        ))}
      </ul>
    </>
  )
};

export default ListPage;