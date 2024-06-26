import { uploadOnCloudinary } from "../config/cloudinaryConfig.js";
import HttpError from "../models/HttpError.js";
import { Medicine } from "../models/medicineSchema.js";

export const getAllMedicine = async (req, res) => {
  const medicines = await Medicine.find();
  res.json(medicines);
};

export const addMedicine = async (req, res, next) => {
  try {
    const { name, category, price, quantity } = req.body;
    const imgPath = req.file?.path;
    console.log("pmc file path", imgPath);

    let img;

    if (!imgPath) {
      img = "";
    }

    img = await uploadOnCloudinary(imgPath);
    console.log("upload on cloudinary", img);

    const medicine = new Medicine({
      img: img.url,
      name,
      category,
      price,
      quantity,
    });
    await medicine.save();
    res.status(200).json({
      message: "Appointment created successfully",
      medicine,
    });
  } catch (err) {
    console.log(err);
    next(new HttpError("Appointment failed, try again", 500));
  }
};

export const updateMedicine = async (req, res) => {};

export const deleteMedicine = async (req, res) => {};

export const getMedicineById = async (req, res) => {};
