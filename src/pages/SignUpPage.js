import { useState } from "react";
import { NavLink } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"

import "./page_styles/SignInPage.css";

import Navbar from "../components/NavbarComponent";
import Footer from "../components/FooterComponent";

const SignUpPage = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordShown, setPasswordShown] = useState(false);
  const [passwordBtnValue, setPasswordBtnValue] = useState("Show");
  const [emailErrMsg, setEmailErrMsg] = useState("");
  const [pwdErrMsg, setPwdErrMsg] = useState("");

  // SHOW AND HIDE PASSWORD FUNCTIONALITY
  const togglePassword = () => {
    if (password !== "") {
      setPasswordShown(!passwordShown);
      if (passwordBtnValue === "Show") {
        setPasswordBtnValue("Hide");
      } else {
        setPasswordBtnValue("Show");
      }
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

  // HIDE ERROR MESSAGES AFTER 5 SECS
  const hideErrors = () => {
    setTimeout(() => {
      setEmailErrMsg("");
      setPwdErrMsg("");
    }, 5000)
  }

  // FUNCTION TO SUBMIT USER DETAILS
  const onSubmitHandler = (e) => {
    e.preventDefault();

    const user = {
      username,
      email,
      password,
    };

    const instance = axios.create({
      withCredentials: true
    });

    instance.post(`${process.env.REACT_APP_API_URL}customers/signup`, user)
      .then(response => {
        if (response.data) {
          window.location.href = "/";
        }
      })
      .catch(err => {
        if (err.response) {
          const errMsg = err.response.data.errors;
          if (errMsg.email) {
            setEmailErrMsg(errMsg.email);
            hideErrors();
          } else if (errMsg.password) {
            setPwdErrMsg(errMsg.password);
            hideErrors();
          }
        } else {
          err && showErrorMsg();
        }
      });
  };

  return (
    <>
      <Navbar />
      <main className="d-flex justify-content-center align-items-center">
        <form
          onSubmit={onSubmitHandler}
          className="rounded border border-dark p-4 p-md-5 w-75 my-5" style={{ boxShadow: "10px 10px 0px 0px rgba(0,0,0,1)" }}
        >
          <h1>Sign Up</h1>
          <div className="form-group mb-3">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              required
              className="form-control border border-dark"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>

          <div className="form-group mb-3">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              required
              className="form-control border border-dark"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <span className="mt-3">{emailErrMsg}</span>
          </div>

          <div className="form-group mb-4">
            <label htmlFor="password">Password</label>
            <div className="d-flex border rounded p-1 border border-dark">
              <input
                type={passwordShown ? "text" : "password"}
                required
                className="form-control border border-0"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <div className="btn btn-dark" onClick={togglePassword}>{passwordBtnValue}</div>
            </div>
            <span className="mt-3">{pwdErrMsg}</span>
          </div>

          <div className="form-group mb-3">
            <input
              type="submit"
              className="btn btn-dark w-100"
              value="Sign Up"
            />
          </div>

          <div>
            If you have an account however, you can{" "}
            <NavLink to="/signin" className="text-dark">sign in here</NavLink>
          </div>
        </form>
      </main>
      <Footer />
      <ToastContainer />
    </>
  );
};

export default SignUpPage;
