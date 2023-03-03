import { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";

import Navbar from "../components/NavbarComponent";
import Footer from "../components/FooterComponent";
import axios from "axios";


const AdminMainPage = () => {
    const navigate = useNavigate();

    const [adminUsername, setAdminUsername] = useState("");

    useEffect(() => {
        let instance = axios.create({
            withCredentials: true
        });

        // GETTING THE DETAILS OF THE ADMIN USING AVAILABLE COOKIES
        instance.get("http://localhost:5000/admin/check-cookie")
            .then(response => {
                const adminDetails = response.data.admin;
                setAdminUsername(adminDetails.username);
            })
            .catch(error => {
                console.log(error.response.data.message);
                if (error.response.data.message) {
                    navigate("/admin/signin");
                }
            })
    }, [navigate])

    if (adminUsername !== "") {
        return (
            <>
                <Navbar />
                <main className="d-flex border justify-content-center align-items-center">
                    <div className="rounded shadow-sm border border-light p-5 my-3 w-75">
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
}

export default AdminMainPage