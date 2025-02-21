import React, { useState, useEffect } from 'react';
import MyNavbar from './homepage/Navbar';
import axios from 'axios';

function Profile() {
  const [user, setUser] = useState(null);
  const [error, setError] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    age: '',
    contactNumber: ''
  });

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const token = localStorage.getItem('token'); // Get token from localStorage
        const response = await axios.get('http://localhost:5000/api/user_routes/profile', {
          headers: {
            Authorization: token, // Send token in the request header
          },
        });
        setUser(response.data);
        setFormData(response.data);
      } catch (err) {
        setError('Failed to fetch user details.');
      }
    };
    fetchUserDetails();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      await axios.post('http://localhost:5000/api/user_routes/edit_profile', formData, {
        headers: {
          Authorization: token,
        },
      });
      setUser(formData);
      setIsEditing(false);
    } catch (err) {
      setError('Failed to update user details.');
    }
  };

  if (error) return <p className="text-danger">{error}</p>;
  if (!user) return <p>Loading...</p>;

  return (
    <div className="d-flex flex-column min-vh-100" style={{ backgroundColor: '#222021', color: '#ffffff' }}>
      <MyNavbar />
      <div className="d-flex flex-column justify-content-center align-items-center vh-100">
        <div className="card p-4 mt-4" style={{ width: '24rem', backgroundColor: '#363636', borderColor: '#BEBDB8' }}>
          {isEditing ? (
            <div>
              <h2 className="text-center mb-4" style={{ color: '#ffffff' }}>Edit Profile</h2>
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label style={{ color: '#ffffff' }}>First Name</label>
                  <input
                    type="text"
                    className="form-control"
                    name="fname"
                    value={formData.fname}
                    onChange={handleChange}
                  />
                </div>
                <div className="form-group">
                  <label style={{ color: '#ffffff' }}>Last Name</label>
                  <input
                    type="text"
                    className="form-control"
                    name="lname"
                    value={formData.lname}
                    onChange={handleChange}
                  />
                </div>
                <div className="form-group">
                  <label style={{ color: '#ffffff' }}>Email (read only)</label>
                  <input
                    type="email"
                    className="form-control"
                    name="email"
                    readOnly
                    value={formData.email}
                    onChange={handleChange}
                  />
                </div>
                <div className="form-group">
                  <label style={{ color: '#ffffff' }}>Age</label>
                  <input
                    type="number"
                    className="form-control"
                    name="age"
                    value={formData.age}
                    onChange={handleChange}
                  />
                </div>
                <div className="form-group">
                  <label style={{ color: '#ffffff' }}>Contact Number</label>
                  <input
                    type="text"
                    className="form-control"
                    name="contact_no"
                    value={formData.contact_no}
                    onChange={handleChange}
                  />
                </div>
                <button type="submit" className="btn btn-primary mt-3">Save</button>
                <button type="button" className="btn btn-secondary mt-3 ml-2" onClick={() => setIsEditing(false)}>Cancel</button>
              </form>
              </div>
          ) : (
            <div>
              <h2 className="text-center mb-4" style={{ color: '#ffffff' }}>Profile</h2>
              <ul className="list-group list-group-flush">
                <li className="list-group-item" style={{ backgroundColor: '#000000', color: '#ffffff' }}>
                  <strong>First Name:</strong> {user.fname}
                </li>
                <li className="list-group-item" style={{ backgroundColor: '#000000', color: '#ffffff' }}>
                  <strong>Last Name:</strong> {user.lname}
                </li>
                <li className="list-group-item" style={{ backgroundColor: '#000000', color: '#ffffff' }}>
                  <strong>Email:</strong> {user.email}
                </li>
                <li className="list-group-item" style={{ backgroundColor: '#000000', color: '#ffffff' }}>
                  <strong>Age:</strong> {user.age}
                </li>
                <li className="list-group-item" style={{ backgroundColor: '#000000', color: '#ffffff' }}>
                  <strong>Contact Number:</strong> {user.contact_no}
                </li>
              </ul>
            </div>
          )}
          {!isEditing && (
            <button className="btn btn-primary mt-3" onClick={() => setIsEditing(true)}>Edit</button>
          )}
        </div>
      </div>
    </div>
  );
}

export default Profile;
