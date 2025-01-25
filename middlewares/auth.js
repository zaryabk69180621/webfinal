let jwt = require("jsonwebtoken");

async function auth(req,res,next){
try{
    if(!req.headers.authorization){
        throw Error("pleadse provide auth token");
    }
    let token= req.headers.authorization.split(" ")[1];
    console.log("token",token);
    let{_id,role}= await jwt.verify(token,process.env.SECRET);
   
    req._id=_id;
    req.role=role;

    next();
   
}catch(e){
    console.log(e);
    res.status(500);
    res.send(e.message);
}

}
module.exports=auth;
