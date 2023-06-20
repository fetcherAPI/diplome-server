import express from "express";
import mongoose from "mongoose";
import cors from "cors";
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

const app = express();

mongoose
  .connect(`mongodb+srv://root:12345@cluster0.jq6wt5c.mongodb.net/blog`)
  .then(() => console.log("DB"))
  .catch((err) => console.log("error", err));

app.use(express.json());
app.use(cors());

app.post("/auth/register", registerValidator, register);
app.post("/auth/login", login);
app.post("/auth/me", checkToken, getMe);

app.post("/vacancy", checkToken, newVacancyValidator, createVacancy);
app.get("/vacancy", getVacancyList);

app.post("/news", checkToken, newsValidator, createNews);
app.get("/news", getNewsList);

app.listen(4444, (err) => {
  if (err) {
    console.log("err", err);
  }
  console.log("server ");
});
