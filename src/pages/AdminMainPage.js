import axios from "axios";
import { NavLink } from "react-router-dom";

import Navbar from "../components/NavbarComponent";
import Footer from "../components/FooterComponent";
import { useEffect } from "react";

const AdminMainPage = (props) => {
    const adminUsername = props.admin.username;

    useEffect(() => {
        axios.get("http://localhost:5000/admin/orders").then(res => console.log(res.data)).catch(err => console.log(err));
    }, []);

    return (
        <>
            <Navbar admin={props.admin} />
            <main className="d-flex border justify-content-center align-items-center">
                <div className="rounded border border-dark p-5 my-3 w-75" style={{ boxShadow: "-15px 15px 0px 0px rgba(0,0,0,1)" }}>
                    <h4 className="text-center">Welcome, {adminUsername} 😊</h4>
                    <div className="d-flex justify-content-center mt-3">
                        <NavLink to="/admin/create-item" className="text-dark">Create Items</NavLink>
                        <div className="mx-3"></div>
                        <NavLink to="/admin/item-list" className="text-dark">List of Items</NavLink>
                    </div>
                </div>
            </main>
            <Footer />
        </>
    )
}

export default AdminMainPage