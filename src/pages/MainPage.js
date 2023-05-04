import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import { Categories } from "../Arrays";
import { ToastContainer, toast } from "react-toastify";
import PulseLoader from "react-spinners/PulseLoader";
import axios from "axios";
import "react-toastify/dist/ReactToastify.css";

import "./page_styles/MainPage.css";

import Navbar from "../components/NavbarComponent";
import HeaderImageComponent from "../components/HeaderImageComponent";
import ItemComponent from "../components/ItemComponent";
import CategoryComponent from "../components/CategoryComponent";
import Modal from "../components/ModalComponent";
import Footer from "../components/FooterComponent";

const MainPage = (props) => {
  const [items, setItems] = useState([]);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isCustomer, setIsCustomer] = useState(false);
  const [customerEmail, setCustomerEmail] = useState();
  const [isOpen, setIsOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  // ADDING QUANTITY PROPERTY TO CART ITEMS OBJECT
  for (let i = 0; i < cartItems.length; i++) {
    cartItems[i].quantity = 1;
  };

  useEffect(() => {
    let instance = axios.create({
      withCredentials: true
    });

    // GETTING ALL ITEMS
    instance.get(`${process.env.REACT_APP_API_URL}item/`)
      .then(response => {
        setItems(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.log(error);
      });

    // CHECK WHO'S LOGGED IN - ADMIN OR CUSTOMER
    instance.post(`${process.env.REACT_APP_API_URL}general/check-cookie`)
      .then(response => {
        if (response.data.admin) {
          setIsAdmin(true);
        } else if (response.data.customer) {
          setCustomerEmail(response.data.customer.email);
          setIsCustomer(true);
        }
      })
      .catch(error => {
        console.log(error);
      });

    // LOADING CART ITEMS FROM THE LOCAL STORAGE
    const cartItemsLocalStorage = JSON.parse(localStorage.getItem("cart-items"));
    if (cartItemsLocalStorage) {
      setCartItems(cartItemsLocalStorage);
    }
  }, [props.admin]);

  // FUNCTION TO ADD ITEMS TO CART
  const addToCart = (item) => {
    if (isCustomer) {
      let itemAlreadyExists = false;

      for (let i = 0; i < cartItems.length; i++) {
        if (cartItems[i]._id === item._id) {
          itemAlreadyExists = true;
          showSuccessMsgTwoCart();
          break;
        }
      }

      if (!itemAlreadyExists) {
        cartItems.push(item);
        saveToLocalStorage(cartItems);
        showSuccessMsgOneCart();
      }
    } else {
      navigate("/signin");
    }
  };

  // SHOW SUCCESS MESSAGE - ITEM ADDED TO CART
  const showSuccessMsgOneCart = () => {
    toast.success('Item added to cart!', {
      position: toast.POSITION.TOP_RIGHT,
      hideProgressBar: true,
      pauseOnHover: false,
      autoClose: 125
    });
  };

  // SHOW INFO MESSAGE - ITEM ALREADY IN CART
  const showSuccessMsgTwoCart = () => {
    toast.info('Item already in cart!', {
      position: toast.POSITION.TOP_RIGHT,
      hideProgressBar: true,
      pauseOnHover: false,
      autoClose: 3000
    });
  };

  // SAVES CART ITEMS TO LOCAL STORAGE
  const saveToLocalStorage = (items) => {
    localStorage.setItem("cart-items", JSON.stringify(items));
  };

  // CLEAR ITEMS IN THE CART
  const clearCart = () => {
    const cartItemList = cartItems.filter(cartItem => cartItem._id === "");
    setCartItems(cartItemList);
    saveToLocalStorage(cartItemList);
  };

  // CLEAR JUST ONE ITEM IN THE CART
  const clearItem = (item) => {
    const cartItemList = cartItems.filter(cartItem => cartItem._id !== item._id);
    setCartItems(cartItemList);
    saveToLocalStorage(cartItemList);
  };



  // FUNCTION TO ADD ITEMS TO WISHLIST
  const addToWishlist = (item) => {
    if (isCustomer) {
      let mainId = item._id;
      let itemName = item.itemName;
      let price = item.price;
      let details = item.details;
      let category = item.category;
      let itemImage = item.itemImage;

      const wishItem = {
        mainId,
        customerEmail,
        itemName,
        price,
        details,
        category,
        itemImage,
      };

      let instance = axios.create({
        withCredentials: true
      });

      instance.post(`${process.env.REACT_APP_API_URL}item/add-to-wishlist`, wishItem)
        .then(response => {
          if (response.data === "Item already in wishlist") {
            showSuccessMsgTwoWishlist();
          } else {
            showSuccessMsgOneWishlist();
          }
        })
        .catch(err => {
          err && showErrorMsg();
        });
    } else {
      navigate("/signin");
    }
  };

  // SHOW ERROR MESSAGE - NO INTERNET
  const showErrorMsg = () => {
    toast.error("Dear Customer, it seems you're offline! Ensure that you're connected to the internet and then refresh your browser", {
      position: toast.POSITION.TOP_RIGHT,
      hideProgressBar: true,
      pauseOnHover: false,
      autoClose: false
    });
  };

  // SHOW SUCCESS MESSAGE - ITEM ADDED TO WISHLIST
  const showSuccessMsgOneWishlist = () => {
    toast.success('Item added to wishlist!', {
      position: toast.POSITION.TOP_RIGHT,
      hideProgressBar: true,
      pauseOnHover: false,
      autoClose: 125
    });
  };

  // SHOW INFO MESSAGE - ITEM ALREADY IN WISHLIST
  const showSuccessMsgTwoWishlist = () => {
    toast.info('Item already in wishlist!', {
      position: toast.POSITION.TOP_RIGHT,
      hideProgressBar: true,
      pauseOnHover: false,
      autoClose: 3000
    });
  };

  let renderItems;
  if (!loading) {
    renderItems = items.map((item) => (
      <ItemComponent key={uuidv4()} images={item.itemImage} names={item.itemName} prices={item.price} isAdmin={isAdmin} id={item._id} addToCart={addToCart} addToWishlist={addToWishlist} item={item} />
    ))
  } else {
    renderItems = <PulseLoader color="#000" className="justify-content-center my-5" size={20} />
  };

  const renderCategories = Categories.map((category) => (
    <CategoryComponent
      key={uuidv4()}
      images={category.image}
      names={category.name}
    />
  ));

  return (
    <>
      <Navbar setIsOpen={setIsOpen} />
      <main>
        <HeaderImageComponent />
        <section className="most-purchased text-center">
          <h1 className="pt-3 pb-2">Most Purchased</h1>
          <div className="row w-100 h-100 m-auto">
            {renderItems}
          </div>
        </section>
        <section className="new-additions text-center">
          <h1 className="pt-3 pb-2">Recently Added</h1>
          <div className="row w-100 h-100 m-auto">
            {renderItems}
          </div>
        </section>
        <section className="categories text-center">
          <h1 className="pt-3 pb-2">Categories</h1>
          <div className="row w-100 h-100 m-auto">
            {renderCategories}
          </div>
        </section>
        {isOpen && <Modal setIsOpen={setIsOpen} cartItems={cartItems} clearCart={clearCart} clearItem={clearItem} customerEmail={customerEmail} />}
      </main>
      <Footer />
      <ToastContainer />
    </>
  );
};

export default MainPage;
