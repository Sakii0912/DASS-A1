import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Card, Button, Container, Row, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

function ItemsList() {
  const [items, setItems] = useState([]);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/item_routes/get_all_items');
        setItems(response.data);
      } catch (err) {
        setError('Failed to load items.');
      }
    };
    fetchItems();
  }, []);

  const handleCardClick = (itemId) => {
    navigate(`/get_item/${itemId}`);
  };

  const handleButtonClick = (e, itemId) => {
    e.stopPropagation();
    navigate(`/get_item/${itemId}`);
  };

  return (
    <Container className="mt-4">
      <h2 className="text-light">Available Items</h2>
      {error && <p className="text-danger">{error}</p>}
      {items.length === 0 ? (
        <p className="text-light">No items in the database.</p>
      ) : (
        <Row>
          {items.map((item) => (
            <Col key={item._id} md={4} className="mb-3">
              <Card
                onClick={() => handleCardClick(item._id)}
                style={{ cursor: 'pointer', backgroundColor: '#333', color: '#fff' }}
                className="shadow-sm"
              >
                <Card.Body>
                  <Card.Title>{item.name}</Card.Title>
                  <Card.Text>Price: ₹{item.price}</Card.Text>
                  <Card.Text>Category: {item.category}</Card.Text>
                  <Card.Text>Quantity: {item.quantity}</Card.Text>
                  <Button
                    variant="primary"
                    onClick={(e) => handleButtonClick(e, item._id)}
                    style={{ backgroundColor: '#007bff', borderColor: '#007bff' }}
                  >
                    View Details
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      )}
    </Container>
  );
}

export default ItemsList;
