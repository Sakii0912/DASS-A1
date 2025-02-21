import React from "react";
import MyNavbar  from "./Navbar";
import Itemslist from "./ItemsList";

const Homepage = () => {
  return (
    <div className="d-flex flex-column min-vh-100">
      <div className="position-fixed top-0 w-100">
        <MyNavbar />
      </div>
      <div className="container mt-5 pt-5">
        <h1>Welcome to Buy-Sell @ IIIT Hyderabad!</h1>
        <p>Explore items, manage your cart, and more.</p>
      </div>
      <div className="container mt-5">
        <Itemslist />
      </div>
    </div>
  );
};

export default Homepage;
