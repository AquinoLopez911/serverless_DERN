import React from 'react'
import {Navbar, Container, Nav, NavDropdown} from 'react-bootstrap'

export default function NavBar() {

    return (
        <Navbar collapseOnSelect className="p-4 bg-ice2" sticky="top" expand="lg" variant="light">
        <Container>
          <Navbar.Brand className="m-2" href="/">LATE NIGHT ICE</Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link className="m-2" href="#pricing">Pricing</Nav.Link>
              <NavDropdown className="m-2" title="Invoices" id="collasible-nav-dropdown">
                <NavDropdown.Item href="#invoice/pending">Pending</NavDropdown.Item>
                <NavDropdown.Item href="#invoice/payed">Payed</NavDropdown.Item>
                <NavDropdown.Item href="#invoice/all">All</NavDropdown.Item>
                <NavDropdown.Divider/>
                <NavDropdown.Item href="#invoice/help">Help</NavDropdown.Item>
              </NavDropdown>
            </Nav>
            <Nav>
              <Nav.Link href="#profile">My Profile</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    )
}