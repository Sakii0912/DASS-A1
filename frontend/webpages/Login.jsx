import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/user_routes/login', { email, password });
      localStorage.setItem('token', response.data.token);
      setError('');
      alert('Login successful!');
      let homepage_path = '/homepage';
      navigate(homepage_path);
    } catch (err) {
      setError(err.response?.data || 'Something went wrong');
      setPassword('');
      alert('Login unsuccessful. Please try again.');
      window.location.reload();
    }
  };

  let navigate = useNavigate();
  const switch_to_register = () => {
    let register_path = '/register';
    navigate(register_path);
  };

  return (
    <div className="container align-items-center justify-content-center min-vh-100">
      <h1 className="text-center">Buy-Sell-Rent @IIIT Hyderabad</h1>
      <h2 className="text-center">Login</h2>
      <div className="d-flex align-items-center justify-content-center h-100">
        <div className="col-md-6">
          <form onSubmit={handleLogin} className="form-group">
            <div className="mb-3">
              <label htmlFor="email" className="form-label">Email</label>
              <input
                type="email"
                id="email"
                className="form-control"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="password" className="form-label">Password</label>
              <input
                type="password"
                id="password"
                className="form-control"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <button type="submit" className="btn btn-primary w-100">Login</button>
            {error && <p className="text-danger mt-3">{error}</p>}
          </form>
          <button className="btn btn-link mt-3" onClick={switch_to_register}>Go to Register</button>
        </div>
      </div>
    </div>
  );
}

export default Login;
