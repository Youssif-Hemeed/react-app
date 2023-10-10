import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Layout from "./components/Layout/Layout";
import Home from "./components/Home/Home";
import Categories from "./components/Categories/Categories";
import CategoryProducts from "./components/CategoryProducts/CategoryProducts";
import Products from "./components/Products/Products";
import Cart from "./components/Cart/Cart";
import Wishlist from "./components/Wishlist/Wishlist";
import Brands from "./components/Brands/Brands";
import Login from "./components/Login/Login";
import Profile from "./components/Profile/Profile";
import Register from "./components/Register/Register";
import Notfound from "./components/Notfound/Notfound";
import ProductsContextProvider from "./Context/ProductsContext";
import React, { useContext, useEffect } from "react";
import { UserContext } from "./Context/UserContext";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";
import ProductDetails from "./components/ProductDetails/ProductDetails";
import CartContextProvider, { CartContext } from "./Context/CartContext";
import WishlistContextProvider, {
  WishlistContext,
} from "./Context/WishlistContext";
import { Toaster } from "react-hot-toast";
import ForgetPassword from "./components/ForgetPassword/ForgetPassword";
import ResetPassword from "./components/ResetPassword/ResetPassword";
import BrandProducts from "./components/BrandProducts/BrandProducts";
import UserAddress from "./components/UserAddress/UserAddress";
import Orders from "./components/Orders/Orders";

let routers = createBrowserRouter([
  {
    path: "",
    element: <Layout />,
    children: [
      {
        index: true,
        element: (
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        ),
      },
      {
        path: "categories",
        element: (
          <ProtectedRoute>
            <Categories />
          </ProtectedRoute>
        ),
      },
      {
        path: "CategoryProducts/:id",
        element: (
          <ProtectedRoute>
            <CategoryProducts />
          </ProtectedRoute>
        ),
      },
      {
        path: "products",
        element: (
          <ProtectedRoute>
            <Products />
          </ProtectedRoute>
        ),
      },
      {
        path: "cart",
        element: (
          <ProtectedRoute>
            <Cart />
          </ProtectedRoute>
        ),
      },
      {
        path: "profile",
        element: (
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        ),
      },
      {
        path: "brands",
        element: (
          <ProtectedRoute>
            <Brands />
          </ProtectedRoute>
        ),
      },
      {
        path: "BrandProducts/:id",
        element: (
          <ProtectedRoute>
            <BrandProducts />
          </ProtectedRoute>
        ),
      },
      {
        path: "wishlist",
        element: (
          <ProtectedRoute>
            <Wishlist />
          </ProtectedRoute>
        ),
      },
      {
        path: "productdetails/:id",
        element: (
          <ProtectedRoute>
            <ProductDetails />
          </ProtectedRoute>
        ),
      },
      {
        path: "userAddress",
        element: (
          <ProtectedRoute>
            <UserAddress />
          </ProtectedRoute>
        ),
      },
      {
        path: "allorders",
        element: (
          <ProtectedRoute>
            <Orders />
          </ProtectedRoute>
        ),
      },
      {
        path: "ForgetPassword",
        element: <ForgetPassword />,
      },
      {
        path: "ResetPassword",
        element: <ResetPassword />,
      },
      { path: "login", element: <Login /> },
      {
        path: "react-app",
        element: (
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        ),
      },
      { path: "register", element: <Register /> },
      { path: "*", element: <Notfound /> },
    ],
  },
]);

export default function App() {
  let y = useContext(WishlistContext);
  let x = useContext(CartContext);
  let { setUserToken } = useContext(UserContext);
  useEffect(() => {
    if (localStorage.getItem("userToken") !== null) {
      setUserToken(localStorage.getItem("userToken"));
    }
  }, []);
  return (
    <WishlistContextProvider>
      <CartContextProvider>
        <ProductsContextProvider>
          <RouterProvider router={routers}></RouterProvider>
        </ProductsContextProvider>
        <Toaster />
      </CartContextProvider>
    </WishlistContextProvider>
  );
}
