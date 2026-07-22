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
                    type: type,
                }),
            });

            return res;
        } catch (err) {
            console.log("deu ruim");
        }
    },

    async deleteRequest(id, username, gridName) {
        const url = "/widget";

        try {
            const res = await apiFetch(url, {
                method: "DELETE",
                body: JSON.stringify({
                    id: id,
                    username: username,
                    gridName: gridName,
                }),
            });

            return res;
        } catch (err) {
            console.log("deu ruim");
        }
    },

    async putListRequest(username, gridname, id, newListName) {
        const url = "/widget/list";

        try {
            const res = await apiFetch(url, {
                method: "PUT",
                body: JSON.stringify({
                    username: username,
                    gridname: gridname,
                    id: id,
                    newListName: newListName
                })
            })

            return res;
        } catch(err) {
            return err;
        }
    },

    async putNoteDescriptionRequest(username, gridname, id, newNoteDescription) {
        const url = "/widget/note/description"

        try {
            const res = await apiFetch(url, {
                method: "PUT",
                body: JSON.stringify({
                    username: username,
                    gridname: gridname,
                    id: id,
                    newNoteDescription
                })
            });

            return res;
        } catch(err) {
            return err;
        }
    },

    async putNoteNameRequest(username, gridname, id, newNoteName) {
        const url = "/widget/note/name";

        try {
            const res = await apiFetch(url, {
                method: "PUT",
                body: JSON.stringify({
                    username: username,
                    gridname: gridname,
                    id: id,
                    newNoteName: newNoteName
                })
            })

            return res;
        } catch(err) {
            return err;
        }
    }
};
