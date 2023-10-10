import React, { useState } from "react";

import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function ResetPassword() {
  const [error, setError] = useState("");
  let Navigate = useNavigate();
  let validationSchema = Yup.object({
    email: Yup.string().email("email invalid").required("email is required"),
    newPassword: Yup.string()
      .matches(
        /^[A-Z][a-z0-9]{5,10}$/,
        "password start with capital letter then from 5 to 10 letters or digits"
      )
      .required("password is required"),
  });
  let ResetForm = useFormik({
    initialValues: {
      email: "",
      newPassword: "",
    },
    validationSchema,
    onSubmit: resetPassword,
  });
  async function resetPassword(val) {
    let { data } = await axios
      .put(`https://ecommerce.routemisr.com/api/v1/auth/resetPassword`, val)
      .catch((error) => {
        setError(error.response.data.message);
      });
    if (data.token) {
      Navigate("/login");
    }
  }
  return (
    <>
      <div className="row my-5 py-5 d-flex align-items-center">
        <div className="col-md-9 col-lg-6 mx-auto">
          <div className=" bg-main-light py-5 px-3 overflow-hidden rounded-3">
            <form onSubmit={ResetForm.handleSubmit}>
              {error ? (
                <div className="alert alert-danger p-2">{error}</div>
              ) : (
                ""
              )}

              <label htmlFor="email">Email</label>
              <input
                onChange={ResetForm.handleChange}
                onBlur={ResetForm.handleBlur}
                id="email"
                type="email"
                className="form-control mt-1 mb-2"
                name="email"
                placeholder="Enter your email"
              />

              {ResetForm.errors.email && ResetForm.touched.email ? (
                <div className="alert alert-danger p-2">
                  {ResetForm.errors.email}
                </div>
              ) : (
                ""
              )}
              <label htmlFor="newPassword">New Password</label>
              <input
                onChange={ResetForm.handleChange}
                onBlur={ResetForm.handleBlur}
                type="password"
                name="newPassword"
                id="newPassword"
                placeholder="Enter a valid password"
                className="form-control mt-1 mb-2"
              />

              {ResetForm.errors.newPassword && ResetForm.touched.newPassword ? (
                <div className="alert alert-danger p-2">
                  {ResetForm.errors.newPassword}
                </div>
              ) : (
                ""
              )}

              <div className="text-center">
                <button
                  disabled={!(ResetForm.dirty && ResetForm.isValid)}
                  type="submit"
                  className="btn bg-main text-white mt-1 px-5 py-2"
                >
                  Reset Password
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
