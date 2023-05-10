import { NavLink } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"

const CardItemComponent = (props) => {
    const publicFolder = `${process.env.REACT_APP_API_URL}images/`;

    // SHOW ERROR MESSAGE - NO INTERNET
    const showErrorMsg = () => {
        toast.error("Unable to delete item! Check your internet connection and try again.", {
            position: toast.POSITION.TOP_RIGHT,
            hideProgressBar: true,
            pauseOnHover: false,
            autoClose: 3000
        });
    };

    const deleteItem = (id) => {
        let instance = axios.create({
            withCredentials: true
        });

        // GETTING ALL ITEMS
        instance.delete(`${process.env.REACT_APP_API_URL}item/delete/` + id)
            .then(response => {
                if (response) {
                    props.loadAllItems();
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
                <div className="w-75 h-75 rounded overflow-hidden" style={{ objectFit: "cover" }}>
                    <img src={publicFolder + props.images} alt="" className="w-100 h-100" />
                </div>
                <div className="mx-4 w-100 mt-4 mt-sm-0">
                    <div>
                        <h4>{props.names}</h4>
                        <h5><span className="badge bg-dark">{props.categories}</span></h5>
                        <h6>$ {props.prices}</h6>
                        <h6>{props.details}</h6>
                    </div>
                    <div className="d-flex flex-column flex-md-row">
                        <NavLink to={"/admin/edit-item/" + props.id} className="btn btn-dark">Edit</NavLink>
                        <span className="mx-2 my-2"></span>
                        <NavLink to="" className="btn btn-danger" onClick={() => deleteItem(props.id)}>Delete</NavLink>
                    </div>
                </div>
            </div>
        </>
    )
}

export default CardItemComponent