import React, { useState, useEffect } from "react";
import ImageHelper from "./helper/ImageHelper";
import { Redirect } from "react-router-dom";
import { addItemToCart, removeItemFromCart } from "./helper/localCart";
import {pushProductInCart,incrementInCart,decrementInCart,deleteProductInCart} from "./helper/cartHelper"
import { isAutheticated } from "../auth/helper";

const Card = ({
  product,
  addtoCart = true,
  removeFromCart = false,
  setReload = f => f,
  //   function(f){return f}
  reload = undefined
}) => {
  const [redirect, setRedirect] = useState(false);
  // const [count, setCount] = useState(product.count);
  const [add1,setadd1]=useState(0);
  const{user,token}=isAutheticated();

  const cartTitle = product ? product.name : "A photo from pexels";
  const cartDescrption = product ? product.description : "Default description";
  const cartPrice = product ? product.price : "DEFAULT";

  const addToCart = () => {
    pushProductInCart(user._id,token,product._id,product).then(setadd1(1));

    // addItemToCart(product, () => setRedirect(true));
  };

  const getARedirect = redirect => {
    if (redirect) {
      return <Redirect to="/cart" />;
    }
  };

  const showAddToCart = addtoCart => {
    return (
      addtoCart && (
        <button
          onClick={addToCart}
          className="btn btn-block btn-outline-success mt-2 mb-2"
        >
          Add to Cart
        </button>
      )
    );
  };

  const showRemoveFromCart = removeFromCart => {
    return (
      removeFromCart && (
        <div>
        <button
          onClick={() => {
            deleteProductInCart(user._id,token,product._id);
            // removeItemFromCart(product._id);
            setReload(!reload);
          }}
          className="btn btn-block btn-outline-danger mt-2 mb-2"
        >
          Remove from cart
        </button>
        <button
          onClick={() => {
            incrementInCart(user._id,product._id);
          }}
          className="btn btn-block btn-outline-success mt-2 mb-2"
        >
         +
        </button>
        <button
          onClick={() => {
            decrementInCart(user._id,product._id);
          }}
          className="btn btn-block btn-outline-danger mt-2 mb-2"
        >
         -
        </button>
        </div>
      )
    );
  };
  return (
    <div style={{border:'solid',margin:'0px',backgroundColor:'white',padding:'15px'}}>
      <div>
        {getARedirect(redirect)}
        {/* {console.log(product)} */}
        {add1 && <div style={{color:'green'}}>Added to Cart</div>}
        <ImageHelper product={product} />
        <div style={{color:'#62009C',fontSize:'20px',fontFamily:'TimesNewRoman'}}>{cartTitle}</div>
        {/* <p style={{color:'#6B6B98',fontSize:'20px'}}>
          {cartDescrption}
        </p> */}
        <div style={{border:'solid',color:'#62009C'}}>$ {cartPrice}</div>
        <div className="row">
          <div className="col-12">{showAddToCart(addtoCart)}</div>
          <div className="col-12">{showRemoveFromCart(removeFromCart)}</div>
        </div>
      </div>
    </div> 
  );
};

export default Card;