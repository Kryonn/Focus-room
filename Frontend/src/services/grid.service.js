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
};
