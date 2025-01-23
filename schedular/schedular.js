let nodecrone= require("node-crone");
enrollmentsmodel=require("../models/enrollements");
classesmodel=require("../models/classes");

function dateonly(date){
    return new Intl.DateTimeFormat('en-us').format(date)
}



let task=async()=>{
let ernrolls=enrollmentsmodel.find();
enrollmentsmodel.forEach(async(b)=>{
let data;
let x;
x= new Date();
x.setDate(x.getDate()+7-x.getDay()+1);
x=dateonly(x);
data.Date=x;
data.room=b.Monday.room;
data.slot=b.Monday.slot;

 await classesmodel.create(data);
  

 x= new Date();
 x.setDate(x.getDate()+7-x.getDay()+1);
 x=dateonly(x);
 data.Date=x;
 data.room=b.tuesday.room;
 data.slot=b.tuesday.slot;
 
  await classesmodel.create(data);
 
 



})






}