import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Form, Row, Col, Card, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import MyNavbar from '../homepage/Navbar';

function SearchItems() {
  const [items, setItems] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [category, setCategory] = useState('');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/item_routes/search_items', {
          params: { search: searchQuery, category, minPrice, maxPrice },
        });
        setItems(response.data);
      } catch (err) {
        setError('Failed to load items.');
      }
    };
    fetchItems();
  }, [searchQuery, category, minPrice, maxPrice]);

  return (
    <Container fluid className="mt-4 min-vh-100">
      <MyNavbar />
      <h2>Search Items</h2>

      <Form>
        <Row className="mb-3">
          <Col md={3}>
            <Form.Control
              type="text"
              placeholder="Search by name..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </Col>
          <Col md={3}>
            <Form.Select value={category} onChange={(e) => setCategory(e.target.value)}>
              <option value="">All Categories</option>
              <option value="Clothing">Clothing</option>
              <option value="Electronics">Electronics</option>
              <option value="Books">Books</option>
              <option value="Grocery">Grocery</option>
            </Form.Select>
          </Col>
          <Col md={2}>
            <Form.Control
              type="number"
              placeholder="Min Price"
              value={minPrice}
              onChange={(e) => setMinPrice(e.target.value)}
            />
          </Col>
          <Col md={2}>
            <Form.Control
              type="number"
              placeholder="Max Price"
              value={maxPrice}
              onChange={(e) => setMaxPrice(e.target.value)}
            />
          </Col>
          <Col md={2}>
            <Button variant="primary" onClick={() => fetchItems()}>Search</Button>
          </Col>
        </Row>
      </Form>

      {error && <p className="text-danger">{error}</p>}

      <Row>
        {items.length > 0 ? (
          items.map((item) => (
            <Col key={item._id} md={4} className="mb-3">
              <Card style={{ backgroundColor: '#48494B', color: 'white' }}>
                <Card.Body>
                  <Card.Title>{item.name}</Card.Title>
                  <Card.Text>Price: ₹{item.price}</Card.Text>
                  <Card.Text>Category: {item.category}</Card.Text>
                  <Button variant="primary" onClick={() => navigate(`/get_item/${item._id}`)}>View Details</Button>
                </Card.Body>
              </Card>
            </Col>
          ))
        ) : (
          <p>No items found.</p>
        )}
      </Row>
    </Container>
  );
}

export default SearchItems;
