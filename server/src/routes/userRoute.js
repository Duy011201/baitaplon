import express from "express";
import userController from "../controllers/userController.js";
import { body } from "express-validator";
import {
  verifyToken,
  verifyTokenAndAdmin,
  verifyTokenAndUser,
} from "../controllers/verifyToken.js";

let router = express.Router();

router.get("/all", verifyToken, userController.getAllUser);

router.get(
  "/",
  body("username")
    .isLength({ min: 5 })
    .withMessage("must be at least 5 chars long"),
  verifyTokenAndUser,
  userController.getUserByUsername
);

router.post("/:id", verifyTokenAndUser,
  body("user.username")
    .isLength({ min: 5 })
    .withMessage("must be at least 5 chars long"),
  body("user.password")
    .isLength({ min: 5 })
    .withMessage("must be at least 5 chars long"),
  userController.updateUserById);
router.get("/:id", verifyTokenAndUser, userController.getUserById);
router.delete("/:id", verifyTokenAndUser, userController.deleteUserById);

export default router;
