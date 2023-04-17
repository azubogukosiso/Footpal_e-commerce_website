import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";

import "./App.css";

import Main from "./pages/MainPage";
import CategoryItems from "./pages/CategoryItemsPage";
import Wishlist from "./pages/WishlistPage";
import SignUp from "./pages/SignUpPage";
import SignIn from "./pages/SignInPage";
import Details from "./pages/DetailsPage";
import Profile from "./pages/ProfilePage";
import CheckoutSuccess from "./pages/CheckoutSuccess"
import AdminSignIn from "./pages/AdminSigninPage";
import AdminSignUp from "./pages/AdminSignUpPage";
import AdminMain from "./pages/AdminMainPage";
import AdminCreateItem from "./pages/AdminCreateItemPage";
import AdminItemList from "./pages/AdminItemListPage";
import AdminEditItem from "./pages/AdminEditItemPage";
import NotFoundPage from "./pages/NotFoundPage";

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
        if (response.data.customer) {
          setLoggedIn(true);
          setIsCustomer(true);
          setCustomer(response.data.customer);
        } else if (response.data.admin) {
          setLoggedIn(true);
          setIsAdmin(true);
          setAdmin(response.data.admin);
        } else {
          setLoggedIn(false);
          setIsCustomer(false);
          setIsAdmin(false);
        }
      })
      .catch(error => {
        console.log(error);
      });
  }, []);

  // if (loggedIn) {
  //   return (
  //     <div className="main-container container-fluid px-0">
  //       <Routes>
  //         <Route path="/categories" element={loggedIn ? isAdmin ? <AdminMain /> : <CategoryItemsPage /> : <SignIn />} />
  //         <Route path="/checkout-success" element={loggedIn ? isAdmin ? <AdminMain /> : <CheckoutSuccess /> : <SignIn />} />
  //         <Route path="/stuff" element={loggedIn ? isAdmin ? <AdminMain /> : <CheckoutSuccess /> : <SignIn />} />
  //         <Route path="*" element={<NotFoundPage />} />
  //       </Routes>
  //     </div>
  //   );
  // } else {
  //   return (
  //     <div className="main-container container-fluid px-0">
  //       <Routes>
  //         <Route path="/checkout-success" element={loggedIn ? isAdmin ? <AdminMain /> : <CheckoutSuccess customer={customer} /> : <SignIn />} />
  //       </Routes>
  //     </div>
  //   );
  // }

  if (loggedIn) {
    return (
      <div className="main-container container-fluid px-0">
        <Routes>
          <Route path="/" exact element={<Main admin={admin} customer={customer} />} />

          {/* ONLY CUSTOMERS */}
          <Route path="/signup" element={loggedIn ? isAdmin ? <Main /> : <Main /> : <SignUp />} />

          <Route path="/signin" element={loggedIn ? isAdmin ? <Main /> : <Main /> : <SignIn />} />

          <Route path="/wishlist" element={loggedIn ? isAdmin ? <Main /> : <Wishlist customer={customer} /> : <SignIn />} />

          <Route path="/details/:id" element={loggedIn ? isAdmin ? <Main /> : <Details customer={customer} /> : <SignIn />} />

          <Route path="/profile" element={loggedIn ? isAdmin ? <AdminMain /> : <Profile customer={customer} /> : <SignIn />} />

          <Route path="/checkout-success" element={loggedIn ? isAdmin ? <AdminMain /> : <CheckoutSuccess customer={customer} /> : <SignIn />} />

          <Route path="/categories/:category-name" element={<CategoryItems customer={customer} />} />

          {/* ONLY ADMINS */}
          <Route path="/admin" element={loggedIn ? isCustomer ? <Main /> : <AdminMain admin={admin} /> : <SignIn />} />

          <Route path="/admin/signin" element={loggedIn ? isCustomer ? <Main /> : <AdminSignIn /> : <AdminSignIn />} />

          <Route path="/admin/signup" element={loggedIn ? isCustomer ? <Main /> : <AdminSignUp /> : <AdminSignUp />} />

          <Route path="/admin/create-item" element={loggedIn ? isCustomer ? <Main /> : <AdminCreateItem /> : <SignIn />} />

          <Route path="/admin/item-list" element={loggedIn ? isCustomer ? <Main /> : <AdminItemList /> : <SignIn />} />

          <Route path="/admin/edit-item/:id" element={loggedIn ? isCustomer ? <Main /> : <AdminEditItem /> : <SignIn />} />

          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </div>
    );
  } else {
    return (
      <div className="main-container container-fluid px-0">
        <Routes>
          <Route path="/" exact element={<Main />} />

          {/* ONLY CUSTOMERS */}
          <Route path="/signup" element={<SignUp />} />

          <Route path="/signin" element={<SignIn />} />

          <Route path="/wishlist" element={loggedIn ? isAdmin ? <Main /> : <Wishlist /> : <SignIn />} />

          <Route path="/details/:id" element={loggedIn ? isAdmin ? <Main /> : <Details /> : <SignIn />} />

          <Route path="/profile" element={loggedIn ? isAdmin ? <AdminMain /> : <Profile /> : <SignIn />} />

          {/* ONLY ADMINS */}
          <Route path="/admin" element={loggedIn ? isCustomer ? <Main /> : <AdminMain /> : <SignIn />} />

          <Route path="/admin/signin" element={loggedIn ? isCustomer ? <Main /> : <AdminSignIn /> : <AdminSignIn />} />

          <Route path="/admin/signup" element={loggedIn ? isCustomer ? <Main /> : <AdminSignUp /> : <AdminSignUp />} />

          <Route path="/admin/create-item" element={loggedIn ? isCustomer ? <Main /> : <AdminCreateItem /> : <SignIn />} />

          <Route path="/admin/item-list" element={loggedIn ? isCustomer ? <Main /> : <AdminItemList /> : <SignIn />} />

          <Route path="/admin/edit-item/:id" element={loggedIn ? isCustomer ? <Main /> : <AdminEditItem /> : <SignIn />} />
        </Routes>
      </div>
    );
  }
}

export default App;
