import { useEffect, useMemo, useState } from 'react';
import { Navigate, useParams } from 'react-router-dom';
import { useQuery, useMutation } from '@apollo/client';
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { QUERY_ME, QUERY_ALL_CHARS, QUERY_ALL_FANDOMS, QUERY_MEN, QUERY_SPOUSES, QUERY_WOMEN, QUERY_SINGLE_CHAR, CREATE_CHARACTER, UPDATE_CHARACTER } from '../../utils/gql';
import Auth from '../../utils/auth';

const CharacterForm = () => {
  const params = useParams();

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
    fatherId: null,
    motherId: null,
    spouseId: null,
    milBranch: '',
    occupation: '',
    liveBirth: true,
    miscarriage: false,
    lifeNotes: '',
    deathNotes: '',
    fandomId: 0
  });


  //=====================//
  //       Queries       //
  //=====================//

  const { data: meData, loading: meLoading, error: meError } = useQuery(QUERY_ME);

  const { data: oneCharData, loading: oneCharLoading } = useQuery(QUERY_SINGLE_CHAR, {
    variables: { charId: params.charId || 0 },
  });
  const { data: menData, loading: menLoading, error: menError } = useQuery(QUERY_MEN, {
    variables: { gender: 'male' }
  });
  const { data: spouseData, loading: spouseLoading, error: spouseError } = useQuery(QUERY_SPOUSES);
  const { data: womenData, loading: womenLoading, error: womenError } = useQuery(QUERY_WOMEN, {
    variables: { gender: 'female' }
  });
  const { data: fandomData, loading: fandomLoading, error: fandomError } = useQuery(QUERY_ALL_FANDOMS);

  const me = useMemo(() => { return meData?.me || meData?.currentId || {} }, [meData?.me, meData?.currentId]);
  const characterToEdit = useMemo(() => { return oneCharData?.singleChar || {} }, [oneCharData?.singleChar]);
  const allMen = menData?.getMen || [];
  const allSpouses = spouseData?.getSpouses || [];
  const allWomen = womenData?.getWomen || [];
  const allFandoms = fandomData?.allFandoms || [];

  console.log({ characterToEdit });

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
          data: { allChars: [...currentChars, createChar] },
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
    const { name } = e.target;
    setCharacterData({ ...characterData, [name]: !characterData.liveBirth });
  };

  // Handles trimming array elements
  // const handleTrim = (e) => {
  //   const { name, value } = e.target;
  //   const splitArr = value.split(',');
  //   const trimmedArr = splitArr.map((fandom) => fandom.trim());
  //   setCharacterData({ ...characterData, [name]: trimmedArr });
  // }

  // Handles click on "Submit" button
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    let newCharacter = { ...characterData };

    if (characterData.nickName === '') {
      newCharacter = { ...characterData, nickName: characterData.firstName }
    }

    try {
      await createChar({
        variables: { ...newCharacter, userId: me.id }
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
      fatherId: null,
      motherId: null,
      spouseId: null,
      milBranch: '',
      occupation: '',
      liveBirth: true,
      miscarriage: false,
      lifeNotes: '',
      deathNotes: '',
      fandomId: 0
    });
  };

  // Handles click on "Update" button
  const handleFormUpdate = async (e) => {
    e.preventDefault();
    console.log({ characterData });
    try {
      await updateChar({
        variables: { id: params.charId, character: { ...characterData } }
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
      fatherId: null,
      motherId: null,
      spouseId: null,
      milBranch: '',
      occupation: '',
      liveBirth: true,
      miscarriage: false,
      lifeNotes: '',
      deathNotes: '',
      fandomId: 0
    });
  };


  //=====================//
  //   Run on page load  //
  //=====================//

  useEffect(() => {
    if (Object.keys(characterToEdit).length > 0) {
      setCharacterData(characterToEdit);
    }
  }, [])


  //=====================//
  //    Conditionals     //
  //=====================//

  if (meLoading || oneCharLoading || menLoading || spouseLoading || womenLoading || fandomLoading) {
    return <h1>Loading....</h1>
  }

  if (meError || menError || spouseError || womenError || fandomError) {
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
                <Form.Control type="input" name="deathDate" placeholder="Date of death" value={characterData.deathDate} className="formInput" onChange={handleInputChange} />
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
                  {allMen?.map(dad => <option key={dad.id} value={dad.id}>{dad.nickName} {dad.lastName}</option>)}
                </Form.Select>
              </Col>
              <Col sm={{ span: 4 }}>
                <Form.Label>Mother:</Form.Label>
                <Form.Select name="motherId" value={characterData.motherId} className="formSelect" aria-label="Mother" onChange={handleInputChange}>
                  <option value='null'>N/A</option>
                  {allWomen?.map(mom => <option key={mom.id} value={mom.id}>{mom.nickName} {mom.lastName}</option>)}
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
                  {allSpouses?.map(spouse => <option key={spouse.id} value={spouse.id}>{spouse.nickName} {spouse.lastName}</option>)}
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
                <Form.Label>Fandom (if character appears in multiple fandoms, use primary):</Form.Label>
                <Form.Select name="fandomId" value={characterData.fandomId} className="formSelect" aria-label="Fandom" onChange={handleInputChange}>
                  <option value='null'>N/A</option>
                  {allFandoms?.map(fandom => <option key={fandom.id} value={fandom.id}>{fandom.fandomName}</option>)}
                </Form.Select>
              </Col>
            </Row>
          </Form.Group>

          <Row>
            <Col sm={{ span: 3, offset: 2 }}>
              {!Object.keys(params).length
                ? <Button data-toggle="popover" title="Submit" disabled={!(characterData.firstName && characterData.lastName && characterData.gender && characterData.race && characterData.birthDate && characterData.birthLoc && characterData.fandomId)} className="button formBtn" onClick={handleFormSubmit} type="submit">Submit</Button>
                : <Button data-toggle="popover" title="Update" disabled={!(characterData.firstName && characterData.lastName && characterData.gender && characterData.race && characterData.birthDate && characterData.birthLoc && characterData.fandomId)} className="button formBtn" onClick={handleFormUpdate} type="submit">Update</Button>
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