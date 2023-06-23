import { body } from "express-validator";

export const newVacancyValidator = [
  body("vacancyName", "Название вкансии не должен быть пустым")
    .notEmpty()
    .isLength({
      min: 3,
    }),
  body("vacancyDescription", "Минимум 10 символов").isLength({ min: 10 }),
  body("vacancyRequirements", "Минимум 1 элемент")
    .isArray({ min: 1 })
    .notEmpty(),
  body("vacancyConditions", "Минимум 1 элемент").isArray({ min: 1 }),
  body("vacancyResponsibilities", "Минимум 1 символов").isArray({ min: 1 }),
];
