import bcrypt from "bcrypt";
import { db } from "../config/connect.js";
// import db from "../models/index.cjs";

import jwt from "jsonwebtoken";
import { validationResult } from "express-validator";
import { v4 as uuidv4 } from "uuid";
import Constants from "../common/constant.js";
import userService from "../services/userService.js";

let refreshTokens = [];

const authController = {
  register: async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res
          .status(Constants.HttpStatusCode.BAD_REQUEST)
          .json({ errors: errors.array() });
      }
      const user = req?.body?.user ?? "";
      const checkUser = await userService.getUserByUsername(user.username);
      if (checkUser !== null) {
        res
          .status(Constants.HttpStatusCode.CONFLICT)
          .json({ message: Constants.OutputType.ACCOUNT_ALREADY_EXIST });
      } else {
        const id = uuidv4();
        const salt = 10;
        const hashPassword = bcrypt.hashSync(user.password, salt);
        const newUser = {
          id: id,
          fullname: user?.fullName,
          email: user?.email,
          username: user.username,
          password: hashPassword,
          role: user?.role,
        };
        const createUser = await userService.createUser(newUser);
        if (createUser) {
          return res.status(Constants.HttpStatusCode.INSERT_OK).json({
            username : user.username,
            message: Constants.OutputType.CREATE_SUCCESS,
          });
        }
      }
    } catch (err) {
      res
        .status(Constants.HttpStatusCode.INTERNAL_SERVER_ERROR)
        .json({ message: Constants.OutputType.ERROR_PROCESSING_CREATE });
    }
  },

  generateAccessToken: (user) => {
    return jwt.sign(
      {
        id: user.id,
        role: user.role,
      },
      process.env.JWT_ACCESS_KEY,
      { expiresIn: Constants.GenerateToken.ACCESS_EXPIRES_IN }
    );
  },

  generateRefreshToken: (user) => {
    return jwt.sign(
      {
        id: user.id,
        role: user.role,
      },
      process.env.JWT_REFRESH_KEY,
      { expiresIn: Constants.GenerateToken.REFRESH_EXPIRES_IN }
    );
  },

  login: async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res
        .status(Constants.HttpStatusCode.BAD_REQUEST)
        .json({ errors: errors.array() });
    }
    const username = req?.body?.username ?? "";
    const user = await userService.getUserByUsername(username);

    if (!user) {
      return res
        .status(Constants.HttpStatusCode.NOT_FOUND)
        .json({ message: Constants.OutputType.ERROR_USERNAME_OR_PASSWORD });
    }

    const isPassword = await bcrypt.compare(
      req?.body?.password ?? "",
      user.password
    );

    if (!isPassword) {
      return res
        .status(Constants.HttpStatusCode.FORBIDDEN)
        .json({ message: Constants.OutputType.ERROR_USERNAME_OR_PASSWORD });
    }

    if (user && isPassword) {
      const accessToken = authController.generateAccessToken(user);
      const refreshToken = authController.generateRefreshToken(user);
      refreshTokens.push(refreshToken); // fake database
      res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        secure: false, // deploy is true
        path: "/",
        sameSite: "strict",
      });
      return res
        .status(Constants.HttpStatusCode.OK)
        .json({ user, accessToken });
    }
  },

  requestRefreshToken: async (req, res) => {
    const refreshToken = req.cookies.refreshToken;
    if (!refreshToken) {
      return res
        .status(Constants.HttpStatusCode.UNAUTHORIZED)
        .json(Constants.OutputType.NOT_AUTHENTICATED);
    }
    if (!refreshTokens.includes(refreshToken)) {
      return res
        .status(Constants.HttpStatusCode.FORBIDDEN)
        .json({ message: Constants.OutputType.ERROR_REFRESH_TOKEN_VALID });
    }
    jwt.verify(refreshToken, process.env.JWT_REFRESH_KEY, (err, user) => {
      if (err) {
        return req.status(Constants.OutputType.BAD_REQUEST).json(err);
      }
      refreshTokens = refreshTokens.filter((token) => token !== refreshToken);
      const newAccessToken = authController.generateAccessToken(user);
      const newRefreshToken = authController.generateRefreshToken(user);
      refreshTokens.push(newRefreshToken);
      res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        secure: false, // deploy is true
        path: "/",
        sameSite: "strict",
      });
      res.status(Constants.HttpStatusCode.OK).json({
        accessToken: newAccessToken,
      });
    });
  },

  logOut: async (req, res) => {
    refreshTokens = refreshTokens.filter((token) => token !== req.body.token);
    res.clearCookie("refreshToken");
    res
      .status(Constants.HttpStatusCode.OK)
      .json({ message: Constants.OutputType.LOGOUT_SUCCESS });
  },
};

export default authController;
