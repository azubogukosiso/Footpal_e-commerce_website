import { v4 as uuidv4 } from "uuid";
import axios from "axios";
import { useEffect, useState } from 'react';

import Navbar from "../components/NavbarComponent";
import OrderItem from "../components/OrderItemComponent";
import Footer from "../components/FooterComponent";

const AdminOrderListPage = (props) => {
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:5000/admin/orders")
            .then(res => {
                setOrders(res.data);
            })
            .catch(err => console.log(err));
    }, []);

    return (
        <>
            <Navbar admin={props.admin} />
            <main className="d-flex justify-content-center align-items-center">
                <div className='my-5 w-75 d-flex justify-content-center align-items-center flex-column'>
                    {orders.map(order => {
                        console.log(order);
                        return (
                            <>
                                <OrderItem key={uuidv4()} order={order} />
                            </>
                        );
                    })}
                </div>
            </main>
            <Footer />
        </>
    )
}

export default AdminOrderListPage