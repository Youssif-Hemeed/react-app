import React from "react";
import { Helmet } from "react-helmet";
import { useQuery } from "react-query";
import axios from "axios";
import { BallTriangle } from "react-loader-spinner";
import { Link } from "react-router-dom";
import ScrollToTop from "react-scroll-to-top";

export default function Brands() {
  let { data, isLoading } = useQuery("brands", getAllBrands);
  function getAllBrands() {
    return axios.get(`https://ecommerce.routemisr.com/api/v1/brands`);
  }
  return (
    <>
      <Helmet>
        <meta name="description" content="" />
        <title>Brands</title>
      </Helmet>
      {isLoading ? (
        <div
          className={` load w-100  d-flex align-items-center justify-content-center`}
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
          <div className="row g-4 mt-1 mb-5">
            <div className="col-xl-3 col-lg-4 col-md-6 p-5 d-flex align-items-center justify-content-center flex-column">
              <div>
                <h2 className="fw-bolder text-main">Our Brands</h2>
                <p>
                  You can see our Brands and each brand includes the products in
                  it
                </p>
              </div>
            </div>
            {data?.data.data.map((brand) => {
              return (
                <div key={brand._id} className="col-xl-3 col-lg-4 col-md-6">
                  <Link to={`/BrandProducts/${brand._id}`}>
                    <div className="brand rounded-3 border border-2 overflow-hidden">
                      <img
                        src={brand.image}
                        className="w-100"
                        alt={brand.slug}
                      />
                      <h3 className="h6  fw-semibold text-center my-4">
                        {brand.name}
                      </h3>
                    </div>
                  </Link>
                </div>
              );
            })}
          </div>
          <ScrollToTop smooth top={400} color="#0aad0a" />
        </>
      )}
    </>
  );
}
