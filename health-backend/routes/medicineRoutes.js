import { Router } from "express";
import {
  addMedicine,
  getAllMedicine,
  deleteMedicine,
  updateMedicine,
  getMedicineById,
} from "../controllers/medicineController.js";
import joiMiddleware from "../middlewares/joi.middleware.js";
import { medicineValidation } from "../validation/medicineValidation.js";
import { upload } from "../middlewares/multer.middleware.js";

const router = Router();

router.get("/", getAllMedicine);
router.get("/:id", getMedicineById);
router.post(
  "/",
  upload.single("img"),
  joiMiddleware(medicineValidation),
  addMedicine
);
router.put("/:id", updateMedicine);
router.delete("/:id", deleteMedicine);

export { router };
