let router= require("express").Router();
let announcementsmodel= require("../models/announcements")
let auth= require("../middlewares/auth");
router.use(auth);
router.get("/:enrollementId",async(req,res)=>{
    /*to get cnnouncements of enrollements*/
try{

let resu= await announcementsmodel.find({enrollementId:req.params.enrollementId});
console.log("announce",req.params.enrollementId);
if(!resu||resu.length==0){
throw Error("cant find announcements of the enrollement");

}
res.send(resu)
}catch(e){

    res.status(500);
    res.send(e.message);

}




})



router.post("/:enrollementId",async (req,res)=>{
try{
    if(req.role!="teacher"){
    throw Error("unauthorized, only teachers can post annuncements");
}
let {message}=req.body;
let resu=await announcementsmodel.create({enrollementId:req.params.enrollementId,message});
if(!resu)
    throw Error("couldnt add announcement");
res.send(resu);
}catch(e){
res.status(500);
res.send(e.message);


}
})


module.exports=router;