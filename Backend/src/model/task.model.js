import db from "../database/db.js"

const TaskModel = {
    async insertTask(username, gridname, widgetid, taskname, deadline) {
        try {
            const res = await db.query(
                `
                INSERT INTO task (username, gridname, widgetid, taskname, deadline)
                VALUES ($1, $2, $3, $4, $5)`, [username, gridname, widgetid, taskname, deadline]
            );
    
            return res
        } catch(err) {
            throw err;
        }
    },

    async deleteTask(username, gridname, widgetid, taskname) {
        try {
            const res = await db.query(
                `
                DELETE FROM task
                WHERE username = $1 AND gridname = $2 AND widgetid = $3 AND taskname = $4`,
                [username, gridname, widgetid, taskname]
            )

            return res;
        } catch(err) {
            throw err;
        }
    }
}

export default TaskModel