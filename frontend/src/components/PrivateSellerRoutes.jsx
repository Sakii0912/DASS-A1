import React from 'react';
import { Navigate } from 'react-router-dom';

function PrivateSellerRoute({ children }) {
  const token = localStorage.getItem('token'); // Ensure user is logged in
  const isSeller = localStorage.getItem('sellerMode') === 'true'; // Ensure seller mode is enabled

  if (!token) {
    return <Navigate to="/login" />;
  }

  return isSeller ? children : <Navigate to="/homepage" />;
}

export default PrivateSellerRoute;
