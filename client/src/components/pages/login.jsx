import { useState} from 'react';
import { useNavigate } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { Button, Card, Col, Container, Form, Row } from 'react-bootstrap';
import Auth from '../../utils/auth';
import { LOG_ME_IN } from '../../utils/gql';
import './style.css';

const LoginPage = () => {

  const [userData, setUserData] = useState({email: '', password: ''});
  const navigate = useNavigate();

  const [login] = useMutation(LOG_ME_IN);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    if (userData.email && userData.password) {
      try {
        const {data } = await login({
          variables: {...userData}
        });
        Auth.login(data.login.token);
        setUserData({email: '', password: ''});
        navigate('/');
      } catch (err) {
        console.error(JSON.parse(JSON.stringify(err)));
      }
    }

  }

  return(
    <>
    <Container fluid className='login'>
      <Card>
        <Card.Header className='cardTitle'>
          <h1>Log In</h1>
        </Card.Header>
        <Card.Body className='cardBody'>
          <Form onSubmit={handleFormSubmit}>
            <Row>
              <Col sm={6}>
                <Form.Group>
                  <Form.Label className='loginLabel'>Email:</Form.Label>
                  <Form.Control type='input' name='email' placeholder='email' value={userData.email} className='formInput' onChange={(e) => handleInputChange(e)} required />
                  <Form.Control.Feedback type='invalid'>Please enter your email</Form.Control.Feedback>
                </Form.Group>
              </Col>
              <Col sm={6}>
                <Form.Group>
                  <Form.Label className='loginLabel'>Password:</Form.Label>
                  <Form.Control type='password' name='password' placeholder='password' value={userData.password} className='formInput' onChange={(e) => handleInputChange(e)} required />
                  <Form.Control.Feedback type='invalid'>Please enter your password</Form.Control.Feedback>
                </Form.Group>
              </Col>
            </Row>
            <Button disabled={!(userData.email && userData.password)} type='submit' className='loginBtn'>Login</Button>
          </Form>
        </Card.Body>
      </Card>
    </Container>
    </>
  )
};

export default LoginPage;