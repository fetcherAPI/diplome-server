import { registerValidator } from "./validations/auth.js";
import checkToken from "./utils/checkToken.js";

import { register, login, getMe } from "./controllers/UserController.js";
import {
  createVacancy,
  getVacancyList,
} from "./controllers/VacancyController.js";
import { newVacancyValidator } from "./validations/newVacancyValidator.js";
import { newsValidator } from "./validations/newsValidator.js";
import { createNews, getNewsList } from "./controllers/NewsController.js";
import { OrderValidator } from "./validations/OrderValidator.js";
import { createOrder } from "./controllers/OrderController.js";

export const RoutesEx = (app) => {
  app.post("/auth/register", registerValidator, register);
  app.post("/auth/login", login);
  app.post("/auth/me", checkToken, getMe);

  app.post("/vacancy", checkToken, newVacancyValidator, createVacancy);
  app.get("/vacancy", getVacancyList);

  app.post("/news", checkToken, newsValidator, createNews);
  app.get("/news", getNewsList);

  app.post("/order", OrderValidator, createOrder);
};
