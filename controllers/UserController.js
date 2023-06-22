import { validationResult } from "express-validator";
import UserModel from "../models/User.js";
import bctypt from "bcrypt";
import jwt from "jsonwebtoken";
import { generateJwt } from "../utils/generateJwt.js";

export const register = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json(errors.array());
    } else {
      const password = req.body.password;
      const salt = await bctypt.genSalt(10);
      const hash = await bctypt.hash(password, salt);

      const doc = new UserModel({
        email: req.body.email,
        fullName: req.body.fullName,
        passwordHash: hash,
      });

      const user = await doc.save();

      const { passwordHash, ...userData } = user._doc;

      const token = generateJwt({ userId: user._id }, "secretKey", "30d");

      return res.json({
        ...userData,
        token,
      });
    }
  } catch (err) {
    console.log("error", err);
    res.status(500).json({
      message: "Не удалось зарегестрироваться",
      data: err,
    });
  }
};

export const login = async (req, res) => {
  console.log("req.body", req.body);
  try {
    const user = await UserModel.findOne({ email: req.body.email });

    if (!user) {
      return res.status(404).json({
        message: "User is not exist",
      });
    }
    const isValidPassword = await bctypt.compare(
      req.body.password,
      user._doc.passwordHash
    );

    if (!isValidPassword) {
      return res.status(400).json({
        message: "Incorrect login or password",
      });
    }

    const token = generateJwt({ userId: user._id }, "secretKey", "30d");

    const { passwordHash, ...userData } = user._doc;
    return res.json({
      ...userData,
      token,
    });
  } catch (err) {}
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
