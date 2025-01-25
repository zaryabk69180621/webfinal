let router= require("express").Router();
let auth= require("../middlewares/auth");
let submodel= require("../models/submission");

router.use(auth);

router.post("/",async (req,res)=>{
    /*to make submission window  ionly teachers can access */

    if(req.role!="teacher"){
        throw Error("only teachers can create submission");
    }
try{
    
    let data= req.body;
    
    let resu=await submodel.create(data);
    
if(!resu){
    throw Error("cant create submission")
}
res.send(resu);
}catch(e){

    res.status(500);
    res.send(e.message);

    
}
    

})


router.get("/:enrollementid",async(req,res)=>{

    /* get all the submission only tghos in the future or present show up for student for teacher all are shown"*/
let enrollementId=req.params.enrollementid;
 try{
let resu=await submodel.find({enrollementId});
if(!resu){
throw Error("cant find any announcements");

}
let final;
if(req.role=="student"){
final= resu.filter(({endDate})=>{

    let [day,month,year]=endDate.split("/");
    let dat= new  Date(year+"-"+month+"-"+day)
console.log("dat caled as",dat);
if(new Date()<=dat){
    return true
}else{
    return false;
}


})}else{

final=resu;

}

res.send(final);
 }catch(e){

    res.send(e.message);

 }
})


module.exports=router;