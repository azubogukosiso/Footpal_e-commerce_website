import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";

import Main from "./pages/MainPage";
import SignUp from "./pages/SignUpPage";
import SignIn from "./pages/SignInPage";
import AdminSignIn from "./pages/AdminSigninPage";
import AdminSignUp from "./pages/AdminSignUpPage";
import AdminMain from "./pages/AdminMainPage";
import AdminCreateCategory from "./pages/AdminCreateCategoryPage";
import AdminCreateItem from "./pages/AdminCreateItemPage";
import AdminEditCategory from "./pages/AdminEditCategoryPage";
import AdminEditItem from "./pages/AdminEditItemPage";

function App() {
  return (
    <BrowserRouter>
      <div className="main-container container-fluid px-0">
        <Routes>
          <Route path="/" exact element={<Main />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/admin/" element={<AdminMain />} />
          <Route path="/admin/signin" element={<AdminSignIn />} />
          <Route path="/admin/signup" element={<AdminSignUp />} />
          <Route path="/admin/create-category" element={<AdminCreateCategory />} />
          <Route path="/admin/create-item" element={<AdminCreateItem />} />
          <Route path="/admin/edit-category" element={<AdminEditCategory />} />
          <Route path="/admin/edit-item" element={<AdminEditItem />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
