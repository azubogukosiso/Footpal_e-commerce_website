import Navbar from "../components/NavbarComponent";
import Footer from "../components/FooterComponent";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const AdminMainPage = () => {
    const navigate = useNavigate();

    const [adminUsername, setAdminUsername] = useState("");

    useEffect(() => {
        const instance = axios.create({
            withCredentials: true
        });

        instance.post("http://localhost:5000/admin/check-cookie")
            .then(response => {
                console.log(response.data.admin);
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
                <main>
                    <p>Welcome, {adminUsername}!</p>
                </main>
                <Footer />
            </>
        )
    }
}

export default AdminMainPage