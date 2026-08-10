import { Resend } from "resend"
import UserModel from "../model/user.model.js";
import crypto from "node:crypto"

const resend = new Resend(process.env.RESEND_API_KEY);

const EmailController = {
    async sendEmail(req, res) {
        const body = req.body;
        const email = body.email;

        const clientUrl = process.env.CLIENT_URL || 'http://localhost:5173';

        const activateToken = crypto.randomBytes(32).toString("hex");

        const expireIn = new Date(Date.now() + 24 * 60 * 60 * 1000);

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
    }
};

export default EmailController;
