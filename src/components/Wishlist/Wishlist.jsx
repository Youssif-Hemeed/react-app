import React, { useContext, useEffect, useState } from "react";

import { WishlistContext } from "../../Context/WishlistContext";
import { Helmet } from "react-helmet";
import { BallTriangle } from "react-loader-spinner";
import { CartContext } from "../../Context/CartContext";
import toast from "react-hot-toast";
import ScrollToTop from "react-scroll-to-top";

export default function Wishlist() {
  const [loading, setLoading] = useState(false);
  let [wishlistDetails, setWishlistDetails] = useState(null);
  let { getLoggedUserWishlist, removeFromWishlist, setWishlistCount } =
    useContext(WishlistContext);
  let { addToCart, setCartCount } = useContext(CartContext);
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
  async function getWishlist() {
    setLoading(true);
    let { data } = await getLoggedUserWishlist();
    setWishlistDetails(data);
    setLoading(false);
  }
  async function deleteProductWishlist(id) {
    setLoading(true);
    let response = await removeFromWishlist(id);
    setWishlistCount(response?.data.data.length);

    await getWishlist();
    setLoading(false);
  }
  useEffect(() => {
    getWishlist();
  }, []);
  return (
    <>
      <Helmet>
        <meta name="description" content="" />
        <title>Wish List</title>
      </Helmet>
      {loading && (
        <div className="load d-flex align-items-center justify-content-center">
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
      )}
      {!loading && (
        <>
          <div className="p-2 mb-3 mt-4 bg-main-light overflow-hidden">
            <h3>My Favourite :</h3>

            {wishlistDetails?.data.length === 0 ? (
              <h5 className="text-main">your wish list is empty</h5>
            ) : (
              ""
            )}

            {wishlistDetails?.data.map((item) => (
              <div
                key={item.id}
                className="row border-bottom py-2 align-items-center"
              >
                <div className="col-md-1">
                  <img
                    className="w-100 mb-2 mb-md-0"
                    src={item.imageCover}
                    alt={item.title.split(" ").slice(0, 3).join(" ")}
                  />
                </div>
                <div className="col-md-11">
                  <div className="d-flex justify-content-between align-items-center">
                    <div>
                      <h3 className="h6">
                        {item.title.split(" ").slice(0, 3).join(" ")}
                      </h3>
                      <h6 className="text-main fw-semibold">
                        Price : {item.price} EGP
                      </h6>
                      <button
                        onClick={() => deleteProductWishlist(item.id)}
                        className="btn p-0"
                      >
                        <i className="fa-solid fa-trash-can text-danger me-1"></i>{" "}
                        Remove
                      </button>
                    </div>
                    <div>
                      <button
                        onClick={() => addProduct(item.id)}
                        className="btn btn-outline bg-main text-white"
                      >
                        add To Cart
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <ScrollToTop smooth top={400} color="#0aad0a" />
        </>
      )}
    </>
  );
}
