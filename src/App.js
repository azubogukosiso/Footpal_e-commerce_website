import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";

import Main from "./pages/MainPage";
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
  return (
    <BrowserRouter>
      <div className="main-container container-fluid px-0">
        <Routes>
          <Route path="/" exact element={<Main />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/details/:id" element={<Details />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/admin/" element={<AdminMain />} />
          <Route path="/admin/signin" element={<AdminSignIn />} />
          <Route path="/admin/signup" element={<AdminSignUp />} />
          <Route path="/admin/create-item" element={<AdminCreateItem />} />
          <Route path="/admin/item-list" element={<AdminItemList />} />
          <Route path="/admin/edit-item/:id" element={<AdminEditItem />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
