import { Router } from "express";
import {
  bookAppoinment,
  doctorDetailsAppointment,
} from "../controllers/doctorDetailsController.js";
import { upload } from "../middlewares/multer.middleware.js";
import joiMiddleware from "../middlewares/joi.middleware.js";
import { doctorAppointmentValidation } from "../validation/doctorValidation.js";

const router = Router();

router.post(
  "/appointment",
  upload.single("img"),
  joiMiddleware(doctorAppointmentValidation),
  doctorDetailsAppointment
);
// router.get("/doctors", getAllDoctorAppointments);
router.post("/appointment", bookAppoinment);

export { router };
