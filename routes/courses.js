let router= require("express").Router();
const { model } = require("mongoose");
let coursesmodel= require("../models/courses");
let auth= require("../middlewares/auth");
/*

courses being offered by the university ony admins have right to add new courses such
as machine learning 
*/
router.use(auth,(req,res,next)=>{
    console.log(req.role);
if(req.role!="admin"){
    res.status(401);
    res.send("unauthorized! only admins can access");

}
next();

})
router.get("/",(req,res)=>{
coursesmodel.find().then((resu)=>{
    res.send(resu);
}).catch((e)=>{
console.log(e);
    res.send(e.message);
})



})

router.post("/",async (req,res)=>{
try{

let data= req.body;

let isntance= new coursesmodel(data);
let resu=await isntance.save();
res.send(resu);

}catch(e){
res.status(500);
res.send(e.message);



}

});


router.get("/:name",(req,res)=>{

let name= req.params.name;
coursesmodel.find({name}).then((resu)=>{
res.send(resu[0]);

}).catch((e)=>{
    res.status(500);
    res.send(e.message);
})


})

module.exports=router;
