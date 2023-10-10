import React from "react";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useQuery } from "react-query";
import axios from "axios";
import Slider from "react-slick";

export default function CategorySlider() {
  var settings = {
    infinite: true,
    speed: 6000,
    swipe: true,
    swipeToSlide: true,
    slidesToShow: 7,
    autoplay: true,
    draggable: true,
    autoplaySpeed: 0,
    pauseOnHover: false,
    slidesToScroll: 1,
    cssEase: "linear",

    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 1,
          infinite: true,
          autoplay: true,
          cssEase: "linear",
        },
      },
      {
        breakpoint: 800,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: true,
          autoplay: true,
          cssEase: "linear",
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          infinite: true,
          autoplay: true,
          cssEase: "linear",
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
          autoplay: true,
          cssEase: "linear",
        },
      },
    ],
  };

  function getCategories() {
    return axios.get(`https://ecommerce.routemisr.com/api/v1/categories`);
  }
  let { data } = useQuery("categorySlider", getCategories);

  return (
    <>
      {data?.data.data ? (
        <div className="my-3">
          <h3>Shop Popular Categories</h3>
          <Slider {...settings}>
            {data?.data.data.map((category) => {
              return (
                <div key={category._id} className="mt-2">
                  <img
                    className="w-100"
                    height={160}
                    src={category.image}
                    alt="popular categories"
                  />
                </div>
              );
            })}
          </Slider>
        </div>
      ) : (
        ""
      )}
    </>
  );
}
