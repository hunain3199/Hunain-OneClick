import userModel from "../models/userModel.js";
import usersOtpCodeModel from "../models/usersOtpCodeModel.js";
import forgetPasswordCodeModel from "../models/forgetPasswordOtpCodeModel.js";
import partnerInfoModel from "../models/partnerInfoModel.js";
import otpGenerator from "otp-generator";
import nodemailer from "nodemailer";
import { emailMessage } from "../public/html.js";
import moment from "moment";
import { comparePassword, hashPassword } from "../helpers/authHelper.js";
import jwt from "jsonwebtoken";

//register route
export const registerController = async (req, res) => {
  try {
    console.log("Received request body:", req.body);
    const { name, email, password, isAdmin } = req.body;
    //validations

    if (!name || !email || !password) {
      res.status(403);
      res.send(`required parameters missing, 
      example request body:
      {
          name:"akbar hafeez"
          email: "some@email.com",
          password: "some$password"
      } `);
      return;
    }

    // Check if the user already exists
    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res.status(200).send({
        success: false,
        message: "Already registered, please login",
      });
    }

    // Register the user
    const hashedPassword = await hashPassword(password);
    const user = await new userModel({
      name,
      email,
      isAdmin: false,
      password: hashedPassword,
    }).save();

    //gernerating pinCode

    const pinCode = otpGenerator.generate(6, {
      upperCaseAlphabets: false,
      lowerCaseAlphabets: false,
      specialChars: false,
    });

    console.log("pinCode: ", pinCode);

    const otpCode = pinCode;

    const otpCodeHash = await hashPassword(pinCode);
    console.log(otpCodeHash);

    const code = new usersOtpCodeModel({
      email,
      otpCodeHash,
      createdAt: Date.now(),
    });
    await code.save();
    console.log("code: ", code);

    const transporter = nodemailer.createTransport({
      host: "smtp.zoho.com",
      port: 587,
      secure: false, // Use `true` for port 465, `false` for all other ports
      auth: {
        user: "bilal@theoneclickdigital.com",
        pass: "khalakijan123456",
      },
    });

    // async..await is not allowed in global scope, must use a wrapper
    async function main() {
      // send mail with defined transport object
      const info = await transporter.sendMail({
        from: "bilal@theoneclickdigital.com", // sender address
        to: email, // list of receivers
        subject: "Oneclick Digital Registration Alert", // Subject line
        html: emailMessage(name, otpCode), // plain text body
      });

      console.log("Message sent: %s", info.messageId);
      // Message sent: <d786aa62-4e0a-070a-47ed-0b0666549519@ethereal.email>
    }

    main().catch(console.error);

    res.status(200).json({
      success: true,
      message: "otp code sent",
      user,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Error in Registration",
      error,
    });
  }
};
export const addUsersFromGoogle = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    console.log(name, email, password);
    if (!name || !email || !password) {
      res.status(403).send({
        success: false,
        message: "Please provide a all required fields",
      });
      return;
    }

    const user = await userModel.findOne({ email });
    if (user) {
      res.status(403).send({
        success: false,
        message: "User already exists",
      });
      return;
    }

    const newUser = await userModel.create({
      name,
      email,
      password,
    });

    res.status(200).send({
      success: true,
      message: "User created successfully",
      newUser,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Error in Registration",
      error,
    });
  }
};
export const optCodeComplete = async (req, res) => {
  try {
    const { pinCode, email } = req.body;
    console.log(pinCode, email);
    const otpRecord = await usersOtpCodeModel.findOne({ email });
    console.log("otpRecord: ", otpRecord);

    if (!otpRecord) {
      // user not found
      res.status(403).send({
        message: "no email invalid otp",
      });
      return;
    }

    const isOtpValid = await comparePassword(pinCode, otpRecord.otpCodeHash);
    console.log("isOtpValid: ", isOtpValid);

    if (!isOtpValid) {
      res.status(403).send({
        message: "no hash invalid otp",
      });
      return;
    }

    res.status(200).json({
      success: true,
      message: "Email Verified Succesfully",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Error in Registration",
      error,
    });
  }
};

//login route
export const loginController = async (req, res) => {
  try {
    const { email, userId, password } = req.body;
    //validation

    if (!userId || !password || !email) {
      return res.status(404).send({
        success: false,
        message: "Invalid userId or email",
      });
    }
    //check user
    const cnic_number = await partnerInfoModel.findOne({
      partner_cnic_number: userId,
    });
    console.log("cnic_number: ", cnic_number);

    if (!cnic_number) {
      return res.status(404).send({
        success: false,
        message: "userId/email is not registerd",
      });
    }

    const passDetail = await userModel.findOne({ email });

    const checkingPass = await comparePassword(password, passDetail.password);

    if (!checkingPass) {
      return res.status(404).send({
        success: false,
        message: " userId/email is not registerd",
      });
    }

    //token
    const token = jwt.sign(
      {
        name: passDetail.name,
        email: passDetail.email,
        userId,
        isAdmin: passDetail.isAdmin,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "7d",
      }
    );
    console.log("oneclick-auth :", token);

    // res.cookie("onclicik-auth", token, {
    //   httpOnly: true,
    //   secure: true,
    //   sameSite: "none",
    //   domain: "https://oneclick-server.onrender.com",
    //   path: "/",
    // });

    res.status(200).send({
      data: {
        name: passDetail.name,
        email: passDetail.email,
        isAdmin: passDetail.isAdmin,
        _id: passDetail._id,
        token: token,
      },
      success: true,
      message: "login successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in login",
      error,
    });
  }
};

//forgotPasswordController
export const forgetPasswordController = async (req, res) => {
  try {
    const { email } = req.body;
    console.log(email);
    if (!email) {
      res.status(403).send({
        success: false,
        message: "Please provide a valid email address",
      });
      return;
    }

    const user = await userModel.findOne({ email });
    if (!user) {
      res.status(404).send({
        success: false,
        message: "Email is not registered",
      });
      return;
    }

    const userName = user.name;

    const otpCode = otpGenerator.generate(6, {
      upperCaseAlphabets: false,
      lowerCaseAlphabets: false,
      specialChars: false,
      
    });

    console.log("otpCode: ", otpCode);

    const otpCodeHash = await hashPassword(otpCode);
    console.log("otpCodeHash: ", otpCodeHash);

    const otpRecord = await forgetPasswordCodeModel.create({
      email,
      otpCodeHash,
      createdAt: Date.now(),
    });
    console.log("otpRecord: ", otpRecord);

    const transporter = nodemailer.createTransport({
      host: "smtp.zoho.com",
      port: 587,
      secure: false, // Use `true` for port 465, `false` for all other ports
      auth: {
        user: "bilal@theoneclickdigital.com",
        pass: "khalakijan123456",
      },
    });

    // async..await is not allowed in global scope, must use a wrapper
    async function main() {
      // send mail with defined transport object
      const info = await transporter.sendMail({
        from: "bilal@theoneclickdigital.com", // sender address
        to: email, // list of receivers
        subject: "Oneclick Digital Registration Alert", // Subject line
        html: emailMessage(userName, otpCode), // plain text body
      });

      console.log("Message sent: %s", info.messageId);
      // Message sent: <d786aa62-4e0a-070a-47ed-0b0666549519@ethereal.email>
    }

    main().catch(console.error);

    res.status(200).send({
      success: true,
      message: "OTP sent to your email",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in forgot password",
      error,
    });
  }
};
export const forgetPasswordCodeComplete = async (req, res) => {
  try {
    const { newPassword, pinCode, email } = req.body;
    console.log(newPassword, pinCode, email);
    if (!newPassword || !pinCode || !email) {
      res.status(403).send({
        success: false,
        message: `Please provide a all required fields:
        {
          newPassword,
          pinCode,
          email
        }
        `,
      });
      return;
    }
    const otpRecord = await forgetPasswordCodeModel.findOne({ email });
    console.log("otpRecord: ", otpRecord);

    if (!otpRecord) {
      // user not found
      res.status(403).send({
        message: "no email invalid otp",
      });
      return;
    }

    const isOtpValid = await comparePassword(pinCode, otpRecord.otpCodeHash);
    console.log("isOtpValid: ", isOtpValid);

    if (!isOtpValid) {
      res.status(403).send({
        message: "no hash invalid otp",
      });
      return;
    }

    if (moment().diff(moment(otpRecord.createdAt), "minutes") >= 15) {
      res.status(403).send({
        message: "invalid otp",
      });
      return;
    }

    const newPasswordHash = await hashPassword(newPassword);
    console.log("newPasswordHash: ", newPasswordHash);
    const updateResp = await userModel.findOneAndUpdate(
      { email },
      { password: newPasswordHash }
    );
    console.log("updateResp: ", updateResp);

    res.status(200).send({
      success: true,
      message: "Password Reset Successfully. Procced to Login ",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Error in Registration",
      error,
    });
  }
};
