export const catchError=(fn)=>{
    return (req,res,next)=>{
        Promise.resolve(fn(req, res, next)).catch((err) => next(err));        
    }
};

export class AppError extends Error {
    constructor(message,status){
        super(message);
        this.status=status;
    }
}