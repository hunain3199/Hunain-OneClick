// import mongoose from "mongoose";
// import Joi, { required } from "joi";

// const labSchema = new mongoose.Schema({
//   img: {
//     type: String,
//   },
//   lab_name: {
//     type: String,
//     required: true,
//   },
//   total_branches: {
//     type: Number,
//     required: true,
//   },
//   tests: [
//     {
//       test_name: {
//         type: String,
//         required: true,
//       },
//       test_price: {
//         type: Number,
//         required: true,
//       },
//     },
//   ],
// });

// export const Lab = mongoose.model("Lab", labSchema);

// export function validateLab(lab) {
//   const schema = Joi.object({
//     img: Joi.string(),
//     lab_name: Joi.string().required(),
//     total_branches: Joi.number().required(),
//     tests: Joi.array().required(),
//   });

//   return schema.validate(lab);
// }
