import axios from "axios";
import { createContext, useEffect, useState } from "react";

export let ProductsContext = createContext();

export default function ProductsContextProvider(props) {
  const [products, setProducts] = useState([]);
  async function getFeaturedProducts(page = 1) {
    let { data } = await axios.get(
      `https://ecommerce.routemisr.com/api/v1/products?page=${page}`
    );
    setProducts(data?.data);
    localStorage.setItem("allData", JSON.stringify(data?.data));
  }

  useEffect(() => {
    getFeaturedProducts(1);
  }, []);
  return (
    <ProductsContext.Provider value={{ products, setProducts }}>
      {props.children}
    </ProductsContext.Provider>
  );
}
