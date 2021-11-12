import React, { useState, useEffect } from "react";
import Base from "../core/Base";
import { Link } from "react-router-dom";
import { isAutheticated } from "../auth/helper";
import { getOrders,getOrderStatus,updateStatus} from "./helper/adminapicall";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [status,setStatues]=useState([]);
  const [Ustatus,setUstatus]=useState();
  const { user, token } = isAutheticated();

  const preload = () => {
    getOrders(user._id,token).then(data => {
      if (data.error) {
        console.log(data.error);
      } else {
        setOrders(data);
      }
    });
    getOrderStatus(user._id,token).then(data => {
        if (data.error) {
          console.log(data.error);
        } else {
            setStatues(data);
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
    <Base title="Welcome admin" description="Manage categories here">
      <h2 className="mb-4">All products:</h2>
      <Link className="btn btn-info" to={`/admin/dashboard`}>
        <span className="">Admin Home</span>
      </Link>
      <div className="row" >
        <div className="col-12">
          <h2 className="text-center text-white my-3">Total {orders.length} orders</h2>
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
            <select
          onChange={(e)=>{
            setUstatus(e.target.value)}}
          className="form-control"
          placeholder="Status"
          value={Ustatus}
        >
          <option>Select</option>
          {status &&
            status.map((status, index) => (
              <option key={index} value={status}>
                {status}
              </option>
            ))}
        </select>
        <div>
            <button className="btn btn-block btn-warning mt-2 mb-2"
             onClick={()=>{
               updateStatus(user._id,token,order._id,Ustatus).then(  function refreshPage(){
                window.location.reload();
              })
            }}>Update Status</button>
        </div>
                </div>
              </h3>
                    {/* <button >updateStatus</button> */}
            </div>
          ))}
          </div>
      </div>
    </Base>
  );
};

export default Orders;
