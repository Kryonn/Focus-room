import db from "../database/db.js"

export default {
    async insertUser(username, email, password) {
        try {
            const res = await db.query('INSERT INTO users (username, email, password) VALUES ($1, $2, $3)', [username, email, password]);

            return {
                error: false,
                msg: "Cadastro realizado com sucesso"
            }

        } catch(error) {
            return {
                error: true,
                msg: error.message
            } 
        }
    },
    
    async getUser(username) {

    }
}