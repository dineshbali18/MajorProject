const {ProductCart} = require('../models/order');
const product = require('../models/product');
const mongoose=require('mongoose')

exports.getProductsByUserId=(req,res)=>{
    // console.log(req.profile);
    ProductCart.find({user:req.profile._id}).exec((err,products)=>{
        if(err){
            return res.status(400).json({
                msg:"Cart is Empty"
            })
        }
        return res.json(products);
    })
}

exports.pushProductInProductCart=(req,res)=>{
    // console.log(req.body);
    var newProInCart=new ProductCart({
        product:req.product,
        user:req.profile,
        name:req.product.name,
        count:req.body.count,
        price:req.product.price
    })

    newProInCart.save((err,proCart)=>{
        if(err){
            return res.status(400).json({
                msg:"Unable to add in cart"
            })
        }
        res.json(proCart);
    })
}

exports.updateIncreProductInProductCart=(req,res)=>{
    // console.log(req.product._id);
    // console.log(req.profile);
    // console.log(req.body);
    ProductCart.updateOne({$and:[{product:req.product},{user:req.profile}]},{$inc:{count:+1}},(err,product)=>{
        if(err){
        return res.status(400).json({
            err:"count Not Updated"
        })
        }
        return res.json(product);
    })
}

exports.updateDecreProductInProductCart=(req,res)=>{
    // console.log(req.body.count);
    ProductCart.updateOne({$and:[{product:req.product},{user:req.profile}]},{$inc:{count:-1}},(err,product)=>{
        if(err){
        return res.status(400).json({
            err:"count Not Updated"
        })
        }
        return res.json(product);
    })
}

exports.deleteProductInProductCart=(req,res)=>{
    ProductCart.deleteOne({$and:[{user:req.profile},{product:req.product}]})
    .exec((err,product)=>{
        if(err){
            return res.status(400).json({
                err:"Product not deleted"
            })
        }
            return res.json(product);        
        })
}

