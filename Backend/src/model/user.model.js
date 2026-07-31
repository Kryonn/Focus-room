import db from "../database/db.js";

export default {
    async insertUser(username, email, password) {
        return await db.query(
            `
            INSERT INTO users (username, email, password) 
            VALUES ($1, $2, $3)`,
            [username, email, password],
        );
    },

    async selectUserByUsername(username) {
        return await db.query(
            `
            SELECT *
            FROM users
            WHERE username = $1`,
            [username],
        );
    },

    async selectUserByRefreshToken(refreshToken) {
        return await db.query(
            `
            SELECT *
            FROM users
            WHERE refreshtoken = $1`,
            [refreshToken],
        );
    },

    async updateRefreshTokenUser(username, newRefreshToken) {
        return await db.query(
                `
                UPDATE users
                SET refreshtoken = $1
                WHERE username = $2
                `, [newRefreshToken, username]
        )
    },

    async clearRefreshTokenUser(username) {
        try {
            const res = await db.query(
                `
                UPDATE users
                SET refreshtoken = $1
                WHERE username = $2
                `, [null, username]
            )

            return res;
        } catch(err) {
            throw err;
        }
    },
};
