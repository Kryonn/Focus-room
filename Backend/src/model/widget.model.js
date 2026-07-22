import db from "../database/db.js";

// Pomodoro default settings
const default_pomodoro_work_time = 50;
const default_pomodoro_break_time = 20;
const default_pomodoro_width = 1;
const default_pomodoro_height = 1;

export const WidgetModel = {
    async selectWidgetAll(username, gridName) {
        try {
            const res = await db.query(
                `
                SELECT *
                FROM widget
                WHERE username = $1 AND gridname = $2`,
                [username, gridName],
            );

            return res.rows;
        } catch (err) {
            throw err;
        }
    },

    async insertPomodoro(id, username, gridName, xposition, yposition) {
        try {
            const res = await db.query(
                `
                INSERT INTO widget (
                    id,
                    username,
                    gridname,
                    width,
                    height,
                    xposition,
                    yposition,
                    pomodoro_work_time,
                    pomodoro_break_time
                )
                VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)`,
                [
                    id,
                    username,
                    gridName,
                    default_pomodoro_width,
                    default_pomodoro_height,
                    xposition,
                    yposition,
                    default_pomodoro_work_time,
                    default_pomodoro_break_time,
                ],
            );

            return res;
        } catch (err) {
            throw err;
        }
    },

    async putWidget(
        id,
        username,
        gridName,
        width,
        height,
        xposition,
        yposition,
    ) {
        try {
            const res = await db.query(
                `
                UPDATE widget
                SET width=$1, height=$2, xposition=$3, yposition=$4
                WHERE id=$5 AND username=$6 AND gridName=$7
                `,
                [width, height, xposition, yposition, id, username, gridName],
            );

            // console.log(res);

            return res;
        } catch (err) {
            throw err;
        }
    },

    async deleteWidget(id, username, gridName) {
        try {
            const res = await db.query(
                `
                DELETE FROM widget
                WHERE id=$1 AND username=$2 AND gridName=$3
                `,
                [id, username, gridName],
            );

            return res;
        } catch (err) {
            throw error;
        }
    },

    async updateListWidget(username, gridname, widgetid, newListName) {
        try {
            const res = await db.query(
                `
                UPDATE widget
                SET listname = $1
                WHERE username = $2 AND gridname = $3 AND id = $4
                `, [newListName, username, gridname, widgetid]
            )

            return res;
        } catch(err) {
            throw err;
        }
    },

    async updateNoteNameWidget(username, gridname, widgetid, newNoteName) {
        try {
            const res = await db.query(
                `
                UPDATE widget
                SET notename = $1
                WHERE username = $2 AND gridname = $3 AND id = $4
                `, [newNoteName, username, gridname, widgetid]
            )

            return res;
        } catch(err) {
            throw err;
        }
    },

    async updateNoteDescriptionWidget(username, gridname, widgetid, newNameDescription) {
        try {
            const res = await db.query(
                `
                UPDATE widget
                SET notedescription = $1
                WHERE username = $2 AND gridname = $3 AND id = $4
                `, [newNameDescription, username, gridname, widgetid]
            )

            return res;
        } catch(err) {
            throw err;
        }
    }
};
