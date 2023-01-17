import "./component_styles/NavbarComponent.css";
import { NavLink } from "react-router-dom";

const NavbarComponent = () => {
  return (
    <section>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container my-2">
          <NavLink className="navbar-brand" to="/">
            footpal
          </NavLink>
          <button
            className="navbar-toggler border-0 py-2"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarTogglerDemo03"
            aria-controls="navbarTogglerDemo03"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div
            className="collapse navbar-collapse mt-0 mt-lg-0"
            id="navbarTogglerDemo03"
          >
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
              <li className="nav-item mx-0 mx-lg-3">
                <NavLink
                  className="nav-link text-white ps-3 ps-lg-2 rounded"
                  to="/signin"
                >
                  Sign In
                </NavLink>
              </li>
              <li className="nav-item mx-0 mx-lg-3">
                <NavLink
                  className="nav-link text-white ps-3 ps-lg-2 rounded"
                  to="/signup"
                >
                  Sign Up
                </NavLink>
              </li>
              <li className="nav-item ms-0 mx-lg-3">
                <NavLink
                  className="nav-link text-white ps-3 ps-lg-2 rounded"
                  to="/admin"
                >
                  Admin Login
                </NavLink>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </section>
  );
};

export default NavbarComponent;
