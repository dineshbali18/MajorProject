import React, { useState, useEffect } from "react";
// import { loadCart, cartEmpty } from "./helper/localCart";
import { Link } from "react-router-dom";
import { getmeToken, processPayment } from "./helper/paymentbhelper";
import { createOrder } from "./helper/orderHelper";
import { isAutheticated } from "../auth/helper";
import {pushProductInCart,incrementInCart,decrementInCart,deleteProductInCart} from "./helper/cartHelper"


import DropIn from "braintree-web-drop-in-react";

const Paymentb = ({ products, setReload = f => f, reload = undefined }) => {
  const [info, setInfo] = useState({
    loading: false,
    success: false,
    clientToken: null,
    error: "",
    instance: {}
  });

  const [payConform,setPayconform]=useState(0);


  const userId = isAutheticated() && isAutheticated().user._id;
  const token = isAutheticated() && isAutheticated().token;
  
  const getToken = (userId, token) => {
    getmeToken(userId, token).then(info => {
      // console.log("INFORMATION", info);
      if (info.error) {
        setInfo({ ...info, error: info.error });
      } else {
        const clientToken = info.clientToken;
        setInfo({ clientToken });
      }
    });
  };

  const showbtdropIn = () => {
    return (
      <div>
        {info.clientToken !== null && products.length > 0 ? (
          <div>
            <DropIn
              options={{ authorization: info.clientToken }}
              onInstance={instance => (info.instance = instance)}
            />
            <button className="btn btn-block btn-success" onClick={()=>onPurchase(products)}>
              {payConform?"PaymentSucess":"Buy"}
            </button>
          </div>
        ) : (
          <div className="btn btn-block btn-warning mt-2 mb-2">{info.success=="true"?"Payment Success":"Add to Cart"}</div>

        )}
      </div>
    );
  };

  useEffect(() => {
    getToken(userId, token);
  }, []);


  const onPurchase = (products) => {
    console.log(products);
    setInfo({...info,loading: true });
    let nonce;
    let getNonce = info.instance.requestPaymentMethod().then(data => {
      nonce = data.nonce;
      const paymentData = {
        paymentMethodNonce: nonce,
        amount: getAmount()
      };
      processPayment(userId, token, paymentData)
        .then(response => {
          setInfo({ ...info, success: response.success, loading: false });
          // console.log(response);
          const orderData = {
            products: products,
            transaction_id: response.transaction.id,
            amount: response.transaction.amount
          };
          console.log("PAYMENT SUCCESS");

          // console.log(orderData);
          createOrder(userId, token, orderData);
          var i=0;
          products.map((product)=>{
            // console.log("1");
            deleteProductInCart(userId,token,product.product).then((res)=>console.log(res))
          })
          // cartEmpty(() => {
          //   console.log("Did we got a crash?");
          // });
          setPayconform(1);

          setReload(!reload);
        })
        .catch(error => {
          setInfo({ loading: false, success: false });
          console.log("PAYMENT FAILED");
        });
    });
  };

  const getAmount = () => {
    let amount = 0;
    products.map(p => {
      amount = amount + p.price*p.count;
    });
    return amount;
  };

  return (
    <div>
      <h3>Your bill is {getAmount()} $</h3>
      {showbtdropIn()}
    </div>
  );
};

export default Paymentb;
