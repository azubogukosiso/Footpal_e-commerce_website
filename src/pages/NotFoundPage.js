import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";

import Navbar from "../components/NavbarComponent";
import Modal from "../components/ModalComponent";
import Footer from "../components/FooterComponent";

import "./page_styles/AdminMainPage.css";

const CheckoutSuccess = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [cartItems, setCartItems] = useState();

    useEffect(() => {
        // LOADING CART ITEMS FROM THE LOCAL STORAGE
        let cartItemsLocalStorage = JSON.parse(localStorage.getItem("cart-items"));
        if (cartItemsLocalStorage) {
            cartItemsLocalStorage = [];
            setCartItems(cartItemsLocalStorage);
            saveToLocalStorage(cartItemsLocalStorage);
        }
    }, []);

    // SAVES CART ITEMS TO LOCAL STORAGE
    const saveToLocalStorage = (items) => {
        localStorage.setItem("cart-items", JSON.stringify(items));
    };

    return (
        <>
            <Navbar setIsOpen={setIsOpen} />
            <main className="d-flex justify-content-center align-items-center flex-column">
                <h1>Page Not Found!</h1>
                <p>The page you're looking for doesn't exist 😕</p>
                <NavLink className="text-dark navlink p-2 rounded" to="/">Return to homepage</NavLink>
            </main>
            {isOpen && <Modal cartItems={cartItems} setIsOpen={setIsOpen} />}
            <Footer />
        </>
    )
}

export default CheckoutSuccess