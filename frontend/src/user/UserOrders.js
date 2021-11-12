import React, { useState, useEffect } from "react";
import Base from "../core/Base";
import { Link } from "react-router-dom";
import { isAutheticated } from "../auth/helper";
import { getUserOrders} from "./helper/userapicalls";

const UserOrders = () => {
  const [orders, setOrders] = useState([]);


  const { user, token } = isAutheticated();

  const preload = () => {
    getUserOrders(user._id,token).then(data => {
      if (data.error) {
        console.log(data.error);
      } else {
        setOrders(data);
      }
    });
  };

//   const deleteThisOrder=categoryId=>{
//     deleteOrder(categoryId,user._id,token).then(data => {
//       if (data.error) {
//         console.log(data.error);
//       } else {
//         preload();
//       }
//     });
//   };



  useEffect(() => {
    preload();
  }, []);

  return (
    <Base title="Welcome user" description="Manage categories here">
      <h2 className="mb-4">All products:</h2>
      <Link className="btn btn-info" to={`/user/dashboard`}>
        <span className="">user Home</span>
      </Link>
      <div className="row" >
        <div className="col-12">
          <h2 className="text-center text-white my-3">Total {orders.length} orders</h2>
          {console.log(orders)}
          {orders.map(order=> (
              <div style={{border:'solid',margin:'20px',backgroundColor:'white',padding:'15px'}}>
              <h3 className="text-white">
                  <div style={{border:'solid',color:'#62009C'}}>
                      <div style={{color:'red'}}>
                Status : {order.status} 
                </div>
                <br/>
                
                {order.products.map((pro,index)=>(
                    <div style={{border:'solid black',margin:'10px'}}>
                        product [{index}] : {pro.name} <br/>
                        price [{index}] : {pro.price}
                    </div>
                ))}
                <div style={{color:'green'}}>
                transactionId : {order.transaction_id}
                <br/><br/>
                Total Amount : {order.amount}
                <br/><br/>
                userName : {order.user.name}
                <br/><br/>
                </div>
        <div>
        </div>
                </div>
              </h3>
            </div>
          ))}
          </div>
      </div>
    </Base>
  );
};

export default UserOrders;
