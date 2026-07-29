import db from "../database/db.js";
import { DEFAULT_GRID_SETTINGS } from "../../../Frontend/src/constants/constant.js";

const GridModel = {
    async selectUserGrid(username) {
        try {
            const res = await db.query(
                `
                SELECT *
                FROM grid
                WHERE username = $1`,
                [username],
            );

            return res.rows;
        } catch (error) {
            throw error;
        }
    },

    async insertUserGrid(username, gridName) {
        try {
            const res = await db.query(
                `
                INSERT INTO grid (name, username, static)
                VALUES ($1, $2, $3)`,
                [gridName, username, DEFAULT_GRID_SETTINGS.STATIC],
            );

            return res;
        } catch (err) {
            throw err;
        }
    },

    async deleteGrid(username, gridName) {
        try {
            const res = await db.query(
                `
                DELETE FROM grid
                WHERE username=$1 AND name=$2`,
                [username, gridName],
            );

            return res;
        } catch (err) {
            throw err;
        }
    },

    async updateGrid(username, gridName, gridStatic) {
        try {
            const res = await db.query(
                `
                UPDATE grid
                SET static = $1
                WHERE username = $2 AND name = $3`,
                [gridStatic, username, gridName]
            )

            return res;
        } catch(err) {
            throw err;
        } 
    }
};

export default GridModel;
