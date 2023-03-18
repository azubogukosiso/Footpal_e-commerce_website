import { useState, useEffect } from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";

import Main from "./pages/MainPage";
import Wishlist from "./pages/WishlistPage";
import SignUp from "./pages/SignUpPage";
import SignIn from "./pages/SignInPage";
import Details from "./pages/DetailsPage";
import Profile from "./pages/ProfilePage";
import AdminSignIn from "./pages/AdminSigninPage";
import AdminSignUp from "./pages/AdminSignUpPage";
import AdminMain from "./pages/AdminMainPage";
import AdminCreateItem from "./pages/AdminCreateItemPage";
import AdminItemList from "./pages/AdminItemListPage";
import AdminEditItem from "./pages/AdminEditItemPage";

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [isCustomer, setIsCustomer] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [customer, setCustomer] = useState();
  const [admin, setAdmin] = useState();

  useEffect(() => {
    let instance = axios.create({
      withCredentials: true
    });

    instance.post("http://localhost:5000/general/check-cookie")
      .then(response => {
        setLoggedIn(true);
        if (response.data.customer) {
          setIsCustomer(true);
          setCustomer(response.data.customer);
        } else if (response.data.admin) {
          setIsAdmin(true);
          setAdmin(response.data.admin);
        }
      })
      .catch(error => {
        console.log(error);
      })
  }, []);

  return (
    <BrowserRouter>
      <div className="main-container container-fluid px-0">
        <Routes>
          <Route path="/" exact element={<Main />} />

          {/* ONLY CUSTOMERS */}
          <Route path="/signup" element={loggedIn ? isAdmin ? <Main /> : <Main /> : <SignUp />} />
          <Route path="/signin" element={loggedIn ? isAdmin ? <Main /> : <Main /> : <SignIn />} />
          <Route path="/wishlist" element={loggedIn ? isAdmin ? <Main /> : <Wishlist /> : <SignIn />} />
          <Route path="/details/:id" element={loggedIn ? isAdmin ? <Main /> : <Details /> : <SignIn />} />
          <Route path="/profile" element={loggedIn ? isAdmin ? <AdminMain /> : <Profile customer={customer} /> : <SignIn />} />

          {/* ONLY ADMINS */}
          <Route path="/admin" element={loggedIn ? isCustomer ? <Main /> : <AdminMain admin={admin} /> : <SignIn />} />
          <Route path="/admin/signin" element={loggedIn ? isCustomer ? <Main /> : <AdminSignIn /> : <AdminSignIn />} />
          <Route path="/admin/signup" element={loggedIn ? isCustomer ? <Main /> : <AdminSignUp /> : <AdminSignUp />} />
          <Route path="/admin/create-item" element={loggedIn ? isCustomer ? <Main /> : <AdminCreateItem /> : <SignIn />} />
          <Route path="/admin/item-list" element={loggedIn ? isCustomer ? <Main /> : <AdminItemList /> : <SignIn />} />
          <Route path="/admin/edit-item/:id" element={loggedIn ? isCustomer ? <Main /> : <AdminEditItem /> : <SignIn />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
