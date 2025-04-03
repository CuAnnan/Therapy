import React from 'react';
import { Outlet, Link } from 'react-router-dom';
import { Navbar, Nav, NavItem, Container } from 'react-bootstrap';


function Layout()
{
    return (<div className="container-fluid">
        <header>
            <Navbar expand="lg" className="bg-body-tertiary">
                <Container>
                    <Navbar.Brand>Therapy Application</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">
                            <Link to="/" className="nav-link">Home</Link>
                            <Link to="/therapists" className="nav-link">Therapists</Link>
                            <Link to="/clients" className="nav-link">Clients</Link>
                            <Link to="/sessions" className="nav-link">Sessions</Link>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </header>
        <main>
            <Outlet />
        </main>
    </div>);
}

export default Layout;