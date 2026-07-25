import { apiFetch } from "./api.js"

const TaskService = {
    async getRequest(username, gridname, widgetid) {
        const params = new URLSearchParams({
            username: username,
            gridname: gridname,
            widgetid: widgetid
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

    async postRequest(taskname, deadline, username, gridname, widgetid) {
        const url = "/task"
        try {
            const res = await apiFetch(url, {
                method: "POST",
                body: JSON.stringify({
                    username: username,
                    gridname: gridname,
                    widgetid: widgetid,
                    taskname: taskname,
                    deadline: deadline  
                })
            })
    
            return res;
        } catch(err) {
            throw err;
        }
    },

    async deleteRequest(username, gridname, widgetid, taskname) {
        const url = "/task";
        try {
            const res = await apiFetch(url, {
                method: "DELETE",
                body: JSON.stringify({
                    username: username,
                    gridname: gridname,
                    widgetid: widgetid,
                    taskname: taskname
                })
            })

            return res;
        } catch(err) {
            return err;
        }
    }
}

export default TaskService