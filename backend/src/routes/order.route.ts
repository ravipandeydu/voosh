import { Router } from "express";
require("dotenv").config();
import { authentication } from "../middlewares/authentication";
import { Request, Response } from "express";
const { OrderModel } = require("../models/Order.model");

const orderRoutes = Router();

interface Vendor {
  selling_price: number;
}

orderRoutes.get(
  "/get-order",
  authentication,
  async (req: Request, res: Response) => {
    let user_id = req.query.user_id;
    console.log(user_id);
    try {
      let order = await OrderModel.find({ userId: user_id });
      res.send(order);
    } catch (e: any) {
      res.status(401).send(e.message);
    }
  }
);

// createOrder - (placed by sales guy)
orderRoutes.post(
  "/add-order",
  authentication,
  async (req: Request, res: Response) => {
    const newOrder = new OrderModel({ ...req.body });
    try {
      await newOrder.save();
      res.send(newOrder);
    } catch (err) {
      res.send("something went wrong");
      console.log(err);
    }
  }
);

module.exports = {
  orderRoutes,
};
