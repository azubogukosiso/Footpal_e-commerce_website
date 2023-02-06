import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import axios from "axios";

import "./page_styles/SignInPage.css";

import Navbar from "../components/NavbarComponent";
import Footer from "../components/FooterComponent";

const AdminLoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [passwordShown, setPasswordShown] = useState(false);
  const [passwordBtnValue, setPasswordBtnValue] = useState("Show");
  const [usernameErrMsg, setUsernameErrMsg] = useState("");
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
      setUsernameErrMsg("");
      setPwdErrMsg("");
    }, 5000)
  };

  const navigate = useNavigate();

  // FUNCTION TO SUBMIT USER DETAILS
  const onSubmitHandler = (e) => {
    e.preventDefault();

    const details = {
      username,
      password,
    };

    const instance = axios.create({
      withCredentials: true
    });

    instance.post("http://localhost:5000/admin/signin", details)
      .then(response => {
        console.log(response.data);
        if (response.data) {
          if (document.cookie) {
            console.log("there is a cookie");
            navigate("/admin");
          }
        }
      })
      .catch(error => {
        console.log(error.response);
        if (error.response) {
          const errMsg = error.response.data.errors;
          console.log(errMsg);
          if (errMsg.username) {
            setUsernameErrMsg(errMsg.username);
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
          className="rounded shadow p-5 my-5 w-75"
        >
          <h1>Sign In - Admin</h1>
          <div className="form-group mb-3">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              required
              className="form-control"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <span>{usernameErrMsg}</span>
          </div>

          <div className="form-group mb-4">
            <label htmlFor="password">Password</label>
            <div className="d-flex border rounded p-1">
              <input
                type={passwordShown ? "text" : "password"}
                required
                className="form-control border border-0"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <div className="btn btn-dark" onClick={togglePassword}>
                {passwordBtnValue}
              </div>
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
            Click <NavLink to="/admin/signup" className="text-dark">here</NavLink> to sign up
          </div>
        </form>
      </main>
      <Footer />
    </>
  );
};

export default AdminLoginPage;
