import mongoose, { Schema } from "mongoose";

const patientSchema = new mongoose.Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: "Patient" },
    doctors: [{ type: mongoose.Schema.Types.ObjectId, ref: "Doctor" }],
  },
  { timestamps: true }
);

export const Patient = mongoose.model("Patient", patientSchema);
