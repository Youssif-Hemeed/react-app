import React from "react";

import notFound from "../../Assets/images/error.svg";

export default function Notfound() {
  return (
    <>
      <div className="notFound d-flex justify-content-center align-items-center pt-2">
        <img src={notFound} alt="not found" />
      </div>
    </>
  );
}
