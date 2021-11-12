import React from "react";
import { API } from "../../backend";

const ImageHelper2 = ({ product }) => {
  const imageurl = product.product
    ? `${API}/product/photo/${product.product}`
    : `https://images.pexels.com/photos/3561339/pexels-photo-3561339.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940`;
  return (
    <div className="rounded border border-success p-2">
      <img
        src={imageurl}
        alt="photo"
        style={{ maxHeight: "150px", maxWidth: "150px" }}
        className="mb-3 rounded"
      />
    </div>
  );
};

export default ImageHelper2;
