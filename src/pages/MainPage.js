import { useState, useEffect } from "react";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";
// import { Items, Categories } from "../Arrays";

import "./page_styles/MainPage.css";

import Navbar from "../components/NavbarComponent";
import HeaderImageComponent from "../components/HeaderImageComponent";
import ItemComponent from "../components/ItemComponent";
import CategoryComponent from "../components/CategoryComponent";
import Footer from "../components/FooterComponent";

const MainPage = () => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    const instance = axios.create({
      withCredentials: true
    });

    instance.get("http://localhost:5000/item/")
      .then(response => {
        console.log(response.data);
        const itemDetails = response.data;
        setItems(itemDetails);
      })
  }, [])

  const renderItems = items.map((item) => (
    <ItemComponent key={uuidv4()} images={item.itemImage} names={item.itemName} />
  ));

  // const renderCategories = Categories.map((Category) => (
  //   <CategoryComponent
  //     key={uuidv4()}
  //     images={Category.image}
  //     names={Category.name}
  //   />
  // ));

  return (
    <>
      <Navbar />
      <main>
        <HeaderImageComponent />
        <section className="most-purchased text-center">
          <h1 className="py-3">most purchased</h1>
          <div className="row w-100 h-100 m-auto">
            {renderItems}
          </div>
        </section>
        <section className="new-additions text-center">
          <h1 className="py-3">new additions</h1>
          <div className="row w-100 h-100 m-auto">
            {renderItems}
          </div>
        </section>
        <section className="categories text-center mb-5">
          <h1 className="py-3">categories</h1>
          <div className="row w-100 h-100 m-auto">
            {/* {renderCategories} */}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default MainPage;
