import { Link } from 'react-router-dom';
import { Nav, Navbar } from 'react-bootstrap';
import Auth from '../../utils/auth';
import './style.css';


const NavBar = () => {

  return (
    <>
      <Navbar expand='sm' className='my-nav'>
        <Navbar.Toggle aria-controls='basic-navbar-nav' />
        <Navbar.Collapse id='basic-navbar-nav'>
          <Nav>
            <Link to="/">Home</Link>
            {!Auth.loggedIn() &&
              <Link to="/login">Login</Link>}
            {Auth.loggedIn() &&
              <>
                <Link to='/new_character' className='navLink'>New Character</Link>
                <Nav.Link onClick={Auth.logout} className='navLink'>Logout</Nav.Link>
              </>}
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </>
  )
};

export default NavBar;