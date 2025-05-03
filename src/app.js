const express = require("express");

const app = express();


app.use("/hello",(req, res)=>{
    res.send("My name is Hello kiujy")
})
app.use("/text",(req, res)=>{
    res.send("My name is Khan")
})


app.listen(9999,()=>{
        console.log("Server is listening on port no.9999..");
})
