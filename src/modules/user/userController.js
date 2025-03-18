import { catchError } from "../../../utils/handlers.js";
import User from "./userModel.js";
import jwt from "jsonwebtoken";
import Message from "../message/messageModel.js";
import { sendVerificationEmail } from "../../../utils/emails.js";
export const getAllMessage= catchError(async (req,res) => {
    const {userid}=req;
    let { page = 1, limit = 10 } = req.query;
    page  = +  page   || 1;
    limit = + limit   || 10;
   
    const skip =(page -1)*limit;
  
    const messages= await Message.find({userid}).skip(skip).limit(limit).select("-userid");
     
    const totalMessages= await Message.countDocuments({userid});

    res.json({
        message: "Messages retrieved successfully",
        totalMessages,
        totalPages: Math.ceil(totalMessages / limit),
        currentPage: page,
        messages,
    });
});


export const updateUser = catchError(async (req,res) => {
      const {userid}=req;
      const {name ,email}=req.body;
      const value={};
      if(name)value.name=name;
      if(email){
        value.email=email;
        value.isVerified=null;
        const token = await jwt.sign({id:userid},process.env.VERIFY_KEY);
        const protocol = req.protocol; 
        const domain = `${protocol}://${req.get('host')}`; 
        const verifyLink = `${domain}/auth/verify/${token}`;
            await  sendVerificationEmail(email,verifyLink);
      }

    const updateUser= await User.findByIdAndUpdate(userid,value,{new:true});
    console.log(updateUser);
   res.json({
    message:"user updated information successfully",
    user:value
   });
});