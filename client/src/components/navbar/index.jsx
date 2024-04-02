import { Link, useParams } from 'react-router-dom';
import { Nav, Navbar } from 'react-bootstrap';
import Auth from '../../utils/auth';
import './style.css';


const NavBar = () => {
  const params = useParams();

  return (
    <>
      <Navbar expand='sm' className='my-nav'>
        <Navbar.Toggle aria-controls='basic-navbar-nav' />
        <Navbar.Collapse id='basic-navbar-nav'>
          <Nav>
            <Link to='/' className='navLink'>Home</Link>
            {!Auth.loggedIn() &&
              <Link to='/login' className='navLink'>Login</Link>}
            {Auth.loggedIn() &&
              <>
                <Link to='/new_character' className='navLink'>New Character</Link>
                {Object.keys(params).length > 0 &&
                  <Link to={`/edit_character/${params}`} className='navLink'>Edit Character</Link>}
                <Nav.Link onClick={Auth.logout} className='navLink'>Logout</Nav.Link>
              </>}
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </>
  )
};

export default NavBar;