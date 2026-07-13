import UserModel from "../model/user.model.js";

export default {
    async registerUser(req, res) {
        const body = req.body;
        const username = body.username;
        const email = body.email;
        const password = body.password;

        const response = await UserModel.insertUser(username, email, password);

        if (response.error) {
            res.status(400).json({ erro: true, msg: response.msg });
        }

        res.status(201).json({ error: false, msg: response.msg });
    },

    async loginUser(req, res) {
        const body = req.body;
        const username = body.username;
        const password = body.password;

        console.log(body);

        try {
            const selectResponse = await UserModel.selectUser(username);

            console.log(selectResponse);

            if (!selectResponse.data.rowCount) {
                return res
                    .status(404)
                    .json({ error: true, msg: "Usuário inexistente" });
            }

            const user = selectResponse.data.rows[0];

            if (user.password !== password) {
                return res
                    .status(401)
                    .json({ error: true, msg: "Usuário ou senha inválidos" });
            }

            res.status(200).json({
                error: false,
                msg: "Usuário autenticado com sucesso",
            });
        } catch (error) {
            res.status(400).json({ error: true, msg: error.message });
        }
    },
};
