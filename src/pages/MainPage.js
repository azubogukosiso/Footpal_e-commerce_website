import { useState, useEffect } from "react";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import { Categories } from "../Arrays";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"

import "./page_styles/MainPage.css";

import Navbar from "../components/NavbarComponent";
import HeaderImageComponent from "../components/HeaderImageComponent";
import ItemComponent from "../components/ItemComponent";
import CategoryComponent from "../components/CategoryComponent";
import Modal from "../components/ModalComponent";
import Footer from "../components/FooterComponent";

const MainPage = () => {
  const [items, setItems] = useState([]);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]);

  // ADDING QUANTITY PROPERTY TO CART ITEMS OBJECT
  for (let i = 0; i < cartItems.length; i++) {
    cartItems[i].quantity = 1;
  }

  useEffect(() => {
    let instance = axios.create({
      withCredentials: true
    });

    // GETTING ALL ITEMS
    instance.get("http://localhost:5000/item/")
      .then(response => {
        const itemDetails = response.data;
        setItems(itemDetails);
      })
      .catch(error => {
        console.log(error);
      });

    // CHECK WHO'S LOGGED IN - ADMIN OR CUSTOMER
    instance.post("http://localhost:5000/general/check-cookie")
      .then(response => {
        if (response.data.admin) {
          setIsAdmin(true);
        } else { }
      })
      .catch(error => { });

    // LOADING CART ITEMS FROM THE LOCAL STORAGE
    const cartItemsLocalStorage = JSON.parse(localStorage.getItem("cart-items"));
    if (cartItemsLocalStorage) {
      setCartItems(cartItemsLocalStorage);
    }
  }, [])

  // SHOW SUCCESS MESSAGE - ITEM ADDED TO CART
  const showSuccessMsgOne = () => {
    toast.success('Item added to cart!', {
      position: toast.POSITION.TOP_RIGHT,
      hideProgressBar: true,
      pauseOnHover: false,
      autoClose: 125
    });
  };

  // SHOW INFO MESSAGE - ITEM ALREADY IN CART
  const showSuccessMsgTwo = () => {
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
  }

  // CLEAR JUST ONE ITEM IN THE CART
  const clearItem = (item) => {
    const cartItemList = cartItems.filter(cartItem => cartItem._id !== item._id);
    setCartItems(cartItemList);
    saveToLocalStorage(cartItemList);
  }

  // FUNCTION TO ADD ITEMS TO CART
  const addToCart = (item) => {
    let itemAlreadyExists = false;

    for (let i = 0; i < cartItems.length; i++) {
      if (cartItems[i]._id === item._id) {
        itemAlreadyExists = true;
        showSuccessMsgTwo();
        break;
      }
    }

    if (!itemAlreadyExists) {
      cartItems.push(item);
      saveToLocalStorage(cartItems);
      showSuccessMsgOne();
    }
  }

  const renderItems = items.map((item) => (
    <ItemComponent key={uuidv4()} images={item.itemImage} names={item.itemName} prices={item.price} isAdmin={isAdmin} id={item._id} addToCart={addToCart} item={item} />
  ));

  const renderCategories = Categories.map((Category) => (
    <CategoryComponent
      key={uuidv4()}
      images={Category.image}
      names={Category.name}
    />
  ));

  return (
    <>
      <Navbar setIsOpen={setIsOpen} />
      <main>
        <HeaderImageComponent />
        <section className="most-purchased text-center">
          <h1 className="pt-3 pb-2">most purchased</h1>
          <div className="row w-100 h-100 m-auto">
            {renderItems}
          </div>
        </section>
        <section className="new-additions text-center">
          <h1 className="pt-3 pb-2">new additions</h1>
          <div className="row w-100 h-100 m-auto">
            {renderItems}
          </div>
        </section>
        <section className="categories text-center mb-5">
          <h1 className="pt-3 pb-2">categories</h1>
          <div className="row w-100 h-100 m-auto">
            {renderCategories}
          </div>
        </section>
        {isOpen && <Modal setIsOpen={setIsOpen} cartItems={cartItems} clearCart={clearCart} clearItem={clearItem} />}
      </main>
      <Footer />
      <ToastContainer />
    </>
  );
};

export default MainPage;
