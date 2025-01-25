let mongoose=require("mongoose");
//mongoose.connect("mongodb+srv://UCPFINAL:123@cluster0.2owit.mongodb.net/")
mongoose.connect("mongodb://localhost:27017/finaldb");
let enrollmentsmodel=require("./models/enrollements");
let db= mongoose.connection;
db.on("connected",()=>{console.log("connected");}
)
db.on("disconnected",()=>{console.log("disconnected")});
db.on("error",()=>{console.log("error")});