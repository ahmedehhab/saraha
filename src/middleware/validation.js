import { AppError, catchError } from "../../utils/handlers.js";

const validation =(bodySchema)=>{
    return catchError((req,res,next)=>{
        const { error } = bodySchema.validate(req.body, { abortEarly: false });  
       if(error){
        const er=error.details.map(d=>d.message).join(" ");
           throw new AppError(er,401);
       }
        
          next();
    })
}

export default validation;