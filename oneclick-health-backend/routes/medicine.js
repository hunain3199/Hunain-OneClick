// import express from "express";
// import _ from "lodash";
// import { Medicine, validateMedicine } from "../models/medicineSchema.js";

// export const router = express.Router();

// router.get("/", async (req, res) => {
//   const medicine = await Medicine.find();

//   res.status(200).json({
//     status: "success",
//     data: medicine,
//   });
// });

// router.post("/", async (req, res) => {
//   const { error } = validateMedicine(req.body);
//   if (error) res.status(400).send(error.details[0].message);

//   let medicine = await Medicine.findOne({
//     name: req.body.name,
//     price: req.body.price,
//   });
//   if (medicine) res.status(400).send("medicine already existed");

//   medicine = new Medicine(
//     _.pick(req.body, ["img", "name", "quantity", "price"])
//   );

//   await medicine.save();

//   res.send(_.pick(medicine, ["name", "price"]));
// });
