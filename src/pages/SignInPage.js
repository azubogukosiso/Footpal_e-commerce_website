import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import axios from "axios";

import "./page_styles/SignInPage.css";

import Navbar from "../components/NavbarComponent";
import Footer from "../components/FooterComponent";

const SignInPage = () => {
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
  };

  // HIDE ERROR MESSAGES AFTER 5 SECS
  const hideErrors = () => {
    setTimeout(() => {
      setEmailErrMsg("");
      setPwdErrMsg("");
    }, 5000)
  }

  const navigate = useNavigate();

  // FUNCTION TO SUBMIT USER DETAILS
  const onSubmitHandler = (e) => {
    e.preventDefault();

    const details = {
      email,
      password,
    };

    const instance = axios.create({
      withCredentials: true
    });

    instance.post("http://localhost:5000/customers/signin", details)
      .then(response => {
        if (response.data) {
          navigate("/");
          document.location.reload();
        }
      })
      .catch(error => {
        if (error.response) {
          const errMsg = error.response.data.errors;
          console.log(errMsg);
          if (errMsg.email) {
            setEmailErrMsg(errMsg.email);
            hideErrors();
          } else if (errMsg.password) {
            setPwdErrMsg(errMsg.password);
            hideErrors();
          }
        }
      });
  };

  return (
    <>
      <Navbar />
      <main className="d-flex justify-content-center align-items-center">
        <form
          onSubmit={onSubmitHandler}
          className="rounded border border-dark p-5 my-5 w-75" style={{ boxShadow: "-15px 15px 0px 0px rgba(0,0,0,1)" }}
        >
          <h1>Sign In</h1>
          <div className="form-group mb-3">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              required
              className="form-control border border-dark"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <span>{emailErrMsg}</span>
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
            <span>{pwdErrMsg}</span>
          </div>

          <div className="form-group mb-3">
            <input
              type="submit"
              className="btn btn-dark w-100"
              value="Sign In"
            />
          </div>

          <div>
            If you don't have an account,{" "}
            <NavLink to="/signup" className="text-dark">
              sign up here
            </NavLink>
          </div>
        </form>
      </main>
      <Footer />
    </>
  );
};

export default SignInPage;
