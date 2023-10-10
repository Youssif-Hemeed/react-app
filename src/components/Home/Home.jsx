import React from "react";

import FeaturedProducts from "../FeaturedProducts/FeaturedProducts";
import MainSlider from "../MainSlider/MainSlider";
import CategorySlider from "../CategorySlider/CategorySlider";
import { Helmet } from "react-helmet";
import { useQuery } from "react-query";
import axios from "axios";
import { BallTriangle } from "react-loader-spinner";

export default function Home() {
  function getFeaturedProducts() {
    return axios.get(`https://ecommerce.routemisr.com/api/v1/products`);
  }
  let { isLoading } = useQuery("featuredProducts", getFeaturedProducts);
  return (
    <>
      <Helmet>
        <meta name="description" content="" />
        <title>Fresh Cart Home</title>
      </Helmet>
      {isLoading ? (
        <div
          className={`load w-100  d-flex align-items-center justify-content-center`}
        >
          <BallTriangle
            height={100}
            width={100}
            radius={5}
            color="#4fa94d"
            ariaLabel="ball-triangle-loading"
            wrapperClass={{}}
            wrapperStyle=""
            visible={true}
          />
        </div>
      ) : (
        <>
          <MainSlider />
          <CategorySlider />
          <FeaturedProducts />
        </>
      )}
    </>
  );
}
