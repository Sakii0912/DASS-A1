import React, { useState, useEffect } from 'react';
import axios from 'axios';
import MyNavbar from './homepage/Navbar';
import { Container, Row, Col, Card } from 'react-bootstrap';

function OrderHistory() {
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('http://localhost:5000/api/order_routes/buyer', {
          headers: { Authorization: token },
        });
        setOrders(response.data);
      } catch (err) {
        setError('Failed to load orders.');
      }
    };
    fetchOrders();
  }, []);

  return (
    <Container fluid className="mt-4 min-vh-100">
      <MyNavbar />
      <h2>Order History</h2>
      {error && <p className="text-danger">{error}</p>}
      <Row>
        {orders.map((order) => (
          <Col key={order._id} md={4} className="mb-3">
            <Card style={{ backgroundColor: '#48494B', color: 'white'}}>
              <Card.Body>
              <Card.Title>Total Amount: ₹{order.totalAmount}</Card.Title>
                <Card.Text>Status: {order.status}</Card.Text>
                <h5>Items:</h5>
                {order.items.map((item, index) => (
                  <p key={index}>{item.name} - ₹{item.price} ({item.quantity} pcs)</p>
                ))}
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
}

export default OrderHistory;
