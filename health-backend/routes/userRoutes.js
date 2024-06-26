import { Router } from "express";
const router = Router();
import {
  login,
  signup,
  verifyOTP,
  deleteUsers,
} from "../controllers/userController.js";
import joiMiddleware from "../middlewares/joi.middleware.js";
import {
  loginValidation,
  otpValidation,
  signupValidation,
} from "../validation/userValidation.js";

router.post("/signup", joiMiddleware(signupValidation), signup);
router.post("/login", joiMiddleware(loginValidation), login);
router.post("/verify-otp", joiMiddleware(otpValidation), verifyOTP);
router.delete("/delete", deleteUsers);

export { router };
