import Joi from "joi";

export const medicineValidation = Joi.object({
  img: Joi.string(),
  name: Joi.string().min(3).required(),
  category: Joi.string().min(3).required(),
  price: Joi.number().required(),
  quantity: Joi.number().required(),
});
