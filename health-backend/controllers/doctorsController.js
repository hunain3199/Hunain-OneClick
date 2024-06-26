import fs from "fs";
import { uploadOnCloudinary } from "../config/cloudinaryConfig.js";
import { Doctor } from "../models/doctorSchema.js";
import HttpError from "../models/HttpError.js";
import { User } from "../models/userSchema.js";

export const doctors = async (req, res, next) => {
  console.log("Doctor...");
  try {
    const {
      userId,
      first_name,
      last_name,
      education,
      speciality,
      city,
      cnic_number,
      gender,
      pmc_number,
    } = req.body;

    console.log("Request body:", req.body);
    console.log("Request files:", req.files);

    if (!req.files || Object.keys(req.files).length === 0) {
      return next(new HttpError("No files were uploaded."));
    }

    const user = await User.findById(userId);
    if (!user) {
      return next(new HttpError("user not found"));
    }

    const pmcCertificatePath = req.files["pmc_certificate"]
      ? req.files["pmc_certificate"][0].path
      : null;
    const profileImagePath = req.files["profile_img"]
      ? req.files["profile_img"][0].path
      : null;

    if (!pmcCertificatePath) {
      return next(new HttpError("pmcCertificate path is undeifined"));
    }
    if (!profileImagePath) {
      return next(new HttpError("profileImagePath path is undeifined"));
    }

    const pmc_certificate = await uploadOnCloudinary(pmcCertificatePath);
    const profile_img = await uploadOnCloudinary(profileImagePath);

    console.log("Uploaded PMC Certificate:", pmc_certificate);
    console.log("Uploaded Profile Image:", profile_img);

    if (!pmc_certificate)
      return next(new HttpError("pmcCertificate is required"));

    if (!profile_img) return next(new HttpError("profileImg is required"));

    console.log("doctor is creating...");
    const doctor = await Doctor.create({
      userId,
      profile_img: profile_img.url,
      first_name,
      last_name,
      education,
      speciality,
      city,
      cnic_number,
      gender,
      pmc_number,
      pmc_certificate: pmc_certificate.url,
    });
    console.log("doctor created.");

    if (!doctor) return next(new HttpError("something went wrong", 400));

    res.status(201).json({
      status: "success",
      message: "doctor has been created.",
      doctor,
    });
  } catch (err) {
    next(new HttpError(`Error:`, 500, { error: err.message }));
  } finally {
    // Cleanup temp files
    if (req.files["pmc_certificate"]) {
      fs.unlinkSync(req.files["pmc_certificate"][0].path);
    }
    if (req.files["profile_img"]) {
      fs.unlinkSync(req.files["profile_img"][0].path);
    }
  }
};
