import { v4 as uuidv4 } from "uuid";
import axios from "axios";
import { useEffect, useState } from 'react';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import PulseLoader from "react-spinners/PulseLoader";

import Navbar from "../components/NavbarComponent";
import OrderItem from "../components/OrderItemComponent";
import Footer from "../components/FooterComponent";

const AdminOrderListPage = (props) => {
	const [orders, setOrders] = useState([]);
	const [loading, setLoading] = useState(true);
	const [msg, setMsg] = useState();

	// SHOW ERROR MESSAGE - NO INTERNET
	const showErrorMsg = () => {
		toast.error("Dear Customer, it seems you're offline! Ensure that you're connected to the internet and then refresh your browser", {
			position: toast.POSITION.TOP_RIGHT,
			hideProgressBar: true,
			pauseOnHover: false,
			autoClose: false
		});
	};

	const getOrders = () => {
		axios.get(`${process.env.REACT_APP_API_URL}admin/orders`)
			.then(res => {
				if (res.data === "No Orders for now") {
					setLoading(false);
					setMsg(res.data);
				} else {
					setLoading(false);
					setOrders(res.data);
				}
			})
			.catch(err => {
				err && showErrorMsg();
			});
	}

	// SHOW SUCCESS MESSAGE - ORDER CONFIRMED
	const showSuccessMsgOneOrder = () => {
		toast.success('Order confirmed and item successfully delivered!', {
			position: toast.POSITION.TOP_RIGHT,
			hideProgressBar: true,
			pauseOnHover: false,
			autoClose: 3000
		});
	};

	// SHOW SUCCESS MESSAGE - ORDER DELETED
	const showSuccessMsgTwoOrder = () => {
		toast.success('Order successfully deleted!', {
			position: toast.POSITION.TOP_RIGHT,
			hideProgressBar: true,
			pauseOnHover: false,
			autoClose: 2000
		});
	};

	let renderItems;
	if (!loading) {
		renderItems = orders.map(order =>
		(
			<OrderItem key={uuidv4()} order={order} getOrders={getOrders} toastOne={showSuccessMsgOneOrder} toastTwo={showSuccessMsgTwoOrder} />
		)
		)
	} else {
		renderItems = <PulseLoader color="#000" className="justify-content-center my-5" size={20} />
	};

	useEffect(() => {
		getOrders();
	}, []);

	return (
		<>
			<Navbar admin={props.admin} />
			<main className="d-flex justify-content-center align-items-center">
				<div className='my-5 w-75 d-flex justify-content-center align-items-center flex-column'>
					{
						msg ? (
							<h2>{msg}</h2>
						) : renderItems
					}
				</div>
			</main>
			<Footer />
			<ToastContainer />
		</>
	)
}

export default AdminOrderListPage;