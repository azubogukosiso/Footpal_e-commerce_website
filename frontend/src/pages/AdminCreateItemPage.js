import { useRef, useState } from "react";
import { NavLink } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"

import "./page_styles/AdminCreateItemPage.css";

import Navbar from "../components/NavbarComponent";
import Footer from "../components/FooterComponent";

const AdminCreateItemPage = (props) => {
  const [itemName, setItemName] = useState("");
  const [price, setPrice] = useState("");
  const [details, setDetails] = useState("");
  const [category, setCategory] = useState("Work");
  const [itemImage, setItemImage] = useState(null);
  const [previewImage, setPreviewImage] = useState("");
  const [overlayRemoved, setOverlayRemoved] = useState(false);

  const inputRef = useRef();


  // IMAGE SELECTION FUNCTIONALITY
  const handleClick = () => {
    inputRef.current.click();
  }

  // DETECT IMAGE SELECTED AND PREVIEW THE IMAGE - DISALLOW INVALID IMAGES
  const changeHandler = async (e) => {
    setOverlayRemoved(true);
    setItemImage(await convertBase64(e.target.files[0]));

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

  // CONVERT TO BASE 64
  const convertBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);

      fileReader.onload = () => {
        resolve(fileReader.result);
      };

      fileReader.onerror = (error) => {
        reject(error);
      };
    });
  };

  // SHOW SUCCESS MESSAGE - ITEM HAS BEEN CREATED
  const showSuccessMsg = () => {
    toast.success('Item has been created!', {
      position: toast.POSITION.TOP_RIGHT,
      hideProgressBar: true,
      pauseOnHover: false,
    });
  };

  // FUNCTION TO SUBMIT ITEM DETAILS
  const onSubmitHandler = async (e) => {
    e.preventDefault();

    const newItem = {
      itemName,
      price,
      details,
      category,
      itemImage
    };

    // SUBMITS ALL DETAILS
    const instance = axios.create({
      withCredentials: true
    });

    instance.post(`${process.env.REACT_APP_API_URL}item/create`, newItem)
      .then(response => {
        response && showSuccessMsg();
      })
      .catch();
  };

  return (
    <>
      <Navbar admin={props.admin} />
      <main className="d-flex justify-content-center align-items-center">
        <form onSubmit={onSubmitHandler} className="rounded border border-dark p-4 p-md-5 my-5 w-75" style={{ boxShadow: "10px 10px 0px 0px rgba(0,0,0,1)" }}>
          <h1>Create an Item</h1>
          <div className="form-group mb-3">
            <label htmlFor="name">Name of Item</label>
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
              required
              ref={inputRef}
              style={{ display: 'none' }}
              className="form-control"
              onChange={changeHandler}
            />
            <div className="col col-md-6">
              <div className="create-item-img-container position-relative border border-dark rounded overflow-hidden w-100" role="button" onClick={handleClick}>
                <div className={overlayRemoved ? "create-item-overlay px-3 text-white position-absolute w-100 h-100 d-flex align-items-center justify-content-center d-none" : "create-item-overlay px-3 text-white position-absolute w-100 h-100 d-flex align-items-center justify-content-center"}
                >
                  <p className="text-dark">Click to select an image</p>
                </div>
                <img className="w-100 h-100 object-fit-cover" src={previewImage} alt="" />
              </div>
            </div>
          </div>

          <div className="form-group mb-3">
            <input
              type="submit"
              className="btn btn-dark w-100"
              value="Create Item"
            />
          </div>

          <div>
            Click <NavLink to="/admin" className="text-dark">here</NavLink> to return to main
          </div>
        </form>
      </main>
      <Footer />
      <ToastContainer />
    </>
  )
};

export default AdminCreateItemPage;
