import { body } from "express-validator";

export const OrderValidator = [
  body("email", "поле емейл не должен быть пустым").isEmail().notEmpty(),
  body("telNumber", "Минимум 10 символов").notEmpty().isLength({ min: 3 }),
  body("username", "Минимум 3 элемент").notEmpty().isLength({ min: 3 }),
  body("orders", "Минимум 1 элемент").isArray({ min: 1 }),
];
