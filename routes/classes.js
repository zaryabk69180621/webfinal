let classmodel=require("../models/classes");
let usermodel=require("../models/usermodel");
let router=require("express").Router();
let auth= require("../middlewares/auth");
router.use(auth);
router.get("/getattendance/:classid",async (req,res)=>{
    try{
    let clas=await classmodel.findById(req.params.classid);
    let enrollementID=clas.enrollementID;
    let temp= await usermodel.find({enrollements:enrollementID});
    let students=[]
    temp.forEach((a)=>{

        students.push(a._id.toString());
    })
    clas=clas.toObject();
    clas.students=students;
    clas.presentstudents=students;
    clas.absentstudents=[];
    console.log("students",clas.students);

    res.send(clas);
    }catch(e){
        res.status(500);
        res.send(e.message);
    }
    
    
    })



router.get("/:enrollementid",async(req,res)=>{
    console.log("rewq.rol",req.role);
if(req.role!="admin"&&req.role!="teacher"){
res.status(400);
    res.send("anuthorized! only teacher or admin is required");



}

try{
    let t= new Date();
    console.log(t.getTime());


    let resu= await classmodel.find({enrollementID:req.params.enrollementid})
    console.log("initial resu",resu,req.params.enrollementid)
    if(!resu){

        throw Error("error no scheduled classes found");
    }
    
    let final=resu.filter((a)=>{
        let str=a.time;
        
        let [day,month,year]=a.date.split("/");

        let dat=new Date(`${year}-${month}-${day}`)
        let x=Number(str.split("-")[1].substr(0,2));
        dat.setHours(0, 0, 0, 0);
        console.log("catcalled to be",dat,"of id ",a._id);

        if(dat>new Date()){
            console.log(dat,"lessthan equal to",new Date())
            return false
        }
       
 if(x>new Date().getHours()){
            return false;
        } else{

            console.log(x,"is lessthan",new Date().getHours());
            return true;
        }


    })
    res.send(final);;
    
}catch(e){
    res.status(500);
    res.send(e.message);



}


})
router.post("/:enrollementid",async(req,res)=>{

    try{
        req.body.enrollementID=req.params.enrollementid;
        if(req.role!="teacher"&&req.role!="admin"){
            throw Error("unauthorized!, only teachr or admin allowed");
        }

let enrollementID=req.params.enrollementid;
let data=req.body;
let resu= await classmodel.find();
console.log(resu);
let status=true;

resu.forEach((b)=>{
    if(b.room==data.room){
    if(b.date==data.date){
        if(b.time==data.time){
            
            status=false;
            throw Error("clash detected select some other day");
        }


    }}
})
let final= await classmodel.create(data);
res.send(final);

}catch(e){
console.log(e);
    res.status(500);
    res.send(e.message);
}

})




module.exports=router;


