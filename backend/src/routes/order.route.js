const { Router } = require("express");
require("dotenv").config();
const { authentication } = require("../middlewares/authentication");

const { OrderModel } = require("../models/Order.model");

const orderRoutes = Router();

orderRoutes.get("/get-order", authentication, async (req, res) => {
  let user_id = req.query.user_id;
  console.log(user_id);
  try {
    let order = await OrderModel.find({ userId: user_id });
    res.send(order);
  } catch (e) {
    res.status(401).send(e.message);
  }
});

orderRoutes.post("/add-order", authentication, async (req, res) => {
  const newOrder = new OrderModel({ ...req.body });
  try {
    await newOrder.save();
    res.send(newOrder);
  } catch (err) {
    res.send("something went wrong");
    console.log(err);
  }
});

module.exports = {
  orderRoutes,
};
