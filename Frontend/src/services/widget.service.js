import { apiFetch } from "./api";

export const WidgetService = {
    async putRequest(
        id,
        username,
        gridName,
        width,
        height,
        xposition,
        yposition,
    ) {
        const endpoint = "/widget";

        try {
            const res = await apiFetch(endpoint, {
                method: "PUT",
                body: JSON.stringify({
                    id: id,
                    username: username,
                    gridName: gridName,
                    width: width,
                    height: height,
                    xposition: xposition,
                    yposition: yposition,
                }),
            });

            return res;
        } catch (err) {
            console.log("deu ruim");
        }
    },

    async getRequest(username, gridName) {
        const params = new URLSearchParams({
            username: username,
            gridName: gridName,
        });

        const url = "/widget?" + params;

        try {
            const res = await apiFetch(url, { method: "GET" });

            // const jsResponse = await res.json();

            return res.data;
        } catch (err) {
            console.log("deu ruimm");
        }
    },

    async postRequest(id, username, gridName, xposition, yposition, type) {
        const url = "/widget";

        try {
            const res = await apiFetch(url, {
                method: "POST",
                body: JSON.stringify({
                    id: id,
                    username: username,
                    gridName: gridName,
                    xposition: xposition,
                    yposition: yposition,
                    type: type
                })
            });

            console.log("x: ", xposition);
            console.log("y: ", yposition);
    
            return res;
        } catch(err) {
            console.log("deu ruim");
        }
    }
};
