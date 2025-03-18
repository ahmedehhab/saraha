import { catchError,AppError } from "../../utils/handlers.js";
import User from "../modules/user/userModel.js";
export const isEmailExists =catchError(async (req,res,next) => {
    const {email}=req.body;
    const user= await User.findOne({email});
    if(user){
        throw new AppError("email already exists ",400);
    }
      

    next();
});