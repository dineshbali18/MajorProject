import React, { Fragment } from "react";
import { Link, withRouter } from "react-router-dom";
import { signout, isAutheticated } from "../auth/helper";

const currentTab = (history, path) => {
  if (history.location.pathname === path) {
    return { color: "#2ecc72" };
  } else {
    return { color: "#FFFFFF" };
  }
};

const Menu = ({ history }) => (
  <div>
    <div style={{backgroundColor:'#0984e3',width:'1550px',height:'60px',position:'fixed',display:'flex',zIndex:'200'}}>
      <div style={{color: 'snow',padding: '10px',fontFamily:'sans-serif'}}>
        <Link style={currentTab(history, "/")} className="nav-link" to="/">
          Home
        </Link>
      </div>
      { isAutheticated() &&
      <div style={{color: 'snow',padding: '10px',fontFamily:'sans-serif'}}>
        <Link
          style={currentTab(history, "/cart")}
          className="nav-link"
          to="/cart"
        >
          Cart
        </Link>
      </div>
      }
      {isAutheticated() && isAutheticated().user.role === 0 && (
        <div style={{color: 'snow',padding: '10px',fontFamily:'sans-serif'}}>
          <Link
            style={currentTab(history, "/user/dashboard")}
            className="nav-link"
            to="/user/dashboard"
          >
            U. Dashboard
          </Link>
        </div>
      )}
      {isAutheticated() && isAutheticated().user.role === 1 && (
        <div style={{color: 'snow',padding: '10px',fontFamily:'sans-serif'}}>
          <Link
            style={currentTab(history, "/admin/dashboard")}
            className="nav-link"
            to="/admin/dashboard"
          >
            A. Dashboard
          </Link>
        </div>
      )}
      {!isAutheticated() && (
        <Fragment>
          <div style={{color: 'snow',padding: '10px',fontFamily:'sans-serif'}}>
            <Link
              style={currentTab(history, "/signup")}
              className="nav-link"
              to="/signup"
            >
              Signup
            </Link>
          </div>
          <div style={{color: 'snow',padding: '10px',fontFamily:'sans-serif'}}>
            <Link
              style={currentTab(history, "/signin")}
              className="nav-link"
              to="/signin"
            >
              Sign In
            </Link>
          </div>
        </Fragment>
      )}
      {isAutheticated() && (
        <div style={{color: 'snow',padding: '10px',fontFamily:'sans-serif'}}>
          <Link
            className="nav-link text-warning"
            onClick={() => {
              signout(() => {
                history.push("/");
              });
            }}
          >
            Signout
          </Link>
        </div>
      )}
    </div>
  </div>
);

export default withRouter(Menu);
