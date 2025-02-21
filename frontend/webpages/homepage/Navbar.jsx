import React from 'react';
import { useState, useEffect } from 'react';
import { Navbar, Nav, Container, Button } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';

function MyNavbar() {
  const navigate = useNavigate();
  const [isSeller, setIsSeller] = useState(false);

  useEffect(() => {
    const sellerStatus = localStorage.getItem('sellerMode') === 'true';
    setIsSeller(sellerStatus);
  }, []);

  const toggleSellerMode = () => {
    const newSellerStatus = !isSeller;
    localStorage.setItem('sellerMode', newSellerStatus);
    setIsSeller(newSellerStatus);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    alert('Logged out successfully!');
    navigate('/login');
  };

  return (
    <Navbar bg="primary" variant="dark" expand="lg" sticky="top">
      <Container>
        <Navbar.Brand as={Link} to="/">
          Buy-Sell @ IIITH
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="basic-navbar-nav" />

        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/homepage" >Home</Nav.Link>
            <Nav.Link as={Link} to="/profile" >Profile</Nav.Link>
            <Nav.Link as={Link} to="/search">Search Items</Nav.Link>
            <Nav.Link as={Link} to="/order_history">Orders History</Nav.Link>
            <Nav.Link as={Link} to="/cart">My Cart</Nav.Link>
            {isSeller && <Nav.Link as={Link} to="/add-item">Add Item</Nav.Link>}
            {isSeller && <Nav.Link as={Link} to="/order_delivery">Deliver Orders</Nav.Link>}
          </Nav>
          <Button variant={isSeller ? 'danger' : 'success'} onClick={toggleSellerMode}>
            {isSeller ? 'Exit Seller Mode' : 'Enter Seller Mode'}
          </Button>
          <Button variant="outline-light" onClick={handleLogout}>
            Logout
          </Button>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default MyNavbar;
