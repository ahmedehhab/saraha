import { catchError,AppError } from "../../../utils/handlers.js";
import Message from "./messageModel.js"

export const creatMessage= catchError(async (req,res) => {
    const {userid} = req.params;
    const {content}=req.body;
    const mss =await Message.create({content,userid});
    res.json({message:"message send successfully"}).status(201);
})


export const deleteMessage=catchError(async (req,res) => {
    const {id}=req.params;
    const {userid}=req;
    const mss=await Message.findOneAndDelete({_id:id,userid});
    if (!mss) throw new AppError("Message not found or unauthorized", 404);
    res.json({message:"message deleted successfully"});
});