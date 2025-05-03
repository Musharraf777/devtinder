const express = require("express");

const app = express();

// this will only handle get Calls to /user
app.get("/user",(req,res)=>{
    res.send({fName : "Syed", lName : "Musharraf"})
})

// post
app.post("/savedUser",(req, res)=>{
    res.send("User Saved SuccessFully to the DataBase (MongoDB..)")
    console.log(res.body)
})

// delete
app.delete("/delete",(req, res)=>{
    res.send("User Deleted Successfully...")
})


// this will match all api the HTTP method API call to /hello
app.use("/hello",(req, res)=>{
    res.send("My name is Hello kiujy")
}) 
app.use("/hello/mini",(req, res)=>{
    res.send("My name is Khan")
})





app.listen(9999,()=>{
        console.log("Server is listening on port no.9999..");
})
