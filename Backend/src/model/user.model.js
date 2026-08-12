import db from "../database/db.js";

export default {
    async insertUser(username, email, password, activateToken, expiresIn) {
        return await db.query(
            `
            INSERT INTO users (username, email, password, activetoken, activate_expires_at) 
            VALUES ($1, $2, $3, $4, $5)`,
            [username, email, password, activateToken, expiresIn],
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

    async selectUserByActivateToken(activateToken) {
        return await db.query(
            `
            SELECT *
            FROM users
            WHERE activetoken = $1`,
            [activateToken],
        );
    },

    async selectUserByRecoverToken(recoverToken) {
        return await db.query(
            `
            SELECT *
            FROM users
            WHERE recovertoken = $1`,
            [recoverToken],
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

    async updateActivateTokenUser(email, activateToken, expireIn) {
        return await db.query(
            `
                UPDATE users
                SET activetoken = $1, activate_expires_at = $2
                WHERE email = $3
            `, [activateToken, expireIn, email]
        )
    },

    async updateRecoverTokenUser(email, recoverToken, expireIn) {
        return await db.query(
            `
                UPDATE users
                SET recovertoken = $1, recover_expires_at = $2
                WHERE email = $3
            `, [recoverToken, expireIn, email]
        )
    },

    async updatePasswordUser(email, password) {
        return await db.query(
            `
                UPDATE users
                SET recovertoken = $1, password = $2
                WHERE email = $3
            `, [null, password, email]
        )
    },

    async activateUser(username) {
        return await db.query(
            `
            UPDATE users
            SET is_active = true, activetoken = null
            WHERE username = $1
            `, [username]
        );
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
