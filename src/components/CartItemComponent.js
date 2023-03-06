import React from 'react'

const CartItemComponent = (props) => {
	const publicFolder = "http://localhost:5000/images/";

	// CHANGING THE QUANTITY OF CART ITEMS
	const changeQty = (item, changeOp, id, qty) => {
		if (item._id === id) {
			console.log("same");
			item.quantity += 1;
			console.log(item.quantity);
		}
		console.log(item);
	}

	return (
		<div className='rounded shadow mb-3 d-flex p-2 align-items-center justify-content-between'>
			<div className='rounded overflow-hidden w-25 h-100' style={{ objectFit: "cover" }}>
				<img src={publicFolder + props.itemImage} alt="" className="w-100 h-100" />
			</div>
			<div className="d-flex align-items-center w-75 justify-content-between">
				<div className='ms-3'>
					<p>{props.itemName}</p>
					<p>${props.itemPrice}</p>
					<button className='btn btn-danger' onClick={() => props.clearItem(props.item)}>
						Remove
					</button>
				</div>
				<div className='me-3'>
					<button className='btn btn-dark' onClick={() => changeQty(props.item, "reduce", props.item._id, props.itemQty)}>-</button>
					<span className='mx-4'>{props.itemQty}</span>
					<button className='btn btn-dark' onClick={() => changeQty(props.item, "increase", props.item._id, props.itemQty)}>+</button>
				</div>
			</div>
		</div>
	)
}

export default CartItemComponent