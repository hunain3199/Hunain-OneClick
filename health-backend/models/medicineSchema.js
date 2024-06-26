import mongoose, { Schema } from "mongoose";

const medicineSchema = new Schema(
  {
    img: {
      type: String,
    },
    name: {
      type: String,
      required: true,
      minLength: 3,
    },
    category: {
      type: String,
      required: true,
      minLength: 3,
    },
    price: {
      type: Number,
      required: true,
    },
    quantity: {
      type: Number,
      default: 1,
    },
  },
  { timestamps: true }
);

export const Medicine = mongoose.model("Medicine", medicineSchema);
