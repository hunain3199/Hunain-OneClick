// import mongoose from "mongoose";
// import Joi from "joi";

// const doctorSchema = new mongoose.Schema({
//   user: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: "users",
//   },
//   college: {
//     type: String,
//     minLength: 3,
//     required: true,
//   },
//   city: {
//     type: String,
//     enum: ["karachi", "Islamabad", "Abbottabad", "Faisalabad"],
//     required: true,
//   },
//   gender: {
//     type: String,
//     enum: ["male", "female"],
//     required: true,
//   },
// });

// export const Doctor = mongoose.model("Doctor", doctorSchema);

// export function validateDoctor(doctor) {
//   const schema = Joi.object({
//     college: Joi.string().required(),
//     city: Joi.string().required(),
//     gender: Joi.string().required(),
//   });

//   return schema.validate(doctor);
// }
