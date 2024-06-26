import express from "express";
import jwt from "jsonwebtoken";
// import _ from "lodash";
// import { User, validateUser as validate } from "../models/userSchema.js";

export const router = express.Router();

const users = [
  {
    id: 1,
    firstName: "test",
    lastName: "one",
    email: "test@gmail.com",
    password: "11111",
    phone_number: 123456789,
    isAdmin: false,
  },
  {
    id: 2,
    firstName: "admin",
    lastName: "one",
    email: "admin@gmail.com",
    password: "00000",
    phone_number: 123456789,
    isAdmin: true,
  },
];

router.post("/login", (req, res) => {
  const { email, password } = req.body;

  const user = users.find((u) => u.email === email && u.password === password);
  if (user) {
    const accessToken = jwt.sign(
      { id: user.id, isAdmin: user.isAdmin },
      "dsjahfewkjshfdakj"
    );
    res.status(200).json({
      status: "success",
      username: `${user.firstName} ${user.lastName}`,
      accessToken,
    });
  }
  res.status(400).send("email or password incorrect");
});
