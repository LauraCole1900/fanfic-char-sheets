import { useEffect, useMemo, useState } from 'react';
import { Navigate, useParams } from 'react-router-dom';
import { useQuery, useMutation } from '@apollo/client';
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { QUERY_ME, QUERY_ALL_CHARS, QUERY_MEN, QUERY_WOMEN, QUERY_SINGLE_CHAR, CREATE_CHARACTER, UPDATE_CHARACTER } from '../../utils/gql';
import Auth from '../../utils/auth';

const CharacterForm = () => {
  const params = useParams();

  const [menList, setMenList] = useState([]);
  const [womenList, setWomenList] = useState([]);
  const [charsList, setCharsList] = useState([]);
  const [characterData, setCharacterData] = useState({
    userId: 0,
    firstName: '',
    nickName: '',
    middleName: '',
    lastName: '',
    gender: '',
    race: '',
    birthDate: '',
    marriedDate: '',
    deathDate: '',
    birthLoc: '',
    marriedLoc: '',
    deathLoc: '',
    fatherId: 0,
    motherId: 0,
    spouseId: 0,
    milBranch: '',
    occupation: '',
    liveBirth: true,
    miscarriage: false,
    lifeNotes: '',
    deathNotes: '',
    fandom: []
  });


  //=====================//
  //       Queries       //
  //=====================//

  const { data: meData, loading: meLoading, error: meError } = useQuery(QUERY_ME);

  const { data: oneCharData, loading: oneCharLoading } = useQuery(QUERY_SINGLE_CHAR, {
    variables: { charId: params.charId },
  });
  const { data: allCharsData, loading: allCharsLoading, error: allCharsError } = useQuery(QUERY_ALL_CHARS);
  const { data: menData, loading: menLoading, error: menError } = useQuery(QUERY_MEN);
  const { data: womenData, loading: womenLoading, error: womenError } = useQuery(QUERY_WOMEN);

  const me = useMemo(() => { return meData?.me || meData?.currentId || {} }, [meData?.me, meData?.currentId]);
  const characterToEdit = useMemo(() => { return oneCharData?.singleChar || {} }, [oneCharData?.singleChar]);
  const allChars = allCharsData?.allChars || [];
  const allMen = menData?.getMen || [];
  const allWomen = womenData?.getWomen || [];

  const maybeDads = allMen.filter(man => man.liveBirth);
  const maybeMoms = allWomen.filter(woman => woman.liveBirth);
  const maybeSpouse = allChars.filter(person => person.liveBirth);


  //=====================//
  //      Mutations      //
  //=====================//

  const [createChar] = useMutation(CREATE_CHARACTER, {
    update(cache, { data: { createChar } }) {
      try {
        // Retrieve existing post data that is stored in the cache
        const allData = cache.readQuery({ query: QUERY_ALL_CHARS });
        const currentChars = allData.allChars;
        // Update the cache by combining existing post data with the newly created data returned from the mutation
        cache.writeQuery({
          query: QUERY_ALL_CHARS,
          // If we want new data to show up before or after existing data, adjust the order of this array
          data: { getAllSongs: [...currentChars, createChar] },
        });
      } catch (err) {
        console.error(JSON.parse(JSON.stringify(err)));
      }
    }
  });

  const [updateChar] = useMutation(UPDATE_CHARACTER);


  //=====================//
  //       Methods       //
  //=====================//

  // Handles input changes to form fields
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCharacterData({ ...characterData, [name]: value });
  };

  // Handles clicks on "is active" and "is admin" checkboxes
  const handleCheckbox = (e) => {
    const { name, value } = e.target;
    JSON.parse(value) ? setCharacterData({ ...characterData, [name]: false }) : setCharacterData({ ...characterData, [name]: true });
  };

  // Handles trimming array elements
  const handleTrim = (e) => {
    const { name, value } = e.target;
    const splitArr = value.split(',');
    const trimmedArr = splitArr.map((fandom) => fandom.trim());
    setCharacterData({ ...characterData, [name]: trimmedArr });
  }

  // Handles click on "Submit" button
  const handleFormSubmit = async (e) => {
    e.preventDefault();

    try {
      await createChar({
        variables: { ...characterData }
      });
    } catch (error) {
      console.error(JSON.parse(JSON.stringify(error)));
    }
    setCharacterData({
      userId: 0,
      firstName: '',
      nickName: '',
      middleName: '',
      lastName: '',
      gender: '',
      race: '',
      birthDate: '',
      marriedDate: '',
      deathDate: '',
      birthLoc: '',
      marriedLoc: '',
      deathLoc: '',
      fatherId: 0,
      motherId: 0,
      spouseId: 0,
      milBranch: '',
      occupation: '',
      liveBirth: true,
      miscarriage: false,
      lifeNotes: '',
      deathNotes: '',
      fandom: []
    });
  };

  // Handles click on "Update" button
  const handleFormUpdate = async (e) => {
    e.preventDefault();
    console.log(characterData);

    try {
      await updateChar({
        variables: { id: params.charId, ...characterData }
      });
    } catch (error) {
      console.error(JSON.parse(JSON.stringify(error)));
    }
    setCharacterData({
      userId: 0,
      firstName: '',
      nickName: '',
      middleName: '',
      lastName: '',
      gender: '',
      race: '',
      birthDate: '',
      marriedDate: '',
      deathDate: '',
      birthLoc: '',
      marriedLoc: '',
      deathLoc: '',
      fatherId: 0,
      motherId: 0,
      spouseId: 0,
      milBranch: '',
      occupation: '',
      liveBirth: true,
      miscarriage: false,
      lifeNotes: '',
      deathNotes: '',
      fandom: []
    });
  };


  //=====================//
  //   Run on page load  //
  //=====================//

  useEffect(() => {
    if (Object.keys(params).length > 0 && Object.keys(characterToEdit).length > 0) {
      setCharacterData(characterToEdit);
    }
    setMenList(maybeDads);
    setWomenList(maybeMoms);
    setCharsList(maybeSpouse);
  }, [me, params, characterToEdit, maybeDads, maybeMoms, maybeSpouse]);


  //=====================//
  //    Conditionals     //
  //=====================//

  if (meLoading || oneCharLoading || allCharsLoading || menLoading || womenLoading) {
    return <h1>Loading....</h1>
  }

  if (meError || allCharsError || menError || womenError) {
    console.error(JSON.parse(JSON.stringify(meError)) || JSON.parse(JSON.stringify(menError)) || JSON.parse(JSON.stringify(womenError)));
  }

  if (!Auth.loggedIn()) {
    return <Navigate to='/login' />
  }

  return (
    <>
      <Container className="ltBg">
        <Row>
          <Col sm={12} className="formHeader">
            {Object.keys(params).length > 0
              ? <h1>Edit this character</h1>
              : <h1>Create new character</h1>}
          </Col>
        </Row>

        <Form className="charForm">

          <Form.Group controlId="formCharName">
            <Row>
              <Col sm={{ span: 8, offset: 2 }}>
                <Form.Label>Character name: <span className="red">*</span></Form.Label>
                <Form.Control type="input" name="firstName" placeholder="First name" value={characterData.firstName} className="formInput" onChange={handleInputChange} />
                <Form.Control type="input" name="middleName" placeholder="Middle name(s)" value={characterData.middleName} className="formInput" onChange={handleInputChange} />
                <Form.Control type="input" name="lastName" placeholder="Last name" value={characterData.lastName} className="formInput" onChange={handleInputChange} />
                <Form.Control type="input" name="nickName" placeholder="Nickname" value={characterData.nickName} className="formInput" onChange={handleInputChange} />
              </Col>
            </Row>
          </Form.Group>

          <Row>
            <Form.Group controlId="formCharGender">
              <Col sm={{ span: 4, offset: 2 }}>
                <Form.Label>Gender: <span className="red">*</span></Form.Label>
                <Form.Control type="input" name="gender" placeholder="Gender" value={characterData.gender} className="formInput" onChange={handleInputChange} />
              </Col>
            </Form.Group>
            <Form.Group controlId="formCharRace">
              <Col sm={{ span: 4 }}>
                <Form.Label>Ethnicity: <span className="red">*</span></Form.Label>
                <Form.Control type="input" name="race" placeholder="Ethnicity" value={characterData.race} className="formInput" onChange={handleInputChange} />
              </Col>
            </Form.Group>
          </Row>

          <Form.Group controlId="formCharBirth">
            <Row>
              <Col sm={{ span: 4, offset: 2 }}>
                <Form.Label>Date of birth: <span className="red">*</span></Form.Label>
                <Form.Control type="input" name="birthDate" placeholder="Date of birth" value={characterData.birthDate} className="formInput" onChange={handleInputChange} />
              </Col>

              <Col sm={{ span: 4 }}>
                <Form.Label>Place of birth: <span className="red">*</span></Form.Label>
                <Form.Control type="input" name="birthLoc" placeholder="Place of birth" value={characterData.birthLoc} className="formInput" onChange={handleInputChange} />
              </Col>
            </Row>
          </Form.Group>

          <Form.Group controlId="formCharMarriage">
            <Row>
              <Col sm={{ span: 4, offset: 2 }}>
                <Form.Label>Date of marriage:</Form.Label>
                <Form.Control type="input" name="marriedDate" placeholder="Date of marriage" value={characterData.marriedDate} className="formInput" onChange={handleInputChange} />
              </Col>

              <Col sm={{ span: 4 }}>
                <Form.Label>Place of marriage:</Form.Label>
                <Form.Control type="input" name="marriedLoc" placeholder="Place of marriage" value={characterData.marriedLoc} className="formInput" onChange={handleInputChange} />
              </Col>
            </Row>
          </Form.Group>

          <Form.Group controlId="formCharDeath">
            <Row>
              <Col sm={{ span: 4, offset: 2 }}>
                <Form.Label>Date of death:</Form.Label>
                <Form.Control type="input" name="deathDate" placeholder="Date of birth" value={characterData.deathDate} className="formInput" onChange={handleInputChange} />
              </Col>

              <Col sm={{ span: 4 }}>
                <Form.Label>Place of death:</Form.Label>
                <Form.Control type="input" name="deathLoc" placeholder="Place of death" value={characterData.deathLoc} className="formInput" onChange={handleInputChange} />
              </Col>
            </Row>
          </Form.Group>

          <Form.Group controlId="formParents">
            <Row>
              <Col sm={{ span: 4, offset: 2 }}>
                <Form.Label>Father:</Form.Label>
                <Form.Select name="fatherId" value={characterData.fatherId} className="formSelect" aria-label="Father" onChange={handleInputChange}>
                  <option value='null'>N/A</option>
                  {menList?.map(dad => <option key={dad.id} value={dad.id}>{dad.firstName} {dad.nickName} {dad.lastName}</option>)}
                </Form.Select>
              </Col>
              <Col sm={{ span: 4 }}>
                <Form.Label>Mother:</Form.Label>
                <Form.Select name="motherId" value={characterData.motherId} className="formSelect" aria-label="Father" onChange={handleInputChange}>
                  <option value='null'>N/A</option>
                  {womenList?.map(mom => <option key={mom.id} value={mom.id}>{mom.firstName} {mom.nickName} {mom.lastName}</option>)}
                </Form.Select>
              </Col>
            </Row>
          </Form.Group>

          <Form.Group controlId="formSpouse">
            <Row>
              <Col sm={{ span: 4, offset: 2 }}>
                <Form.Label>Spouse:</Form.Label>
                <Form.Select name="spouseId" value={characterData.spouseId} className="formSelect" onChange={handleInputChange}>
                  <option value='null'>N/A</option>
                  {charsList?.map(spouse => <option key={spouse.id} value={spouse.id}>{spouse.firstName} {spouse.nickName} {spouse.lastName}</option>)}
                </Form.Select>
              </Col>
            </Row>
          </Form.Group>

          <Form.Group controlId="formMilitary">
            <Row>
              <Col sm={{ span: 8, offset: 2 }}>
                <Form.Label>Branch of service (where applicable):</Form.Label>
                <Form.Control type="input" name="milBranch" placeholder="Branch of service" value={characterData.milBranch} className="formInput" onChange={handleInputChange} />
              </Col>
            </Row>
          </Form.Group>

          <Form.Group controlId="formOccupation">
            <Row>
              <Col sm={{ span: 8, offset: 2 }}>
                <Form.Label>Occupation</Form.Label>
                <Form.Control type="input" name="occupation" placeholder="Occupation" value={characterData.occupation} className="formInput" onChange={handleInputChange} />
              </Col>
            </Row>
          </Form.Group>

          <Form.Group controlId="formLiveBirth">
            <Row>
              <Col sm={{ span: 4, offset: 2 }}>
                <Form.Check type="checkbox" inline label="Born alive?" name="liveBirth" value={characterData.liveBirth} checked={characterData.liveBirth === true} className="formCheck" onChange={handleCheckbox} />
              </Col>
              <Col sm={{ span: 4, offset: 2 }}>
                <Form.Check type="checkbox" inline label="Miscarriage?" name="miscarriage" value={characterData.miscarriage} checked={characterData.miscarriage === true} className="formCheck" onChange={handleCheckbox} />
              </Col>
            </Row>
          </Form.Group>

          <Form.Group controlId="formLifeNotes">
            <Row>
              <Col sm={{ span: 8, offset: 2 }}>
                <Form.Label>Notes about life:</Form.Label>
                <Form.Control as="textarea" name="lifeNotes" placeholder="Life notes" value={characterData.lifeNotes} className="formInput" onChange={handleInputChange} rows={5} />
              </Col>
            </Row>
          </Form.Group>

          <Form.Group controlId="formDeathNotes">
            <Row>
              <Col sm={{ span: 8, offset: 2 }}>
                <Form.Label>Notes about death:</Form.Label>
                <Form.Control as="textarea" name="deathNotes" placeholder="Death notes" value={characterData.deathNotes} className="formInput" onChange={handleInputChange} rows={5} />
              </Col>
            </Row>
          </Form.Group>

          <Form.Group controlId="formFandom">
            <Row>
              <Col sm={{ span: 8, offset: 2 }}>
                <Form.Label>Fandom(s): <span className="red">*</span></Form.Label>
                <Form.Control type="input" name="fandom" placeholder="Please comma-separate fandoms" value={characterData.fandom} className="formInput" onChange={handleInputChange} onBlur={handleTrim} />
              </Col>
            </Row>
          </Form.Group>

          <Row>
            <Col sm={{ span: 3, offset: 2 }}>
              {!Object.keys(params).length
                ? <Button data-toggle="popover" title="Submit" disabled={!(characterData.firstName && characterData.lastName && characterData.gender && characterData.race && characterData.birthDate && characterData.birthLoc && characterData.fandom)} className="button formBtn" onClick={handleFormSubmit} type="submit">Submit</Button>
                : <Button data-toggle="popover" title="Update" disabled={!(characterData.firstName && characterData.lastName && characterData.gender && characterData.race && characterData.birthDate && characterData.birthLoc && characterData.fandom)} className="button formBtn" onClick={handleFormUpdate} type="submit">Update</Button>
              }
            </Col>
          </Row>

          <Row>

          </Row>

        </Form>

      </Container >
    </>
  )
};

export default CharacterForm;