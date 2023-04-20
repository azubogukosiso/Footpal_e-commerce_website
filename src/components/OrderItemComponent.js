import { useState } from 'react'

const OrderItemComponent = (props) => {
    const [deliveryStatus, setDeliveryStatus] = useState(props.order.delivery_status);

    return (
        <>
            <div className="rounded p-3 d-flex flex-column my-5 w-100 border border-dark" style={{ boxShadow: "10px 10px 0px 0px rgba(0,0,0,1)" }}>
                <span>Customer Email: {props.order.userId}</span> <hr />
                <span>Shipping Details:</span>
                <ul>
                    <li>Address 1: {props.order.shipping.address.line1}</li>
                    <li>Address 2: {props.order.shipping.address.line2}</li>
                    <li>Postal Code: {props.order.shipping.address.postal_code}</li>
                    <li>Email: {props.order.shipping.email}</li>
                    <li>Phone: {props.order.shipping.phone}</li>
                </ul> <hr />
                <span>Ordered Items:</span>
                <ul>
                    {
                        props.order.products.map(product =>
                        (
                            <li>{product.description}</li>
                        )
                        )
                    }
                </ul> <hr />
                <div>
                    {
                        deliveryStatus === "pending" ? (<button className='btn btn-success'>Confirm Order</button>) : (<button className='btn btn-danger'>Delete Order</button>)
                    }
                </div>
            </div>
        </>
    )
}

export default OrderItemComponent