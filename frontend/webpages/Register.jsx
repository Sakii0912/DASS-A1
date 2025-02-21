import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Register() {
  const [formData, setFormData] = useState({
    fname: '',
    lname: '',
    email: '',
    age: '',
    contact_no: '',
    password: '',
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      console.log(formData);
      const response = await axios.post('http://localhost:5000/api/user_routes/register', formData);
      console.log(response.data.message);
      setSuccess('Registration successful! You can now login.');
      setError('');
    } catch (err) {
      console.log(err.response.data.message);
      setError(err.response.data.message || 'Something went wrong');
      alert(err.response.data.message || 'Something went wrong');
      window.location.reload();
    }
  };

  let navigate = useNavigate();
  const switch_to_login = () => {
    let login_path = '/login';
    navigate(login_path);
  };

  return (
    <div className="container align-items-center justify-content-center" style={{ minHeight: '100vh' }}>
      <h1 className="text-center">Buy-Sell-Rent @IIIT Hyderabad</h1>
      <h2 className="text-center">Register</h2>
      <div className="d-flex align-items-center justify-content-center h-100">
        <div className="col-md-6">
          <form onSubmit={handleRegister}>
            <div className="mb-3">
            <label htmlFor="email" className="form-label">Last Name</label>
              <input
                type="text"
                name="fname"
                className="form-control"
                placeholder="First Name"
                value={formData.fname}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-3">
            <label htmlFor="email" className="form-label">First Name</label>
              <input
                type="text"
                name="lname"
                className="form-control"
                placeholder="Last Name"
                value={formData.lname}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-3">
            <label htmlFor="email" className="form-label">IIIT Email</label>
              <input
                type="email"
                name="email"
                className="form-control"
                placeholder="IIIT Email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-3">
            <label htmlFor="email" className="form-label">Age</label>
              <input
                type="number"
                name="age"
                className="form-control"
                placeholder="Age"
                value={formData.age}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-3">
            <label htmlFor="email" className="form-label">Contact Number</label>
              <input
                type="text"
                name="contact_no"
                className="form-control"
                placeholder="Contact Number"
                value={formData.contact_no}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-3">
            <label htmlFor="email" className="form-label">Password</label>
              <input
                type="password"
                name="password"
                className="form-control"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>
            <button type="submit" className="btn btn-primary w-100">Register</button>
            {error && <p className="text-danger mt-3">{error}</p>}
            {success && <p className="text-success mt-3">{success}</p>}
          </form>
          <button className="btn btn-link mt-3" onClick={switch_to_login}>Go to Login</button>
        </div>
      </div>
    </div>
  );
}

export default Register;
