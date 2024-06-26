// import express from "express";
// import _ from "lodash";
// import bcrypt from "bcrypt";
// import { Patient, validateUser as validate } from "../models/patientSchema.js";

// export const router = express.Router();

// router.post("/signup", async (req, res) => {
//   const { error } = validate(req.body);
//   if (error) res.status(400).send(error.details[0].message);

//   let patient = await Patient.findOne({ number: req.body.number });
//   if (patient) return res.status(400).send("Patient already existed.");

//   patient = new Patient(
//     _.pick(req.body, ["firstName", "lastName", "password", "number"])
//   );
//   const salt = await bcrypt.genSalt(10);
//   patient.password = await bcrypt.hash(patient.password, salt);
//   await patient.save();

//   res.status(200).send(_.pick(patient, ["firstName", "lastName", "number"]));
// });
