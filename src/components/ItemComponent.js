import "./component_styles/ItemComponent.css";

const ItemComponent = (props) => {
  const publicFolder = "http://localhost:5000/images/";
  return (
    <div className="item-container position-relative col-12 col-sm-6 col-md-4 p-0">
      <div className="overlay px-3 text-white position-absolute w-100 h-100 d-flex align-items-center justify-content-center flex-column">
        <h4 className="mb-3">{props.names}</h4>
        <div className="cta d-flex flex-column flex-sm-column flex-xl-row">
          <button className="btn btn-dark">add to cart</button>
          <span className="mx-2 my-2"></span>
          <button className="btn btn-dark">more details</button>
          <span className="mx-2 my-2"></span>
          <button className="btn btn-dark">add to wishlist</button>
        </div>
      </div>
      <img src={publicFolder + props.images} alt="" className="h-100 w-100" />
    </div>
  );
};

export default ItemComponent;
