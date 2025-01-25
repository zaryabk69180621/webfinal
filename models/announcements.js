let schema= require("mongoose").Schema;
let mongoose= require("mongoose");

let announcementsschema= new schema({
enrollementId:{
type:schema.Types.ObjectId,
ref:"enrolllements"

},
message:{
    type:String,
    required:true
}



},{collection:"announcements"})

let model= mongoose.model("announcements",announcementsschema);


module.exports=model;
