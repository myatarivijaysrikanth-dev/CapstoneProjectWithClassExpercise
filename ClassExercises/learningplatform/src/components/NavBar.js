import { NavLink } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="navbar">

      <div className="logo">
        Learning Platform
      </div>

      <div className="nav-links">

        <NavLink to="/" end>
          Courses
        </NavLink>

        <NavLink to="/dashboard">
          Dashboard
        </NavLink>

        <NavLink to="/products">
          Products
        </NavLink>

        <NavLink to="/notifications">
          Notifications
        </NavLink>

      </div>

    </nav>
  );
};

export default Navbar;