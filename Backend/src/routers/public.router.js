import express from "express";
import { UserController } from "../controllers/user.controller.js";
import { AuthController } from "../controllers/auth.controller.js";

const router = express.Router();

router.put("/user/refresh", UserController.updateRefreshTokenUser);

router.post("/auth/register", AuthController.registerAuth);
router.post("/auth/login", AuthController.loginAuth);
router.post("/auth/refresh", AuthController.refreshTokenAuth);
router.post("/auth/logout", AuthController.logoutAuth);

export default router;
