import { useState } from "react";
import axios from "axios";
import { NavLink } from "react-router-dom";

import "./page_styles/SignInPage.css";

import Navbar from "../components/NavbarComponent";
import Footer from "../components/FooterComponent";

const SignUpPage = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordShown, setPasswordShown] = useState(false);
  const [passwordBtnValue, setPasswordBtnValue] = useState("Show");

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

  const onSubmitHandler = (e) => {
    e.preventDefault();

    const user = {
      username,
      email,
      password,
    };
    console.log(user);

    axios.post("http://localhost:5000/customers/add", user)
      .then(res => {
        console.log(res.cookie);
      })
  };

  return (
    <>
      <Navbar />
      <main className="d-flex justify-content-center align-items-center">
        <form
          onSubmit={onSubmitHandler}
          className="rounded shadow p-5 w-75 my-5"
        >
          <h1>Sign Up</h1>
          <div className="form-group mb-3">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              required
              className="form-control"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>

          <div className="form-group mb-3">
            <label htmlFor="email">Email</label>
            <input
              type="text"
              required
              className="form-control"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
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
              <div className="btn btn-dark" onClick={togglePassword}>{passwordBtnValue}</div>
            </div>
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
    </>
  );
};

export default SignUpPage;
