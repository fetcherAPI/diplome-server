import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import { registerValidator } from "./validations/auth.js";
import checkToken from "./utils/checkToken.js";
import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

import { register, login, getMe } from "./controllers/UserController.js";
import {
  createVacancy,
  getVacancyList,
} from "./controllers/VacancyController.js";
import { newVacancyValidator } from "./validations/newVacancyValidator.js";

const app = express();

mongoose
  .connect("mongodb+srv://root:12345@cluster0.jq6wt5c.mongodb.net/blog")
  .then(() => console.log("DB"))
  .catch((err) => console.log("error", err));

const options = {
  definition: {
    openapi: "3.1.0",
    info: {
      title: "LogRocket Express API with Swagger",
      version: "0.1.0",
      description:
        "This is a simple CRUD API application made with Express and documented with Swagger",
      license: {
        name: "MIT",
        url: "https://spdx.org/licenses/MIT.html",
      },
      contact: {
        name: "LogRocket",
        url: "https://logrocket.com",
        email: "info@email.com",
      },
    },
    servers: [
      {
        url: "http://localhost:4444",
      },
    ],
  },
  apis: ["./routes/*.js"],
};

const specs = swaggerJSDoc(options);

app.use(
  "/api-docs",
  express.json(),
  cors(),
  swaggerUi.serve,
  swaggerUi.setup(specs, { explorer: true })
);

app.post("/auth/register", registerValidator, register);

app.post("/auth/login", login);

app.post("/auth/me", checkToken, getMe);

app.post("/vacancy", checkToken, newVacancyValidator, createVacancy);

app.get("/vacancy", getVacancyList);

app.listen(4444, (err) => {
  if (err) {
    console.log("err", err);
  }
  console.log("server ");
});
