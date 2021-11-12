import React, { useState, useEffect } from "react";
import ImageHelper2 from "./helper/ImageHelper2";
import { Redirect } from "react-router-dom";
// import { addItemToCart, removeItemFromCart } from "./helper/localCart";
import {incrementInCart,decrementInCart,deleteProductInCart} from "./helper/cartHelper"
import { isAutheticated } from "../auth/helper";
import Paymentb from "./Paymentb";

import './Card2.css'

const Card2 = ({
  product,
  setReload = f => f,
  //   function(f){return f}
  reload = undefined
}) => {

  function refreshPage(){
    window.location.reload();
  }
  
  // addtoCart = true,


  const removeFromCart = true;
  const [redirect, setRedirect] = useState(false);
  const [count, setCount] = useState(product.count);
  const [Tprice,setPrice]=useState(0);
  const [paym,setPaym]=useState(0);

  const{user,token}=isAutheticated();
  const cartTitle = product ? product.name : "A photo from pexels";
  const cartDescrption = product ? product.description : "Default description";
  const cartPrice = product ? product.price : "DEFAULT";

//   const addToCart = () => {
//     pushProductInCart(user._id,token,product._id,product).then(console.log("success"));
//     // addItemToCart(product, () => setRedirect(true));
//   };
//   const removeItem=(productId1)=>{
//       console.log("-------");
//       console.log(productId1);
//       console.log("-------");

//     deleteProductInCart(user._id,token,product.product).then((res)=>console.log(res));
//   }

  useEffect(()=>{
    TotalAmount();
  },[])

  const getARedirect = redirect => {
    if (redirect) {
      return <Redirect to="/cart" />;
    }
  };
 const del=(prop)=>{
  deleteProductInCart(user._id,token,prop).then((res)=>console.log(res))
  refreshPage();
  refreshPage();
 }

 const TotalAmount=()=>{
   console.log(product);
   var val12=0;
  {product.map((product,index)=>{
    val12+=product.price*product.count;
  }
 )}
//  console.log("---------");
//  console.log(val12);
//  console.log("---------");

 setPrice(val12);
}


  return (
    <div style={{border:'solid',margin:'20px',backgroundColor:'white',padding:'20px'}} className="row">
      <div>
        {getARedirect(redirect)}
        {/* {console.log(Tprice)} */}
        {product.map((product,index)=>{
            return(
                <div className="dinu row">
            <ImageHelper2 product={product} />
            <div style={{marginTop:"25px"}} className="col">
            <div style={{color:'#62009C',fontSize:'20px',fontFamily:'TimesNewRoman'}}>{product.name}</div>
            
            <div style={{border:'solid',color:'#62009C',padding:'10px',paddingLeft:'20px'}}>Rs. {product.price}*{product.count}={product.price*product.count}</div>
            <div>
            <div className='row'>
        <button style={{border:'solid',marginLeft:'2px',position:'relative'}}
          onClick={()=>{del(product.product);
          refreshPage();
        refreshPage();}}
          className="btn btn-block btn-outline-danger mt-1 mb-1 col"
        >
          del
        </button>
        <button style={{border:'solid',marginLeft:'2px',position:'relative'}}
          onClick={() => {
            incrementInCart(user._id,token,product.product);
            refreshPage();
            refreshPage();
          }}
          className="btn btn-block btn-outline-success mt-1 mb-1 col"
        >
         +
        </button>
        <button style={{border:'solid',marginLeft:'2px',position:'relative'}}
          onClick={() => {
            decrementInCart(user._id,token,product.product);
            refreshPage();
            refreshPage();
    
          }}
          className="btn btn-block btn-outline-danger mt-1 mb-1 col"
        >
         -
        </button>
        </div>
            </div>
            </div>
      </div>
        )
        })}
<div className="btn btn-block btn-outline-danger mt-2 mb-2">Total Cost: {Tprice}</div>
{paym==1?
        <div className="col-6">
          <h1>Hi</h1>
          <Paymentb products={product} setReload={setReload} />
          <h1>Hi</h1>
        </div>
        :<div className="btn btn-block btn-outline-warning mt-2 mb-2" onClick={()=>{setPaym(1);}}>Proceed to checkout</div>
        }

        </div>
        </div>
  )
      }

export default Card2;
