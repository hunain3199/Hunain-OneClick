// import mongoose from "mongoose";
// import Joi from "joi";

// const patientSchema = new mongoose.Schema({
//   user: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: "users",
//   },
//   age: {
//     type: Number,
//     required: true,
//   },
// });

// export const Patient = mongoose.model("Patient", patientSchema);

// export function validatePatient(patient) {
//   const schema = Joi.object({
//     firstName: Joi.string().min(3).required(),
//     lastName: Joi.string().min(3).required(),
//     password: Joi.string().min(8).required(),
//     number: Joi.number().required(),
//   });

//   return schema.validate(patient);
// }
