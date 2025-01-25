let schema=require("mongoose").Schema;
let mongoose= require("mongoose");
let subschema= new schema({
enrollementId:{
    type:schema.Types.ObjectId,
    ref:"enrolllements",
    required:true
    
},
message:{
    type:String,
required:true
},
title:{
    type:String,
    required:true

},
startDate:{
type:String,

required:true

},
endDate:{
type:String,
required:true
}

},{collection:"submission"})

let model= mongoose.model("submission",subschema);

 module.exports=model;

