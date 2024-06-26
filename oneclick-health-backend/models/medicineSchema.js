// import mongoose from "mongoose";
// import Joi from "joi";

// const medicineSchema = new mongoose.Schema({
//   img: {
//     type: String,
//     required: true,
//   },
//   name: {
//     type: String,
//     minLength: 3,
//     required: true,
//   },
//   quantity: {
//     type: Number,
//     required: true,
//   },
//   price: {
//     type: Number,
//     required: true,
//   },
// });

// export const Medicine = mongoose.model("Medicine", medicineSchema);

// export function validateMedicine(medicine) {
//   const schema = Joi.object({
//     img: Joi.string().min(3).required(),
//     name: Joi.string().min(3).required(),
//     quantity: Joi.number().required(),
//     price: Joi.number().required(),
//   });

//   return schema.validate(medicine);
// }
