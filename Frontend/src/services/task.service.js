import { apiFetch } from "./api.js"

export const TaskService = {
    async getRequest(gridName, widgetId, accessToken) {
        const params = new URLSearchParams({
            gridName: gridName,
            widgetId: widgetId
        })

        const url = "/task/all?" + params;

        return await apiFetch(url, {
            accessToken: accessToken
        });
    },

    async postRequest(taskName, deadLine, accessToken, gridName, widgetId) {
        const url = "/task"
        return await apiFetch(url, {
            method: "POST",
            accessToken: accessToken,
            body: {
                gridName: gridName,
                widgetId: widgetId,
                taskName: taskName,
                deadLine: deadLine  
            }
        })
    },

    async deleteRequest(gridName, widgetId, taskName, accessToken) {
        const url = "/task";
        
        return await apiFetch(url, {
            method: "DELETE",
            accessToken: accessToken,
            body: {
                gridName: gridName,
                widgetId: widgetId,
                taskName: taskName
            }
        })
    }
}