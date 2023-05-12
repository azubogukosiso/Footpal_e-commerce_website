import "./component_styles/CategoryComponent.css";

import { NavLink } from "react-router-dom";

const CategoryComponent = (props) => {
    const namesCaps = props.names.charAt(0).toUpperCase() + props.names.slice(1);

    return (
        <div className="item-container position-relative col-12 col-sm-6 col-md-4 p-0">
            <div className="overlay px-3 text-white position-absolute w-100 h-100 d-flex align-items-center justify-content-center flex-column">
                <NavLink className="cat-link text-white px-2 pt-2 pb-1 rounded" to={"/categories/" + props.names}>
                    <h4>{namesCaps}</h4>
                </NavLink>
            </div>
            <img src={props.images} alt="Shoes" className="h-100 w-100 object-fit-cover" />
        </div>
    );
};

export default CategoryComponent;
