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

    }




}



)


