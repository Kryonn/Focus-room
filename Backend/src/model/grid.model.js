import db from "../database/db.js"

const GridModel = {
    async selectUserGrid(username) {
        try {
            const res = await db.query(`
                SELECT *
                FROM grid
                WHERE username = $1`, [username]
            );

            return res.rows;
        } catch(error) {
            throw error;
        }
    }
}

export default GridModel