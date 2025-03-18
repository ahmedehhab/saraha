import express from "express";
import { changePassword, login, restPassword, signup, verifyUser } from "./authController.js";
import uploadImage from "../../middleware/uploadImage.js";
import validation from "../../middleware/validation.js";
import { changePasswordSchema, loginSchema, signupSchema } from "./authValidator.js";
import { isEmailExists } from "../../middleware/isEmailExists.js";
const router =express.Router();

router.route('/signup').post(uploadImage,validation(signupSchema),isEmailExists,signup);
// router.route('/signup').post(isEmailExists,uploadImage,signup);

router.route('/login').post(validation(loginSchema),login);
router.route('/verify/:verifyToken').get(verifyUser);
router.route('/resetcode').post(restPassword);
router.route('/changepassword').post(validation(changePasswordSchema),changePassword)


export default router;