import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import axios from "axios";
import PulseLoader from "react-spinners/PulseLoader";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"

import Navbar from "../components/NavbarComponent";
import WishItem from "../components/WishItemComponent";
import Modal from "../components/ModalComponent";
import Footer from "../components/FooterComponent";

const WishListPage = (props) => {
	const [msg, setMsg] = useState();
	const [wishItems, setWishItems] = useState([]);
	const [isOpen, setIsOpen] = useState(false);
	const [cartItems, setCartItems] = useState([]);
	const [loading, setLoading] = useState(true);
	const userDetails = props.customer;

	// ADDING QUANTITY PROPERTY TO CART ITEMS OBJECT
	for (let i = 0; i < cartItems.length; i++) {
		cartItems[i].quantity = 1;
	}

	// SHOW ERROR MESSAGE - NO INTERNET
	const showErrorMsg = () => {
		toast.error("Unable to get wishlist items! Check your internet connection and try again.", {
			position: toast.POSITION.TOP_RIGHT,
			hideProgressBar: true,
			pauseOnHover: false,
			autoClose: false
		});
	};

	// FUNCTION TO LOAD ITEMS FROM WISHLIST
	const loadWishItems = () => {
		let instance = axios.create({
			withCredentials: true
		});

		instance.post(`${process.env.REACT_APP_API_URL}item/wishlist`, userDetails)
			.then(response => {
				if (response.data === "No Items in wishlist") {
					setLoading(false);
					setMsg(response.data);
				} else {
					setLoading(false);
					setWishItems(response.data);
				}
			})
			.catch(err => {
				err && showErrorMsg();
			});
	}

	useEffect(() => {
		loadWishItems();

		// LOADING CART ITEMS FROM THE LOCAL STORAGE
		const cartItemsLocalStorage = JSON.parse(localStorage.getItem("cart-items"));
		if (cartItemsLocalStorage) {
			setCartItems(cartItemsLocalStorage);
		}

		// eslint-disable-next-line
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

	let renderItems;
	if (!loading) {
		renderItems = wishItems.map(item => (
			<WishItem key={uuidv4()} itemName={item.itemName}
				itemImage={item.itemImage}
				category={item.category}
				details={item.details}
				price={item.price}
				mainId={item.mainId}
				id={item._id}
				loadWishItems={loadWishItems} />
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
						) : renderItems
					}
				</div>
				{isOpen && <Modal setIsOpen={setIsOpen} cartItems={cartItems} clearCart={clearCart} clearItem={clearItem} />}
			</main>
			<Footer />
			<ToastContainer />
		</>
	)
}

export default WishListPage