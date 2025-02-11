let express= require("express");
let db= require("./db");
let app= express();
let userrouter= require("./routes/userroutes");
let enrollementrouter= require("./routes/enrollements");
let courserouter=require("./routes/courses");
let classrouter=require("./routes/classes");
let submissionrouter=require("./routes/submission");
let announcementrouter= require("./routes/announcements");

require("./schedular/schedular");
app.listen(3000,()=>{

console.log("started lsiteing");

})

app.use(express.json());
app.use("/classes",classrouter);
app.use("/users",userrouter);
app.use("/enrollments",enrollementrouter);
app.use("/courses",courserouter);
app.use("/submissions",submissionrouter)
app.use("/announcements",announcementrouter);

