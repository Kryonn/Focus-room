import { apiFetch } from "./api.js"

export const TaskService = {
    async getRequest(username, gridName, widgetId) {
        const params = new URLSearchParams({
            username: username,
            gridName: gridName,
            widgetId: widgetId
        })

        const url = "/task?" + params;

        try {
            const res = await apiFetch(url);

            const data = res.data;

            return data;
        } catch(err) {
            return err;
        }
    },

    async postRequest(taskName, deadLine, username, gridName, widgetId) {
        const url = "/task"
        try {
            const res = await apiFetch(url, {
                method: "POST",
                body: JSON.stringify({
                    username: username,
                    gridName: gridName,
                    widgetId: widgetId,
                    taskName: taskName,
                    deadLine: deadLine  
                })
            })
    
            return res;
        } catch(err) {
            throw err;
        }
    },

    async deleteRequest(username, gridName, widgetId, taskName) {
        const url = "/task";
        try {
            const res = await apiFetch(url, {
                method: "DELETE",
                body: JSON.stringify({
                    username: username,
                    gridName: gridName,
                    widgetId: widgetId,
                    taskName: taskName
                })
            })

            return res;
        } catch(err) {
            return err;
        }
    }
}