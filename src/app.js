const express = require("express");
const { adminAuth, userAuth } = require("./middleware/auth");

const app = express();

// MIDDLEWARE - the all Fuctions are middleware were req find there response goes to each fuction(middleware) then finally it get Response from 5th fuction so 5th fuction is Request Handler

//use of next()


// app.use("/user",(req, res, next)=>{
//     console.log("fisrt Response")
//     next();
// },
// (req, res, next)=>{
//     // res.send("Second Response..")
//     next();
// },
// (req, res, next)=>{
//     // res.send("3rd Response..")
//     next()
// },
// (req, res, next)=>{
//     // res.send("4th Response..")
//     next()
// },
// (req, res, next)=>{
//     res.send("5th Response..")
// }
// )


// Now Actual Concept of middleware start

// middleware generally used with app.use - this is not compulsory but we used 

app.use("/admin", adminAuth)
// app.use("/user", userAuth)

app.get("/user",userAuth, (req, res)=>{
res.send("get all user data..")
})  

// for the login api - (sent data back to the backed we dont need userAuth middleware there..)
app.post("/post",(req, res)=>{
    res.send("User data send successfully...")
})
app.get("/admin/getAllData", (req, res) => {
    res.send('All data sented back to the Admin...')
    // before the use of middleWare i need to configure below step for all API
    // const token ='xyz'
    // const isAdminAthoriaze = token === 'xyz';
    // if(isAdminAthoriaze)
    // {
    //     res.send("Sent all data to admin..");
    // }else{
    //     res.status(401).send("Error occur")
    // }
})

app.get("/admin/delete", (req, res) => {
    res.send("User deleted successfully from admin...")
    // before the use of middleWare i need to configure below step for all API
    // const token ='xyz'
    // const isAdminAthoriaze = token === 'xyz';
    // if(isAdminAthoriaze)
    // {
    //     res.send("user deleted Sucessfully..");
    // }else{
    //     res.status(401).send("Error occur")
    // }
})


app.listen(9999, () => {
    console.log("Server is listening on port no.9999..");
})


// so we need middleware to separate some sort of logic like user Authoration and then keep it to userAuth middlerware then use all Api that follow /user path....
