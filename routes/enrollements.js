/* shows university offering courses in sections for example we have ITB in q5
but Fa in q3
privileged only admins can decide wich courses are being offered

*/
let router= require("express").Router();
let auth= require("../middlewares/auth");
let enrollemenetsmodel= require("../models/enrollements");
router.use(auth);
router.get("/",(req,res)=>{
/*used to access all the enrollmenets both student and admin can do this*/
enrollemenetsmodel.find().then((resu)=>{
res.send(resu);
return;

}).catch((e)=>{
    console.log(e.message);
res.send(e.message);})


})

router.post("/",async (req,res)=>{

try{
if(req.role!="admin"){
    throw Error("only admins can access");
}
let data= req.body;
let resu= await enrollemenetsmodel.create(data)
res.send(resu);


}
catch(e){
    res.status(500);
    res.send(e.message);
}
})


router.delete("/:id",(req,res)=>{
/*when admin/uni decide to delete an ernollement opeertunity maybe due to teachrs anavailibilty
or due to low enrollements*/
enrollemenetsmodel.findByIdAndDelete(req.params.id).then(
    (resu)=>{
        res.status(200)
        console.log(resu);

    }
).catch((e)=>{
    res.status(500);
    res.send(e.message);
})



})

router.post("/makesubmission",(req,res)=>{
if(req.role!="teacher"){
    res.send("unauthorized!! only teacher can make submissions");

}





})


module.exports=router;
