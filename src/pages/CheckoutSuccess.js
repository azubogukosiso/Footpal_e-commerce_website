import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";

import Navbar from "../components/NavbarComponent";
import Modal from "../components/ModalComponent";
import Footer from "../components/FooterComponent";

const CheckoutSuccess = (props) => {
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
                <h1>Order Placed Successfully!</h1>
                <p>Thanks for shopping at Footpal 😉</p>
                <NavLink className="text-dark" to="/">Return to homepage</NavLink>
            </main>
            {isOpen && <Modal cartItems={cartItems} setIsOpen={setIsOpen} />}
            <Footer />
        </>
    )
}

export default CheckoutSuccess