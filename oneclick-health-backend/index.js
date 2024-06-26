import express from "express";
import mongoose from "mongoose";
// import { router as doctors } from "./routes/doctor.js";
// import { router as patient } from "./routes/patient.js";
// import { router as medicineRoutes } from "./routes/medicine.js";
// import { router as patient_auth } from "./routes/patient_auth.js";
import { router as user } from "./routes/users.js";
// import { router as labs } from "./routes/labs.js";

const app = express();

app.use(express.json());

// app.use("/api/v1/store", medicineRoutes);
// app.use("/api/v1/labs", labs);
// app.use("/api/v1/doctors", doctors);
// app.use("/api/v1/patients", patient);
// app.use("/api/v1/patients/auth", patient_auth);
app.use("/api/v1/users", user);

mongoose
  .connect("mongodb://localhost:27017/hospital")
  .then(() => console.log("Connected to MongoDB"))
<<<<<<< HEAD
  .catch((err) => console.log("mongodb error: ", err.message));
=======
  .catch((err) => console.log("mongodb",err.message));
>>>>>>> Barkat-Zaidi

app.get("/", (req, res) => {
  res.status(200).json({
    status: "success",
    message: "Home Page",
  });
});

<<<<<<< HEAD
const port = 3000;
=======
const port = 1000;
>>>>>>> Barkat-Zaidi
app.listen(port, () => console.log(`Server is listening on port ${port}...`));
