import express from "express";
import { UserController } from "../controllers/user.controller.js";
import { AuthController } from "../controllers/auth.controller.js";
import EmailController from "../controllers/email.controller.js";

const router = express.Router();

router.put("/user/refresh", UserController.updateRefreshTokenUser);
router.put("/user/change/password", UserController.updatePasswordUser);

router.post("/auth/register", AuthController.registerAuth);
router.post("/auth/login", AuthController.loginAuth);
router.post("/auth/refresh", AuthController.refreshTokenAuth);

router.post("/email", EmailController.sendActivateEmail);
router.post("/email/recover", EmailController.sendRecoverEmail);

router.post("/email/activate", EmailController.verifyActivateToken);
router.post("/email/verify/recover", EmailController.verifyRecoverToken);

router.get("/health", (req, res) => {
    res.sendStatus(200);
})

export default router;
