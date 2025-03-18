import mongoose from "mongoose";


const userSchema= new mongoose.Schema({
 name:{
    type:String,
    required:true,
    trim:true,
    minlength: [3,"Name must be at least 3 characters long"]
 },
 email:{
    type:String,
    required:true,
    unique:true,
    trim:true,
    lowercase:true,
    match: [/^\S+@\S+\.\S+$/, "Invalid email format"]
 },
 password:{
    type:String,
    required:true,
    minlength:[6,"password it must be at least 6 characters "],
    validate:{
        validator:function(value){
            return /^(?=.*[A-Z])(?=.*\d).{6,}$/.test(value);
        },
         message: "Password must contain at least one uppercase letter and one number"
    }
 },
 image:{
    type:String,
 },
 isVerified:{
   type:Boolean,
   default:false
 },
 resetCode:{
   type:String,
   default:null
 }

});

const User= mongoose.model('User',userSchema);
export default User;