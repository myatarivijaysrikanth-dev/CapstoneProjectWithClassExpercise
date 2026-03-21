import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container-fluid">
        <Link className="navbar-brand fw-bold" to="/">
         HookState Hub
        </Link>

        <div className="navbar-nav ms-auto">
          <Link className="nav-link" to="/">
            Home
          </Link>

          <Link className="nav-link" to="/workout">
            Workout
          </Link>

          <Link className="nav-link" to="/products">
            Products
          </Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
