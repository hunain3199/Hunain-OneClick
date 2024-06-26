import { uploadOnCloudinary } from "../config/cloudinaryConfig.js";
import { DoctorAppointment } from "../models/doctorAppointmentSchema.js";
import { Patient } from "../models/patientSchema.js";
import { Doctor } from "../models/doctorSchema.js";
import HttpError from "../models/HttpError.js";
import { BookAppointment } from "../models/doctorAppointmentSchema.js";
import mongoose from "mongoose";

export const doctorDetailsAppointment = async (req, res, next) => {
  try {
    const {
      first_name,
      last_name,
      hospital,
      date,
      time,
      days,
      services,
      education,
      languages,
      specialization,
      experience,
    } = req.body;

    const imgPath = req.file?.path;
    console.log("pmc file path", imgPath);

    if (!imgPath) {
      return next(new HttpError("img path undefined", 400));
    }

    const img = await uploadOnCloudinary(imgPath);
    console.log("upload on cloudinary", img);

    if (!img) return next(new HttpError("img is required"));

    const appointment = await DoctorAppointment.create({
      img: img.url,
      first_name,
      last_name,
      hospital,
      date,
      time,
      days,
      services,
      education,
      languages,
      specialization,
      experience,
    });

    res.status(200).json({
      message: "Appointment created successfully",
      appointment,
    });
  } catch (err) {
    console.log(err);
    next(new HttpError("Appointment failed, try again", 500));
  }
};

export const getAllDoctorAppointments = async (req, res, next) => {
  try {
    const appointments = await DoctorAppointment.find();
    res.status(200).json({
      message: "All appointments retrieved successfully",
      appointments,
    });
  } catch (err) {
    console.error(err);
    next(new HttpError(`Fetching appointments failed ${err}`, 500));
  }
};

export const bookAppoinment = async (req, res, next) => {
  try {
    const { doctor_id, patient_id } = req.body;

    if (!doctor_id || !patient_id) {
      return next(new HttpError("All fields are required", 400));
    }

    const session = await mongoose.startSession();
    session.startTransaction();

    // Update doctor document
    const doctor = await Doctor.findOne({ userId: doctor_id }).session(session);
    const patient = await Patient.findOne({ userId: patient_id }).session(
      session
    );
    if (!doctor) {
      await session.abortTransaction();
      session.endSession();
      return next(new HttpError("Doctor not found", 404));
    }
    if (!patient) {
      await session.abortTransaction();
      session.endSession();
      return next(new HttpError("Patient not found", 404));
    }

    // Create new appointment
    const appointment = new BookAppointment({
      doctor_id,
      patient_id,
    });
    await appointment.save({ session });
    doctor.patients.push(patient_id);
    await doctor.save({ session });

    // Update patient document
    patient.doctors.push(doctor_id);
    await patient.save({ session });

    await session.commitTransaction();
    session.endSession();

    res.status(200).json({
      message: "Success",
      appointment,
    });
  } catch (err) {
    await session.abortTransaction();
    session.endSession();
    next(
      new HttpError("Booking appointment failed, please try again", 500, {
        error: err.message,
      })
    );
  }
};
