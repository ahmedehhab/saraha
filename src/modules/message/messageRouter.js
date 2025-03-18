import express from "express";
import { creatMessage, deleteMessage } from "./messageController.js";
import authentication from "../../middleware/authentication.js";
import validation from "../../middleware/validation.js";
import { creataMessageSchema } from "./messageValidator.js";
const router =express.Router();

router.route('/user/:userid').post(validation(creataMessageSchema),creatMessage);
router.route('/:id').delete(authentication,deleteMessage);

export default router;