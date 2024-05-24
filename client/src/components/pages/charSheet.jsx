import { Link, Navigate, useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { Container, Col, Row } from 'react-bootstrap';
import { QUERY_FULL_SIBS, QUERY_HALF_SIBS, QUERY_SINGLE_CHAR } from '../../utils/gql';
import Auth from '../../utils/auth';
import './style.css';

const CharSheet = () => {
  const params = useParams();

  const { loading, data, error } = useQuery(QUERY_SINGLE_CHAR, {
    variables: { charId: params.charId }
  });

  const { loading: sibsLoading, data: sibsData, error: sibsError } = useQuery(QUERY_FULL_SIBS, {
    variables: { charId: params.charId }
  });

  const { loading: halfLoading, data: halfData, error: halfError } = useQuery(QUERY_HALF_SIBS, {
    variables: { charId: params.charId }
  });

  const char = data?.singleChar || {};
  const fullSibs = sibsData?.getFullSiblings || [];
  const halfSibs = halfData?.getHalfSiblings || [];

  const hisKids = char?.hisKids;
  const herKids = char?.herKids;

  if (loading || sibsLoading || halfLoading) {
    return <h1>Loading....</h1>
  }

  if (error || sibsError || halfError) {
    console.error(JSON.parse(JSON.stringify(error)));
    return <h1>Character not found!</h1>
  }

  if (!Auth.loggedIn()) {
    return <Navigate to='/login' />
  }

  return (
    <>
      <Container fluid>
        <Row>
          <Col>
            <h1>{char.firstName} {char.middleName} {char.lastName} {char.suffix}</h1>
          </Col>
        </Row>
        <Row>
          <Col>
            <p><span className='bold'>Goes by:</span> {char.nickName}</p>
            <p><span className='bold'>Birth:</span> {char.birthDate}, {char.birthLoc}</p>
            {char.father && char.mother &&
              <p><span className='bold'>Parents:</span> <Link to={`/character/${char.fandomId}/${char.father.id}`}>{char.father.firstName} {char.father.lastName}</Link> and <Link to={`/character/${char.fandomId}/${char.mother.id}`}>{char.mother.firstName} {char.mother.lastName}</Link></p>}
            {char.marriedDate &&
              <p><span className='bold'>Married:</span> {char.marriedDate} to <Link to={`/character/${char.fandomId}/${char.spouse.id}`}>{char.spouse?.firstName} {char.spouse?.lastName}</Link></p>
            }
            {char.deathDate &&
              <p><span className='bold'>Died:</span> {char.deathDate}</p>
            }
            <p><span className='bold'>Life notes:</span> {char.lifeNotes}</p>
            <p><span className='bold'>Death notes:</span> {char.deathNotes}</p>
            {fullSibs.length > 0 &&
              <>
                <p className='bold'>Full siblings:</p>
                <ul>
                  {fullSibs.map(sib => <li key={sib.id}><Link to={`/character/${sib.fandomId}/${sib.id}`}>{sib.nickName}</Link></li>)}
                </ul>
              </>}
            {halfSibs.length > 0 &&
              <>
                <p className='bold'>Half siblings:</p>
                <ul>
                  {halfSibs.map(sib => <li key={sib.id}><Link to={`/character/${sib.fandomId}/${sib.id}`}>{sib.nickName} {sib.lastName}</Link></li>)}
                </ul>
              </>}
            {hisKids.length > 0 &&
              <>
                <p className='bold'>Children:</p>
                <ul>
                  {hisKids.map(kid => {
                    return kid.liveBirth
                      ? <li key={kid.id}><Link to={`/character/${kid.fandomId}/${kid.id}`}>{kid.firstName} {kid.middleName} {kid.suffix}</Link></li>
                      : <li key={kid.id}>{kid.firstName} {kid.middleName} {kid.suffix} {kid.miscarriage ? (<span>(miscarried)</span>) : (<span>(stillborn)</span>)}</li>
                  })}
                </ul>
              </>}
            {herKids.length > 0 &&
              <>
                <p className='bold'>Children:</p>
                <ul>
                {herKids.map(kid => {
                  return kid.liveBirth
                    ? <li key={kid.id}><Link to={`/character/${kid.fandomId}/${kid.id}`}>{kid.firstName} {kid.middleName} {kid.suffix}</Link></li>
                    : <li key={kid.id}>{kid.firstName} {kid.middleName} {kid.suffix} {kid.miscarriage ? (<span>(miscarried)</span>) : (<span>(stillborn)</span>)}</li>
                })}
                </ul>
              </>}
          </Col>
        </Row>
      </Container>

    </>
  )
}

export default CharSheet;