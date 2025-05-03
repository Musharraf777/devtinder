const express = require("express");

const app = express();

// Remeber order matter a lot..
// handling error alway write your code in try catch block
app.get("/getAllData", (req, res)=>{
    try{
        throw new("child error")
        res.send("User  data")
    }catch(err){
res.status(500).send(err.message)
    }

})

// and the here first para is err which is use to catch error 
app.use("/",(err, req, res, next)=>{
    if(err){
        res.status(501).send("parent error");
    }
})
app.listen(9999,()=>{
    console.log("Server is listenting on 9999..")
})