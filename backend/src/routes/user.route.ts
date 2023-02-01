const { Router } = require("express");
const { userModel } = require("../models/User.model");
import { Request, Response } from "express";
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const userRoutes = Router();

// Sales Person Signup
userRoutes.post("/add-user", async (req: Request, res: Response) => {
  let { name, phone_number, password } = req.body;
  try {
    let user = await userModel.findOne({ phone_number: phone_number });
    if (user) {
      return res.send({ error: "Already Registered, Please Login" });
    } else {
      bcrypt.hash(password, 6, async function (err: string, hash: string) {
        if (err) {
          res.send({ error: "Something wrong" });
          console.log(err);
        } else {
          const newUser = new userModel({
            name,
            phone_number,
            password: hash,
          });
          await newUser.save();
          res.send({ message: "Succesfully Registered", user: newUser });
        }
      });
    }
  } catch (err: any) {
    return res.status(401).send(err.message);
  }
});

// Sales Person Login
userRoutes.post("/login-user", async (req: Request, res: Response) => {
  let { phone_number, password } = req.body;
  let user = await userModel.findOne({ phone_number });
  if (user) {
    let hash = user.password;
    bcrypt.compare(
      password,
      hash,
      async function (err: string, result: string) {
        if (user && result) {
          var token = jwt.sign({ userId: user._id }, process.env.privateKey);
          res.send({
            message: "Login Successful",
            token,
            user,
          });
        } else if (err) {
          res.send({ error: "Something went wrong" });
        } else {
          res.send({ error: "Wrong username or password" });
        }
      }
    );
  } else {
    res.send({ error: "Wrong username or password" });
  }
});

module.exports = {
  userRoutes,
};
