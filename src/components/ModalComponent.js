import './component_styles/ModalComponent.css';
import { v4 as uuidv4 } from "uuid";

const ModalComponent = (props) => {
    const publicFolder = "http://localhost:5000/images/";
    return (
        <>
            <div className='backdrop' onClick={() => props.setIsOpen(false)} />
            <div className='cart-modal w-75 rounded bg-white shadow p-3 position-fixed'>
                <div className='d-flex justify-content-between align-items-center'>
                    <h4>Your Cart</h4>
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
                                    <div key={uuidv4()} className='rounded shadow mb-3 d-flex p-2 align-items-center justify-content-between'>
                                        <div className='rounded overflow-hidden w-25 h-100' style={{ objectFit: "cover" }}>
                                            <img src={publicFolder + item.itemImage} alt="" className="w-100 h-100" />
                                        </div>
                                        <div className="d-flex align-items-center w-75 justify-content-between">
                                            <div className='ms-3'>
                                                <p>{item.itemName}</p>
                                                <p>${item.price}</p>
                                                <button className='btn btn-danger' onClick={() => props.clearItem(item)}>
                                                    Remove
                                                </button>
                                            </div>
                                            <div className='me-3'>
                                                <button className='btn btn-dark'>-</button>
                                                <span className='mx-4'>{item.quantity}</span>
                                                <button className='btn btn-dark'>+</button>
                                            </div>
                                        </div>
                                    </div>
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