import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import MyNavbar from './homepage/Navbar';

function Cart() {
  const [cart, setCart] = useState([]);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const [totalAmount, setTotalAmount] = useState(0);

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('http://localhost:5000/api/cart_routes/view_cart', {
          headers: { Authorization: token },
        });
        setCart(response.data);
        setTotalAmount(response.data.reduce((sum, item) => sum + item.itemId.price * item.quantity, 0));
      } catch (err) {
        setError('Failed to load cart.');
      }
    };
    fetchCart();
  }, []);

  const handlePlaceOrder = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.post(
        'http://localhost:5000/api/order_routes/place_order',
        {},
        { headers: { Authorization: token } }
      );
      setMessage(response.data.message);
      setCart([]);
    } catch (err) {
      setMessage('Error placing order.');
    }
  };


  const handleRemoveFromCart = async (itemId) => {
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`http://localhost:5000/api/cart_routes/remove/${itemId}`, {
        headers: { Authorization: token },
      });
      setCart(cart.filter((item) => item.itemId._id !== itemId));
    } catch (err) {
      alert('Failed to remove item.');
    }
  };

  return (
    <Container fluid className="mt-4 min-vh-100">
      <MyNavbar />
      <h2>My Cart</h2>
      {error && <p className="text-danger">{error}</p>}
      <Row>
        {/* {cart.map((cartItem) => (
          <Col key={cartItem.itemId._id} md={4} className="mb-3">
            <Card style={{ backgroundColor: '#48494B', color: 'white' }}>
              <Card.Body>
                <Card.Title>{cartItem.itemId.name}</Card.Title>
                <Card.Text>Price: ₹{cartItem.itemId.price}</Card.Text>
                <Card.Text>Quantity: {cartItem.quantity}</Card.Text>
                <Button variant="danger" onClick={() => handleRemoveFromCart(cartItem.itemId._id)}>
                  Remove
                </Button>
              </Card.Body>
            </Card>
          </Col>
        ))} */}
        {cart.length > 0 ? (
          cart.map((cartItem) => (
            <Col key={cartItem.itemId._id} md={4} className="mb-3">
              <Card style={{ backgroundColor: '#48494B', color: 'white' }}>
                <Card.Body>
                  <Card.Title>{cartItem.itemId.name}</Card.Title>
                  <Card.Text>Price: ₹{cartItem.itemId.price}</Card.Text>
                  <Card.Text>Quantity: {cartItem.quantity}</Card.Text>
                  <Button variant="danger" onClick={() => handleRemoveFromCart(cartItem.itemId._id)}>
                    Remove
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          ))
        ) : (
          <p>Your cart is empty.</p>
        )}
      </Row>
      {cart.length > 0 && (
        <>
          <h4>Total: ₹{totalAmount}</h4>
          <Button variant="success" className="mt-3" onClick={handlePlaceOrder}>
            Place Order
          </Button>
        </>
      )}
    </Container>
  );
}

export default Cart;
