// import express from "express";
// import { Patient } from "../models/patientSchema.js";
// import bcrypt from "bcrypt";

// export const router = express.Router();

// router.post("/", async (req, res) => {
//   const { error } = validate(req.body);
//   if (error) return res.status(400).send(error.details[0].message);

//   let patient = await Patient.findOne({ number: req.body.number });
//   if (patient) return res.status(400).send("Invalid number or password.");

//   const validPassword = await bcrypt.compare(
//     req.body.password,
//     patient.password
//   );
//   if (!validPassword)
//     return res.status(400).send("Invalid number or password.");

//   res.status(200).send(true);
// });

// function validate(req) {
//   const schema = Joi.object({
//     password: Joi.string().min(8).required(),
//     number: Joi.number().required(),
//   });

//   return schema.validate(req);
// }
