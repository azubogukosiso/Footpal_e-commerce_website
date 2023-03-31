import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import axios from "axios";

import Navbar from "../components/NavbarComponent";
import WishItem from "../components/WishItemComponent";
import Modal from "../components/ModalComponent";
import Footer from "../components/FooterComponent";

const WishListPage = (props) => {
	const [msg, setMsg] = useState();
	const [wishItems, setWishItems] = useState([]);
	const [isOpen, setIsOpen] = useState(false);
	const [cartItems, setCartItems] = useState([]);
	const userDetails = props.customer;

	// ADDING QUANTITY PROPERTY TO CART ITEMS OBJECT
	for (let i = 0; i < cartItems.length; i++) {
		cartItems[i].quantity = 1;
	}

	// FUNCTION TO LOAD ITEMS FROM WISHLIST
	const loadWishItems = () => {
		let instance = axios.create({
			withCredentials: true
		});

		instance.post("http://localhost:5000/item/wishlist", userDetails)
			.then(response => {
				if (response.data === "No Items in wishlist") {
					setMsg(response.data);
				} else {
					setWishItems(response.data);
				}
			})
			.catch(error => {
				console.log(error);
			});
	}

	useEffect(() => {
		loadWishItems();

		// LOADING CART ITEMS FROM THE LOCAL STORAGE
		const cartItemsLocalStorage = JSON.parse(localStorage.getItem("cart-items"));
		if (cartItemsLocalStorage) {
			setCartItems(cartItemsLocalStorage);
		}
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
				<div className="my-5 w-75">
					{
						msg ? (
							<h4>{msg}</h4>
						) : (
							wishItems.map(item => (
								<WishItem key={uuidv4()} itemName={item.itemName}
									itemImage={item.itemImage}
									category={item.category}
									details={item.details}
									price={item.price}
									mainId={item.mainId}
									id={item._id}
									loadWishItems={loadWishItems} />
							))
						)
					}
				</div>
				{isOpen && <Modal setIsOpen={setIsOpen} cartItems={cartItems} clearCart={clearCart} clearItem={clearItem} />}
			</main>
			<Footer />
		</>
	)
}

export default WishListPage