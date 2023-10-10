import React, { useState } from "react";

import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function ForgetPassword() {
  let Navigate = useNavigate();
  let [error, setError] = useState("");
  let validationSchema = Yup.object({
    email: Yup.string().required("email is required").email("email invalid"),
  });
  let validationSchema2 = Yup.object({
    resetCode: Yup.string()
      .required("code is required")
      .matches(/^[0-9]+$/, "must be only numbers"),
  });

  let ForgetForm = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema,
    onSubmit: sendForgetApi,
  });

  let ResetForm = useFormik({
    initialValues: {
      status: "",
    },
    validationSchema: validationSchema2,
    onSubmit: verifyFormApi,
  });

  async function sendForgetApi(val) {
    let { data } = await axios
      .post(`https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords`, {
        email: val.email,
      })
      .catch((error) => {
        setError(error.response.data.message);
      });

    if (data.statusMsg == "success") {
      document.getElementById("ResetForm").classList.remove("d-none");
      document.getElementById("ForgetForm").classList.add("d-none");
    }
  }
  async function verifyFormApi(val) {
    let { data } = await axios
      .post(`https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode`, {
        resetCode: `${val.resetCode}`,
      })
      .catch((error) => {
        setError(error.response.data.message);
      });
    if (data.status === "Success") {
      Navigate("/ResetPassword");
    }
  }
  return (
    <>
      <div className="row my-5 py-5 d-flex align-items-center">
        <div className="col-md-9 col-lg-6 mx-auto">
          <div className=" bg-main-light py-5 px-3 overflow-hidden rounded-3">
            <form id="ForgetForm" onSubmit={ForgetForm.handleSubmit}>
              {error ? <div className="alert alert-danger">{error}</div> : ""}
              <label htmlFor="email">Email</label>
              <input
                id="email"
                onBlur={ForgetForm.handleBlur}
                onChange={ForgetForm.handleChange}
                type="email"
                className="form-control mt-1 mb-2"
                name="email"
                placeholder="Enter your email"
              />
              {ForgetForm.errors.email && ForgetForm.touched.email ? (
                <div className="alert alert-danger p-2">
                  {ForgetForm.errors.email}
                </div>
              ) : (
                ""
              )}

              <div className="text-center">
                <button
                  disabled={!(ForgetForm.dirty && ForgetForm.isValid)}
                  type="submit"
                  className="btn bg-main text-white mt-1 px-5 py-2"
                >
                  Send
                </button>
              </div>
            </form>
            <form
              id="ResetForm"
              className="d-none"
              onSubmit={ResetForm.handleSubmit}
            >
              {error ? <div className="alert alert-danger">{error}</div> : ""}
              <label htmlFor="VerifyCode"></label>
              <input
                id="VerifyCode"
                onBlur={ResetForm.handleBlur}
                onChange={ResetForm.handleChange}
                type="number"
                className="form-control mt-1 mb-2"
                name="resetCode"
                placeholder="Enter verification code"
              />
              {ResetForm.errors.resetCode && ResetForm.touched.resetCode ? (
                <div className="alert alert-danger p-2">
                  {ResetForm.errors.resetCode}
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
                  Verify
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
