import React, { useContext } from "react";

import { Link, useParams } from "react-router-dom";
import { useQuery } from "react-query";
import axios from "axios";
import { BallTriangle } from "react-loader-spinner";
import noProduct from "../../Assets/images/no-product-found-f64bec64.png";
import { Helmet } from "react-helmet";
import { CartContext } from "../../Context/CartContext";
import toast from "react-hot-toast";
import { WishlistContext } from "../../Context/WishlistContext";
import ScrollToTop from "react-scroll-to-top";

export default function CategoryProducts() {
  let { addToCart, setCartCount } = useContext(CartContext);
  let { addToWishlist, setWishlistCount } = useContext(WishlistContext);
  async function addProduct(productId) {
    let response = await addToCart(productId);
    if (response.data.status === "success") {
      setCartCount(response.data.numOfCartItems);
      toast.success("product successfully added", {
        duration: 2000,
        position: "top right",
      });
    } else {
      toast.error("product not added", {
        duration: 2000,
        position: "top right",
      });
    }
  }
  async function addProductToWishlist(productId) {
    let response = await addToWishlist(productId);
    if (response.data.status === "success") {
      setWishlistCount(response.data.data.length);
      toast.success("Product added successfully to your wishlist", {
        duration: 2000,
        position: "top right",
      });
    } else {
      toast.error("product not added", {
        duration: 2000,
        position: "top right",
      });
    }
  }
  let param = useParams();
  let { data, isLoading } = useQuery("categoryProducts", getCategoryProducts);
  function getCategoryProducts() {
    return axios.get(
      `https://ecommerce.routemisr.com/api/v1/products?category[in]=${param.id}`
    );
  }
  return (
    <>
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
          <div className="container py-4">
            <div className="row">
              {data?.data.data.length !== 0 ? (
                data?.data.data.map((product) => {
                  return (
                    <>
                      <Helmet>
                        <meta name="description" content="" />
                        <title>{product.title}</title>
                      </Helmet>
                      <div
                        key={product.id}
                        className="col-sm-6 col-md-4 col-lg-3 col-xl-2"
                      >
                        <div className="product cursor-pointer py-3 px-2 position-relative">
                          <span
                            onClick={() => addProductToWishlist(product.id)}
                            className="heart position-absolute"
                          >
                            <i className="fa-regular fa-heart"></i>
                          </span>
                          <Link to={`/productdetails/${product.id}`}>
                            <img
                              className="w-100"
                              src={product.imageCover}
                              alt={product.title}
                            />
                            <span className="text-main fw-bolder font-sm ">
                              {product.category.name}
                            </span>
                            <h3 className="h6">
                              {product.title.split(" ").slice(0, 2).join(" ")}
                            </h3>
                            <div className="d-flex align-items-center justify-content-between">
                              <span>{product.price} EGP</span>
                              <span>
                                <i className="fas fa-star rating-color"></i>{" "}
                                {product.ratingsAverage}
                              </span>
                            </div>
                          </Link>
                          <button
                            onClick={() => addProduct(product._id)}
                            className="btn bg-main text-white w-100 btn-sm mt-2"
                          >
                            add to cart
                          </button>
                        </div>
                      </div>
                    </>
                  );
                })
              ) : (
                <div className="notFound d-flex justify-content-center align-items-center">
                  <img src={noProduct} alt="product is not available" />
                </div>
              )}
            </div>
          </div>
          <ScrollToTop smooth top={400} color="#0aad0a" />
        </>
      )}
    </>
  );
}
