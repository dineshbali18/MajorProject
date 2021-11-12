import React, { useState, useEffect } from "react";
import "../styles.css";
import { API } from "../backend";
import { isAutheticated } from "../auth/helper";
import Base from "./Base";
import Card2 from "./Card2";
import { getProductsByUserId } from "./helper/cartHelper";
import Paymentb from "./Paymentb";

const Cart = () => {

  const { user, token } = isAutheticated();
  const [products, setProducts] = useState([]);
  const [reload, setReload] = useState(false);

  const preload=()=>{
    getProductsByUserId(user._id,token)
    .then(data => {
       if (data.error) {
         setProducts([data.error]);
       } else {
        setProducts([ ...products, data]);
      }
    })
  }


  useEffect(() => {
    preload()
  }, []);

  const loadAllProducts = products => {
    return (
      <div>
        {/* <h2>This section is to load products</h2> */}
        {/* {console.log(products.product)} */}
        {products.map((product, index) => (
          <Card2
            key={index}
            product={product}
            removeFromCart={true}
            addtoCart={false}
            setReload={setReload}
            reload={reload}
          />
        ))}
      </div>
    );
  };
  const loadCheckout = () => {
    return (
      <div>
        <h2>This section for checkout</h2>
      </div>
    );
  };

  return (
    <Base title="Cart Page" description="Ready to checkout">
      <div style={{marginLeft:"150px"}} className="row">
        <div className="row">
          {products.length > 0 ? (
            loadAllProducts(products)
          ) : (
            <h4>No products</h4>
          )}
        </div>
      </div>
    </Base>
  );
};

export default Cart;
