import Image from "../images/headerImage.jpg";
import ImageOne from "../images/image1.jpg";
import ImageTwo from "../images/image2.jpg";
import "./component_styles/HeaderImageComponent.css";

const HeaderImageComponent = () => {
  return (
    <div id="carouselExampleSlidesOnly" className="carousel slide" data-bs-ride="carousel">
      <div className="carousel-inner img-container">
        <div className="carousel-item active">
          <img src={Image} alt="" className="d-block img-fluid h-100 w-100 object-fit-cover" />
        </div>
        <div className="carousel-item">
          <img src={ImageOne} alt="" className="d-block img-fluid h-100 w-100 object-fit-cover" />
        </div>
        <div className="carousel-item">
          <img src={ImageTwo} alt="" className="d-block img-fluid h-100 w-100 object-fit-cover" />
        </div>
      </div>
    </div>
  );
};

export default HeaderImageComponent;
