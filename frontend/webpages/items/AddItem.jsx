import React, { useState } from 'react';
import axios from 'axios';
import { Form, Button, Container } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import MyNavbar from '../homepage/Navbar';

function AddItem() {
  const [formData, setFormData] = useState({ id: '', name: '', price: '', description: '', q: '', category: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      await axios.post('http://localhost:5000/api/item_routes/create_item', formData, {
        headers: { Authorization: token },
      });
      alert('Item added successfully!');
      navigate('/homepage');
    } catch (err) {
      setError('Failed to add item.');
    }
  };

  return (
    <Container fluid className="mt-4 min-vh-100">
      <MyNavbar />
      <h2>Add New Item</h2>
      {error && <p className="text-danger">{error}</p>}
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Item Id</Form.Label>
          <Form.Control type="text" name="id" value={formData.id} onChange={handleChange} required />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Name</Form.Label>
          <Form.Control type="text" name="name" value={formData.name} onChange={handleChange} required />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Price</Form.Label>
          <Form.Control type="number" name="price" value={formData.price} onChange={handleChange} required />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Description</Form.Label>
          <Form.Control as="textarea" name="description" value={formData.description} onChange={handleChange} required />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Quantity</Form.Label>
          <Form.Control type="text" name="quantity" value={formData.quantity} onChange={handleChange} required />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Category</Form.Label>
          <Form.Control type="text" name="category" value={formData.category} onChange={handleChange} required />
        </Form.Group>
        <Button type="submit">Add Item</Button>
        <Button variant="secondary" onClick={() => navigate('/homepage')} className="ms-2">
          Go Back
        </Button>
      </Form>
    </Container>
  );
}

export default AddItem;
