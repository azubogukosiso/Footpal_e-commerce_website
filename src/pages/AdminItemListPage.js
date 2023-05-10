import { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import axios from "axios";
import PulseLoader from "react-spinners/PulseLoader";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"

import Navbar from "../components/NavbarComponent";
import CardItemComponent from "../components/CardItemComponent";
import Footer from "../components/FooterComponent";

const AdminItemList = (props) => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  // SHOW ERROR MESSAGE - NO INTERNET
  const showErrorMsg = () => {
    toast.error("Unable to fetch items! Check your internet connection and try again.", {
      position: toast.POSITION.TOP_RIGHT,
      hideProgressBar: true,
      pauseOnHover: false,
      autoClose: false
    });
  };

  const loadAllItems = () => {
    let instance = axios.create({
      withCredentials: true,
    });

    // GETTING ALL ITEMS
    instance.get(`${process.env.REACT_APP_API_URL}item/all`)
      .then((response) => {
        setLoading(false);
        const itemDetails = response.data;
        setItems(itemDetails);
      })
      .catch((err) => {
        err && showErrorMsg();
      });
  };

  let renderItems;
  if (!loading) {
    renderItems = items.map((item) => (
      <CardItemComponent
        key={uuidv4()}
        images={item.itemImage}
        names={item.itemName}
        prices={item.price}
        details={item.details}
        categories={item.category}
        id={item._id}
        loadAllItems={loadAllItems}
      />
    )
    )
  } else {
    renderItems = <PulseLoader color="#000" className="justify-content-center my-5" size={20} />
  };

  useEffect(() => {
    loadAllItems();
    // eslint-disable-next-line
  }, []);

  return (
    <>
      <ToastContainer />
      <Navbar admin={props.admin} />
      <main className="d-flex justify-content-center align-items-center">
        <div className="my-5 w-75 d-flex justify-content-center align-items-center flex-column">
          {renderItems}
        </div>
      </main>
      <Footer />
    </>
  );
};

export default AdminItemList;
