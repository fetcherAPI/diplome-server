import { body } from "express-validator";

export const newsValidator = [
  body("title", "Название вкансии не должен быть пустым").notEmpty().isLength({
    min: 3,
  }),
  body("description", "Минимум 3 элемент").isLength({ min: 3 }).notEmpty(),
];
