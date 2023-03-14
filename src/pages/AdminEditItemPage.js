import { useState, useRef, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

import "./page_styles/AdminCreateItemPage.css";

import Navbar from "../components/NavbarComponent";
import Footer from "../components/FooterComponent";

const AdminEditItemPage = () => {
    const navigate = useNavigate();

    const { id } = useParams();

    const publicFolder = "http://localhost:5000/images/";

    const [itemName, setItemName] = useState("");
    const [price, setPrice] = useState("");
    const [details, setDetails] = useState("");
    const [category, setCategory] = useState("");
    const [itemImage, setItemImage] = useState("");
    const [previewImage, setPreviewImage] = useState("");
    const [overlayRemoved, setOverlayRemoved] = useState(false);

    const inputRef = useRef(null);

    useEffect(() => {
        let instance = axios.create({
            withCredentials: true
        });

        // GETTING THE DETAILS OF THE ADMIN USING AVAILABLE COOKIES
        instance.get("http://localhost:5000/admin/check-cookie")
            .then(response => { })
            .catch(error => {
                if (error.response.data.message) {
                    navigate("/admin/signin");
                }
            });

        // GETTING DETAILS OF ITEM TO BE EDITED
        instance.get("http://localhost:5000/item/" + id)
            .then(response => {
                setItemName(response.data.itemName);
                setPrice(response.data.price);
                setDetails(response.data.details);
                setCategory(response.data.category);
                setPreviewImage(publicFolder + response.data.itemImage);
                setOverlayRemoved(true);
            })
    }, [navigate, id])

    // IMAGE SELECTION FUNCTIONALITY
    const handleClick = () => {
        inputRef.current.click();
    }

    // DETECT IMAGE SELECTED AND PREVIEW THE IMAGE - DISALLOW INVALID IMAGES
    const changeHandler = (e) => {
        setOverlayRemoved(true);
        setItemImage(e.target.files[0]);
        setPreviewImage(URL.createObjectURL(e.target.files[0]));

        const fileExtension = e.target.files[0].name.split(".").at(-1);
        const fileSize = e.target.files[0].size;

        const allowedFileTypes = ["jpg", "png", "jpeg"];
        if (!allowedFileTypes.includes(fileExtension)) {
            alert('Selected file type not allowed. Only select .jpeg, .jpg and .png formats');
            setOverlayRemoved(false);
            setItemImage(null);
            setPreviewImage("");
        } else if (fileSize >= 2e5) {
            alert('Selected image is too big. Must not be more than 200kb');
            setOverlayRemoved(false);
            setItemImage(null);
            setPreviewImage("");
        }
    }

    // FUNCTION TO SUBMIT ITEM DETAILS
    const onSubmitHandler = async (e) => {
        e.preventDefault();

        const editedItem = {
            itemName,
            price,
            details,
            category
        };

        if (itemImage) {
            const data = new FormData();
            const filename = Date.now() + itemImage.name;
            data.append("name", filename);
            data.append("file", itemImage);
            editedItem.itemImage = filename; // ADDS THE IMAGE FILE NAME TO THE MAIN OBJECT

            // SAVING IMAGE TO SERVER
            try {
                const Imageinstance = axios.create({
                    withCredentials: true
                });
                await Imageinstance.post("http://localhost:5000/upload", data);
            } catch (err) {
                console.log(err);
            }
        }

        // SUBMITS ALL DETAILS
        const instance = axios.create({
            withCredentials: true
        });

        instance.post("http://localhost:5000/item/update/" + id, editedItem)
            .then(response => {
                if (response.data === "Item has been successfully edited!") {
                    navigate("/admin/item-list");
                }
            })
            .catch(error => {
                console.log(error.response);
            });
    };
    return (
        <>
            <Navbar />
            <main className="d-flex justify-content-center align-items-center">
                <form
                    onSubmit={onSubmitHandler}
                    className="rounded border border-light p-5 my-5 w-75" style={{ boxShadow: "0px 10px 15px 0px rgba(0,0,0,0.1)" }}
                >
                    <h1>Edit Item</h1>
                    <div className="form-group mb-3">
                        <label htmlFor="itemName">Name of Item</label>
                        <input
                            type="text"
                            required
                            className="form-control"
                            value={itemName}
                            onChange={(e) => setItemName(e.target.value)}
                        />
                    </div>

                    <div className="form-group mb-3">
                        <label htmlFor="price">Price of Item ($)</label>
                        <input
                            type="text"
                            required
                            className="form-control"
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                        />
                    </div>

                    <div className="form-group mb-3">
                        <label htmlFor="price">Item Details</label>
                        <input
                            type="text"
                            required
                            className="form-control"
                            value={details}
                            onChange={(e) => setDetails(e.target.value)}
                        />
                    </div>

                    <div className="form-group mb-3">
                        <label htmlFor="price">Item Category</label>
                        <input
                            type="text"
                            required
                            className="form-control"
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                        />
                    </div>

                    <div className="form-group mb-3">
                        <label htmlFor="image">Image of Item</label>
                        <input
                            type="file"
                            ref={inputRef}
                            style={{ display: 'none' }}
                            className="form-control"
                            onChange={changeHandler}
                        />
                        <div className="col col-md-6">
                            <div className="create-item-img-container position-relative border border-2 rounded overflow-hidden w-100" role="button" onClick={handleClick}>
                                <div className={overlayRemoved ? "create-item-overlay px-3 text-white position-absolute w-100 h-100 d-flex align-items-center justify-content-center d-none" : "create-item-overlay px-3 text-white position-absolute w-100 h-100 d-flex align-items-center justify-content-center"}
                                >
                                    <p>Click to select an image</p>
                                </div>
                                <img className="w-100 h-100 object-fit-cover" src={previewImage} alt="" />
                            </div>
                        </div>
                    </div>

                    <div className="form-group">
                        <input
                            type="submit"
                            className="btn btn-dark w-100"
                            value="Save Changes"
                        />
                    </div>
                </form>
            </main>
            <Footer />
        </>
    );
};

export default AdminEditItemPage;
