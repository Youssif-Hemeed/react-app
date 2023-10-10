import React, { useContext, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { BallTriangle } from "react-loader-spinner";
import { UserContext } from "../../Context/UserContext";

export default function Login() {
  let { setUserToken } = useContext(UserContext);

  let navigate = useNavigate();
  let [error, setError] = useState(null);
  let [isLoading, setIsLoading] = useState(false);
  //
  async function submitLogin(values) {
    setIsLoading(true);
    let { data } = await axios
      .post(`https://ecommerce.routemisr.com/api/v1/auth/signin`, values)
      .catch((error) => {
        setIsLoading(false);
        setError(error.response.data.message);
      });
    if (data.message === "success") {
      setIsLoading(false);
      localStorage.setItem("userToken", data.token);
      setUserToken(data.token);
      navigate("/");
    }
  }

  let validateScheme = Yup.object({
    email: Yup.string().email("email is invalid").required("email is required"),
    password: Yup.string()
      .matches(
        /^[A-Z][a-z0-9]{5,10}$/,
        "password start with capital letter then from 5 to 10 letters or digits"
      )
      .required("password is required"),
  });
  let formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: validateScheme,
    onSubmit: submitLogin,
  });
  return (
    <>
      <div className="w-75 mx-auto py-5">
        {error ? (
          <div className="alert alert-danger p-2 mt-2">{error}</div>
        ) : (
          ""
        )}

        <h2>Login Now </h2>
        <form onSubmit={formik.handleSubmit}>
          <label htmlFor="email">Email : </label>
          <input
            type="email"
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            value={formik.values.email}
            className="form-control mb-2"
            id="email"
            name="email"
          />
          {formik.errors.email && formik.touched.email ? (
            <div className="alert alert-danger p-2 mt-2">
              {formik.errors.email}
            </div>
          ) : (
            ""
          )}

          <label htmlFor="password">Password : </label>
          <input
            type="password"
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            value={formik.values.password}
            className="form-control mb-2"
            id="password"
            name="password"
          />
          {formik.errors.password && formik.touched.password ? (
            <div className="alert alert-danger p-2 mt-2">
              {formik.errors.password}
            </div>
          ) : (
            ""
          )}

          {!isLoading ? (
            <div className="d-flex align-items-center justify-content-between flex-wrap">
              <Link className="text-main" to="/ForgetPassword">
                Forget Password ? ..
              </Link>
              <div>
                <span>Dont have an account ?</span>
                <Link className="ps-2 text-main" to={"/register"}>
                  Register Now
                </Link>
              </div>

              <button
                disabled={!(formik.isValid && formik.dirty)}
                type="submit"
                className="btn bg-main text-white mt-2"
              >
                Login
              </button>
            </div>
          ) : (
            <button type="button" className="btn bg-main text-white mt-2">
              <BallTriangle
                height={20}
                width={100}
                radius={5}
                color="#fff"
                ariaLabel="ball-triangle-loading"
                wrapperClass={{}}
                wrapperStyle=""
                visible={true}
              />
            </button>
          )}
        </form>
      </div>
    </>
  );
}
