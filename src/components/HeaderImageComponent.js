import React from "react";
import Image from "../images/headerImage.jpg";
import "./component_styles/HeaderImageComponent.css";

const HeaderImageComponent = () => {
  return (
    <div className="img-container">
      {/* eslint-disable-next-line */}
      <img src={Image} alt="Header Image" className="img-fluid h-100 w-100" />
    </div>
  );
};

export default HeaderImageComponent;
