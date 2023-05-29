import { NavLink } from "react-router-dom";
import "./component_styles/ItemComponent.css";

const ItemComponent = (props) => {
  return (
    <div className="item-container position-relative col-12 col-sm-6 col-md-4 p-0">
      <div className="overlay px-3 text-white position-absolute w-100 h-100 d-flex align-items-center justify-content-center flex-column">
        <h4>{props.names}</h4>
        <h5 className="my-2">${props.prices}</h5>
        <div className="cta d-flex flex-column flex-sm-column flex-xl-row">
          {
            props.isAdmin ? (null) : (
              <>
                <button className="btn btn-dark" onClick={() => props.addToCart(props.item)}>Add to Cart</button>
                <span className="mx-2 my-2"></span>
                <NavLink to={"/details/" + props.id}>
                  <button className="btn btn-dark">More Details</button>
                </NavLink>
                <span className="mx-2 my-2"></span>
                <button className="btn btn-dark" onClick={() => props.addToWishlist(props.item)}>Add to Wishlist</button>
              </>
            )
          }
        </div>
      </div>
      <img src={props.images} alt="" className="h-100 w-100" />
    </div>
  );
};

export default ItemComponent;
