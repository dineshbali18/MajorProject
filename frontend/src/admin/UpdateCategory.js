import React, { useState, useEffect } from "react";
import Base from "../core/Base";
import { Link } from "react-router-dom";
import {
    getCategory,
    updateCategory
} from "./helper/adminapicall";
import { isAutheticated } from "../auth/helper/index";

const UpdateCategory = ({ match }) => {
  const { user, token } = isAutheticated();

  const [values, setValues] = useState({
    name:""
  });

  const {name} =values;


  const preload = CategoryId => {
    getCategory(CategoryId).then(data => {
      console.log(data.name);
      if (data.error) {
        setValues({ ...values, error: data.error });
      } else {
        console.log(data.name);
        setValues({...values,name:data.name});
      }
    });
  };


  useEffect(() => {
    preload(match.params.categoryId);
    // console.log(match.params.categoryId)
  }, []);

  const onSubmit= event => {
    event.preventDefault();
    // console.log("1");
    // setValues({ ...values, error: "", loading: true });
  //  let val=event.target.value;
  //  console.log(match.params.categoryId+"   "+user._id+"    "+token+"    "+val);
    updateCategory(match.params.categoryId, user._id, token,{name}).then(
      data => {
        if (data.error) {
          setValues(data.error);
        } else {
          setValues({name});
        }
      }
    );
  };

  // const handleChange =name=>event => {
  //   console.log(event.target.name);
  //   var x=event.target.value;
  //   setValues({...values,[name]:x});
  // };

  const handleChange = name => event => {
    const value =event.target.value;
    // formData.set(name, value);
    setValues({ ...values, [name]: value });
  };

//   const successMessage = () => (
//     <div
//       className="alert alert-success mt-3"
//       style={{ display: createdProduct ? "" : "none" }}
//     >
//       <h4>{createdProduct} updated successfully</h4>
//     </div>
//   );
  const updateForm = () => (
    <form>
      <div className="form-group">
        <input
          type="text"
          onChange={handleChange("name")}
          className="form-control"
          value={name}
        />
      </div>

      <button
        type="submit"
        onClick={(e)=>{onSubmit(e)}}
        className="btn btn-outline-success mb-3"
      >
        Update Category
      </button>
    </form>
  );

  return (
    <Base
      title="Add a product here!"
      description="Welcome to product creation section"
      className="container bg-info p-4"
    >
      <Link to="/admin/dashboard" className="btn btn-md btn-dark mb-3">
        Admin Home
      </Link>
      <div className="row bg-dark text-white rounded">
        <div className="col-md-8 offset-md-2">
          {/* {successMessage()} */}
          {updateForm()}
        </div>
      </div>
    </Base>
  );
};

export default UpdateCategory;
