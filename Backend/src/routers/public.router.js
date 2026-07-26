import express from "express";
import { UserController } from "../controllers/user.controller.js";

const router = express.Router();

router.post("/cadastro", UserController.registerUser);
router.post("/login", UserController.loginUser);

export default router;
