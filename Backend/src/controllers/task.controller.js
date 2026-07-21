import TaskModel from "../model/task.model.js"

const TaskController = {
    async getTaskAll(req, res) {
        const params = req.query;
        const username = params.username;
        const gridname = params.gridname;
        const widgetid = params.widgetid;

        try {
            const getResponse = await TaskModel.selectTaskAll(username, gridname, widgetid);

            res.status(200).json({ error: false, data: getResponse });
        } catch(err) {
            res.status(400).json({ error: err.message });
        }
    },

    async createTask(req, res) {
        const body = req.body;
        const username = body.username;
        const gridname = body.gridname;
        const widgetid = body.widgetid;
        const taskname = body.taskname;
        const deadline = body.deadline;

        try {
            const insertResponse = await TaskModel.insertTask(username, gridname, widgetid, taskname, deadline);

            res.status(201).json({ error: false, data: insertResponse });
        } catch(err) {
            res.status(400).json({ error: err.message });
        }
    },

    async removeTask(req, res) {
        const body = req.body;
        const username = body.username;
        const gridname = body.gridname;
        const widgetid = body.widgetid;
        const taskname = body.taskname;

        try {
            const deleteInsert = await TaskModel.deleteTask(username, gridname, widgetid, taskname);

            res.status(200).json({ error: false, data: deleteInsert });
        } catch(err) {
            res.status(400).json({ error: err.message });
        }
    }
}

export default TaskController