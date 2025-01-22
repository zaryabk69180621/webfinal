const { default: mongoose } = require("mongoose");

let schema= require("mongoose").Schema;

let courseSchema=new schema({
name:{
    type:String,
    required:true
},
credits:{
    type:Number,
    required:true
},
Code:{
    type:String,
    required:true
}

},{collation:"courses"})

let model= mongoose.model("courses",courseSchema);

module.exports=model;

