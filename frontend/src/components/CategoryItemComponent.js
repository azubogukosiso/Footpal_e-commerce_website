import { NavLink } from "react-router-dom";

const CategoryItemComponent = (props) => {

    return (
        <div className="rounded p-3 d-flex flex-column flex-sm-row align-items-center my-5 w-100 border border-dark" style={{ boxShadow: "10px 10px 0px 0px rgba(0,0,0,1)" }}>
            <div className="row w-100 ms-sm-1">
                <div className="p-0 col-12 w-100 h-100 rounded overflow-hidden" style={{ objectFit: "cover" }}>
                    <img src={props.itemImage} alt="" className="w-100 h-100" />
                </div>
            </div>
            <div className="mx-5 w-100 mt-4 mt-sm-0">
                <div>
                    <h4>{props.itemName}</h4>
                    <h6>$ {props.price}</h6>
                </div>
                {
                    props.admin ? (
                        <></>
                    ) : (
                        <div className="d-flex flex-column flex-md-row">
                            <NavLink to={"/details/" + props.id} className="btn btn-dark">More Details</NavLink>
                        </div>
                    )

                }
            </div>
        </div>
    )
}

export default CategoryItemComponent