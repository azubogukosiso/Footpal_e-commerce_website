import { useState } from "react";

import "./page_styles/SignInPage.css";

import Navbar from "../components/NavbarComponent";
import Footer from "../components/FooterComponent";

const AdminLoginPage = () => {
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
  };

  const onSubmitHandler = (e) => {};

  return (
    <>
      <Navbar />
      <main className="d-flex justify-content-center align-items-center">
        <form
          onSubmit={onSubmitHandler}
          className="rounded shadow p-5 my-5 w-75"
        >
          <h1>Sign In - Admin</h1>

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
          </div>

          <div className="form-group mb-3">
            <input
              type="submit"
              className="btn btn-dark w-100"
              value="Sign In"
            />
          </div>
        </form>
      </main>
      <Footer />
    </>
  );
};

export default AdminLoginPage;
