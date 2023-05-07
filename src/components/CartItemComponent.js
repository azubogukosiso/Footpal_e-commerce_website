const CartItemComponent = (props) => {
	const publicFolder = `${process.env.REACT_APP_API_URL}images/`;

	// INCREASE THE QUANTITY OF ITEMS
	const handleIncrease = (id) => {
		const priceArray = [];
		props.cartItems.map(item => {
			if (item._id === id) {
				item.quantity += 1;
			}
			priceArray.push(item.price * item.quantity);
		})
		props.updateTotalPrice(priceArray);
	};

	// REDUCE THE QUANTITY OF ITEMS
	const handleDecrease = (id) => {
		const priceArray = [];
		props.cartItems.map(item => {
			if (item._id === id && item.quantity > 1) {
				item.quantity -= 1;
			}
			priceArray.push(item.price * item.quantity);
		})
		props.updateTotalPrice(priceArray);
	};

	return (
		<div className='rounded border border-dark mb-5 d-flex flex-column flex-lg-row p-2 align-items-center justify-content-between' style={{ boxShadow: "10px 10px 0px 0px rgba(0,0,0,1)" }}>
			<div className='rounded overflow-hidden w-50 h-100' style={{ objectFit: "cover" }}>
				<img src={publicFolder + props.itemImage} alt="" className="w-100" />
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
					<button className='btn btn-dark' onClick={() => handleDecrease(props.item._id)}>-</button>
					<span className='mx-4'>{props.itemQty}</span>
					<button className='btn btn-dark' onClick={() => handleIncrease(props.item._id)}>+</button>
				</div>
			</div>
		</div>
	)
}

export default CartItemComponent
