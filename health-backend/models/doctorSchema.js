import mongoose, { Schema } from "mongoose";

const doctorSchema = new mongoose.Schema({
  userId: { type: Schema.Types.ObjectId, ref: "Doctor" },
  profile_img: { type: String, required: true },
  first_name: { type: String, required: true },
  last_name: { type: String, required: true },
  education: { type: String, required: true },
  speciality: { type: String, required: true },
  city: { type: String, required: true },
  cnic_number: { type: Number, required: true, unique: true, maxLength: 13 },
  gender: {
    type: String,
    enum: ["male", "female", "other"],
    default: "male",
  },
  pmc_number: { type: Number, required: true },
  pmc_certificate: { type: String, required: true },
  appoinment_form: { type: Schema.Types.ObjectId, ref: "DoctorAppointment" },
  patients: [{ type: Schema.Types.ObjectId, ref: "Patient" }],
  total_earning: { type: Number, default: 0 },
});

export const Doctor = mongoose.model("Doctor", doctorSchema);
