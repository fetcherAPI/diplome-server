import { validationResult } from "express-validator";
import VacancyModel from "../models/Vacancy.js";

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
