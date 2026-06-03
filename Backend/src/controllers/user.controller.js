import UserService from "../services/user.service.js"

export default {
    async registerUser(req, res) {
        const body = req.body;
        const username = body.username;
        const email = body.email;
        const password = body.password;

        const response = await UserService.insertUser(username, email, password);

        if(response.error) {
            res.status(400).json({ erro: true, msg: response.msg })
        }

        res.status(200).json({ error: false, msg: response.msg });
    }
}