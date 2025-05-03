const express = require("express");

const app = express();

// MIDDLEWARE
app.use("/user",(req, res, next)=>{
    console.log("fisrt Response")
    next();
},
(req, res, next)=>{
    // res.send("Second Response..")
    next();
},
(req, res, next)=>{
    // res.send("3rd Response..")
    next()
},
(req, res, next)=>{
    // res.send("4th Response..")
    next()
},
(req, res, next)=>{
    res.send("5th Response..")
}
)


app.listen(9999,()=>{
        console.log("Server is listening on port no.9999..");
})
