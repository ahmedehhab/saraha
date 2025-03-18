import jwt from "jsonwebtoken"
import { catchError,AppError } from "../../utils/handlers.js";
const authentication= catchError(async (req,res,next) => {
    const token = req.headers.authorization?.split(" ")[1];
   if(!token) throw new AppError("Unauthorized: No token provided", 401);
   const decoded= await jwt.verify(token,process.env.PRIVATE_KEY);
   if(!decoded) throw new AppError("Unauthorized: Invalid token", 401);
   req.userid=decoded.id;
   next();
  
});
export default authentication;