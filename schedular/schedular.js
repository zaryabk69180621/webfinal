enrollmentsmodel=require("../models/enrollements");
let nodecron=require("node-cron");
let classmodel= require("../models/classes");
nodecron.schedule("8 10 * * *",async ()=>{

        console.log("Fetching schedule...");
        try {
          const enrollments = await enrollmentsmodel.find(); // Fetch all enrollments
          console.log("Received enrollments:", enrollments);
      
      
          enrollments.forEach((enrollment) => {
            ["monday", "tuesday", "wednesday", "thursday", "friday"].forEach((day,i) => {
              if (enrollment[day]) {
                let tempdat=new Date();
                 tempdat.setDate(tempdat.getDate()+i);
                 let dat= tempdat.getDate()+"/"+(tempdat.getUTCMonth()+1)+"/"+tempdat.getFullYear();
                enrollment[day].forEach(async(session) => {
                  
                  let data={
                    enrollementID: enrollment._id,
                    day, // The day of the week
                    room: session.room,
                    time: session.time, // Keep time as it is
                    date: dat // Use the date from the database (don't modify it)
                  };
                  await classmodel.create(data);

                });
              }
            });
          });
      
        } catch (e) {
          console.log("Error fetching schedules:", e.message);
          throw e;
        }
      }
      
    

)




    








