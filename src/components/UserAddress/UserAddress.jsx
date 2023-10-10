import React, { useContext } from "react";

import { useFormik } from "formik";
import * as Yup from "yup";
import creditCart from "../../Assets/images/creditCard-36cc884b.png";
import { CartContext } from "../../Context/CartContext";
import { Helmet } from "react-helmet";

export default function UserAddress() {
  let { onlinePayment, cartId } = useContext(CartContext);

  async function handleAddressSubmit(values) {
    let response = await onlinePayment(cartId, "http://localhost:3000", values)
      .then((response) => response)
      .catch((error) => error);

    window.location.href = response?.data.session.url;
  }
  let phoneRegExp =
    /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;
  let validationSchema = Yup.object({
    details: Yup.string()
      .min(3, "details minLength is 3")
      .max(100, "details maxLength is 100")
      .required("details is required"),
    phone: Yup.string()
      .matches(phoneRegExp, "Phone number is not valid")
      .required("phone is required"),
    city: Yup.string()
      .min(3, "city minLength is 3")
      .max(30, "city maxLength is 100")
      .required("city is required"),
  });

  let formik = useFormik({
    initialValues: {
      details: "",
      phone: "",
      city: "",
    },
    validationSchema,
    onSubmit: handleAddressSubmit,
  });
  return (
    <>
      <Helmet>
        <meta name="description" content="" />
        <title>User Address</title>
      </Helmet>
      <div className="row userPay g-5 align-items-center">
        <div className="col-md-6">
          <div className="border border-2 rounded-3 p-5">
            <form onSubmit={formik.handleSubmit}>
              <label htmlFor="details">Detailed Address :</label>
              <input
                value={formik.values.details}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                type="text"
                className="form-control mb-2"
                name="details"
                id="details"
              />
              {formik.errors.details && formik.touched.details ? (
                <div className="alert alert-danger p-2 mt-2">
                  {formik.errors.details}
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

              <label htmlFor="city">City : </label>
              <input
                type="text"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                value={formik.values.city}
                className="form-control mb-2"
                id="city"
                name="city"
              />
              {formik.errors.city && formik.touched.city ? (
                <div className="alert alert-danger p-2 mt-2">
                  {formik.errors.city}
                </div>
              ) : (
                ""
              )}

              <button
                disabled={!(formik.isValid && formik.dirty)}
                type="submit"
                className="btn w-100 bg-main text-white mt-2 "
              >
                Pay Now
              </button>
            </form>
          </div>
        </div>
        <div className="col-md-6">
          <img src={creditCart} className="w-100" alt=" credit cart payment" />
        </div>
      </div>
    </>
  );
}
