import { body } from "express-validator";

export const registerValidator = [
  body("email", "Введите валидный эмейл").isEmail(),
  body("password", "Минимум 6 символов").isLength({ min: 6 }),
  body("fullName", "Минимум 3 символов").isLength({ min: 3 }),
];

export const loginValidator = [
  body("email", "Введите валидный эмейл").isEmail(),
  body("password", "Минимум 6 символов").isLength({ min: 6 }),
];
