const { Router } = require("express");
const { userModel } = require("../models/User.model");

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const userRoutes = Router();

userRoutes.get("/", async (req, res) => {
  const users = await userModel.find();
  res.send(users);
});

userRoutes.post("/add-user", async (req, res) => {
  let { name, phone_number, password } = req.body;
  try {
    let user = await userModel.findOne({ phone_number: phone_number });
    if (user) {
      return res.send({ error: "Already Registered, Please Login" });
    } else {
      bcrypt.hash(password, 6, async function (err, hash) {
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
  } catch (err) {
    return res.status(401).send(err.message);
  }
});

userRoutes.post("/login-user", async (req, res) => {
  let { phone_number, password } = req.body;
  let user = await userModel.findOne({ phone_number });
  if (user) {
    let hash = user.password;
    bcrypt.compare(password, hash, async function (err, result) {
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
    });
  } else {
    res.send({ error: "Wrong username or password" });
  }
});

module.exports = {
  userRoutes,
};
