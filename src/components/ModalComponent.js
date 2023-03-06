import { v4 as uuidv4 } from "uuid";

import './component_styles/ModalComponent.css';
import CartItem from "./CartItemComponent";

const ModalComponent = (props) => {
	// const [itemQty, setItemQty] = useState(1);

	// CHANGING THE QUANTITY OF CART ITEMS
	const changeQty = (item, changeOp, id, qty) => {
		// console.log(item._id);
		// console.log(item.quantity);
		// console.log(changeOp);
		// console.log(qty);

		if (item._id === id) {
			console.log("same");
			item.quantity += 1;
			console.log(item.quantity);
			// setItemQty(item.quantity);
		}
		console.log(props.cartItems)
		console.log(item);

		// if (changeOp === "reduce") {
		// 	if (itemQty === 1) {
		// 		setItemQty(1);
		// 	} else {
		// 		setItemQty(itemQty - 1);
		// 	}
		// } else if (changeOp === "increase") {
		// 	setItemQty(itemQty + 1);
		// }
	}

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
				<div className='d-flex justify-content-between align-items-center'>
					<h4>Your Cart</h4>
					<div className='d-flex'>
						{
							totalPrice ? (
								<h5>Total: ${totalPrice}</h5>
							) : (
								<h5>Total: $0</h5>
							)
						}
					</div>
					<div className='d-flex'>
						{
							props.cartItems.length > 0 ? (
								<h5>{props.cartItems.length} selected shoes</h5>
							) : (
								<h5>No selected shoes</h5>
							)
						}
					</div>
					<div>
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
									// <div key={uuidv4()} className='rounded shadow mb-3 d-flex p-2 align-items-center justify-content-between'>
									// 	<div className='rounded overflow-hidden w-25 h-100' style={{ objectFit: "cover" }}>
									// 		<img src={publicFolder + item.itemImage} alt="" className="w-100 h-100" />
									// 	</div>
									// 	<div className="d-flex align-items-center w-75 justify-content-between">
									// 		<div className='ms-3'>
									// 			<p>{item.itemName}</p>
									// 			<p>${item.price}</p>
									// 			<button className='btn btn-danger' onClick={() => props.clearItem(item)}>
									// 				Remove
									// 			</button>
									// 		</div>
									// 		<div className='me-3'>
									// 			<button className='btn btn-dark' onClick={() => changeQty(item, "reduce", item._id, item.quantity)}>-</button>
									// 			<span className='mx-4'>{item.quantity}</span>
									// 			<button className='btn btn-dark' onClick={() => changeQty(item, "increase", item._id, item.quantity)}>+</button>
									// 		</div>
									// 	</div>
									// </div>
								)
								)
							) :
							(
								<>There are no items in the cart</>
							)
					}
					{
						props.cartItems.length > 0 && <button className='btn btn-dark w-100'>
							Checkout
						</button>
					}
				</div>
			</div>
		</>
	)
}

export default ModalComponent