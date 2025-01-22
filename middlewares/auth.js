let jwt = require("jsonwebtoken");

function auth(req,res,next){
try{
    
    let token= req.headers.authorization.split(" ")[0];
    let{_id,role}= jwt.verify({_id,role},process.env.SECRET);
   
    req._id=_id;
    req.role=role;

    next();
   
}catch(e){
    res.status(500);
    res.send(e.message);
}

}
