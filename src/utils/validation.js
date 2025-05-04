 const validator = require('validator');
 
 const validtateSignupData =(req)=>{
    const {firstName, lastName, emailId, password} = req.body;
    if(!firstName || !lastName){
        throw new Error("firstName/lastname is not be Empty")
    }else if(firstName.length < 4 || firstName.length >50){
        throw new Error("FirstName should be 4 to 50 character..")
    }else if(!validator.isEmail(emailId)){
        throw new Error("Email is not correct")
    }else if(!validator.isStrongPassword(password)){
        throw new Error("enter correct password")
    }
    
 }

 const validateEditProfileData =(req)=>{
    const allowedEditFileds  =["firstName", "lastName", "emailId"]
   const isAllowed=  Object.keys(req.body).every(filed=>allowedEditFileds.includes(filed))
   return isAllowed
 }

 module.exports ={
    validtateSignupData,
    validateEditProfileData
 }