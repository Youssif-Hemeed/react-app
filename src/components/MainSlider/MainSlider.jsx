import React from "react";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import slide1 from "../../Assets/images/slider-image-1.jpeg";
import slide2 from "../../Assets/images/slider-image-2.jpeg";
import slide3 from "../../Assets/images/slider-image-3.jpeg";
import image1 from "../../Assets/images/tomatoes-321671_640.jpg";
import image2 from "../../Assets/images/cherries-6308871_640.jpg";
export default function MainSlider() {
  var settings = {
    dots: false,
    infinite: true,
    speed: 1000,
    arrows: false,
    swipe: true,
    swipeToSlide: true,
    slidesToShow: 1,
    autoplay: true,
    draggable: true,
    autoplaySpeed: 3000,
    pauseOnHover: false,
    slidesToScroll: 1,
  };

  return (
    <>
      <div className="row gx-0 pt-1 my-3">
        <div className="col-md-9">
          <Slider {...settings}>
            <img height={400} src={slide1} alt="fresh vegetables food" />
            <img height={400} src={slide2} alt="fresh vegetables food" />
            <img height={400} src={slide3} alt="fresh vegetables food" />
          </Slider>
        </div>
        <div className="col-md-3 d-none d-md-block">
          <img
            className="w-100"
            height={200}
            src={image1}
            alt="fresh vegetables food"
          />
          <img
            className="w-100"
            height={200}
            src={image2}
            alt="fresh vegetables food"
          />
        </div>
      </div>
    </>
  );
}
