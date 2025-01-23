const { default: mongoose } = require("mongoose");

let schema= require("mongoose").Schema;
let classTiming=new schema(
{
    enrollementID:{
        type:schema.Types.ObjectId,
        ref:"enrollements"
    },
    Date:{
        type:Date
    },
    slot:{
        type:String
    },
    room:{
        string
    }
},{collection:"classes"}
)



let model= mongoose.model("class",classTiming);

module.exports=model;




