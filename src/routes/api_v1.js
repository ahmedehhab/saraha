import express from "express";
import userRouter from "../modules/user/userRouter.js"
import messageRouter from "../modules/message/messageRouter.js"
import authRouter from "../modules/auth/authRouter.js"
const router =express.Router();
router.use('/auth',authRouter);
router.use('/message',messageRouter);
router.use('/user',userRouter);

export default router;