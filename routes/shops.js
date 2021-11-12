const express = require("express");
const router = express.Router();

const {
    createProduct,
    getProduct,
    photo,
    updateProduct,
    deleteProduct,
  } = require("../controllers/product");

  const { isSignedIn, isAuthenticated, isAdmin,isSeller } = require("../controllers/auth");
  const { getUserById } = require("../controllers/user");

 //all of params
router.param("userId", getUserById);
router.param("productId", getProductById);

//all of actual routes
//create route
router.post(
  "/product/create/:userId",
  isSignedIn,
  isAuthenticated,
  isSeller,
  createProduct
);

// read routes
router.get("/product/:productId", getProduct);
router.get("/product/photo/:productId", photo);


router.delete(
    "/product/:productId/:userId",
    isSignedIn,
    isAuthenticated,
    isSeller,
    deleteProduct
  );
  
  //update route
  router.put(
    "/product/:productId/:userId",
    isSignedIn,
    isAuthenticated,
    isSeller,
    updateProduct
  );

  module.exports=router;