import { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import axios from "axios";

import Navbar from "../components/NavbarComponent";
import CardItemComponent from "../components/CardItemComponent";
import Footer from "../components/FooterComponent";

const AdminItemList = (props) => {
  const [items, setItems] = useState([]);

  const loadAllItems = () => {
    let instance = axios.create({
      withCredentials: true,
    });

    // GETTING ALL ITEMS
    instance.get("http://localhost:5000/item")
      .then((response) => {
        const itemDetails = response.data;
        setItems(itemDetails);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    loadAllItems();
  }, []);

  return (
    <>
      <Navbar admin={props.admin} />
      <main className="d-flex justify-content-center align-items-center">
        <div className="my-5 w-75 d-flex justify-content-center align-items-center flex-column">
          {items.map((item) => {
            return (
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
            );
          })}
        </div>
      </main>
      <Footer />
    </>
  );
};

export default AdminItemList;
