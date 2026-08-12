import UserModel from "../model/user.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const UserController = {
    async updateRefreshTokenUser(req, res) {
        const body = req.body;
        const username = body.username;
        const newRefreshToken = body.newRefreshToken;

        try {
            const updateResponse = await UserModel.updateRefreshTokenUser(username, newRefreshToken);

            res.status(200).json({
                    error: false,
                    msg: "Refresh token updated",
            });
        } catch(err) {
            res.status(400).json({ error: true, msg: err.message });
        }
    },

    async updatePasswordUser(req, res) {
        const body = req.body;
        const email = body.email;
        const password = body.password;

        const passwordHash = await bcrypt.hash(password, 12);

        try {
            const updateResponse = await UserModel.updatePasswordUser(email, passwordHash);

            res.status(200).json({
                error: false
            })
        } catch(err) {
            res.status(400).json({ error: true });
        }

    }
};
