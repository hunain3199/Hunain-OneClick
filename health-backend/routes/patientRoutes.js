import { Router } from "express";
import { patients } from "../controllers/patientsController.js";
const router = Router();

router.post("/details", patients);

export { router };
