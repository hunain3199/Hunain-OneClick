// import express from "express";
// import _ from "lodash";
// import { Lab, validateLab } from "../models/labSchema.js";

// export const router = express.Router();

// router.get("/", async (req, res) => {
//   const labs = await Lab.find();
//   if (!labs) return res.status(400).send("not found!");

//   res.status(200).send(labs);
// });

// router.post("/", async (req, res) => {
//   const { error } = validateLab(req.body);
//   if (error)
//     return res.status(400).send("validation error: ", error.details[0].message);

//   let lab = await Lab.findOne({ lab_name: req.body.lab_name });
//   if (lab)
//     return res.status(400).send("lab with the given name already existed.");

//   lab = new Lab(
//     _.pick(req.body, ["img", "lab_name", "total_branches", "tests"])
//   );

//   await lab.save();

//   res.status(200).send(lab);
// });
