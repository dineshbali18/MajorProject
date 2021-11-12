const mongoose=require('mongoose')
const {ObjectId}=mongoose.Schema;

const sellerSchema=mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    rating:{
        type:Number,
        required:true
    }
})

module.exports=mongoose.model("Shop",sellerSchema);


