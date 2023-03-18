import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import axios from "axios";

import Navbar from "../components/NavbarComponent";
import CardItemComponent from "../components/CardItemComponent";
import Footer from "../components/FooterComponent";

const AdminItemList = () => {
  const [items, setItems] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    let instance = axios.create({
      withCredentials: true,
    });

    // GETTING THE DETAILS OF THE ADMIN USING AVAILABLE COOKIES
    // instance.get("http://localhost:5000/admin/check-cookie")
    //   .then((response) => { })
    //   .catch((error) => {
    //     console.log(error.response.data.message);
    //     if (error.response.data.message) {
    //       navigate("/admin/signin");
    //     }
    //   });

    // GETTING ALL ITEMS
    instance.get("http://localhost:5000/item")
      .then((response) => {
        const itemDetails = response.data;
        setItems(itemDetails);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [navigate]);

  return (
    <>
      <Navbar />
      <main className="d-flex justify-content-center align-items-center">
        <div className="my-5 w-75">
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
