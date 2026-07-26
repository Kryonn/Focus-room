import db from "../database/db.js"

const TaskModel = {
    async selectTaskAll(username, gridName, widgetId) {
        try {
            const res = await db.query(
                `
                SELECT taskname, to_char(deadline, 'DD/MM/YYYY') AS deadline
                FROM task
                WHERE username = $1 AND gridname = $2 AND widgetid = $3
                `, [username, gridName, widgetId]
            )

            return res.rows;
        } catch(err) {
            throw err;
        }
    },

    async insertTask(username, gridName, widgetId, taskName, deadLine) {
        try {
            const res = await db.query(
                `
                INSERT INTO task (username, gridname, widgetid, taskname, deadline)
                VALUES ($1, $2, $3, $4, $5)`, [username, gridName, widgetId, taskName, deadLine]
            );
    
            return res
        } catch(err) {
            throw err;
        }
    },

    async deleteTask(username, gridName, widgetId, taskName) {
        try {
            const res = await db.query(
                `
                DELETE FROM task
                WHERE username = $1 AND gridname = $2 AND widgetid = $3 AND taskname = $4`,
                [username, gridName, widgetId, taskName]
            )

            return res;
        } catch(err) {
            throw err;
        }
    }
}

export default TaskModel