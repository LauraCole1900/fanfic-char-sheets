import { Link, useParams } from 'react-router-dom';
import { Nav, Navbar } from 'react-bootstrap';
import Auth from '../../utils/auth';
import './style.css';


const NavBar = () => {
  const params = useParams();

  const urlArr = window.location.href.split('/');
  const isCharPage = urlArr.at(-3);

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
                {isCharPage === 'character' &&
                  <>
                    <Link to={`/characters/${params.fandomId}`} className='navLink'>Character list</Link>
                    <Link to={`/edit_character/${params.charId}`} className='navLink'>Edit Character</Link>
                  </>}
                <Link onClick={Auth.logout} className='navLink'>Logout</Link>
              </>}
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </>
  )
};

export default NavBar;