import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

import Navbar from "../components/NavbarComponent";
import Modal from "../components/ModalComponent";
import Footer from "../components/FooterComponent";

const DetailsPage = () => {
    const [itemName, setItemName] = useState("");
    const [price, setPrice] = useState("");
    const [details, setDetails] = useState("");
    const [category, setCategory] = useState("");
    const [itemImage, setItemImage] = useState("");
    const [isOpen, setIsOpen] = useState(false);

    const { id } = useParams();

    const publicFolder = "http://localhost:5000/images/";

    const navigate = useNavigate();

    useEffect(() => {
        let instance = axios.create({
            withCredentials: true
        });

        // GETTING THE DETAILS OF THE ADMIN USING AVAILABLE COOKIES
        instance.get("http://localhost:5000/admin/check-cookie")
            .then((response) => { })
            .catch((error) => {
                console.log(error.response.data.message);
                if (error.response.data.message) {
                    navigate("/signin");
                }
            });

        // GETTING DETAILS OF ITEM
        instance.get("http://localhost:5000/item/" + id)
            .then(response => {
                setItemName(response.data.itemName);
                setPrice(response.data.price);
                setDetails(response.data.details);
                setCategory(response.data.category);
                setItemImage(publicFolder + response.data.itemImage);
            })
    }, [id])

    return (
        <>
            <Navbar setIsOpen={setIsOpen} />
            <main className='d-flex justify-content-center align-items-center'>
                <div className="rounded d-flex align-items-center my-5 w-75 shadow-sm border border-light">
                    <div className="w-50 h-100 rounded-start overflow-hidden" style={{ objectFit: "cover" }}>
                        <img src={itemImage} alt="" className="w-100 h-100" />
                    </div>
                    <div className="mx-4 w-50">
                        <div>
                            <h4>{itemName}</h4>
                            <h5><span className="badge bg-dark">{category}</span></h5>
                            <h6>$ {price}</h6>
                            <h6>{details}</h6>
                        </div>
                        <div>
                            <button className="btn btn-dark">add to cart</button>
                            <span className="mx-2"></span>
                            <button className="btn btn-dark">add to wishlist</button>
                        </div>
                    </div>
                </div>
                {isOpen && <Modal setIsOpen={setIsOpen} />}
            </main>
            <Footer />
        </>
    )
}

export default DetailsPage