import Joi from "joi";

export const signupValidation = Joi.object({
  name: Joi.string().min(3).max(30).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
  phone_number: Joi.string().min(11).required(),
  role: Joi.string().required(),
  isVerified: Joi.boolean(),
  isAdmin: Joi.boolean(),
});

export const otpValidation = Joi.object({
  email: Joi.string().email().required(),
  otp: Joi.string().min(5).required(),
});

export const loginValidation = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
});
