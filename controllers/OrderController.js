import { validationResult } from "express-validator";
import OrderModel from "../models/Order.js";

export const createOrder = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json(errors.array());
    } else {
      const doc = new OrderModel({
        email: req.body.email,
        username: req.body.username,
        telNumber: req.body.telNumber,
        orders: req.body.orders,
      });

      const order = await doc.save();

      res.json({
        message: "Заказ успешно оформлен",
      });
    }
  } catch (err) {
    console.log("error", err);
    res.status(500).json({
      message: "Не удалось оформить заказ",
      data: err,
    });
  }
};

export const getOrderList = async (req, res) => {
  try {
    const orders = await OrderModel.find();
    res.json({
      orders,
    });
  } catch (err) {
    console.log("err", err);
    res.status(500).json({
      message: "server error",
    });
  }
};

export const deleteOrderById = async (req, res) => {
  try {
    console.log("req.body", req.body);
    let orders = await OrderModel.findByIdAndDelete({ _id: req.params.id });
    return res.json({
      message: "success ",
    });
  } catch (err) {
    console.log("err", err);
    res.status(500).json({
      message: "server error",
    });
  }
};
