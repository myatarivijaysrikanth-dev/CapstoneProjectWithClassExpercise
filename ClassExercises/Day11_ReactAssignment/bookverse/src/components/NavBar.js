import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="navbar navbar-dark bg-primary shadow">
      <div className="container">
        <Link className="navbar-brand" to="/">
          <i className="bi bi-book-half me-2"></i>
          BookVerse
        </Link>

        <Link to="/add-book">
          <button className="btn btn-light">
            <i className="bi bi-plus-circle me-2"></i>
            Add Book
          </button>
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
