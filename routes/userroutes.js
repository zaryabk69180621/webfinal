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
router.post("/sudosignin",async(req,res)=>{
try{
    let {email, password}= req.body;
let user= await usermodel.find({email});
if(!user){
    throw Error("not a registered admin");
}
if(user[0].password!=password){

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
;
    let hash= bcrypt.hashSync(data._id)

    let resu=await usermodel.create(data);
    res.status(200);
    res.send(resu)
}catch(e){
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
let user= await usermodel.find({email})[0]
if(!user){
    res.status(404)
    throw Error("user niot found");
}
if(user.password!=password){
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


