
import { Resend } from "resend"
import UserModel from "../model/user.model.js";
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"
import crypto from "node:crypto"

const resend = new Resend(process.env.RESEND_API_KEY);

export const AuthController = {
    async registerAuth(req, res) {
        const body = req.body;
        const username = body.username;
        const email = body.email;
        const password = body.password;
        
        const activateToken = crypto.randomBytes(32).toString('hex');
        const passwordHash = await bcrypt.hash(password, 12);

        const expiresIn = new Date(Date.now() + 24 * 60 * 60 * 1000);

        const clientUrl = process.env.CLIENT_URL || 'http://localhost:5173';

        const html = `
            <div style="background-color: #f4f4f4; padding: 25px; font-family: 'Inter', Arial, sans-serif;">
                <div style="background-color: #1C1C1E; color: #afafaf; padding: 30px 20px; text-align: center; border-radius: 10px; max-width: 500px; margin: 0 auto;">
                    
                    <h1 style="font-size: 32px; color: #FFFFFF; margin-top: 0; margin-bottom: 16px; font-weight: bold;">
                    Welcome to Focus Room!
                    </h1>

                    <p style="font-size: 18px; color: #afafaf; margin-top: 0; margin-bottom: 24px; line-height: 1.5;">
                    To activate your account, just click on the button below:
                    </p>

                    <a href="${clientUrl}/?token=${activateToken}&email=${encodeURIComponent(email)}" style="display: inline-block; width: 80%; max-width: 300px; background-color: seagreen; color: #ffffff; text-decoration: none; font-size: 16px; font-weight: bold; text-align: center; padding: 14px 0; border-radius: 10px;">
                    Activate Account
                    </a>

                </div>
            </div>
        `

        try {
            const insertResponse = await UserModel.insertUser(username, email, passwordHash, activateToken, expiresIn);

            if(!insertResponse.rowCount) {
                throw new Error({ error: true });
            }

            await resend.emails.send({
                from: 'Suport <suport@focusroom.com.br>',
                to: email,
                subject: 'Activate your account',
                html: html
            });

            res.status(201).json({ error: false });
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