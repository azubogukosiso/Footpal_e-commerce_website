import "./component_styles/NavbarComponent.css";
import { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import axios from "axios";

const NavbarComponent = () => {
  const [cookie, setCookie] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const instance = axios.create({
      withCredentials: true
    });

    instance.post("http://localhost:5000/general/check-cookie")
      .then(response => {
        setCookie(true);
        console.log(response.data);
        if (response.data.admin) {
          console.log("An admin is logged in!");
          setIsAdmin(true);
        } else {
          console.log("A customer is logged in!");
        }
      })
      .catch(error => {
        console.log(error.response.data);
      });
  }, [])

  const navigate = useNavigate();
  const LogOut = (e) => {
    const instance = axios.create({
      withCredentials: true
    });

    instance.post("http://localhost:5000/customers/logout")
      .then(response => {
        console.log(response);
        if (response.data) {
          navigate("/");
        }
      })
  }

  let navigationList = cookie ? isAdmin ? (
    <>
      <li className="nav-item ms-0 mx-lg-3">
        <NavLink className="nav-link text-white ps-3 ps-lg-2 rounded" to="">
          Main
        </NavLink>
      </li>
      <li className="nav-item mx-0 mx-lg-3">
        <NavLink className="nav-link text-white ps-3 ps-lg-2 rounded" to="/">
          Create Items
        </NavLink>
      </li>
      <li className="nav-item mx-0 mx-lg-3">
        <NavLink className="nav-link text-white ps-3 ps-lg-2 rounded" to="/">
          Edit Items
        </NavLink>
      </li>
      <li className="nav-item mx-0 mx-lg-3">
        <NavLink className="nav-link text-white ps-3 ps-lg-2 rounded" to="/">
          Item List
        </NavLink>
      </li>
      <li className="nav-item ms-0 mx-lg-3">
        <NavLink className="nav-link text-white ps-3 ps-lg-2 rounded" to="" onClick={LogOut}>
          Log Out
        </NavLink>
      </li>
    </>
  ) : (
    <>
      <li className="nav-item mx-0 mx-lg-3">
        <NavLink className="nav-link text-white ps-3 ps-lg-2 rounded" to="/">
          Categories
        </NavLink>
      </li>
      <li className="nav-item mx-0 mx-lg-3">
        <NavLink className="nav-link text-white ps-3 ps-lg-2 rounded" to="/">
          Check Cart
        </NavLink>
      </li>
      <li className="nav-item mx-0 mx-lg-3">
        <NavLink className="nav-link text-white ps-3 ps-lg-2 rounded" to="/">
          Your Profile
        </NavLink>
      </li>
      <li className="nav-item ms-0 mx-lg-3">
        <NavLink className="nav-link text-white ps-3 ps-lg-2 rounded" to="" onClick={LogOut}>
          Log Out
        </NavLink>
      </li>
    </>
  ) : (
    <>
      <li className="nav-item mx-0 mx-lg-3">
        <NavLink className="nav-link text-white ps-3 ps-lg-2 rounded" to="/signin">
          Sign In
        </NavLink>
      </li>
      <li className="nav-item mx-0 mx-lg-3">
        <NavLink className="nav-link text-white ps-3 ps-lg-2 rounded" to="/signup">
          Sign Up
        </NavLink>
      </li>
      <li className="nav-item mx-0 mx-lg-3">
        <NavLink className="nav-link text-white ps-3 ps-lg-2 rounded" to="/admin/signin">
          Sign In (Admin)
        </NavLink>
      </li>
      <li className="nav-item mx-0 mx-lg-3">
        <NavLink className="nav-link text-white ps-3 ps-lg-2 rounded" to="/admin/signup">
          Sign Up (Admin)
        </NavLink>
      </li>
    </>
  );

  return (
    <section>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container my-2 px-5 px-md-3 px-lg-0">
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
              {navigationList}
            </ul>
          </div>
        </div>
      </nav>
    </section>
  );
};

export default NavbarComponent;
