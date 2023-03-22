import { useEffect, useState } from "react";
import axios from "axios";

import Navbar from "../components/NavbarComponent";
import Modal from "../components/ModalComponent";
import Footer from "../components/FooterComponent";

const WishListPage = () => {
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

		// LOADING ITEMS FROM WISHLIST
		let instance = axios.create({
			withCredentials: true
		});

		instance.post("http://localhost:5000/item/wishlist")
			.then(response => {
				console.log(response);
			})
			.catch(error => {
				console.log(error);
			});
	}, []);

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

	return (
		<>
			<Navbar setIsOpen={setIsOpen} />
			<main className="d-flex justify-content-center align-items-center">
				{isOpen && <Modal setIsOpen={setIsOpen} cartItems={cartItems} clearCart={clearCart} clearItem={clearItem} />}
			</main>
			<Footer />
		</>
	)
}

export default WishListPage