import { useEffect, useMemo, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { QUERY_ME, QUERY_FANDOM_CHARS } from "../../utils/gql";

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

  if (error || meError) {
    console.error(JSON.parse(JSON.stringify(error)));
  }

  return (
    <>
      {me &&
        <ul className='namesList'>
          {characters.map(character => (
            <li key={character.id}><Link to={`/character/${character.fandomId}/${character.id}`}>{character.firstName} {character.lastName} {character.suffix}</Link></li>
          ))}
        </ul>}
    </>
  )
};

export default ListPage;