import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { QUERY_ALL_FANDOMS } from "../../utils/gql";

const LandingPage = () => {
  const [fandoms, setFandoms] = useState([]);

  const { error, loading, data } = useQuery(QUERY_ALL_FANDOMS);

  useEffect(() => {
    if (data) {
      setFandoms(data.allFandoms);
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
        {fandoms.map(fandom => (
          <li key={fandom.id}><Link to={`/characters/${fandom.id}`}>{fandom.fandomName}</Link></li>
        ))}
      </ul>
    </>
  )
}

export default LandingPage;