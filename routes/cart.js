const express=require('express');
var router=express.Router();

const { isSignedIn, isAuthenticated } = require("../controllers/auth");
const { getProductsByUserId,pushProductInProductCart,updateIncreProductInProductCart,updateDecreProductInProductCart,deleteProductInProductCart } = require('../controllers/cart');
const { getUserById } = require("../controllers/user");
const {getProductById}=require('../controllers/product')

router.param("productId",getProductById);
router.param("userId",getUserById);


router.get("/user/:userId/cart",isSignedIn,isAuthenticated,getProductsByUserId); 
router.post("/user/:userId/cart/product/:productId",isSignedIn,isAuthenticated,pushProductInProductCart);
router.put("/user/:userId/cart/product/update/incre/:productId",isSignedIn,isAuthenticated,updateIncreProductInProductCart);
router.put("/user/:userId/cart/product/update/decre/:productId",isSignedIn,isAuthenticated,updateDecreProductInProductCart);
router.delete("/user/:userId/cart/product/delete/:productId",isSignedIn,isAuthenticated,deleteProductInProductCart);

module.exports= router;