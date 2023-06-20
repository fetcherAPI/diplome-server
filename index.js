import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import swaggerUi from "swagger-ui-express";
import swaggerDocument from "swagger-jsdoc";
import { RoutesEx } from "./routes.js";

export const app = express();

mongoose
  .connect(`mongodb+srv://root:12345@cluster0.jq6wt5c.mongodb.net/blog`)
  .then(() => console.log("DB"))
  .catch((err) => console.log("error", err));

app.use(express.json());
app.use(cors());

app.use("/swagger", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

RoutesEx(app);

app.listen(4444, (err) => {
  if (err) {
    console.log("err", err);
  }
  console.log("server ");
});
