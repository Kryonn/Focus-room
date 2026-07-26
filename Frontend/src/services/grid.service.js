import { apiFetch } from "./api";

export const GridService = {
    async deleteRequest(username, gridName) {
        const url = "/grid";

        try {
            const res = await apiFetch(url, {
                method: "DELETE",
                body: JSON.stringify({
                    username: username,
                    gridName: gridName,
                }),
            });

            console.log("res: ", res);

            return res;
        } catch (err) {
            throw err;
        }
    },

    async getRequest(username) {
        const params = new URLSearchParams({
            username: username
        })

        const url = "/grid?" + params;

        try {
            const res = await apiFetch(url);

            const data = res.data;

            return res;
        } catch (err) {
            throw err;
        }
    },

    async postRequest(username, gridName) {
        const url = "/grid";

        try {
            const res = await apiFetch(url, {
                method: "POST",
                body: JSON.stringify({
                    username: username,
                    gridName: gridName
                })
            });

            return res;
        } catch(err) {
            throw err;
        }
    },

    async putRequest(username, gridName, gridStatic) {
        const url = "/grid";

        try {
            const res = await apiFetch(url, {
                method: "PUT",
                body: JSON.stringify({
                    username: username,
                    gridName: gridName,
                    gridStatic: gridStatic
                })
            });

            return res;
        } catch(err) {
            throw err;
        }
    }
};
