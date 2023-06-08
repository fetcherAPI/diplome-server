import NewsModel from "../models/News.js";
import { validationResult } from "express-validator";

export const createNews = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json(errors.array());
    } else {
      const doc = new NewsModel({
        title: req.body.title,
        description: req.body.description,
      });

      const news = await doc.save();

      res.json({
        news,
      });
    }
  } catch (err) {
    console.log("error", err);
    res.status(500).json({
      message: "Не удалось создать новость",
      data: err,
    });
  }
};

export const getNewsList = async (req, res) => {
  try {
    const vacancys = await NewsModel.find();
    res.json({
      vacancys,
    });
  } catch (err) {
    console.log("err", err);
    res.status(500).json({
      message: "server error",
    });
  }
};
