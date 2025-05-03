const express = require("express");

const app = express();


// ROUTING...
// this will only handle get Calls to /user
app.get("/user/:userId",(req,res)=>{
    console.log(req.params)
    res.send({fName : "Syed", lName : "Musharraf"})
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
