import { useState, useRef, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"

import "./page_styles/AdminCreateItemPage.css";

import Navbar from "../components/NavbarComponent";
import Footer from "../components/FooterComponent";

const AdminEditItemPage = (props) => {
	const navigate = useNavigate();

	const { id } = useParams();

	const publicFolder = `${process.env.REACT_APP_API_URL}images/`;

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

		// GETTING DETAILS OF ITEM TO BE EDITED
		instance.get(`${process.env.REACT_APP_API_URL}item/` + id)
			.then(response => {
				setItemName(response.data.itemName);
				setPrice(response.data.price);
				setDetails(response.data.details);
				setCategory(response.data.category);
				setPreviewImage(publicFolder + response.data.itemImage);
				setOverlayRemoved(true);
			})
	}, [navigate, id, publicFolder])

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

	// SHOW ERROR MESSAGE - NO INTERNET
	const showErrorMsg = () => {
		toast.error("Unable to complete operation! Check your internet connection and try again.", {
			position: toast.POSITION.TOP_RIGHT,
			hideProgressBar: true,
			pauseOnHover: false,
			autoClose: false
		});
	};

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
				await Imageinstance.post(`${process.env.REACT_APP_API_URL}upload`, data);
			} catch (err) {
				err && showErrorMsg();
			}
		}

		// SUBMITS ALL DETAILS
		const instance = axios.create({
			withCredentials: true
		});

		instance.post(`${process.env.REACT_APP_API_URL}item/update/` + id, editedItem)
			.then(response => {
				if (response.data === "Item has been successfully edited!") {
					navigate("/admin/item-list");
				}
			})
			.catch(err => {
				err && showErrorMsg();
			});
	};
	return (
		<>
			<ToastContainer />
			<Navbar admin={props.admin} />
			<main className="d-flex justify-content-center align-items-center">
				<form
					onSubmit={onSubmitHandler}
					className="rounded border border-dark p-4 p-md-5 my-5 w-75" style={{ boxShadow: "10px 10px 0px 0px rgba(0,0,0,1)" }}
				>
					<h1>Edit Item</h1>
					<div className="form-group mb-3">
						<label htmlFor="itemName">Name of Item</label>
						<input
							type="text"
							required
							className="form-control border border-dark"
							value={itemName}
							onChange={(e) => setItemName(e.target.value)}
						/>
					</div>

					<div className="form-group mb-3">
						<label htmlFor="price">Price of Item ($)</label>
						<input
							type="text"
							required
							className="form-control border border-dark"
							value={price}
							onChange={(e) => setPrice(e.target.value)}
						/>
					</div>

					<div className="form-group mb-3">
						<label htmlFor="price">Item Details</label>
						<input
							type="text"
							required
							className="form-control border border-dark"
							value={details}
							onChange={(e) => setDetails(e.target.value)}
						/>
					</div>

					<div className="form-group mb-3">
						<label htmlFor="price">Item Category</label>
						<select required className="form-control border border-dark" value={category} onChange={(e) => setCategory(e.target.value)}>
							<option value="Work">Work</option>
							<option value="Stylish">Stylish</option>
							<option value="Sports">Sports</option>
							<option value="Casual">Casual</option>
							<option value="Industry">Industry</option>
						</select>
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
							<div className="create-item-img-container position-relative border border-2 rounded overflow-hidden w-100 border border-dark" role="button" onClick={handleClick}>
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
