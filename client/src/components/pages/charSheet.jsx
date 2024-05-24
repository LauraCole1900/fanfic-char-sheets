import { Link, useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { Container, Col, Row } from 'react-bootstrap';
import { QUERY_FULL_SIBS, QUERY_SINGLE_CHAR } from '../../utils/gql';
import './style.css';

const CharSheet = () => {
  const params = useParams();

  const { loading, data, error } = useQuery(QUERY_SINGLE_CHAR, {
    variables: { charId: params.charId }
  });

  const { loading: sibsLoading, data: sibsData, error: sibsError } = useQuery(QUERY_FULL_SIBS, {
    variables: { charId: params.charId }
  });

  const char = data?.singleChar || {};
  const fullSibs = sibsData?.getFullSiblings || [];
  console.log({ fullSibs });

  const hisKids = char?.hisKids?.filter(kid => !kid.miscarriage && kid.liveBirth);
  const herKids = char?.herKids?.filter(kid => !kid.miscarriage && kid.liveBirth);

  if (loading || sibsLoading) {
    return <h1>Loading....</h1>
  }

  if (error || sibsError) {
    console.error(JSON.parse(JSON.stringify(error)));
    return <h1>Character not found!</h1>
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
              <p><span className='bold'>Parents:</span> {char.father.firstName} {char.father.lastName} and {char.mother.firstName} {char.mother.lastName}</p>}
            {char.marriedDate &&
              <p><span className='bold'>Married:</span> {char.marriedDate} to {char.spouse?.firstName} {char.spouse?.lastName}</p>
            }
            {fullSibs.length > 0 &&
              <>
                <p className='bold'>Full siblings:</p>
                <ul>
                  {fullSibs.map(sib => <li key={sib.id}><Link to={`/character/${sib.fandomId}/${sib.id}`}>{sib.nickName}</Link></li>)}
                </ul>
              </>}
            <p><span className='bold'>Life notes:</span> {char.lifeNotes}</p>
            {hisKids.length > 0 &&
              <>
                <p className='bold'>Children:</p>
                <ul>
                  {hisKids.map(kid => <li key={kid.id}>{kid.firstName} {kid.middleName}</li>)}
                </ul>
              </>}
            {herKids.length > 0 &&
              <>
                <p className='bold'>Children:</p>
                <ul>
                  {herKids.map(kid => <li key={kid.id}>{kid.firstName} {kid.middleName}</li>)}
                </ul>
              </>}
          </Col>
        </Row>
      </Container>

    </>
  )
}

export default CharSheet;