
import UserModel from "../model/user.model.js";
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"
import crypto from "node:crypto"

export const AuthController = {
    async registerAuth(req, res) {
        const body = req.body;
        const username = body.username;
        const email = body.email;
        const password = body.password;
        
        const activateToken = crypto.randomBytes(32).toString('hex');
        const passwordHash = await bcrypt.hash(password, 12);
        const now = new Date();
        const expiresIn = new Date(now.getTime() + 24 * 60 * 60 * 1000);

        try {
            const insertResponse = await UserModel.insertUser(username, email, passwordHash, activateToken, expiresIn);

            res.status(201).json({ error: false, data: activateToken });
        } catch(err) {
            res.status(400).json({ error: true });
        }
    },

    async loginAuth(req, res) {
        const body = req.body;
        const username = body.username;
        const password = body.password;

        try {
            const selectResponse = await UserModel.selectUserByUsername(username);

            const user = selectResponse.rows[0];

            if(!user) {
                return res
                    .status(401)
                    .json({ error: true, msg: "Invalid username or password" });
            }

            if(!user.is_active) {
                return res.status(403).json({ error: true, msg: "Invalid username or password" });
            }

            const correctPassword = await bcrypt.compare(password, user.password);

            if (!correctPassword) {
                return res
                    .status(401)
                    .json({ error: true, msg: "Invalid username or password" });
            }

            const accessToken = jwt.sign(
                { username: username },
                process.env.ACCESS_TOKEN_SECRET,
                { expiresIn: "15m" }
            )

            const refreshToken = jwt.sign(
                { username: username },
                process.env.REFRESH_TOKEN_SECRET,
                { expiresIn: "7d" }
            );

            const updateResponse = await UserModel.updateRefreshTokenUser(username, refreshToken);

            res.cookie("refreshToken", refreshToken, {
                httpOnly: true,
                secure: process.env.NODE_ENV === "prod",
                sameSite: process.env.NODE_ENV === "prod" ? "none" : "lax",
                maxAge: 7 * 24 * 60 * 60 * 1000
            });

            res.status(200).json({
                error: false,
                data: {
                    username: username,
                    accessToken: accessToken,
                }
            });
        } catch (error) {
            res.status(400).json({ error: true, msg: "Internal error" });
        }
    },

    async refreshTokenAuth(req, res) {
        const refreshToken = req.cookies.refreshToken;

        if(!refreshToken) {
            return res.status(401).json({ error: true, msg: "Refresh token not found" });
        }

        try {
            const selectResponse = await UserModel.selectUserByRefreshToken(refreshToken);

            const user = selectResponse.rows[0];

            if(!user) {
                return res.status(403).json({ error: true, msg: "Invalid refresh token"});
            }
    
            const accessToken = jwt.sign(
                { username: user.username },
                process.env.ACCESS_TOKEN_SECRET,
                { expiresIn: "15m" }
            )
    
            const newRefreshToken = jwt.sign(
                { username: user.username },
                process.env.REFRESH_TOKEN_SECRET,
                { expiresIn: "7d" }
            )
    
            await UserModel.updateRefreshTokenUser(user.username, newRefreshToken);
    
            res.cookie("refreshToken", newRefreshToken, {
                httpOnly: true,
                secure: process.env.NODE_ENV === "prod",
                sameSite: process.env.NODE_ENV === "prod" ? "none" : "lax",
                maxAge: 7 * 24 * 60 * 60 * 1000
            })
    
            res.status(200).json({ 
                error: false, 
                data: {
                    username: user.username,
                    accessToken: accessToken
                } 
            });
        } catch(err) {
            res.status(400).json({ error: true });
        }
    },

    async logoutAuth(req, res) {
        const username = req.user.username;

        try {
            await UserModel.clearRefreshTokenUser(username);

            res.clearCookie("refreshToken", {
                httpOnly: true,
                secure: process.env.NODE_ENV === "prod",
                sameSite: process.env.NODE_ENV === "prod" ? "none" : "lax"
            })

            res.status(200).json({ error: false });
        } catch(err) {
            res.status(400).json({ error: true });
        }
        
    }
}