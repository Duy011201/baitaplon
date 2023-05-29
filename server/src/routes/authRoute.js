import authController from "../controllers/authController.js";
import { verifyToken } from "../controllers/verifyToken.js";
import express from "express";
import { body } from "express-validator";

let router = express.Router();

router.post("/register",
verifyToken,
body("user.username")
  .isLength({ min: 5 })
  .withMessage("must be at least 5 chars long"),
body("user.password")
  .isLength({ min: 8 })
  .withMessage("must be at least 8 chars long"),
authController.register);

router.post("/refresh", authController.requestRefreshToken);

router.post("/login",
verifyToken,
body("username")
  .isLength({ min: 5 })
  .withMessage("must be at least 5 chars long"),
body("password")
  .isLength({ min: 8 })
  .withMessage("must be at least 8 chars long"),
  verifyToken, authController.login);
  
router.post("/logout", verifyToken, authController.logOut);

export default router;