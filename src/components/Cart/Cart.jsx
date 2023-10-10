import React, { useContext, useEffect, useState } from "react";

import { Helmet } from "react-helmet";
import { CartContext } from "../../Context/CartContext";
import { BallTriangle } from "react-loader-spinner";
import ScrollToTop from "react-scroll-to-top";
import { Link } from "react-router-dom";

export default function Cart() {
  const [cartDetails, setCartDetails] = useState(null);
  let [loading, setLoading] = useState(true);
  let {
    getLoggedUserCart,
    deleteFromCart,
    updateProductQuantity,
    clearCart,
    setCartCount,
  } = useContext(CartContext);
  async function getCart() {
    let { data } = await getLoggedUserCart();
    setCartDetails(data);
    setLoading(false);
  }

  async function removeItem(id) {
    setLoading(true);
    let { data } = await deleteFromCart(id);

    setCartDetails(data);
    setCartCount(data?.numOfCartItems);
    setLoading(false);
  }
  async function updateCount(id, count) {
    setLoading(true);
    let { data } = await updateProductQuantity(id, count);
    setCartDetails(data);
    setLoading(false);
  }
  async function clearUserCart() {
    let { data } = await clearCart();
    setCartDetails(undefined);
    setCartCount(data?.numOfCartItems);
  }
  useEffect(() => {
    getCart();
  }, []);
  return (
    <>
      <Helmet>
        <meta name="description" content="" />
        <title>Cart</title>
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
            <div className=" w-100 d-flex justify-content-between align-items-center flex-wrap">
              <div>
                <h3>Shop Cart : </h3>
                {cartDetails?.data?.products.length === 0 ||
                cartDetails === undefined ? (
                  <h5 className="text-center text-main my-3">
                    your cart is empty
                  </h5>
                ) : (
                  <>
                    <h4 className="h6  fw-semibold my-5">
                      Number Of Products :{" "}
                      <span className="text-main ">
                        {cartDetails?.numOfCartItems}{" "}
                      </span>
                    </h4>
                    <h4 className="h6 fw-semibold  my-3">
                      Total Cart Price :{" "}
                      <span className="text-main ">
                        {cartDetails?.data?.totalCartPrice}{" "}
                      </span>
                      EGP
                    </h4>
                  </>
                )}
              </div>
              {cartDetails?.data?.products.length === 0 ||
              cartDetails === undefined ? (
                ""
              ) : (
                <div className="btnPayment">
                  <Link
                    to={"/userAddress"}
                    className="btn w-100 d-block mb-1 bg-main text-white"
                  >
                    Online Payment
                  </Link>
                </div>
              )}
            </div>

            {cartDetails?.data?.products.map((product) => (
              <div
                key={product._id}
                className="row border-bottom py-2 align-items-center"
              >
                <div className="col-md-2">
                  <img
                    className="w-100 mb-2 mb-md-0"
                    src={product.product.imageCover}
                    alt={product.product.title.split(" ").slice(0, 3).join(" ")}
                  />
                </div>
                <div className="col-md-10">
                  <div className="d-flex justify-content-between align-items-center">
                    <div>
                      <h3 className="h6 mb-4">
                        {product.product.title.split(" ").slice(0, 3).join(" ")}
                      </h3>
                      <h6 className=" fw-semibold  my-4">
                        Price :{" "}
                        <span className="text-main ">{product.price} </span> EGP
                      </h6>
                      <button
                        onClick={() => removeItem(product.product.id)}
                        className="btn p-0  mt-4"
                      >
                        <i className="fa-solid fa-trash-can text-danger me-1"></i>{" "}
                        Remove
                      </button>
                    </div>

                    <div>
                      <button
                        onClick={() =>
                          updateCount(product.product.id, product.count + 1)
                        }
                        className="btn brdr-main"
                      >
                        +
                      </button>
                      <span className="mx-2">{product.count}</span>
                      <button
                        onClick={() =>
                          updateCount(
                            product.product.id,
                            product.count < 2 ? 1 : product.count - 1
                          )
                        }
                        className="btn brdr-main"
                      >
                        -
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
            {!(
              cartDetails === undefined ||
              cartDetails?.data?.products.length === 1
            ) ? (
              <button
                onClick={() => clearUserCart()}
                className="btn bg-main text-white w-100 mt-2"
              >
                Clear Cart
              </button>
            ) : (
              ""
            )}
          </div>
          <ScrollToTop smooth top={400} color="#0aad0a" />
        </>
      )}
    </>
  );
}
