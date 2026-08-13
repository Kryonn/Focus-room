import { Resend } from "resend"
import UserModel from "../model/user.model.js";
import crypto from "node:crypto"
import bcrypt from "bcrypt"

const resend = new Resend(process.env.RESEND_API_KEY);

const EmailController = {
    async sendActivateEmail(req, res) {
        const body = req.body;
        const email = body.email;

        const clientUrl = process.env.CLIENT_URL || 'http://localhost:5173';

        const activateToken = crypto.randomBytes(32).toString("hex");

        const expireIn = new Date(Date.now() + 24 * 60 * 60 * 1000);

        const linkUrl = new URL(clientUrl);
        linkUrl.searchParams.set('action', 'activate');
        linkUrl.searchParams.set('token', activateToken);
        linkUrl.searchParams.set('email', email);

        const finalLink = linkUrl.toString();

        const html = `
            <div style="background-color: #f4f4f4; padding: 25px; font-family: 'Inter', Arial, sans-serif;">
                <div style="background-color: #1C1C1E; color: #afafaf; padding: 30px 20px; text-align: center; border-radius: 10px; max-width: 500px; margin: 0 auto;">
                    
                    <h1 style="font-size: 32px; color: #FFFFFF; margin-top: 0; margin-bottom: 16px; font-weight: bold;">
                    Welcome to Focus Room!
                    </h1>

                    <p style="font-size: 18px; color: #afafaf; margin-top: 0; margin-bottom: 24px; line-height: 1.5;">
                    To activate your account, just click on the button below:
                    </p>

                    <a href="${finalLink}" style="display: inline-block; width: 80%; max-width: 300px; background-color: seagreen; color: #ffffff; text-decoration: none; font-size: 16px; font-weight: bold; text-align: center; padding: 14px 0; border-radius: 10px;">
                    Activate Account
                    </a>

                </div>
            </div>
        `

        console.log("linkUrl", linkUrl);

        try {
            const updateResponse = await UserModel.updateActivateTokenUser(email, activateToken, expireIn);

            console.log(updateResponse);

            if(!updateResponse.rowCount) {
                return res.status(400).json({ error: true });
            }

            await resend.emails.send({
                from: 'Support <support@focusroom.com.br>',
                to: email,
                subject: 'Activate your account',
                html: html
            });
    
            return res.status(200).json({ error: false });
        }catch(err) {
            return res.status(400).json({ error: true });
        }
    },

    async sendRecoverEmail(req, res) {
        const body = req.body;
        const email = body.email;

        const clientUrl = process.env.CLIENT_URL || 'http://localhost:5173';

        const recoverToken = crypto.randomBytes(32).toString("hex");

        const expireIn = new Date(Date.now() + 60 * 30 * 1000);

        const html = `
            <div style="background-color: #f4f4f4; padding: 25px; font-family: 'Inter', Arial, sans-serif;">
                <div style="background-color: #1C1C1E; color: #afafaf; padding: 30px 20px; text-align: center; border-radius: 10px; max-width: 500px; margin: 0 auto;">
                    
                    <h1 style="font-size: 32px; color: #FFFFFF; margin-top: 0; margin-bottom: 16px; font-weight: bold;">
                        Reset Your Password
                    </h1>

                    <p style="font-size: 18px; color: #afafaf; margin-top: 0; margin-bottom: 16px; line-height: 1.5;">
                        We received a request to reset the password for your <strong>Focus Room</strong> account.
                    </p>

                    <p style="font-size: 16px; color: #afafaf; margin-top: 0; margin-bottom: 24px; line-height: 1.5;">
                        Click the button below to choose a new password:
                    </p>

                    <a href="${clientUrl}/?action=recover&token=${recoverToken}&email=${encodeURIComponent(email)}" style="display: inline-block; width: 80%; max-width: 300px; background-color: seagreen; color: #ffffff; text-decoration: none; font-size: 16px; font-weight: bold; text-align: center; padding: 14px 0; border-radius: 10px;">
                        Reset Password
                    </a>

                    <p style="font-size: 14px; color: #71717A; margin-top: 28px; margin-bottom: 0; line-height: 1.4;">
                        If you didn't request a password reset, you can safely ignore this email. Your password won't change.
                    </p>

                </div>
            </div>
        `

        try {
            const updateResponse = await UserModel.updateRecoverTokenUser(email, recoverToken, expireIn);

            if(!updateResponse.rowCount) {
                return res.status(400).json({ error: true });
            }

            await resend.emails.send({
                from: 'Support <support@focusroom.com.br>',
                to: email,
                subject: 'Recover your account',
                html: html
            });
    
            return res.status(200).json({ error: false });
        }catch(err) {
            return res.status(400).json({ error: true });
        }
    },

    async verifyActivateToken(req, res) {
        const body = req.body;
        const activateToken = body.activateToken;

        try {
            const selectResponse = await UserModel.selectUserByActivateToken(activateToken);

            const user = selectResponse.rows[0];

            if(!user) {
                return res.status(400).json({ error: true });
            }
            
            if(user.activate_expires_at < Date.now()) {
                return res.status(400).json({ error: true });
            }

            await UserModel.activateUser(user.username);

            res.status(200).json({ error: false });
        } catch(err) {
            res.status(400).json({ error: true });
        }
    },

    async verifyRecoverToken(req, res) {
        const body = req.body;
        const recoverToken = body.recoverToken;

        try {
            const selectResponse = await UserModel.selectUserByRecoverToken(recoverToken);

            const user = selectResponse.rows[0];

            if(!user) {
                return res.status(400).json({ error: true });
            }
            
            if(user.recover_expires_at < Date.now()) {
                return res.status(400).json({ error: true });
            }

            res.status(200).json({ error: false });
        } catch(err) {
            res.status(400).json({ error: true });
        }
    },

    // async verifyRecoverToken(req, res) {
    //     const body = req.body;
    //     const recoverToken = body.recoverToken;
    //     const email = body.email;
    //     const password = body.password;

    //     console.log("recoverToken", recoverToken);
    //         console.log("email", email);
    //         console.log("password", password);
            
            
            
    //         try {
    //             const selectResponse = await UserModel.selectUserByRecoverToken(recoverToken);
                
    //             const user = selectResponse.rows[0];
    //             console.log("user", user);

    //         if(!user) {
    //             return res.status(400).json({ error: true });
    //         }

            
            
    //         if(user.recover_expires_at < Date.now()) {
    //             return res.status(400).json({ error: true });
    //         }

            

    //         const passwordHash = await bcrypt.hash(password, 12);

    //         const updateResponse = await UserModel.updatePasswordUser(email, passwordHash);

    //         res.status(200).json({ error: false });
    //     } catch(err) {
    //         res.status(400).json({ error: true });
    //     }
    // }
};

export default EmailController;
