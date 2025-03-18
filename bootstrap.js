import express from "express";
import { catchError,AppError } from "./utils/handlers.js";
import authRouter from "./src/modules/auth/authRouter.js";
import api_v1 from "./src/routes/api_v1.js"
const bootstrap=(app)=>{
app.use(express.json());
app.use(api_v1);
    app.all('*',catchError(async (req,res) => {
     throw new AppError("page not found",404);
        
    }));
    app.use((error,req,res,next)=>{
        res.json({error:error.message}).status(error.status);
    })
}

export default bootstrap;