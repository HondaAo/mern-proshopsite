import React from 'react'
import { Container, Nav, Navbar, NavDropdown } from 'react-bootstrap'
import { useSelector, useDispatch } from 'react-redux'
import { LinkContainer } from 'react-router-bootstrap'
import { logout } from '../action/userAction'

const Header = () => {
    const dispatch = useDispatch()
    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    const logoutHandler = ()=>{
       dispatch(logout())
    }
    return (
        <>
        <Navbar bg="dark" variant="dark" expand="lg">
         <Container className="">
          <Navbar.Brand href="/">React-Bootstrap</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ml-auto">
                <LinkContainer to='/cart'><Nav.Link href="/cart"><i className="fas fa-shopping-cart"></i>Cart</Nav.Link></LinkContainer>
                {userInfo ? (
                  <NavDropdown title={userInfo.name} id="username">
                      <LinkContainer to='/profile'>
                          <NavDropdown.Item>
                              Profile
                          </NavDropdown.Item>
                      </LinkContainer>
                      <NavDropdown.Item onClick={logoutHandler}>
                        Logout
                      </NavDropdown.Item>
                  </NavDropdown>
                ):(
                <LinkContainer to='/login'><Nav.Link href="/login"><i className="fas fa-user"></i>Sign In</Nav.Link></LinkContainer>

                )}
            </Nav>
          </Navbar.Collapse>
         </Container>
        </Navbar>    
        </>
    )
}

export default Header