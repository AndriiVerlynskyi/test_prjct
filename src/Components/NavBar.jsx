import React from 'react'
import { Navbar, Container, Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom'

const NavBar = () => {
    return (
        <Navbar bg="light" expand="lg"  style={{ margin: '0px 0px 20px 0px'}}>
            <Container >
                <Navbar.Brand href="/">Products</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="me-auto">
                    <Link className="nav-link" to="/">
                        Products List
                    </Link >
                    {/* <Link className="nav-link" to="/singleProduct">
                        Single Product
                    </Link> */}
                </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}

export default NavBar