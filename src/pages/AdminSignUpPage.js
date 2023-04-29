import { useState } from "react";
import { NavLink } from "react-router-dom";
import axios from "axios";

import "./page_styles/SignInPage.css";

import Navbar from "../components/NavbarComponent";
import Footer from "../components/FooterComponent";

const SignUpPage = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [passwordShown, setPasswordShown] = useState(false);
    const [passwordBtnValue, setPasswordBtnValue] = useState("Show");
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

    // HIDE ERROR MESSAGES AFTER 5 SECS
    const hideErrors = () => {
        setTimeout(() => {
            setPwdErrMsg("");
        }, 5000)
    }

    // FUNCTION TO SUBMIT USER DETAILS
    const onSubmitHandler = (e) => {
        e.preventDefault();

        const admin = {
            username,
            password,
        };

        const instance = axios.create({
            withCredentials: true
        });

        instance.post("http://localhost:5000/admin/signup", admin)
            .then(response => {
                if (response.data) {
                    window.location.href = "/admin/";
                }
            })
            .catch(error => {
                if (error.response) {
                    const errMsg = error.response.data.errors;
                    if (errMsg.password) {
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
                    className="rounded border border-dark p-4 p-md-5 w-75 my-5" style={{ boxShadow: "10px 10px 0px 0px rgba(0,0,0,1)" }}
                >
                    <h1>Sign Up - Admin</h1>
                    <div className="form-group mb-3">
                        <label htmlFor="name">Username</label>
                        <input
                            type="text"
                            required
                            className="form-control border border-dark"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
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
                        Click <NavLink to="/admin/signin" className="text-dark">here</NavLink> to sign in
                    </div>
                </form>
            </main>
            <Footer />
        </>
    );
};

export default SignUpPage;
