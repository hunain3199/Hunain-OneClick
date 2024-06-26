import jwt from "jsonwebtoken";
import mongoose from "mongoose";
import { authenticator } from "otplib";
import HttpError from "../models/HttpError.js";
import { Otp, User } from "../models/userSchema.js";
import { sendOtpEmail } from "../config/nodemailer.js";
import { Patient } from "../models/patientSchema.js";
import { Doctor } from "../models/doctorSchema.js";
import { BookAppointment } from "../models/doctorAppointmentSchema.js";

// Configure otplib to increase the OTP expiry time
authenticator.options = {
  step: 60 * 5, // OTP expiry time in seconds (e.g., 5 minutes)
  digits: 5,
};

export const signup = async (req, res, next) => {
  const session = await mongoose.startSession();
  session.startTransaction();
  try {
    const { name, email, password, phone_number, role } = req.body;

    // Generate OTP using otplib
    const secret = authenticator.generateSecret();
    const otp = authenticator.generate(secret).slice(-5);

    const existingUser = await User.findOne({ email }).session(session);
    if (existingUser) {
      await session.abortTransaction();
      session.endSession();
      return next(new HttpError("User already exist", 400));
    }

    console.log("Creating new user>>");
    const user = new User({ name, email, password, phone_number, role });
    await user.save({ session });

    console.log("Saving OTP>>");
    await Otp.create([{ email, otp }], { session });

    console.log(`your otp ${otp}`);
    await sendOtpEmail(email, user.name, otp);

    if (role === "patient") {
      const newPatient = await Patient.create({
        userId: user._id,
      });
      console.log("newPatient>>", newPatient);
    }

    await session.commitTransaction();
    session.endSession();

    console.log("otp sent");
    res.status(201).json({ status: true, message: "otp sent." });
  } catch (err) {
    await session.abortTransaction();
    session.endSession();
    next(
      new HttpError("Signing up failed, please try again", 500, {
        error: err.message,
      })
    );
  }
};

export const verifyOTP = async (req, res, next) => {
  const { email, otp } = req.body;

  try {
    const [user, verifiedOtp] = await Promise.all([
      User.findOne({ email }),
      Otp.findOne({ email, otp }),
    ]);

    if (!user) {
      return next(new HttpError("User not found", 400));
    }
    if (!verifiedOtp) {
      return next(new HttpError("Invalid OTP", 400));
    }

    user.verified = true;

    await verifiedOtp.save();
    await user.save();

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    res.status(200).json({ message: "OTP verified successfully", token, user });
  } catch (err) {
    next(new HttpError("Error verifying OTP", 500, { error: err.message }));
  }
};

export const login = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return next(new HttpError("Invalid email or password", 400));
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return next(new HttpError("Invalid email or password", 400));
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    res.json({ status: true, message: `login successfully`, user, token });
  } catch (err) {
    next(
      new HttpError("Logging in failed, please try again", 500, {
        error: err.message,
      })
    );
  }
};

export const deleteUsers = async (req, res, next) => {
  try {
    await User.deleteMany({});
    await Otp.deleteMany({});
    await Doctor.deleteMany({});
    await Patient.deleteMany({});
    await BookAppointment.deleteMany({});
    res.status(200).json({ message: "user deleted successfully" });
  } catch (err) {
    next(new HttpError(`Error: ${err.message}`, 500, { error: err.message }));
  }
};
