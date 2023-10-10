import noProduct from "../../Assets/images/no-product-found-f64bec64.png";
import { Link } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { CartContext } from "../../Context/CartContext";
import toast from "react-hot-toast";
import { WishlistContext } from "../../Context/WishlistContext";
import ScrollToTop from "react-scroll-to-top";
import { ProductsContext } from "../../Context/ProductsContext";
import Style from "./FeaturedProducts.css";
export default function FeaturedProducts() {
  const [selectedIcon, setSelectedIcon] = useState(null);

  let { addToCart, setCartCount } = useContext(CartContext);
  let { addToWishlist, setWishlistCount } = useContext(WishlistContext);
  let { products, setProducts } = useContext(ProductsContext);

  async function addProduct(productId) {
    let response = await addToCart(productId);

    if (response?.data.status === "success") {
      setCartCount(response?.data.numOfCartItems);
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
    if (selectedIcon === productId) {
      setSelectedIcon(null);
    } else {
      setSelectedIcon(productId);
    }
    let response = await addToWishlist(productId);
    if (response?.data.status === "success") {
      setWishlistCount(response?.data.data.length);
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
  useEffect(() => {
    setProducts(JSON.parse(localStorage.getItem("allData")));
  }, []);

  return (
    <>
      {products?.length !== 0 ? (
        <div className="container py-2">
          <div className="row">
            {products?.map((product) => {
              return (
                <div
                  key={product?.id}
                  className="col-sm-6 col-md-4 col-lg-3 col-xl-2"
                >
                  <div className="product cursor-pointer py-3 px-2 position-relative">
                    <span
                      onClick={() => addProductToWishlist(product?.id)}
                      className="heart position-absolute"
                    >
                      <i
                        className={`icon-class ${
                          selectedIcon === product?.id
                            ? "red fa-regular fa-heart"
                            : "fa-regular fa-heart"
                        }`}
                      ></i>
                    </span>
                    <Link to={`/productdetails/${product?.id}`}>
                      <img
                        className="w-100"
                        src={product?.imageCover}
                        alt={product?.title.split(" ").slice(0, 3).join(" ")}
                      />
                      <span className="text-main fw-bolder font-sm ">
                        {product?.title.split(" ").slice(0, 2).join(" ")}
                      </span>
                      <h3 className="h6">
                        {product?.title.split(" ").slice(0, 2).join(" ")}
                      </h3>
                      <div className="d-flex align-items-center justify-content-between">
                        <span>{product?.price} EGP</span>
                        <span>
                          <i className="fas fa-star rating-color"></i>{" "}
                          {product?.ratingsAverage}
                        </span>
                      </div>
                    </Link>
                    <button
                      onClick={() => addProduct(product?._id)}
                      className="btn bg-main text-white w-100 btn-sm mt-2"
                    >
                      add to cart
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        <div className="notFound d-flex justify-content-center align-items-center">
          <img src={noProduct} alt="product is not available" />
        </div>
      )}

      <ScrollToTop smooth top={400} color="#0aad0a" />
    </>
  );
}
