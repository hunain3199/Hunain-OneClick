import { Router } from "express";
import { upload } from "../middlewares/multer.middleware.js";
import { doctors } from "../controllers/doctorsController.js";
const router = Router();

router.post(
  "/details",
  upload.fields([
    { name: "pmc_certificate", maxCount: 1 },
    { name: "profile_img", maxCount: 1 },
  ]),
  doctors
);

export { router };
