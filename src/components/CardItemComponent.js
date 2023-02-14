import { NavLink } from "react-router-dom";

const CardItemComponent = (props) => {
    const publicFolder = "http://localhost:5000/images/";
    return (
        <div className="rounded d-flex align-items-center mb-3 w-100 shadow-sm border border-light" style={{ height: "200px" }}>
            <div className="w-25 h-100 border-2 rounded-start overflow-hidden" style={{ objectFit: "cover" }}>
                <img src={publicFolder + props.images} alt="" className="w-100 h-100" />
            </div>
            <div className="mx-4 d-flex justify-content-between w-100">
                <div className="">
                    <h4>{props.names}</h4>
                    <h6>{props.categories}</h6>
                    <h6>$ {props.prices}</h6>
                    <h6>{props.details}</h6>
                </div>
                <div className="d-flex align-items-center">
                    <NavLink to={"/admin/edit-item/" + props.id} className="btn btn-dark">Edit</NavLink>
                    <span className="mx-1"></span>
                    <NavLink to="" className="btn btn-danger">Delete</NavLink>
                </div>
            </div>
        </div>
    )
}

export default CardItemComponent