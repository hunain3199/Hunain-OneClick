import mongoose from "mongoose";

const doctorAvailableDays = new mongoose.Schema({
  day: {
    type: String,
    enum: [
      "monday",
      "tuesday",
      "wednesday",
      "thursday",
      "friday",
      "saturday",
      "sunday",
    ],
    required: true,
  },
  start_time: { type: String, required: true },
  end_time: { type: String, required: true },
});

const doctorAppointmentSchema = new mongoose.Schema(
  {
    img: { type: String, required: true },
    first_name: { type: String, required: true },
    last_name: { type: String, required: true },
    hospital: { type: String, required: true },
    services: [{ type: String, required: true }],
    education: { type: String, required: true },
    languages: [{ type: String, required: true }], // Array of strings for languages
    specialization: [{ type: String, required: true }],
    experience: { type: Number, required: true }, // Number for years of experience
    available_days: [doctorAvailableDays],
  },
  { timestamps: true }
);

const bookAppointment = new mongoose.Schema(
  {
    patient_id: { type: String, required: true },
    doctor_id: { type: String, required: true },
  },
  { timestamps: true }
);

export const DoctorAppointment = mongoose.model(
  "DoctorAppointment",
  doctorAppointmentSchema
);

export const BookAppointment = mongoose.model(
  "BookAppointment",
  bookAppointment
);
