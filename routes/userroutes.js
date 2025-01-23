let router= require("express").Router();
let dotenv= require("dotenv").config();
let usermodel= require("../models/usermodel");
let jwt= require("jsonwebtoken");
let auth= require("../middlewares/auth");
let bcrypt= require("bcrypt");
let gentoken=({_id,role})=>{

let token= jwt.sign({_id,role},process.env.SECRET,{expiresIn:"3d"})

return token;



}
router.post("/adminsignin",async(req,res)=>{
try{
    let {email, password}= req.body;

let user= (await usermodel.find({email}))[0];
console.log("email",user);
if(!user){
    throw Error("not a registered admin");
}
if(!bcrypt.compareSync(password,user.password)){

throw Error("password not found");


}

let {_id,role}=user;
let token= gentoken({_id,role});
res.status(200);

res.send(token);

}catch(e){
res.status(500);
res.send(e.message);

}

})


router.post("/register",auth,async(req,res)=>{

try{
    if(req.role!="admin")
        throw Error("authorized ath only admins can enter");
    var data= req.body;
    let salt= bcrypt.genSaltSync(10)

    let hash= bcrypt.hashSync(data.password,salt);
    data.password=hash;

    let resu=await usermodel.create(data);
    res.status(200);
    res.send(resu)
}catch(e){
    console.log(e);
    res.status(400);
    res.send(e.message)

}


})


router.post("/signin",async(req,res)=>{
try{
    const{email,password}=req.body;
if(!email||!password){
res.status(401);
throw Error("email or password not entered");


}
let user= (await usermodel.find({email}))[0]
if(!user){
    res.status(404)
    throw Error("user niot found");
}
if(!bcrypt.compareSync(password,user.password)){
    res.status(404)
throw Error("password mismatch");


}
res.status(200);
let token= gentoken(user);
res.send(token);




}catch(e){

    res.send(e.message);

}


})

router.post("/enrollcourse",auth,async(req,res)=>{
   try{
    let data;
    if(req.role=="student"){
    var {enrollmentid}=req.body;
    console.log("enrollment",enrollmentid);
     data=await usermodel.findById(req._id);}
        if(req.role=="admin"){
            var {enrollmentid,studentid}=req.body;
            data=await usermodel.findById(studentid);



        }
   //data.enrollements.push(enrollmentid);
   let resu= await usermodel.findByIdAndUpdate(req.role==="student"?req._id:studentid,data,{new:true,runValidators:true});
    res.status(200);
    res.send(resu);
}catch(e){
res.status(500);
console.log(e);
res.send(e.message);

    }


})
router.post("/adminsignup",(req,res)=>{
    let data= req.body;
    let salt= bcrypt.genSaltSync(10);
    let hash=bcrypt.hashSync(data.password,salt);
    data.password=hash;
usermodel.create(data).then((resu)=>{
    res.send(resu);
}).catch((e)=>{

    res.send(e.message)
})

})
module.exports=router;