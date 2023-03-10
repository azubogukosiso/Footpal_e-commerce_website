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
                <main className="d-flex justify-content-center align-items-center">
                    <div className="rounded border border-light p-3 px-4 p-md-5 my-3 w-75" style={{ boxShadow: "0px 10px 15px 0px rgba(0,0,0,0.1)" }}>
                        <h5>Name: <br /> {customerUsername}</h5>
                        <hr />
                        <h5>Email: <br /> {customerEmail}</h5>
                        <hr />
                        <h5>Date of account creation: <br /> {customerDate}</h5>
                    </div>
                    {isOpen && <Modal setIsOpen={setIsOpen} cartItems={cartItems} clearCart={clearCart} clearItem={clearItem} />}
                </main>
                <Footer />
            </>
        )
    }
}

export default ProfilePage