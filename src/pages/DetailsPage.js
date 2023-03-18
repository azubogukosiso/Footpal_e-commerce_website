import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"

import Navbar from "../components/NavbarComponent";
import Modal from "../components/ModalComponent";
import Footer from "../components/FooterComponent";

const DetailsPage = () => {
	const [items, setItems] = useState([]);
	const [itemName, setItemName] = useState("");
	const [price, setPrice] = useState("");
	const [details, setDetails] = useState("");
	const [category, setCategory] = useState("");
	const [itemImage, setItemImage] = useState("");
	const [isOpen, setIsOpen] = useState(false);
	const [cartItems, setCartItems] = useState([]);

	// ADDING QUANTITY PROPERTY TO CART ITEMS OBJECT
	for (let i = 0; i < cartItems.length; i++) {
		cartItems[i].quantity = 1;
	};

	const { id } = useParams();

	const publicFolder = "http://localhost:5000/images/";

	const navigate = useNavigate();

	useEffect(() => {
		let instance = axios.create({
			withCredentials: true
		});

		// GETTING THE DETAILS OF THE ADMIN USING AVAILABLE COOKIES
		// instance.get("http://localhost:5000/admin/check-cookie")
		// 	.then((response) => { })
		// 	.catch((error) => {
		// 		console.log(error.response.data.message);
		// 		if (error.response.data.message) {
		// 			navigate("/signin");
		// 		}
		// 	});

		// GETTING DETAILS OF ITEM
		instance.get("http://localhost:5000/item/" + id)
			.then(response => {
				setItems(response.data);
				setItemName(response.data.itemName);
				setPrice(response.data.price);
				setDetails(response.data.details);
				setCategory(response.data.category);
				setItemImage(publicFolder + response.data.itemImage);
			})

		// LOADING CART ITEMS FROM THE LOCAL STORAGE
		const cartItemsLocalStorage = JSON.parse(localStorage.getItem("cart-items"));
		if (cartItemsLocalStorage) {
			setCartItems(cartItemsLocalStorage);
		}
	}, [id, navigate])

	// SHOW SUCCESS MESSAGE - ITEM ADDED TO CART
	const showSuccessMsgOne = () => {
		toast.success('Item added to cart!', {
			position: toast.POSITION.TOP_RIGHT,
			hideProgressBar: true,
			pauseOnHover: false,
			autoClose: 125
		});
	};

	// SHOW INFO MESSAGE - ITEM ALREADY IN CART
	const showSuccessMsgTwo = () => {
		toast.info('Item already in cart!', {
			position: toast.POSITION.TOP_RIGHT,
			hideProgressBar: true,
			pauseOnHover: false,
			autoClose: 3000
		});
	};

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

	// FUNCTION TO ADD ITEMS TO CART
	const addToCart = (item) => {
		let itemAlreadyExists = false;

		for (let i = 0; i < cartItems.length; i++) {
			if (cartItems[i]._id === item._id) {
				itemAlreadyExists = true;
				showSuccessMsgTwo();
				break;
			}
		}

		if (!itemAlreadyExists) {
			cartItems.push(item);
			saveToLocalStorage(cartItems);
			showSuccessMsgOne();
		}
	}

	return (
		<>
			<Navbar setIsOpen={setIsOpen} />
			<main className='d-flex justify-content-center align-items-center'>
				<div className="rounded p-4 d-flex flex-column flex-sm-row align-items-center my-5 w-75 border border-dark" style={{ boxShadow: "-15px 15px 0px 0px rgba(0,0,0,1)" }}>
					<div className="w-100 h-100 rounded overflow-hidden" style={{ objectFit: "cover" }}>
						<img src={itemImage} alt="" className="w-100 h-100" />
					</div>
					<div className="mx-4 w-100 mt-4 mt-sm-0">
						<div>
							<h4>{itemName}</h4>
							<h5><span className="badge bg-dark">{category}</span></h5>
							<h6>$ {price}</h6>
							<h6>{details}</h6>
						</div>
						<div className="d-flex flex-column flex-md-row">
							<button className="btn btn-dark" onClick={() => addToCart(items)}>add to cart</button>
							<span className="mx-2 my-2"></span>
							<button className="btn btn-dark">add to wishlist</button>
						</div>
					</div>
				</div>
				{isOpen && <Modal setIsOpen={setIsOpen} cartItems={cartItems} clearCart={clearCart} clearItem={clearItem} />}
			</main>
			<Footer />
			<ToastContainer />
		</>
	)
}

export default DetailsPage