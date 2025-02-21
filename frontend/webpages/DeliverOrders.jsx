import React, { useState, useEffect } from 'react';
import axios from 'axios';
import MyNavbar from './homepage/Navbar';
import { Container, Row, Col, Card, Button, Form } from 'react-bootstrap';

function DeliverOrders() {
  const [orders, setOrders] = useState([]);
  const [otp, setOtp] = useState({});
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('http://localhost:5000/api/order_routes/seller', {
          headers: { Authorization: token },
        });
        setOrders(response.data);
      } catch (err) {
        setError('Failed to load seller orders.');
      }
    };
    fetchOrders();
  }, []);

  const handleCompleteOrder = async (orderId) => {
    try {
      const token = localStorage.getItem('token');
      await axios.post(
        `http://localhost:5000/api/order_routes/complete/${orderId}`,
        { otp: otp[orderId] },
        { headers: { Authorization: token } }
      );
      setOrders(orders.filter((order) => order._id !== orderId));
      alert('Order marked as completed!');
    } catch (err) {
      alert('Invalid OTP. Please try again.');
    }
  };

  return (
    <Container fluid className="mt-4 min-vh-100">
      <MyNavbar />
      <h2>Deliver Orders</h2>
      {error && <p className="text-danger">{error}</p>}
      <Row>
        {orders.map((order) => (
          <Col key={order._id} md={4} className="mb-3">
            <Card style={{ backgroundColor: '#48494B', color: 'white' }}>
              <Card.Body>
                <Card.Title>{order.itemId.name}</Card.Title>
                <Card.Text>Amount: ₹{order.itemId.price}</Card.Text>
                <Card.Text>Buyer Id: {order.buyerEmail}</Card.Text>
                <Card.Text>Status: {order.status}</Card.Text>
                <Form.Control
                  type="text"
                  placeholder="Enter OTP"
                  value={otp[order._id] || ''}
                  onChange={(e) => setOtp({ ...otp, [order._id]: e.target.value })}
                  className="mb-2"
                />
                <Button variant="success" onClick={() => handleCompleteOrder(order._id)}>
                  Mark as Delivered
                </Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
}

export default DeliverOrders;
