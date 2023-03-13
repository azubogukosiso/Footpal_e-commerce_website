import { v4 as uuidv4 } from "uuid";

import './component_styles/ModalComponent.css';
import CartItem from "./CartItemComponent";

const ModalComponent = (props) => {
	// GETTING THE TOTAL AMOUNT OF CART ITEMS
	const priceArray = [];
	props.cartItems.map(item => (
		priceArray.push(item.price)
	))
	if (priceArray.length > 0) {
		var totalPrice = priceArray.reduce((accumulator, currentValue) => accumulator + currentValue);
	}

	return (
		<>
			<div className='backdrop' onClick={() => props.setIsOpen(false)} />
			<div className='cart-modal w-75 rounded bg-white shadow p-3 position-fixed'>
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
				<div className='my-3'>
					{
						props.cartItems.length > 0 ?
							(
								props.cartItems.map(item =>
								(
									<CartItem key={uuidv4()} itemName={item.itemName} itemQty={item.quantity} itemPrice={item.price} itemImage={item.itemImage} item={item} clearItem={props.clearItem} />
								)
								)
							) :
							(
								<h5 className="text-center text-lg-start">There are no items in your cart.</h5>
							)
					}
					{
						props.cartItems.length > 0 &&
						<button className='btn btn-dark w-100'>
							Checkout
						</button>
					}
				</div>
			</div>
		</>
	)
}

export default ModalComponent