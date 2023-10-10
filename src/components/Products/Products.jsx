import React, { useContext, useEffect } from "react";

import { Helmet } from "react-helmet";
import FeaturedProducts from "../FeaturedProducts/FeaturedProducts";
import { ProductsContext } from "../../Context/ProductsContext";
import axios from "axios";
import { useQuery } from "react-query";
import { BallTriangle } from "react-loader-spinner";

export default function Products() {
  let search = document.getElementById("search");
  let { products, setProducts } = useContext(ProductsContext);
  let data = [...products];
  function searchProduct() {
    let founded = data?.filter((product) =>
      product.title
        .split(" ")
        .slice(0, 2)
        .join(" ")
        .toLowerCase()
        .includes(search.value.toLowerCase())
    );
    if (search.value !== "") {
      setProducts(founded);
    } else {
      setProducts(JSON.parse(localStorage.getItem("allData")));
    }
  }
  function getFeaturedProducts() {
    return axios.get(`https://ecommerce.routemisr.com/api/v1/products`);
  }
  let { isLoading } = useQuery("featuredProducts", getFeaturedProducts);
  useEffect(() => {
    setProducts(JSON.parse(localStorage.getItem("allData")));
  }, []);
  return (
    <>
      <Helmet>
        <meta name="description" content="" />
        <title>Products</title>
      </Helmet>
      {isLoading ? (
        <div className="load w-100  d-flex align-items-center justify-content-center">
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
          <div className="d-flex justify-content-center my-3 pt-3">
            <input
              id="search"
              onKeyUp={() => searchProduct()}
              type="text"
              className="form-control w-75"
              placeholder="Search ..."
            />
          </div>
          <FeaturedProducts />
        </>
      )}
    </>
  );
}
