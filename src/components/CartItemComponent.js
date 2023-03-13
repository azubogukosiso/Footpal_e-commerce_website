import { useState } from "react";

const CartItemComponent = (props) => {
	const [itemQty, setItemQty] = useState(props.itemQty);

	const publicFolder = "http://localhost:5000/images/";

	// CHANGING THE QUANTITY OF CART ITEMS
	const changeQty = (item, changeOp, id, qty) => {
		if (item._id === id) {
			if (changeOp === "reduce") {
				if (itemQty === 1) {
					setItemQty(1);
				} else {
					setItemQty(itemQty - 1);
					item.quantity = itemQty;
				}
			} else {
				setItemQty(itemQty + 1);
				item.quantity = itemQty;
			}
		}
	}

	return (
		<div className='rounded shadow mb-3 d-flex flex-column flex-lg-row p-2 align-items-center justify-content-between'>
			<div className='rounded overflow-hidden w-50 h-100' style={{ objectFit: "cover" }}>
				<img src={publicFolder + props.itemImage} alt="" className="w-100 h-100" />
			</div>


			<div className="d-flex flex-column flex-sm-row align-items-center justify-content-between w-100">
				<div className='ms-0 ms-sm-3 mb-2 mb-sm-0 text-center text-sm-start py-2'>
					<h4>{props.itemName}</h4>
					<p>${props.itemPrice}</p>
					<button className='btn btn-danger' onClick={() => props.clearItem(props.item)}>
						Remove
					</button>
				</div>
				<div className='me-0 me-sm-3'>
					<button className='btn btn-dark' onClick={() => changeQty(props.item, "reduce", props.item._id, props.itemQty)}>-</button>
					<span className='mx-4'>{itemQty}</span>
					<button className='btn btn-dark' onClick={() => changeQty(props.item, "increase", props.item._id, props.itemQty)}>+</button>
				</div>
			</div>
		</div>
	)
}

export default CartItemComponent