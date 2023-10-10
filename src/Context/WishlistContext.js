import axios from "axios";
import { createContext, useEffect, useState } from "react";

export let WishlistContext = createContext();
export default function WishlistContextProvider(props) {
  let [wishlistCount, setWishlistCount] = useState(0);
  let headers = {
    token: localStorage.getItem("userToken"),
  };
  function addToWishlist(productId) {
    return axios
      .post(
        `https://ecommerce.routemisr.com/api/v1/wishlist`,
        {
          productId,
        },
        {
          headers,
        }
      )
      .then((response) => response)
      .catch((error) => error);
  }
  function getLoggedUserWishlist() {
    return axios
      .get(`https://ecommerce.routemisr.com/api/v1/wishlist`, {
        headers,
      })
      .then((response) => response)
      .catch((error) => error);
  }
  function removeFromWishlist(productId) {
    return axios
      .delete(`https://ecommerce.routemisr.com/api/v1/wishlist/${productId}`, {
        headers,
      })
      .then((response) => response)
      .catch((error) => error);
  }
  useEffect(() => {
    async function getWishlist() {
      let { data } = await getLoggedUserWishlist();
      setWishlistCount(data?.count);
    }
    getWishlist();
  }, []);
  return (
    <>
      <WishlistContext.Provider
        value={{
          addToWishlist,
          getLoggedUserWishlist,
          removeFromWishlist,
          wishlistCount,
          setWishlistCount,
        }}
      >
        {props.children}
      </WishlistContext.Provider>
    </>
  );
}
