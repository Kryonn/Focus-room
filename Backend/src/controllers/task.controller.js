import TaskModel from "../model/task.model.js"

const TaskController = {
    async getTaskAll(req, res) {
        const params = req.query;
        const username = req.user.username;
        const gridName = params.gridName;
        const widgetId = params.widgetId;

        try {
            const getResponse = await TaskModel.selectTaskAll(username, gridName, widgetId);

            res.status(200).json({ error: false, data: getResponse });
        } catch(err) {
            res.status(400).json({ error: err.message });
        }
    },

    async createTask(req, res) {
        const body = req.body;
        const username = req.user.username;
        const gridName = body.gridName;
        const widgetId = body.widgetId;
        const taskName = body.taskName;
        const deadLine = body.deadLine;

        try {
            const insertResponse = await TaskModel.insertTask(username, gridName, widgetId, taskName, deadLine);

            res.status(201).json({ error: false, data: insertResponse });
        } catch(err) {
            res.status(400).json({ error: err.message });
        }
    },

    async removeTask(req, res) {
        const body = req.body;
        const username = req.user.username;
        const gridName = body.gridName;
        const widgetId = body.widgetId;
        const taskName = body.taskName;

        try {
            const deleteInsert = await TaskModel.deleteTask(username, gridName, widgetId, taskName);

            res.status(200).json({ error: false, data: deleteInsert });
        } catch(err) {
            res.status(400).json({ error: err.message });
        }
    }
}

export default TaskController