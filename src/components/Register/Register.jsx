import React, { useState } from "react";

import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { Audio } from "react-loader-spinner";

export default function Register() {
  let navigate = useNavigate();
  let [error, setError] = useState(null);
  let [isloading, setisloading] = useState(false);
  async function submitRegister(values) {
    setisloading(true);
    let { data } = await axios
      .post(`https://ecommerce.routemisr.com/api/v1/auth/signup`, values)
      .catch((error) => {
        setisloading(false);
        setError(error.response.data.message);
      });
    if (data.message === "success") {
      setisloading(false);
      navigate("/login");
    }
  }
  //   function validate(values) {
  //     let phoneRegex = /^01[0125][0-9]{8}$/;
  //     let emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
  //     let errors = {};
  //     if (!values.name) {
  //       errors.name = "name input is required";
  //     } else if (values.name.length < 3) {
  //       errors.name = "name minLength is 3";
  //     } else if (values.name.length > 10) {
  //       errors.name = "name maxLength is 10";
  //     }

  //     if (!values.email) {
  //       errors.email = "email input is required";
  //     } else if (!emailRegex.test(values.email)) {
  //       errors.email = "email invalid";
  //     }

  //     if (!values.phone) {
  //       errors.phone = "phone input is required";
  //     } else if (!phoneRegex.test(values.phone)) {
  //       errors.phone = "phone number invalid";
  //     }
  //     return errors;
  //   }
  let phoneRegExp =
    /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

  let validateScheme = Yup.object({
    name: Yup.string()
      .min(3, "name minLength is 3")
      .max(10, "name maxLength is 10")
      .required("name is required"),
    email: Yup.string().email("email is invalid").required("email is required"),
    phone: Yup.string()
      .matches(phoneRegExp, "Phone number is not valid")
      .required("phone is required"),
    password: Yup.string()
      .matches(
        /^[A-Z][a-z0-9]{5,10}$/,
        "password start with capital letter then from 5 to 10 letters or digits"
      )
      .required("password is required"),
    rePassword: Yup.string()
      .oneOf([Yup.ref("password")], "password and repassword do not matches")
      .required("repassword is required"),
  });
  let formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      phone: "",
      password: "",
      rePassword: "",
    },
    validationSchema: validateScheme,
    onSubmit: submitRegister,
  });
  return (
    <>
      <div className="w-75 mx-auto py-5">
        {error ? (
          <div className="alert alert-danger p-2 mt-2">{error}</div>
        ) : (
          ""
        )}

        <h2>Register Now</h2>
        <form onSubmit={formik.handleSubmit}>
          <label htmlFor="name">Name : </label>
          <input
            type="text"
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            value={formik.values.name}
            className="form-control mb-2"
            id="name"
            name="name"
          />
          {formik.errors.name && formik.touched.name ? (
            <div className="alert alert-danger p-2 mt-2">
              {formik.errors.name}
            </div>
          ) : (
            ""
          )}

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

          <label htmlFor="phone">Phone : </label>
          <input
            type="tel"
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            value={formik.values.phone}
            className="form-control mb-2"
            id="phone"
            name="phone"
          />
          {formik.errors.phone && formik.touched.phone ? (
            <div className="alert alert-danger p-2 mt-2">
              {formik.errors.phone}
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

          <label htmlFor="rePassword">Repassword : </label>
          <input
            type="password"
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            value={formik.values.rePassword}
            className="form-control mb-2"
            id="rePassword"
            name="rePassword"
          />
          {formik.errors.rePassword && formik.touched.rePassword ? (
            <div className="alert alert-danger p-2 mt-2">
              {formik.errors.rePassword}
            </div>
          ) : (
            ""
          )}

          {!isloading ? (
            <div className="d-flex align-items-center justify-content-between flex-wrap">
              <div>
                <span>Already have an account ?</span>
                <Link className="ps-2 text-main" to={"/login"}>
                  Signin Now
                </Link>
              </div>
              <button
                disabled={!(formik.isValid && formik.dirty)}
                type="submit"
                className="btn bg-main text-white mt-2 "
              >
                Register
              </button>
            </div>
          ) : (
            <button type="button" className="btn bg-main text-white mt-3">
              <Audio
                height="20"
                width="80"
                radius="9"
                color="white"
                ariaLabel="loading"
                wrapperStyle
                wrapperClass
              />
            </button>
          )}
        </form>
      </div>
    </>
  );
}
