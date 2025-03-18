import express from "express";
import { getAllMessage, updateUser } from "./userController.js";
import authentication from "../../middleware/authentication.js"
import { updateUserValidationSchema } from "./userValidator.js";
import validation from "../../middleware/validation.js";

const router = express.Router();

router.route('/messages').get(authentication,getAllMessage);
router.route('/').put(validation(updateUserValidationSchema),authentication,updateUser);
export default router;