import express from "express";
import { UserController } from "../controllers/user.controller.js";
import { AuthController } from "../controllers/auth.controller.js";
import EmailController from "../controllers/email.controller.js";

const router = express.Router();

router.put("/user/refresh", UserController.updateRefreshTokenUser);

router.post("/auth/register", AuthController.registerAuth);
router.post("/auth/login", AuthController.loginAuth);
router.post("/auth/refresh", AuthController.refreshTokenAuth);

router.post("/email", EmailController.sendEmail);

router.post("/email/activate", EmailController.verifyActivateToken);

router.get("/health", (req, res) => {
    res.sendStatus(200);
})

export default router;
