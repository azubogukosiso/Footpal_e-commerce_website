import { useRef, useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"

import "./page_styles/AdminCreateItemPage.css";

import Navbar from "../components/NavbarComponent";
import Footer from "../components/FooterComponent";

const AdminCreateItemPage = () => {
  const navigate = useNavigate();

  const [itemName, setItemName] = useState("");
  const [price, setPrice] = useState("");
  const [details, setDetails] = useState("");
  const [category, setCategory] = useState("");
  const [itemImage, setItemImage] = useState(null);
  const [previewImage, setPreviewImage] = useState("");
  const [overlayRemoved, setOverlayRemoved] = useState(false);

  const inputRef = useRef(null);

  useEffect(() => {
    const instance = axios.create({
      withCredentials: true
    });

    // GETTING THE DETAILS OF THE ADMIN USING AVAILABLE COOKIES
    instance.get("http://localhost:5000/admin/check-cookie")
      .then(response => { })
      .catch(error => {
        console.log(error.response.data.message);
        if (error.response.data.message) {
          navigate("/admin/signin");
        }
      });
  }, [navigate])

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
      category
    };

    // CHECKS IF THERE'S AN IMAGE TO SUBMIT
    if (itemImage) {
      const data = new FormData();
      const filename = Date.now() + itemImage.name;
      data.append("name", filename);
      data.append("file", itemImage);
      newItem.itemImage = filename; // ADDS THE IMAGE FILE NAME TO THE MAIN OBJECT

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

    instance.post("http://localhost:5000/item/create", newItem)
      .then(response => {
        console.log(response.data);
        showSuccessMsg();
      })
      .catch(error => {
        console.log(error.response);
      });
  };

  return (
    <>
      <Navbar />
      <main className="d-flex justify-content-center align-items-center">
        <form onSubmit={onSubmitHandler} className="rounded shadow-sm border border-light p-5 my-5 w-75">
          <h1>Create an Item</h1>
          <div className="form-group mb-3">
            <label htmlFor="name">Name of Item</label>
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
              required
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
