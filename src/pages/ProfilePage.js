import { useEffect, useState } from "react";
import axios from "axios";

import Navbar from "../components/NavbarComponent";
import Modal from "../components/ModalComponent";
import Footer from "../components/FooterComponent";

const ProfilePage = () => {
    const [gotUserDetails, setGotUserDetails] = useState(false);
    const [customerUsername, setCustomerName] = useState("");
    const [customerEmail, setCustomerEmail] = useState("");
    const [customerDate, setCustomerDate] = useState("");
    const [isOpen, setIsOpen] = useState(false);
    const [cartItems, setCartItems] = useState([]);

    // ADDING QUANTITY PROPERTY TO CART ITEMS OBJECT
    for (let i = 0; i < cartItems.length; i++) {
        cartItems[i].quantity = 1;
    }

    useEffect(() => {
        let instance = axios.create({
            withCredentials: true
        });

        // GETTING THE DETAILS OF THE USER USING AVAILABLE COOKIES
        instance.post("http://localhost:5000/general/check-cookie")
            .then(response => {
                const customerDetails = response.data.customer;
                setCustomerName(customerDetails.username);
                setCustomerEmail(customerDetails.email);
                setCustomerDate(new Date(customerDetails.createdAt).toDateString());
                setGotUserDetails(true);
            })
            .catch(error => {
                console.log(error);
            })

        // LOADING CART ITEMS FROM THE LOCAL STORAGE
        const cartItemsLocalStorage = JSON.parse(localStorage.getItem("cart-items"));
        if (cartItemsLocalStorage) {
            setCartItems(cartItemsLocalStorage);
        }
    }, [])

    // CLEAR ITEMS IN THE CART
    const clearCart = () => {
        setCartItems([]);
    }

    // CLEAR JUST ONE ITEM IN THE CART
    const clearItem = (item) => {
        const cartItemList = cartItems.filter(cartItem => cartItem._id !== item._id);
        setCartItems(cartItemList);
    }

    if (gotUserDetails) {
        return (
            <>
                <Navbar setIsOpen={setIsOpen} />
                <main className="d-flex border justify-content-center align-items-center">
                    <div className="rounded shadow-sm border border-light p-5 my-3 w-75">
                        <h5>Name: {customerUsername}</h5>
                        <h5>Email: {customerEmail}</h5>
                        <h5>Date of account creation: {customerDate}</h5>
                    </div>
                    {isOpen && <Modal setIsOpen={setIsOpen} cartItems={cartItems} clearCart={clearCart} clearItem={clearItem} />}
                </main>
                <Footer />
            </>
        )
    }
}

export default ProfilePage