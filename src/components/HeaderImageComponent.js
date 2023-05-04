import ImageOne from "../images/carousel-image-1.jpg";
import ImageTwo from "../images/carousel-image-2.jpg";
import ImageThree from "../images/carousel-image-3.jpg";
import "./component_styles/HeaderImageComponent.css";

const HeaderImageComponent = () => {
  return (
    <div id="carouselExampleSlidesOnly" className="carousel slide" data-bs-ride="carousel">
      <div className="carousel-inner img-container">
        <div className="carousel-item active">
          <img src={ImageOne} alt="" className="carousel-img d-block img-fluid h-100 w-100 object-fit-cover" />
        </div>
        <div className="carousel-item">
          <img src={ImageTwo} alt="" className="carousel-img d-block img-fluid h-100 w-100 object-fit-cover" />
        </div>
        <div className="carousel-item">
          <img src={ImageThree} alt="" className="carousel-img d-block img-fluid h-100 w-100 object-fit-cover" />
        </div>
      </div>
    </div>
  );
};

export default HeaderImageComponent;
