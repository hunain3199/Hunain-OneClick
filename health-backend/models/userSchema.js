import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    phone_number: {
      type: String,
      minLength: 11,
      required: true,
    },
    role: {
      type: String,
      enum: ["doctor", "patient", "pharmacy"],
      default: "patient",
    },
    verified: { type: Boolean, default: false },
    isAdmin: { type: Boolean, default: false },
  },
  { timestamps: true }
);

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (err) {
    next(err);
  }
});

userSchema.methods.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

const otpSchema = new mongoose.Schema({
  email: { type: String, required: true },
  otp: { type: String, required: true, minLength: 5 },
  createdAt: { type: Date, expires: "15m", default: Date.now() },
});

export const Otp = mongoose.model("Otp", otpSchema);
export const User = mongoose.model("User", userSchema);
