import express from "express";
import {
  registerController,
  loginController,
  optCodeComplete,
  forgetPasswordCodeComplete,
  forgetPasswordController,
  addUsersFromGoogle,
} from "../../controllers/authController.js";
import { postPartnerDatail } from "../../controllers/partnerInfoController.js";

//router object

const router = express.Router();

//routing

router.post("/register", registerController);
router.post("/register-fromGoogle", addUsersFromGoogle);
router.post("/otpCode-complete", optCodeComplete);

//login
router.post("/login", loginController);

//forgot password
router.post("/forget-password", forgetPasswordController);
router.post("/forget-password-otpCode-complete", forgetPasswordCodeComplete);

//partner info routes
router.post("/partner-datail", postPartnerDatail);

export default router;
