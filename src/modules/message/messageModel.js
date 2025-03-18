import mongoose from "mongoose";


const messageSchema= new mongoose.Schema({

  content:{
    type:String,
    required:true,
    trim:true,
    maxlength:[150,"message cannot exceed 150 characters"]
     },

  userid:{
        type:mongoose.Types.ObjectId,
        ref:"User",
        required:true
     }
});

const Message= mongoose.model('Message',messageSchema);
export default Message;