import { NavLink } from "react-router-dom";
import axios from "axios";

const WishItemComponent = (props) => {
    const publicFolder = `${process.env.REACT_APP_API_URL}images/`;

    const removeWishItem = (id) => {
        let instance = axios.create({
            withCredentials: true
        });

        // REMOVING AN ITEM FROM WISHLIST
        instance.delete(`${process.env.REACT_APP_API_URL}item/remove-wish/` + id)
            .then(response => {
                if (response) {
                    props.loadWishItems();
                }
            })
            .catch(error => {
                console.log(error);
            });
    }

    return (
        <div className="rounded p-3 d-flex flex-column flex-sm-row align-items-center my-5 w-100 border border-dark" style={{ boxShadow: "10px 10px 0px 0px rgba(0,0,0,1)" }}>
            <div className="w-75 h-75 rounded overflow-hidden" style={{ objectFit: "cover" }}>
                <img src={publicFolder + props.itemImage} alt="" className="w-100 h-100" />
            </div>
            <div className="mx-4 w-100 mt-4 mt-sm-0">
                <div>
                    <h4>{props.itemName}</h4>
                    <h5><span className="badge bg-dark">{props.categories}</span></h5>
                    <h6>$ {props.price}</h6>
                </div>
                <div className="d-flex flex-column flex-md-row">
                    <NavLink to={"/details/" + props.mainId} className="btn btn-dark">More Details</NavLink>
                    <span className="mx-2 my-2"></span>
                    <NavLink className="btn btn-danger" onClick={() => removeWishItem(props.id)}>Remove from Wishlist</NavLink>
                </div>
            </div>
        </div>
    )
}

export default WishItemComponent