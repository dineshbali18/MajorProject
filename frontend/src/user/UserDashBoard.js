import React from "react";
import Base from "../core/Base";
import { isAutheticated } from "../auth/helper/index";
import { Link } from "react-router-dom";

const UserDashBoard = () => {
  const {
    user: { name, email, role }
  } = isAutheticated();
  

  const UserLeftSide = () => {
    return (
      <div className="card">
        <h4 className="card-header bg-dark text-white">User Navigation</h4>
        <ul className="list-group">
          <li className="list-group-item">
            <Link to="/user/orders" className="nav-link text-success">
              User Orders
            </Link>
          </li>
        </ul>
      </div>
    );
  };

  const UserRightSide = () => {
    return (
      <div className="card mb-4">
        <h4 className="card-header">User Information</h4>
        <ul className="list-group">
          <li className="list-group-item">
            <span className="badge badge-success mr-2">Name:</span> {name}
          </li>
          <li className="list-group-item">
            <span className="badge badge-success mr-2">Email:</span> {email}
          </li>

          <li className="list-group-item">
            <span className="badge badge-danger">User Area</span>
          </li>
        </ul>
      </div>
    );
  };
  return (
    <Base
      title="Welcome to User area"
      description="Manage all of your products here"
      className="container bg-success p-4"
    >
      <div className="row">
        <div className="col-3">{UserLeftSide()}</div>
        <div className="col-9">{UserRightSide()}</div>
      </div>
    </Base>
  );
};

export default UserDashBoard;
