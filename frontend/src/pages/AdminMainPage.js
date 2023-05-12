import { NavLink } from "react-router-dom";

import Navbar from "../components/NavbarComponent";
import Footer from "../components/FooterComponent";

import "./page_styles/AdminMainPage.css";

const AdminMainPage = (props) => {
	const adminUsername = props.admin.username;

	return (
		<>
			<Navbar admin={props.admin} />
			<main className="d-flex border justify-content-center align-items-center">
				<div className="rounded border border-dark p-5 my-3 w-75" style={{ boxShadow: "-15px 15px 0px 0px rgba(0,0,0,1)" }}>
					<h4 className="text-center">Welcome, {adminUsername} 😊</h4>
					<div className="d-flex align-items-center justify-content-center flex-column flex-sm-row mt-3">
						<NavLink to="/admin/create-item" className="navlink text-dark p-2 rounded">Create an Item</NavLink>
						<div className="mx-3 my-1"></div>
						<NavLink to="/admin/item-list" className="navlink text-dark p-2 rounded">List of Items</NavLink>
						<div className="mx-3 my-1"></div>
						<NavLink to="/admin/order-list" className="navlink text-dark p-2 rounded">List of Orders</NavLink>
					</div>
				</div>
			</main>
			<Footer />
		</>
	)
}

export default AdminMainPage