import { NavLink } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"

const WishItemComponent = (props) => {
    const publicFolder = `${process.env.REACT_APP_API_URL}images/`;

    // SHOW ERROR MESSAGE - NO INTERNET
    const showErrorMsg = () => {
        toast.error("Dear Customer, it seems you're offline! Ensure that you're connected to the internet and then refresh your browser", {
            position: toast.POSITION.TOP_RIGHT,
            hideProgressBar: true,
            pauseOnHover: false,
            autoClose: false
        });
    };

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
            .catch(err => {
                err && showErrorMsg();
            });
    }

    return (
        <>
            <ToastContainer />
            <div className="rounded p-3 d-flex flex-column flex-sm-row align-items-center my-5 w-100 border border-dark" style={{ boxShadow: "10px 10px 0px 0px rgba(0,0,0,1)" }}>
                <div className="row w-100 ms-sm-1">
                    <div className="p-0 col-12 w-100 h-100 rounded overflow-hidden" style={{ objectFit: "cover" }}>
                        <img src={publicFolder + props.itemImage} alt="" className="w-100 h-100" />
                    </div>
                </div>
                <div className="mx-5 w-100 mt-4 mt-sm-0">
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
        </>

    )
}

export default WishItemComponent