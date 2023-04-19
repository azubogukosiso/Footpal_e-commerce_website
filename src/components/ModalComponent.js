import { useState, useEffect } from "react";
import PulseLoader from "react-spinners/PulseLoader";
import { v4 as uuidv4 } from "uuid";
import axios from "axios";

import './component_styles/ModalComponent.css';
import CartItem from "./CartItemComponent";

const ModalComponent = (props) => {
	const [totalPrice, setTotalPrice] = useState();
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		// GETTING THE TOTAL PRICE OF CART ITEMS AT FIRST RENDER
		const priceArray = [];
		props.cartItems.map(item => (
			priceArray.push(item.price * item.quantity)
		))
		if (priceArray.length > 0) {
			let total = priceArray.reduce((accumulator, currentValue) => accumulator + currentValue);
			setTotalPrice(total);
		} else {
			setTotalPrice(0);
		}
	}, [props.cartItems]);

	// UPDATING THE TOTAL PRICE ON QUANTITY CHANGE
	const updateTotalPrice = (priceArray) => {
		if (priceArray.length > 0) {
			let newTotalPrice = priceArray.reduce((accumulator, currentValue) => accumulator + currentValue);
			setTotalPrice(newTotalPrice);
		}
	}

	// SENDS THE CART ITEMS TO BE HANDLED BY STRIPE
	const handleCheckout = () => {
		setLoading(true);
		console.log(props.cartItems);
		const cartItems = props.cartItems;
		axios.post("http://localhost:5000/stripe/create-checkout-session", {
			cartItems,
			customerEmail: props.customerEmail
		}).then(res => {
			if (res.data.url) {
				console.log(res.data.url);
				window.location.href = res.data.url;
			}
		}).catch(err => {
			console.log(err.message);
		});
	};

	return (
		<>
			<div className='backdrop' onClick={() => props.setIsOpen(false)} />
			<div className='cart-modal w-75 rounded bg-white p-3 position-fixed' style={{ boxShadow: "0px 8px 15px 2px rgba(0,0,0,0.18)" }}>
				<div className='d-flex flex-column flex-lg-row justify-content-between align-items-center'>
					<div className="text-center d-lg-flex justify-content-start align-items-center">
						<h1>Your Cart</h1>
						<span className="mx-lg-4"></span>
						<div>
							{
								totalPrice ? (
									<h5 className="text-center">Total: ${totalPrice}</h5>
								) : (
									<h5 className="text-center">Total: $0</h5>
								)
							}
						</div>
						<span className="mx-lg-4"></span>
						<div>
							{
								props.cartItems.length > 0 ? (
									<h5 className="text-center">{props.cartItems.length} selected shoes</h5>
								) : (
									<h5 className="text-center">No selected shoes</h5>
								)
							}
						</div>
					</div>
					<div className="d-flex">
						<button className='btn btn-dark' onClick={() => props.clearCart()}>
							Clear Cart
						</button>
						<span className='mx-2'></span>
						<button className='btn btn-dark' onClick={() => props.setIsOpen(false)}>
							Close
						</button>
					</div>
				</div>
				<hr />
				<div className='my-3'>
					{
						props.cartItems.length > 0 ?
							(
								props.cartItems.map(item =>
								(
									<CartItem key={uuidv4()} itemName={item.itemName} itemQty={item.quantity} itemPrice={item.price} itemImage={item.itemImage} item={item} cartItems={props.cartItems} clearItem={props.clearItem} updateTotalPrice={updateTotalPrice} />
								)
								)
							) :
							(
								<h5 className="text-center text-lg-start">There are no items in your cart.</h5>
							)
					}
					{
						props.cartItems.length > 0 &&
						<button className='btn btn-dark w-100' onClick={() => handleCheckout()}>
							{loading ? (<PulseLoader color="#fff" className="d-flex justify-content-center align-items-center" size={10} />) : (<>Checkout</>)}
						</button>
					}
				</div>
			</div>
		</>
	)
}

export default ModalComponent
