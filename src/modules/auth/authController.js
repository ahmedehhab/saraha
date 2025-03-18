import cloudinary from "cloudinary"
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken"
import { catchError ,AppError} from "../../../utils/handlers.js";
import User from "../user/userModel.js"
import { sendVerificationEmail,sendResetCode } from "../../../utils/emails.js";
import dotenv from "dotenv";
dotenv.config();

export const signup=catchError(async (req,res) => {
    const {name,email,password}=req.body;
    const hashPassword=bcrypt.hashSync(password,+process.env.SALT_ROUND);
     const data ={
        name,
        email,
        password:hashPassword
     };
     if(req.file){
        const uploadResult = await cloudinary.uploader
       .upload(req.file.path,{folder:"uploads"});
       data.image=uploadResult.secure_url;
     }

     const user= await User.create(data);

      const token = await jwt.sign({id:user._id},process.env.VERIFY_KEY);
      const protocol = req.protocol; 
       const domain = `${protocol}://${req.get('host')}`; 
       const verifyLink = `${domain}/auth/verify/${token}`;
     await sendVerificationEmail(email,verifyLink);

     res.json({message:"User created successfully  Please check your email to verify your account"});
});

export const verifyUser= catchError(async (req,res) => {
   const {verifyToken}= req.params;
   const decoded =await jwt.verify(verifyToken,process.env.VERIFY_KEY);
   if(!decoded)
      throw new AppError("invalid token ",401);
   const user =await User.findByIdAndUpdate(decoded.id,{isVerified:true},{new:true});
   res.json({ message:"Account verified successfully"});
})

export const login =catchError(async (req,res) => {
     const {email,password}=req.body;

     const user = await User.findOne({email});
     
     if(!user||!bcrypt.compareSync(password,user.password))
        throw new AppError("Invalid email or password",401);

    const token = await jwt.sign({id:user._id},process.env.PRIVATE_KEY);

    res.json({
        message: "Login successful",
        user: { 
             id:user._id,
             name:user.name,
             email:user.email
            }, 
        token
      });
});



export const restPassword= catchError(async (req,res) => {
   const {email}=req.body;
   
   const randomCode = Math.floor(1000 + Math.random() * 9000).toString();
   const hasCode= bcrypt.hashSync(randomCode,+process.env.SALT_ROUND);
   const user= await User.findOneAndUpdate({email},{resetCode:hasCode});
   if(!user)
      throw new AppError("invalid email",401);
  await  sendResetCode(email,randomCode);
    res.json({message:"the code is send successfully"});
})

export const changePassword=catchError(async (req,res) => {
     const {resetCode,newPassword,email}=req.body;
     const user =await User.findOne({email});
     if(!user||!bcrypt.compareSync(resetCode,user.resetCode))
      throw new AppError("invalid code",401);

     const hashPassword=bcrypt.hashSync(newPassword,+process.env.SALT_ROUND);

      await User.findOneAndUpdate({email},{password:hashPassword,resetCode:null},{new:true});

     res.json({message:"password update successfully"});
})