import React, { useContext } from "react";

import { Link, NavLink, useNavigate } from "react-router-dom";
import logo from "../../Assets/images/freshcart-logo.svg";
import { UserContext } from "../../Context/UserContext";
import profile from "../../Assets/images/blog-img-2.jpeg";
import { CartContext } from "../../Context/CartContext";
import { WishlistContext } from "../../Context/WishlistContext";

export default function Navbar() {
  let { cartCount } = useContext(CartContext);
  let { wishlistCount } = useContext(WishlistContext);
  let { userToken, setUserToken } = useContext(UserContext);
  let navigate = useNavigate();
  function logout() {
    localStorage.removeItem("userToken");
    setUserToken(null);
    navigate("/login");
  }

  return (
    <>
      <nav className="navbar fixed-top shadow-sm py-3 navbar-expand-lg bg-body-tertiary">
        <div className="container">
          <Link className="navbar-brand" to="/">
            <img src={logo} alt="fresh market logo" />
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              {userToken !== null ? (
                <>
                  <li className="nav-item">
                    <NavLink className="nav-link" to="/">
                      Home
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink className="nav-link" to="/products">
                      Products
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink className="nav-link" to="/categories">
                      Categories
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink className="nav-link" to="/brands">
                      Brands
                    </NavLink>
                  </li>
                </>
              ) : (
                ""
              )}
            </ul>
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
              {userToken !== null ? (
                <li className="nav-item">
                  <Link className="nav-link" to="/profile">
                    <div className="profile">
                      <img
                        src={profile}
                        className="w-100 img-thumbnail h-100 d-block rounded-circle"
                        alt="profile"
                      />
                    </div>
                  </Link>
                </li>
              ) : (
                ""
              )}
              <li className="nav-item d-flex align-items-center">
                <i className="fab fa-facebook mx-2"></i>
                <i className="fab fa-twitter mx-2"></i>
                <i className="fab fa-instagram mx-2"></i>
                <i className="fab fa-tiktok mx-2"></i>
                <i className="fab fa-youtube mx-2"></i>
              </li>
              {userToken !== null ? (
                <>
                  <li className="nav-item">
                    <Link className="nav-link cart-badge " to="/wishlist">
                      <span className="position-relative ">
                        <i className="fa-solid fa-heart fa-xl text-danger"></i>
                        {wishlistCount === 0 ? (
                          ""
                        ) : (
                          <span className="wishlistBadge translate-middle badge rounded rounded-2 ">
                            {wishlistCount}
                          </span>
                        )}
                      </span>
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link cart-badge " to="/cart">
                      <span className="position-relative ms-md-2">
                        <i className="fa-solid fa-cart-shopping fa-lg text-success"></i>
                        {cartCount === 0 ? (
                          ""
                        ) : (
                          <span className="cartBadge translate-middle badge rounded rounded-2 bg-main">
                            {cartCount}
                          </span>
                        )}
                      </span>
                    </Link>
                  </li>
                  <li className="nav-item">
                    <span
                      onClick={() => {
                        logout();
                      }}
                      className="nav-link cursor-pointer"
                    >
                      Logout
                    </span>
                  </li>
                </>
              ) : (
                <>
                  <li className="nav-item">
                    <Link className="nav-link" to="/login">
                      Login
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/register">
                      Register
                    </Link>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}
