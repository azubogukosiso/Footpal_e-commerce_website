import { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import { useParams } from "react-router-dom";
import axios from "axios";
import PulseLoader from "react-spinners/PulseLoader";

import Navbar from "../components/NavbarComponent";
import CategoryItem from "../components/CategoryItemComponent";
import Modal from "../components/ModalComponent";
import Footer from "../components/FooterComponent";

const CategoryItemsPage = () => {
    const [msg, setMsg] = useState();
    const [isOpen, setIsOpen] = useState(false);
    const [categoryItems, setCategoryItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [cartItems, setCartItems] = useState([]);

    // ADDING QUANTITY PROPERTY TO CART ITEMS OBJECT
    for (let i = 0; i < cartItems.length; i++) {
        cartItems[i].quantity = 1;
    };

    const { category } = useParams();
    const namesCaps = category.charAt(0).toUpperCase() + category.slice(1);

    useEffect(() => {
        axios.post("http://localhost:5000/item/category", { category })
            .then(response => {
                if (response.data === "There are no items of this category at the moment.") {
                    setLoading(false);
                    setMsg(response.data);
                } else {
                    setLoading(false);
                    setCategoryItems(response.data);
                }
            }).catch(error => {
                console.log(error);
            });

        // LOADING CART ITEMS FROM THE LOCAL STORAGE
        const cartItemsLocalStorage = JSON.parse(localStorage.getItem("cart-items"));
        if (cartItemsLocalStorage) {
            setCartItems(cartItemsLocalStorage);
        }
    }, [category])

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

    let renderItems;
    if (!loading) {
        renderItems = categoryItems.map(item => (
            <CategoryItem key={uuidv4()} itemName={item.itemName}
                itemImage={item.itemImage}
                category={item.category}
                details={item.details}
                price={item.price}
                id={item._id} />
        ))
    } else {
        renderItems = <PulseLoader color="#000" className="justify-content-center my-5" size={20} />
    }

    return (
        <>
            <Navbar setIsOpen={setIsOpen} />
            <main className="d-flex justify-content-center align-items-center">
                <div className="my-5 w-75 d-flex justify-content-center align-items-center flex-column">
                    {
                        msg ? (
                            <h2>{msg}</h2>

                        ) : (
                            <>
                                <h2>{namesCaps} Footwear</h2>
                                {renderItems}
                            </>
                        )
                    }
                </div>
                {isOpen && <Modal setIsOpen={setIsOpen} cartItems={cartItems} clearCart={clearCart} clearItem={clearItem} />}
            </main>
            <Footer />
        </>
    )
}

export default CategoryItemsPage
