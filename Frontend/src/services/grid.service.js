import { apiFetch } from "./api";

export const GridService = {
    async deleteRequest(gridName, accessToken) {
        const url = "/grid";

        return await apiFetch(url, {
            method: "DELETE",
            accessToken: accessToken,
            body: {
                gridName: gridName,
            }
        });

    },

    async getRequest(accessToken) {
        const url = "/grid";

        return await apiFetch(url, {
            accessToken: accessToken
        });
    },

    async postRequest(gridName, accessToken) {
        const url = "/grid";

        return await apiFetch(url, {
            method: "POST",
            accessToken: accessToken,
            body: {
                gridName: gridName
            }
        });
    },

    async putRequest(gridName, gridStatic, accessToken) {
        const url = "/grid";

        return await apiFetch(url, {
            method: "PUT",
            accessToken: accessToken,
            body: {
                gridName: gridName,
                gridStatic: gridStatic
            }
        });
    }
};
