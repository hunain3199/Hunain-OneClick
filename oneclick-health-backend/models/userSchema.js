import mongoose from "mongoose";
import Joi from "joi";

const userSchema = new mongoose.Schema({
  first_name: {
    type: String,
    minLength: 3,
    required: true,
  },
  last_name: {
    type: String,
    minLength: 3,
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
    minLenght: 8,
  },
  phone_number: {
    type: Number,
    required: true,
  },
  role: {
    type: String,
    enum: ["doctor", "patient", "admin", "other"],
    default: "patient",
  },
});

export const User = mongoose.model("User", userSchema);

export function validateUser(user) {
  const schema = Joi.object({
    first_name: Joi.string().min(3).required(),
    last_name: Joi.string().min(3).required(),
    password: Joi.string().min(8).required(),
    email: Joi.string().email().required(),
    phone_number: Joi.number().required(),
    role: Joi.string(),
  });

  return schema.validate(user);
}
