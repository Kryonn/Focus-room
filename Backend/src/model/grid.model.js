import db from "../database/db.js"

const default_grid_float = true;
const default_grid_static = false;

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
    },

    async insertUserGrid(username, gridName) {
        try {
            const res = await db.query(`
                INSERT INTO grid (name, username, float, static)
                VALUES ($1, $2, $3, $4)`, [
                    gridName,
                    username,
                    default_grid_float,
                    default_grid_static
                ]
            )

            return res;
        } catch(err) {
            throw err;
        }
    }
}

export default GridModel