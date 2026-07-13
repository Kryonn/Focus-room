import db from "../database/db.js";

export default {
    async insertUser(username, email, password) {
        try {
            const res = await db.query(
                `
                INSERT INTO users (username, email, password) 
                VALUES ($1, $2, $3)`,
                [username, email, password],
            );

            return {
                error: false,
                msg: "INSERT realizado com sucesso",
                data: res,
            };
        } catch (error) {
            throw error;
        }
    },

    async selectUser(username) {
        try {
            const res = await db.query(
                `
                SELECT *
                FROM users
                WHERE username = $1`,
                [username],
            );

            return {
                error: false,
                msg: "SELECT realizado com sucesso",
                data: res,
            };
        } catch (error) {
            throw error;
        }
    },
};
