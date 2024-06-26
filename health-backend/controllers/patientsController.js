import HttpError from "../models/HttpError.js";
import { Patient } from "../models/patientSchema.js";

export const patients = async (req, res, next) => {
  try {
    console.log("Patient...");
    const { userId } = req.body;

    const user = await Patient.findById(userId);
    if (!user) {
      return next(new HttpError("user not found"));
    }

    console.log("patient is creating...");
    const patient = await Patient.create({
      userId,
    });

    if (!patient) {
      return next(new HttpError("Patient: something went wrong", 400));
    }

    res.status(201).json({ message: "patient created successfully." });
  } catch (err) {
    next(new HttpError(`Error:`, 500, { error: err.message }));
  }
};
