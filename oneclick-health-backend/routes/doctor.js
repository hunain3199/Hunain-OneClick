// import express from "express";
// import _ from "lodash";
// import { Doctor } from "../models/doctorSchema.js";

// export const router = express.Router();

// router.get("/", async (req, res) => {
//   const doctors = await Doctor.find();
//   if (!doctors) res.status(404).json({ status: "fail", message: "not found!" });

//   res.status(204).json({
//     status: "success",
//     data: doctors,
//   });
// });

// router.get("/:id", async (req, res) => {
//   const doctor = await Doctor.findById(req.params.id);
//   if (!doctor)
//     return res.status(400).send("Doctor with the given id was not found!");

//   res.status(200).json({
//     status: "success",
//     data: doctor,
//   });
// });

// // router.get("/", async (req, res) => {
// //   const doctor = await Doctor.findById(req.params.id);
// //   if (!doctor)
// //     return res.status(400).send("Doctor with the given id was not found!");

// //   res.status(200).json({
// //     status: "success",
// //     data: doctor,
// //   });
// // });
