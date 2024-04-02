import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { Container, Col, Row } from 'react-bootstrap';
import { QUERY_SINGLE_CHAR } from '../../utils/gql';
import './style.css';

const CharSheet = () => {
  const params = useParams();

  const { loading, data, error } = useQuery(QUERY_SINGLE_CHAR, {
    variables: { charId: params.charId }
  });

  const char = data?.singleChar || {};

  const hisKids = char?.hisKids?.filter(kid => !kid.miscarriage && kid.liveBirth);
  const herKids = char?.herKids?.filter(kid => !kid.miscarriage && kid.liveBirth);

  if (loading) {
    return <h1>Loading....</h1>
  }

  if (error) {
    console.error(JSON.parse(JSON.stringify(error)));
    return <h1>Character not found!</h1>
  }

  return (
    <>
      <Container fluid>
        <Row>
          <Col>
            <h1>{char.firstName} {char.middleName} {char.lastName}</h1>
          </Col>
        </Row>
        <Row>
          <Col>
            {char.nickName &&
              <p><span className='bold'>Nickname:</span> {char.nickName}</p>
            }
            <p><span className='bold'>Birth:</span> {char.birthDate}, {char.birthLoc}</p>
            {char.father && char.mother &&
              <p><span className='bold'>Parents:</span> {char.father.firstName} {char.father.lastName} and {char.mother.firstName} {char.mother.lastName}</p>}
            {char.marriedDate &&
              <p><span className='bold'>Married:</span> {char.marriedDate} to {char.spouse.firstName} {char.spouse.lastName}</p>
            }
            {hisKids.length > 0 &&
              <p><span className='bold'>Children:</span> {hisKids.map(kid => <span key={kid.id}>{kid.firstName} {kid.middleName}, </span>)}</p>}
            {herKids.length > 0 &&
              <p><span className='bold'>Children:</span> {herKids.map(kid => <span key={kid.id}>{kid.firstName} {kid.middleName}, </span>)}</p>}
          </Col>
        </Row>
      </Container>

    </>
  )
}

export default CharSheet;