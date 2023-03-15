import { NavLink } from "react-router-dom";
import axios from "axios";

const CardItemComponent = (props) => {
    const publicFolder = "http://localhost:5000/images/";

    const deleteItem = (id) => {
        let instance = axios.create({
            withCredentials: true
        });

        // GETTING ALL ITEMS
        instance.delete("http://localhost:5000/item/delete/" + id)
            .then(response => {
                console.log(response.data);
                document.location.reload();
            })
            .catch(error => {
                console.log(error);
            });
    }

    return (
        <div className="rounded d-flex align-items-center mb-3 w-100 border border-light" style={{ height: "200px", boxShadow: "0px 8px 15px 2px rgba(0,0,0,0.18)" }}>
            <div className="w-25 h-100 rounded-start overflow-hidden" style={{ objectFit: "cover" }}>
                <img src={publicFolder + props.images} alt="" className="w-100 h-100" />
            </div>
            <div className="mx-4 d-flex justify-content-between w-75">
                <div>
                    <h4>{props.names}</h4>
                    <h6>{props.categories}</h6>
                    <h6>$ {props.prices}</h6>
                    <h6>{props.details}</h6>
                </div>
                <div className="d-flex align-items-center">
                    <NavLink to={"/admin/edit-item/" + props.id} className="btn btn-dark">Edit</NavLink>
                    <span className="mx-1"></span>
                    <NavLink to="" className="btn btn-danger" onClick={() => deleteItem(props.id)}>Delete</NavLink>
                </div>
            </div>
        </div>
    )
}

export default CardItemComponent