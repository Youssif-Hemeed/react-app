import axios from "axios";
import { createContext, useEffect, useState } from "react";

export let CartContext = createContext();

export default function CartContextProvider(props) {
  const [iconClicked, setIconClicked] = useState(false);
  let [cartCount, setCartCount] = useState(0);
  let [cartId, setCartId] = useState(null);
  const [cartOwner, setCartOwner] = useState("");

  let headers = {
    token: localStorage.getItem("userToken"),
  };

  function addToCart(productId) {
    return axios
      .post(
        `https://ecommerce.routemisr.com/api/v1/cart`,
        {
          productId, // productId:productId
        },
        {
          headers,
          // headers:headers,
        }
      )
      .then((response) => response)
      .catch((error) => error);
  }

  function getLoggedUserCart() {
    return axios
      .get(`https://ecommerce.routemisr.com/api/v1/cart`, {
        headers: headers,
      })
      .then((response) => response)
      .catch((error) => error);
  }
  function deleteFromCart(productId) {
    return axios
      .delete(`https://ecommerce.routemisr.com/api/v1/cart/${productId}`, {
        headers: headers,
      })
      .then((response) => response)
      .catch((error) => error);
  }
  function updateProductQuantity(productId, count) {
    return axios
      .put(
        `https://ecommerce.routemisr.com/api/v1/cart/${productId}`,
        { count },
        { headers }
      )
      .then((response) => response)
      .catch((error) => error);
  }
  function clearCart() {
    return axios
      .delete(`https://ecommerce.routemisr.com/api/v1/cart`, { headers })
      .then((response) => response)
      .catch((error) => error);
  }
  function onlinePayment(id, url, values) {
    return axios
      .post(
        `https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${id}?url=${url}`,
        {
          shippingAddress: values,
        },
        { headers }
      )
      .then((response) => response)
      .catch((error) => error);
  }

  async function getCartId() {
    let { data } = await getLoggedUserCart();

    setCartOwner(data?.data?.cartOwner);
    setCartId(data?.data._id);
  }
  useEffect(() => {
    async function getCart() {
      let { data } = await getLoggedUserCart();
      setCartCount(data?.numOfCartItems);
    }
    getCart();
    getCartId();
  }, []);
  return (
    <CartContext.Provider
      value={{
        addToCart,
        getLoggedUserCart,
        deleteFromCart,
        updateProductQuantity,
        clearCart,
        onlinePayment,
        cartId,
        cartCount,
        setCartCount,
        getCartId,
        cartOwner,
      }}
    >
      {props.children}
    </CartContext.Provider>
  );
}
