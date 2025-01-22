const { Batch } = require("mongodb");
const { default: mongoose, MongooseError } = require("mongoose");

let schema= require("mongoose").Schema;

let userschema= new schema({
name:{
    type:String,
    required:true,

},
email:{
    type:String,
    unique:true,
    required:true
},
password:{
    type:String,
    required:true
},
roll:{
    type:stringify,
    enum:["teacher","student","admin"],


},
batch:{
    type:String,
    default:null
},
cgpa:{
    type:Number,
    default:null
},
department:{
    type:String,
    default:null
},
enrollements:[
   { type:schema.Types.ObjectId,
    ref:"enrollements"
   }
       

]




},{collection:"users"})



let model= mongoose.model("user",userschema);
module.exports=model;

