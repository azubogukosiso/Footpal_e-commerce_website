import { useEffect, useState } from "react";

import Navbar from "../components/NavbarComponent";
import Modal from "../components/ModalComponent";
import Footer from "../components/FooterComponent";

const ProfilePage = (props) => {
    const userDetails = props.customer;
    const [isOpen, setIsOpen] = useState(false);
    const [cartItems, setCartItems] = useState([]);

    // ADDING QUANTITY PROPERTY TO CART ITEMS OBJECT
    for (let i = 0; i < cartItems.length; i++) {
        cartItems[i].quantity = 1;
    }

    useEffect(() => {
        // LOADING CART ITEMS FROM THE LOCAL STORAGE
        const cartItemsLocalStorage = JSON.parse(localStorage.getItem("cart-items"));
        if (cartItemsLocalStorage) {
            setCartItems(cartItemsLocalStorage);
        }
    }, [])

    // SAVES CART ITEMS TO LOCAL STORAGE
    const saveToLocalStorage = (items) => {
        localStorage.setItem("cart-items", JSON.stringify(items));
    };

    // CLEAR ITEMS IN THE CART
    const clearCart = () => {
        const cartItemList = cartItems.filter(cartItem => cartItem._id === "");
        setCartItems(cartItemList);
        saveToLocalStorage(cartItemList);
    }

    // CLEAR JUST ONE ITEM IN THE CART
    const clearItem = (item) => {
        const cartItemList = cartItems.filter(cartItem => cartItem._id !== item._id);
        setCartItems(cartItemList);
        saveToLocalStorage(cartItemList);
    }

    if (userDetails) {
        return (
            <>
                <Navbar setIsOpen={setIsOpen} />
                <main className="d-flex justify-content-center align-items-center">
                    <div className="rounded border border-dark p-3 px-4 p-md-5 my-3 w-75" style={{ boxShadow: "-15px 15px 0px 0px rgba(0,0,0,1)" }}>
                        <h5>Name: <br /> {userDetails.username}</h5>
                        <hr />
                        <h5>Email: <br /> {userDetails.email}</h5>
                        <hr />
                        <h5>Date of account creation: <br /> {new Date(userDetails.createdAt).toDateString()}</h5>
                    </div>
                    {isOpen && <Modal setIsOpen={setIsOpen} cartItems={cartItems} clearCart={clearCart} clearItem={clearItem} />}
                </main>
                <Footer />
            </>
        )
    }
}

export default ProfilePage