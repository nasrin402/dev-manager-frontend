import { useContext, useState } from "react";
import { Navbar, Container, Nav, Form, Button } from "react-bootstrap";
import { NavLink, Link } from "react-router-dom";
import logo from '../assets/logo.svg'
import { authContext } from "../components/authContext/AuthContext";
import { contactContext } from "../components/ContactContext/ContactContext";
const Menu = () => {
  const { logout, user } = useContext(authContext);
  const {setSearchInput} = useContext(contactContext);
  const [text, setText] = useState('')

  const handleSubmit = (evt) => {
    evt.preventDefault()
    console.log(text)
    setSearchInput(text)
    //navigate to search component
    setText('')
    //navigate('/search')
  }
  return (
    <Navbar  expand="lg">
      <Container>
        <Navbar.Brand as={Link} to="/" className="brand text-white">
         <img src={logo}alt="" />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: "100px", }}
            navbarScroll
          >
            {user && (
              <>
                <Nav.Link as={NavLink} to="/contacts" className="text-white">
                  Contacts
                </Nav.Link>
                <Nav.Link as={NavLink} to="/add-contact" className="text-white">
                  Add Contact
                </Nav.Link>
                <Nav.Link as={NavLink} to="/dashboard" className="text-white">
                  Dashboard
                </Nav.Link>
                <Nav.Link onClick={logout} className="text-white">Logout</Nav.Link>
              </>
            )}
            {!user && (
              <>
                <Nav.Link as={NavLink} to="/register" className="text-white">
                  Register
                </Nav.Link>
                <Nav.Link as={NavLink} to="/login" className="text-white">
                  Login
                </Nav.Link>
              </>
            )}
          </Nav>
          {user && (
          <Form onSubmit={handleSubmit} className="d-flex">
            <Form.Control
              type="search"
              placeholder="Search"
              className="me-2"
              aria-label="Search"
              onChange={(evt) => setText(evt.target.value)}
              value={text}
            />
            <Button type='submit' variant="outline-light">Search</Button>
          </Form>
          )}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Menu;
