const { default: mongoose } = require("mongoose");

let schema= require("mongoose").Schema;
let classTiming=new schema(
{
    enrollementID:{
        type:schema.Types.ObjectId,
        ref:"enrollements"
    },
    date:{
        type:String
    },
    time:{
        type:String
    },
    room:{
        type:String
    },
    students:{
        type:[String],
        default:[]
    },
    presentstudents:{
        type:[String],
        default:[]
    },
    absentstudents:{
        type:[String],
        default:[]
    }
},{collection:"classes"}
)



let model= mongoose.model("class",classTiming);

module.exports=model;




