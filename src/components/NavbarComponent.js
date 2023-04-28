import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import axios from "axios";

import "./component_styles/NavbarComponent.css";

const NavbarComponent = (props) => {
  const [cookie, setCookie] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  const checkLoggedIn = () => {
    let instance = axios.create({
      withCredentials: true
    });

    // CHECK WHO'S LOGGED IN - ADMIN OR CUSTOMER
    instance.post("http://localhost:5000/general/check-cookie")
      .then(response => {
        if (response.data !== "No tokens") {
          setCookie(true);
          if (response.data.admin) {
            setIsAdmin(true);
          }
        }
      })
      .catch(error => {
        console.log(error);
      });
  }

  useEffect(() => {
    checkLoggedIn();
  }, [])

  const LogOut = (e) => {
    localStorage.clear("cart-items");

    let instance = axios.create({
      withCredentials: true
    });

    instance.post("http://localhost:5000/customers/logout")
      .then(response => {
        if (response.data) {
          setCookie(false);
          setIsAdmin(false);
          window.location.href = "/";
        }
      })
  }

  let navigationList = cookie ? isAdmin ? (
    <>
      <li className="nav-item mx-0 mx-lg-3">
        <NavLink className="nav-link text-white ps-3 ps-lg-2 rounded" to="/">
          Main
        </NavLink>
      </li>
      <li className="nav-item ms-0 mx-lg-3">
        <NavLink className="nav-link text-white ps-3 ps-lg-2 rounded" to="/admin">
          Dashboard
        </NavLink>
      </li>
      <li className="nav-item mx-0 mx-lg-3">
        <NavLink className="nav-link text-white ps-3 ps-lg-2 rounded" to="/admin/create-item">
          Create Items
        </NavLink>
      </li>
      <li className="nav-item mx-0 mx-lg-3">
        <NavLink className="nav-link text-white ps-3 ps-lg-2 rounded" to="/admin/item-list">
          Item List
        </NavLink>
      </li>
      <li className="nav-item mx-0 mx-lg-3">
        <NavLink className="nav-link text-white ps-3 ps-lg-2 rounded" to="/admin/order-list">
          Order List
        </NavLink>
      </li>
      <li className="nav-item ms-0 mx-lg-3">
        <NavLink className="nav-link text-white ps-3 ps-lg-2 rounded" onClick={LogOut}>
          Log Out
        </NavLink>
      </li>
    </>
  ) : (
    <>
      <li className="nav-item mx-0 mx-lg-3">
        <NavLink className="nav-link text-white ps-3 ps-lg-2 rounded" to="/">
          Main
        </NavLink>
      </li>
      <li className="nav-item mx-0 mx-lg-3">
        <NavLink className="nav-link text-white ps-3 ps-lg-2 rounded" onClick={() => props.setIsOpen(true)}>
          Check Cart
        </NavLink>
      </li>
      <li className="nav-item mx-0 mx-lg-3">
        <NavLink className="nav-link text-white ps-3 ps-lg-2 rounded" to="/wishlist">
          See Wishlist
        </NavLink>
      </li>
      <li className="nav-item mx-0 mx-lg-3">
        <NavLink className="nav-link text-white ps-3 ps-lg-2 rounded" to="/profile">
          Your Profile
        </NavLink>
      </li>
      <li className="nav-item ms-0 mx-lg-3">
        <NavLink className="nav-link text-white ps-3 ps-lg-2 rounded" onClick={LogOut}>
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
    </>
  );

  return (
    <section>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark w-100">
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
