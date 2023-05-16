import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"

import "./component_styles/NavbarComponent.css";

const NavbarComponent = (props) => {
  const [navList, setNavList] = useState();

  // FUNCTION FOR RENDERING NAV ITEMS
  const renderNavList = (response) => {
    if (response.admin) {
      setNavList(
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
      )
    } else {
      setNavList(
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
            <NavLink className="nav-link text-white ps-3 ps-lg-2 rounded" to="/track-order">
              Track Orders
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
      )
    }
  }

  // SHOW ERROR MESSAGE - NO INTERNET
  const showErrorMsg = () => {
    toast.error("Dear Customer, it seems you're offline! Ensure that you're connected to the internet and then refresh your browser", {
      position: toast.POSITION.TOP_RIGHT,
      hideProgressBar: true,
      pauseOnHover: false,
      autoClose: false
    });
  };

  // CHECK WHO'S LOGGED IN - ADMIN OR CUSTOMER
  const checkLoggedIn = () => {
    let instance = axios.create({
      withCredentials: true
    });

    instance.post(`${process.env.REACT_APP_API_URL}general/check-cookie`)
      .then(response => {
        if (response.data !== "No tokens") {
          renderNavList(response.data);
        } else {
          setNavList(
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
          )
        }
      })
      .catch(err => {
        err && showErrorMsg();
      });
  }

  useEffect(() => {
    checkLoggedIn();
  })

  // LOGOUT USER
  const LogOut = (e) => {
    localStorage.clear("cart-items");

    let instance = axios.create({
      withCredentials: true
    });

    instance.post(`${process.env.REACT_APP_API_URL}customers/logout`)
      .then(response => {
        if (response.data) {
          window.location.href = "/";
        }
      })
  }

  return (
    <>
      <ToastContainer />
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
                {navList}
              </ul>
            </div>
          </div>
        </nav>
      </section>
    </>
  );
};

export default NavbarComponent;
