import { validationResult } from "express-validator";
import UserModel from "../models/User.js";
import VacancyModel from "../models/Vacancy.js";
import jwt from "jsonwebtoken";

export const createVacancy = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json(errors.array());
    } else {
      const doc = new VacancyModel({
        vacancyName: req.body.vacancyName,
        vacancyDescription: req.body.vacancyDescription,
        vacancyRequirements: req.body.vacancyRequirements,
        vacancyConditions: req.body.vacancyConditions,
        vacancyResponsibilities: req.body.vacancyResponsibilities,
      });

      const vacancy = await doc.save();

      res.json({
        vacancy,
      });
    }
  } catch (err) {
    console.log("error", err);
    res.status(500).json({
      message: "Не удалось создать вакансию",
      data: err,
    });
  }
};

export const getMe = async (req, res) => {
  try {
    const user = await UserModel.findById(req.userId);

    if (!user) {
      return res.status(404).json({
        message: "user is not exist",
      });
    }

    const token = jwt.sign(
      {
        _id: user._id,
      },
      "secretKey",
      {
        expiresIn: "30d",
      }
    );

    const { passwordHash, ...userData } = user._doc;
    res.json({
      ...userData,
      token,
      isLoggedIn: true,
    });
  } catch (err) {
    console.log("err", err);
    res.status(500).json({
      message: "forbiden",
    });
  }
};

export const getVacancyList = async (req, res) => {
  try {
    const vacancys = await VacancyModel.find();
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
