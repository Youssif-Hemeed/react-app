import { useParams } from "react-router-dom";
import axios from "axios";
import { useQuery } from "react-query";
import { Helmet } from "react-helmet";
import Slider from "react-slick";
import { useContext } from "react";
import { CartContext } from "../../Context/CartContext";
import toast from "react-hot-toast";

export default function ProductDetails() {
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
  const settings = {
    dots: true,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    speed: 1000,
    autoplaySpeed: 2000,
  };
  let params = useParams();

  function getProductDetails(id) {
    return axios.get(`https://ecommerce.routemisr.com/api/v1/products/${id}`);
  }

  let { data } = useQuery("productDetails", () => getProductDetails(params.id));
  let x = data?.data.data;
  return (
    <>
      {x ? (
        <>
          <Helmet>
            <meta name="description" content="" />
            <title>{x.title}</title>
          </Helmet>
          <div className="row mt-4   align-items-center">
            <div className="col-md-4 mb-5 ">
              <Slider {...settings}>
                {x.images.map((element) => {
                  return (
                    <div key={x.id}>
                      <img className="w-100" src={element} alt={x.title} />
                    </div>
                  );
                })}
              </Slider>
            </div>
            <div className="col-md-8">
              <h2 className="h4">{x.title}</h2>
              <p>{x.description}</p>
              <h6 className="text-main fw-semibold">{x.category.name}</h6>
              <span className="text-main fw-semibold">
                Price : {x.price} EGP
              </span>
              <div className="d-flex align-items-center justify-content-between flex-wrap mt-2">
                <span>Rating Quantity : {x.ratingsQuantity}</span>
                <span>
                  <i className="fas fa-star rating-color pe-2"></i>
                  {x.ratingsAverage}
                </span>
              </div>

              <button
                onClick={() => addProduct(x._id)}
                className="btn bg-main w-100 text-white mt-2"
              >
                Add to cart
              </button>
            </div>
          </div>
        </>
      ) : (
        ""
      )}
    </>
  );
}
