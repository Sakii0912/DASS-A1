import React, { useState, useEffect } from 'react';
import axios from 'axios';
import MyNavbar from '../homepage/Navbar';
import { useParams } from 'react-router-dom';
import { Card, Container } from 'react-bootstrap';

function ItemPage() {
  const { id } = useParams();
  const [item, setItem] = useState(null);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchItem = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/item_routes/get_item/${id}`);
        setItem(response.data);
      } catch (err) {
        setError('Item not found.');
      }
    };
    fetchItem();
  }, [id]);

  const handleAddToCart = async () => {
    try {
      const token = localStorage.getItem('token');
      await axios.post(
        'http://localhost:5000/api/cart_routes/add',
        { itemId: id, quantity: 1 },
        { headers: { Authorization: token } }
      );
      setMessage('Item added to cart successfully!');
    } catch (err) {
      setMessage('Error adding item to cart.');
    }
  };

  if (error) return <p className="text-danger">{error}</p>;
  if (!item) return <p>Loading...</p>;

  return (
    <Container fluid className="p-0 min-vh-100" style={{ backgroundColor: '#000', color: '#fff' }}>
      <MyNavbar />
      <Container className="mt-4">
        <h1 className="text-center mb-4">Item Details</h1>
        <Card bg="dark" text="white">
          <Card.Header as="h2">{item.name}</Card.Header>
          <Card.Body>
            <Card.Text>
              <strong>Price:</strong> ₹{item.price}
            </Card.Text>
            <Card.Text>
              <strong>Category:</strong> {item.category}
            </Card.Text>
            <Card.Text>
              <strong>Description:</strong> {item.description}
            </Card.Text>
            <Card.Text>
              <strong>Seller Email:</strong> {item.seller_id}
            </Card.Text>
            <button variant="success" onClick={handleAddToCart}>
              Add to Cart
            </button>
            {message && <p className="text-success mt-2">{message}</p>}
          </Card.Body>
        </Card>
      </Container>
      <div className="text-center mt-4">
        <button
          className="btn btn-primary"
          onClick={() => window.location.href = '/homepage'}
        >
          Back to Homepage
        </button>
      </div>
    </Container>
  );
}

export default ItemPage;
