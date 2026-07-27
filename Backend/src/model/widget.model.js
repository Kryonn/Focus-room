import db from "../database/db.js";

// Pomodoro default settings
const default_pomodoro_work_time = 50;
const default_pomodoro_break_time = 20;
const default_pomodoro_width = 1;
const default_pomodoro_height = 1;

// List default settings
const default_list_width = 3
const default_list_height = 2

// Note default settings
const default_note_width = 2
const default_note_height = 2

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

    async insertPomodoro(username, gridName, widgetId, pomodoroWorkTime, pomodoroBreakTime, xPosition, yPosition) {
        try {
            const res = await db.query(
                `
                INSERT INTO widget (
                    id,
                    username,
                    gridname,
                    width,
                    height,
                    xPosition,
                    yPosition,
                    pomodoroworktime,
                    pomodorobreaktime
                )
                VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)`,
                [
                    widgetId,
                    username,
                    gridName,
                    default_pomodoro_width,
                    default_pomodoro_height,
                    xPosition,
                    yPosition,
                    pomodoroWorkTime,
                    pomodoroBreakTime,
                ],
            );

            return res;
        } catch (err) {
            throw err;
        }
    },

    async putWidget(
        username,
        gridName,
        widgetId,
        width,
        height,
        xPosition,
        yPosition,
    ) {
        try {
            const res = await db.query(
                `
                UPDATE widget
                SET width=$1, height=$2, xposition=$3, yposition=$4
                WHERE id=$5 AND username=$6 AND gridName=$7
                `,
                [width, height, xPosition, yPosition, widgetId, username, gridName],
            );

            // console.log(res);

            return res;
        } catch (err) {
            throw err;
        }
    },

    async deleteWidget(username, gridName, widgetId) {
        try {
            const res = await db.query(
                `
                DELETE FROM widget
                WHERE id=$1 AND username=$2 AND gridName=$3
                `,
                [widgetId, username, gridName],
            );

            return res;
        } catch (err) {
            throw error;
        }
    },

    async deleteWidgetAll(username, gridName) {
        try {
            const res = await db.query(
                `
                DELETE FROM widget
                WHERE username=$1 AND gridname=$2
                `,
                [username, gridName],
            );

            return res;
        } catch (err) {
            throw error;
        }
    },

    async updatePomodoroWidget(username, gridName, widgetId, newPomodoroWorkTime, newPomodoroBreakTime) {
        try {
            const res = await db.query(
                `
                UPDATE widget
                SET pomodoroworktime = $1, pomodorobreaktime = $2
                WHERE username = $3 AND gridname = $4 AND id = $5
                `, [newPomodoroWorkTime, newPomodoroBreakTime, username, gridName, widgetId]
            )

            return res;
        } catch(err) {
            throw err;
        }
    },

    async updateListWidget(username, gridName, widgetId, newListName) {
        try {
            const res = await db.query(
                `
                UPDATE widget
                SET listname = $1
                WHERE username = $2 AND gridname = $3 AND id = $4
                `, [newListName, username, gridName, widgetId]
            )

            return res;
        } catch(err) {
            throw err;
        }
    },

    async updateNoteNameWidget(username, gridname, widgetId, newNoteName) {
        try {
            const res = await db.query(
                `
                UPDATE widget
                SET notename = $1
                WHERE username = $2 AND gridname = $3 AND id = $4
                `, [newNoteName, username, gridname, widgetId]
            )

            return res;
        } catch(err) {
            throw err;
        }
    },

    async updateNoteDescriptionWidget(username, gridname, widgetId, newNameDescription) {
        try {
            const res = await db.query(
                `
                UPDATE widget
                SET notedescription = $1
                WHERE username = $2 AND gridname = $3 AND id = $4
                `, [newNameDescription, username, gridname, widgetId]
            )

            return res;
        } catch(err) {
            throw err;
        }
    },

    async insertList(username, gridname, widgetId, listName, xPosition, yPosition) {
        try {
            const res = await db.query(
                `
                INSERT INTO widget (username, gridname, id, listname, xposition, yposition, width, height)
                VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
                `, [username, gridname, widgetId, listName, xPosition, yPosition, default_list_width, default_list_height]
            )

            return res;
        } catch(err) {
            throw err;
        }
    },

    async insertNote(username, gridname, widgetId, noteName, xPosition, yPosition) {
        try {
            const res = await db.query(
                `
                INSERT INTO widget (username, gridname, id, notename, xposition, yposition, width, height)
                VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
                `, [username, gridname, widgetId, noteName, xPosition, yPosition, default_note_width, default_note_height]
            )

            return res;
        } catch(err) {
            throw err;
        }
    }
};
