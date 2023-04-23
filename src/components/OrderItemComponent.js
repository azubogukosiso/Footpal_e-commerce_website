import axios from "axios";
import { v4 as uuidv4 } from "uuid";

const OrderItemComponent = (props) => {
    const deliveryStatus = props.order.delivery_status;

    return (
        <>
            <div className="rounded p-3 d-flex flex-column my-5 w-100 border border-dark" style={{ boxShadow: "10px 10px 0px 0px rgba(0,0,0,1)" }}>
                <span><strong> Customer Email:</strong></span>
                {props.order.userId} <hr />
                <span><strong> Shipping Details:</strong></span>
                <ul>
                    <li>Address 1: {props.order.shipping.address.line1}</li>
                    <li>Address 2: {props.order.shipping.address.line2}</li>
                    <li>Postal Code: {props.order.shipping.address.postal_code}</li>
                    <li>Email: {props.order.shipping.email}</li>
                    <li>Phone: {props.order.shipping.phone}</li>
                </ul> <hr />
                <span><strong> Ordered Items:</strong></span>
                <ul>
                    {
                        props.order.products.map(product =>
                        (
                            <li key={uuidv4()}>{product.description} - $ {product.amount_total / 100}</li>
                        )
                        )
                    }
                </ul> <hr />
                <span><strong> Total Price:</strong></span>
                $ {props.order.total / 100} <hr />
                <div>
                    {
                        deliveryStatus === "pending" ?
                            (
                                <button className='btn btn-success' onClick={() => {
                                    axios.post("http://localhost:5000/admin/orders/" + props.order._id).then(res => {
                                        if (res.data) {
                                            props.getOrders();
                                            props.toastOne();
                                        }
                                    });
                                }}>Confirm Delivery</button>
                            ) :
                            (
                                <button className='btn btn-danger' onClick={() => {
                                    axios.delete("http://localhost:5000/admin/orders/" + props.order._id).then(res => {
                                        if (res.data) {
                                            props.getOrders();
                                            props.toastTwo();
                                        }
                                    });
                                }}>Delete Order</button>
                            )
                    }
                </div>
            </div>
        </>
    )
}

export default OrderItemComponent