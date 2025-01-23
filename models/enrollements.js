const { default: mongoose } = require("mongoose");

let schema= require("mongoose").Schema;


let enrollementschema= new schema(
{
    section:{
        type:String,
        required:true
    },
    course:{
        type:schema.Types.ObjectId,
        required:true
    },
    monday:{
        type:[{
            room:{type:String},
            time:{type:String}
        }],

    },
    tuesday:{
        type:[
            {
                room:{type:String},
                time:{type:String}
            }
        ]

    },
    wednesday:{
        type:[{
            room:{type:String},
            time:{type:String}
        }]
    },
    thursday:{
        type:[{
            time:{type:String},
            room:{type:String}
    }]},
    friday:{
        type:[{
            time:{type:String},
            room:{type:String}
    }]}




},
{collection:"enrolllements"}



)

let model= mongoose.model("enrollemenets",enrollementschema);

module.exports=model;
