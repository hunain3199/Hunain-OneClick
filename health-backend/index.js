import express from "express";
import fs from "fs";
import connectDB from "./config/db.js";
import { router as userRoutes } from "./routes/userRoutes.js";
import { router as doctorDetailsRoute } from "./routes/doctorDetailsRoute.js";
import { router as doctorRoutes } from "./routes/doctorRoutes.js";
import { router as patientRoutes } from "./routes/patientRoutes.js";
import { router as medicineRoutes } from "./routes/medicineRoutes.js";
import cors from "cors";
import HttpError from "./models/HttpError.js";

const app = express();

app.use(express.json());

connectDB();

app.use(
  cors({
    origin: ["http://localhost:5000", "http://localhost:3000", "*"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true, // allow credentials (cookies, authorization headers )
  })
);

app.use("/api/v1", userRoutes);
app.use("/api/v1", doctorDetailsRoute);
app.use("/api/v1/doctor", doctorRoutes);
app.use("/api/v1/patient", patientRoutes);
app.use("/api/v1/store", medicineRoutes);

app.get("/", (req, res) => {
  res.send("Home Route.");
});

app.use((req, res, next) => {
  const error = new HttpError("This route is not found", 404);
  next(error); // Pass the error to the next middleware
});

app.use((error, req, res, next) => {
  if (req.file) {
    fs.unlink(req.file.path, (err) => {
      console.log("err>>", err);
    });
  }
  if (res.headerSent) {
    return next(error);
  }
  res.status(error.code || 500).json({
    message: error.message || "unknown error occured",
    ...(error.data && { data: error.data }),
  });
});

const port = process.env.PORT || 4000;
app.listen(port, () => console.log(`Server is listening on port ${port}...`));
